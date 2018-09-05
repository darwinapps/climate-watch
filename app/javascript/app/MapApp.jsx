import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CountriesProvider from 'providers/countries-provider';
import NDCS from 'components/ndcs/ndcs-map/ndcs-map';

import store from 'app/store';
import { basename } from 'app/routes/routes';

const MapApp = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <div>
        <CountriesProvider />
        <NDCS />
      </div>
    </BrowserRouter>
  </Provider>
);

MapApp.propTypes = {
  data: PropTypes.object
};

export default MapApp;
