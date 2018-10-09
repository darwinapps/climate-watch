import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Tabs from 'components/ndcs/ndcs-country-tabs';

import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';

import store from 'app/store';
import { basename } from 'app/routes/routes';

const TabsApp = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
        <div>
          <NdcsSdgsDataProvider />
          <Tabs />
        </div>
    </BrowserRouter>
  </Provider>
);

TabsApp.propTypes = {
  data: PropTypes.object
};

export default TabsApp;
