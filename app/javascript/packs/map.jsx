import React from 'react';
import ReactDOM from 'react-dom';
import MapApp from '../app/MapApp';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <MapApp />,
    document.querySelector('#root')
  );
});
