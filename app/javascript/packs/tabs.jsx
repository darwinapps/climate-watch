import React from 'react';
import ReactDOM from 'react-dom';
import TabsApp from '../app/TabsApp';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TabsApp />,
    document.querySelector('#tabs')
  );
});
