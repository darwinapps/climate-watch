import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Dot from './dot';

class SDGCard extends PureComponent {
  render() {
    const {
      goal,
      targets,
      indicators,
      square,
      icons,
      onClick,
      onMouseEnter,
      targetData,
      tooltipId,
      setTooltipData,
      iso,
      activeSector
    } = this.props;

    const title = square ? goal.title : `${goal.number}. ${goal.cw_title}`;

    return (
      <div
        className="ndc-sdg-linkages__card"
        onClick={onClick}
        role="menuitem"
        tabIndex={0}
        onMouseEnter={onMouseEnter}
      >
        <h4 className="ndc-sdg-linkages__card-title">{title}</h4>
        <div className="ndc-sdg-linkages__card-dots">
          {targets &&
            targets.map(target => (
              <Dot
                key={target.id}
                target={target}
                targetData={targetData}
                tooltipId={tooltipId}
                setTooltipData={setTooltipData}
                iso={iso}
                activeSector={activeSector}
                goal={goal}
              />
            ))}
        </div>
        {(!indicators || square) && (
          <div className="ndc-sdg-linkages__card-number">{goal.number}</div>
        )}
        {goal.id && (
          <Icon
            icon={icons[`sdg${goal.number}`]}
            className={`ndc-sdg-linkages__card-icon ndc-sdg-linkages__card-icon--color-${goal.number}`}
          />
        )}
      </div>
    );
  }
}

SDGCard.propTypes = {
  icons: PropTypes.object.isRequired,
  goal: PropTypes.object.isRequired,
  targets: PropTypes.array,
  targetData: PropTypes.object,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  iso: PropTypes.string,
  activeSector: PropTypes.object,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func
};

SDGCard.defaultProps = {
  square: false,
  hover: false,
  onClick: () => {},
  onMouseEnter: () => {}
};

export default SDGCard;
