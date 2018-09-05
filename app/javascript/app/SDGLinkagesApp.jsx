import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SDG from 'components/country/country-ndc-sdg-linkages';
import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';

import store from 'app/store';
import { basename } from 'app/routes/routes';

const MapApp = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <div>
        <NdcsSdgsMetaProvider />
        <NdcsSdgsDataProvider />
        <SDG />
      </div>
    </BrowserRouter>
  </Provider>
);

MapApp.propTypes = {
  data: PropTypes.object
};

export default MapApp;
