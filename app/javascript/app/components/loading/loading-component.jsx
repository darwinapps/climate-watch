import React, { PureComponent } from 'react';

class Loading extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="ndc-cw-loader">
        <div className="ndc-cw-loader__item" />
        <div className="ndc-cw-loader__item" />
        <div className="ndc-cw-loader__item" />
        <div className="ndc-cw-loader__item" />
      </div>
    );
  }
}

export default Loading;
