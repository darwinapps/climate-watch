import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Tag from 'components/tag';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import Chart from 'components/charts/chart';
import EmissionsMetaProvider from 'providers/ghg-emissions-meta-provider';
import WbCountryDataProvider from 'providers/wb-country-data-provider';
import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import ModalMetadata from 'components/modal-metadata';
import { isPageContained } from 'utils/navigation';

class CountryGhgEmissions extends PureComponent {
  renderFilterDropdowns() {
    const {
      sources,
      calculations,
      handleSourceChange,
      handleCalculationChange,
      calculationSelected,
      sourceSelected
    } = this.props;
    return [
      <div className="ndc-cw-filter__dropdown">
        <Dropdown
          key="filter1"
          label="Data Source"
          options={sources}
          onValueChange={handleSourceChange}
          value={sourceSelected}
          hideResetButton
        />
      </div>,
      <div className="ndc-cw-filter__dropdown">
        <Dropdown
          key="filter2"
          label="Metric"
          options={calculations}
          onValueChange={handleCalculationChange}
          value={calculationSelected}
          hideResetButton
        />
      </div>
    ];
  }

  renderActionButtons() {
    const {
      iso,
      handleInfoClick,
      handleAnalyticsClick,
      isEmbed,
      isNdcp
    } = this.props;

    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : [
        {
          type: 'info',
          onClick: handleInfoClick
        },
        {
          type: 'share',
          shareUrl: `/embed/countries/${iso}/ghg-emissions`,
          analyticsGraphName: 'Country/Ghg-emissions',
          positionRight: true
        },
        {
          type: 'download',
          section: 'ghg-emissions'
        },
        {
          type: 'addToUser'
        }
      ];

    const link = `/ghg-emissions?breakBy=location&filter=${iso}`;
    const href = `/contained/ghg-emissions?breakBy=location&filter=${iso}&isNdcp=true`;

    return [
      <ButtonGroup key="action1" buttonsConfig={buttonGroupConfig} />,
      <a
        className="ndc-cw-filter__button ndc-btn ndc-btn--cw"
        key="action2"
        noSpace
        href={isNdcp ? href : null}
        link={isNdcp ? null : link}
        onClick={handleAnalyticsClick}
      >
        Explore emissions
      </a>
    ];
  }

  renderChart() {
    const {
      calculationSelected,
      data,
      domain,
      quantifications,
      loading,
      config,
      handleYearHover,
      filtersOptions,
      filtersSelected,
      sourceSelected
    } = this.props;

    const points = !isPageContained ? quantifications : [];
    const useLineChart =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value ||
      calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value;
    const forceFixedFormatDecimals =
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value
        ? 2
        : 0;

    return (
      <div className="ndcs-gas__chart">
        <Chart
          type={useLineChart ? 'line' : 'area'}
          config={config}
          data={data}
          domain={useLineChart && domain}
          onMouseMove={handleYearHover}
          points={points}
          dataOptions={filtersOptions}
          dataSelected={filtersSelected}
          loading={loading}
          height={360}
          forceFixedFormatDecimals={forceFixedFormatDecimals}
          stepped={sourceSelected.label === 'UNFCCC'}
        />
      </div>
    );
  }

  renderQuantificationsTags() {
    const { loading, quantificationsTagsConfig } = this.props;
    return (
      <ul>
        {!loading &&
          !isPageContained &&
          quantificationsTagsConfig.map(q => (
            <Tag
              key={q.label}
              canRemove={false}
              label={q.label}
              color={q.color}
              data={q}
            />
          ))}
      </ul>
    );
  }

  render() {
    const { isEmbed, countryName, iso } = this.props;

    return (
      <div>
        <EmissionsMetaProvider />
        <WbCountryDataProvider />
        <NdcsSdgsDataProvider />
        {iso ? (
          <div className="ndc-container">
            <h3 className="ndc-section__subtitle">
              {`Greenhouse Gas Emissions and Emissions Targets ${isEmbed
                ? `in ${countryName}`
                : ''}`}
            </h3>

            <div className="ndc-cw-filter">
              <div className="ndc-cw-filter__left">
                {this.renderFilterDropdowns()}
              </div>

              <div className="ndc-cw-filter__right">
                <div className="ndc-cw-filter__buttons">
                  {this.renderActionButtons()}
                </div>
              </div>
            </div>

            {this.renderChart()}

            <ModalMetadata />
          </div>
        ) : null}
      </div>
    );
  }
}

CountryGhgEmissions.propTypes = {
  isEmbed: PropTypes.bool,
  isNdcp: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  domain: PropTypes.object,
  config: PropTypes.object.isRequired,
  iso: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  quantifications: PropTypes.array.isRequired,
  quantificationsTagsConfig: PropTypes.array.isRequired,
  calculations: PropTypes.array.isRequired,
  calculationSelected: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  sourceSelected: PropTypes.object.isRequired,
  filtersOptions: PropTypes.array,
  filtersSelected: PropTypes.array,
  handleInfoClick: PropTypes.func.isRequired,
  handleAnalyticsClick: PropTypes.func.isRequired,
  handleYearHover: PropTypes.func,
  handleSourceChange: PropTypes.func.isRequired,
  handleCalculationChange: PropTypes.func.isRequired
};

CountryGhgEmissions.defaultProps = {
  iso: ''
};

export default CountryGhgEmissions;
