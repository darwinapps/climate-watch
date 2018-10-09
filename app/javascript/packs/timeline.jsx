import React from 'react';
import ReactDOM from 'react-dom';
import TimelineApp from '../app/TimelineApp';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TimelineApp />,
    document.querySelector('#timeline')
  );
});