import { createSelector } from 'reselect';
import { get } from 'js-lenses';
import _ from 'lodash-inflection';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

import { flatMapVis, mapFilter } from './viz-creator-utils';

import * as lenses from './viz-creator-lenses';
import {
  lineChart1Data,
  lineChart2Data
} from './components/charts/line/line-config';
import {
  pieChart1Data,
  pieChart2Data
} from './components/charts/pie/pie-config';
import {
  stackBarChart1Data,
  stackBarChart2Data
} from './components/charts/stack-bar/stack-bar-config';

export const dataSelector = state => state;
export const smallSelector = state => state.small;
export const datasetsSelector = state => get(lenses.$datasets, state);
export const visualisationsSelector = state =>
  get(lenses.$visualisations, state);
export const locationsSelector = state => get(lenses.$locations, state);
export const modelsSelector = state => get(lenses.$models, state);
export const scenariosSelector = state => get(lenses.$scenarios, state);
export const indicatorsSelector = state => get(lenses.$indicators, state);
export const categoriesSelector = state => get(lenses.$categories, state);
export const subcategoriesSelector = state => get(lenses.$subcategories, state);
export const yearsSelector = state => get(lenses.$years, state);
export const timeseriesSelector = state => get(lenses.$timeseries, state);
export const getTitle = state => state.title || null;

export const hasDataSelector = createSelector(
  [timeseriesSelector, scenariosSelector],
  (timeseries, scenarios) =>
    timeseries &&
    !_isEmpty(timeseries.data) &&
    scenarios &&
    !_isEmpty(scenarios.data)
);

export const vizTypes = data => data && data['viz-types'];
export const vizSelector = createSelector(datasetsSelector, sets =>
  vizTypes(_find(sets.data, { id: sets.selected }))
);

export const selectedStructureSelector = createSelector(
  [vizSelector, visualisationsSelector, locationsSelector],
  (vizStructure, visualisations) => {
    const selectedStructure = _find(flatMapVis(vizStructure), {
      id: visualisations && visualisations.selected
    });
    return selectedStructure || {};
  }
);

export const filtersSelector = createSelector(
  selectedStructureSelector,
  selectedStructure => (selectedStructure && selectedStructure.filters) || []
);

export const visualisationChartSelector = createSelector(
  selectedStructureSelector,
  selectedStructure => selectedStructure && selectedStructure.chart
);

export const getVisualisationType = createSelector(
  visualisationChartSelector,
  chart => chart && chart.type
);

export const getVisualisationOptions = createSelector(
  visualisationChartSelector,
  chart => chart && chart.options
);

export const chartDataSelector = createSelector(
  [
    hasDataSelector,
    timeseriesSelector,
    scenariosSelector,
    selectedStructureSelector,
    indicatorsSelector,
    locationsSelector,
    subcategoriesSelector,
    smallSelector
  ],
  (
    hasData,
    timeseries,
    scenarios,
    selectedStructure,
    indicators,
    locations,
    subcategories,
    small
  ) => {
    if (!hasData) return {};
    const indicatorLabel =
      indicators && indicators.selected && indicators.selected.label;
    const categoryLabel =
      subcategories.selected && subcategories.selected.label;
    const yAxisLabel = selectedStructure.filters.find(
      f => f.name === 'indicators'
    ).multi
      ? categoryLabel
      : indicatorLabel;
    switch (selectedStructure.id) {
      case 'LineChart-1':
        return lineChart1Data(
          timeseries.data,
          scenarios.data,
          indicators.data,
          yAxisLabel,
          small
        );

      case 'StackBarChart-1':
        return stackBarChart1Data(
          timeseries.data,
          indicators.data,
          yAxisLabel,
          small
        );

      case 'PieChart-1':
        return pieChart1Data(
          timeseries.data,
          indicators.data,
          yAxisLabel,
          small
        );

      case 'LineChart-2':
        return lineChart2Data(
          timeseries.data,
          locations.data,
          indicators.data,
          yAxisLabel,
          small
        );

      case 'PieChart-2':
        return pieChart2Data(
          timeseries.data,
          indicators.data,
          locations.data,
          yAxisLabel,
          small
        );

      case 'StackBarChart-2':
        return stackBarChart2Data(
          timeseries.data,
          locations.data,
          indicators.data,
          yAxisLabel,
          small
        );

      default:
        return {};
    }
  }
);

export const getFormatFilters = name =>
  createSelector([dataSelector, filtersSelector], (state, spec) => {
    if (!spec || !spec.length > 0) return {};

    const filter = { ...(_find(spec, { name }) || {}) };
    const lense = get(lenses[`$${name}`], state) || {};
    filter.data = mapFilter(lense.data || []);
    filter.placeholder = `Select ${_.singularize(_.titleize(name))}`;
    filter.label = _.titleize(name);
    filter.loading = lense.loading;
    filter.disabled = lense.disabled;

    if (lense.selected) {
      filter.selected = filter.multi
        ? [...lense.selected]
        : { ...lense.selected };
    } else {
      filter.selected = filter.multi ? [] : {};
    }

    return filter;
  });

export const getVisualisationTitle = createSelector(
  [getTitle, selectedStructureSelector, categoriesSelector],
  (title, selectedStructure, category) => {
    if (!title || !selectedStructure) return undefined;
    const singleIndicator = !selectedStructure.filters.find(
      f => f.name === 'indicators'
    ).multi;
    return singleIndicator
      ? title
      : category.selected && category.selected.label;
  }
);
