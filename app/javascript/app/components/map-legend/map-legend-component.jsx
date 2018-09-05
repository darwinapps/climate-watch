import React from 'react';
import PropTypes from 'prop-types';
import { getColorByIndex } from 'utils/map';

const MapLegend = ({ buckets }) => (
  <div className="ndc-map__legend">
    {Object.keys(buckets).length > 0 &&
      Object.keys(buckets).map(key => (
        <div className="ndc-map__legend-item" key={key}>
          <span
            className="ndc-map__legend-circle"
            style={{
              backgroundColor: getColorByIndex(buckets, buckets[key].index)
            }}
          />
          {buckets[key].name}
        </div>
      ))}
  </div>
);

MapLegend.propTypes = {
  buckets: PropTypes.object
};

MapLegend.defaultProps = {
  buckets: {}
};

export default MapLegend;
