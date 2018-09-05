import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dot extends PureComponent {
  render() {
    const {
      target,
      goal,
      hasSectors,
      tooltipId,
      setTooltipData,
      path
    } = this.props;

    let dotProps = {
      onMouseEnter: () => setTooltipData(target),
      'data-for': tooltipId,
      'data-tip': true,
      className: 'ndc-sdg-linkages__card-dot',
      style: { backgroundColor: hasSectors ? goal.colour : '' }
    };
    if (hasSectors) dotProps = { ...dotProps, to: path };
    const reactClass = hasSectors ? Link : 'span';
    return createElement(reactClass, dotProps);
  }
}

Dot.propTypes = {
  goal: PropTypes.object.isRequired,
  target: PropTypes.object,
  hasSectors: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  path: PropTypes.string
};

Dot.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default Dot;
