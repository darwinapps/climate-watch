import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';
import isEmpty from 'lodash/isEmpty';

const getEspTimeSeriesInit = createAction('getEspTimeSeriesInit');
const getEspTimeSeriesReady = createAction('getEspTimeSeriesReady');
const { ESP_API } = process.env;

const getEspTimeSeries = createThunkAction(
  'getEspTimeSeries',
  (location, model, scenario) => (dispatch, state) => {
    const { espTimeSeries } = state();
    if (
      espTimeSeries &&
      isEmpty(espTimeSeries.data) &&
      !espTimeSeries.loading
    ) {
      dispatch(getEspTimeSeriesInit());
      const query = `location=${location}${model
        ? `&model=${model}`
        : ''}${scenario ? `&scenario=${scenario}` : ''}`;
      fetch(`${ESP_API}/time_series_values?${query}`)
        .then(response => {
          if (response.ok) return response.json();
          throw Error(response.statusText);
        })
        .then(data => {
          dispatch(getEspTimeSeriesReady(data));
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
);

export default {
  getEspTimeSeries,
  getEspTimeSeriesInit,
  getEspTimeSeriesReady
};
