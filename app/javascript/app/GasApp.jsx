import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CountriesProvider from 'providers/countries-provider';
import Gas from 'components/country/country-ghg';

import store from 'app/store';
import { basename } from 'app/routes/routes';

const GasApp = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <React.Fragment>
        <CountriesProvider/>
        <Gas/>
      </React.Fragment>
    </BrowserRouter>
  </Provider>
);

GasApp.propTypes = {
  data: PropTypes.object
};

export default GasApp;
