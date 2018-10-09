import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Timeline from 'components/country/country-timeline';
import TimelineProvider from 'providers/timeline-provider';

import store from 'app/store';
import { basename } from 'app/routes/routes';

const TimelineApp = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <div>
        <TimelineProvider />
        <Timeline />
      </div>
    </BrowserRouter>
  </Provider>
);

TimelineApp.propTypes = {
  data: PropTypes.object
};

export default TimelineApp;
