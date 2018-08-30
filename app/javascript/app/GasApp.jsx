import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Gas from 'components/country/country-ghg-emissions';

import 'styles/sticky.scss';

import store from 'app/store';
import { basename } from 'app/routes/routes';

const GasApp = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <Gas />
    </BrowserRouter>
  </Provider>
);

GasApp.propTypes = {
  data: PropTypes.object
};

export default GasApp;
