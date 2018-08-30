import React from 'react';
import ReactDOM from 'react-dom';
import GasApp from '../app/GasApp';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <GasApp />,
    document.querySelector('#gas')
  );
});
