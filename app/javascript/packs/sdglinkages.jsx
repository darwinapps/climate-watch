import React from 'react';
import ReactDOM from 'react-dom';
import SDGLinkagesApp from '../app/SDGLinkagesApp';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SDGLinkagesApp />,
    document.querySelector('#sdg-linkages')
  );
});
