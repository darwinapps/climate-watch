import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Loading from 'components/loading';
import NdcsSdgsDataProvider from 'providers/ndcs-sdgs-data-provider';
import NdcsSdgsMetaProvider from 'providers/ndcs-sdgs-meta-provider';
import SDGCard from 'components/sdg-card';
import ReactTooltip from 'react-tooltip';
import ButtonGroup from 'components/button-group';
import Dropdown from 'components/dropdown';
import ModalMetadata from 'components/modal-metadata';
import isEqual from 'lodash/isEqual';

class CountrySDGLinkages extends PureComponent {
  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.goals, this.props.goals) ||
      !isEqual(prevProps.targetsMeta, this.props.targetsMeta)
    ) {
      ReactTooltip.rebuild();
    }
  }

  getTooltip() {
    const { sectors, tooltipData, targets } = this.props;
    const targetsContent = targets && targets[tooltipData.goal_number];
    const sectorsLabels =
      !isEmpty(tooltipData.sectors) &&
      (tooltipData.sectors.map(sector => sectors[sector]) || []).sort();
    return tooltipData && targetsContent ? (
      <div className="ndc-sdg-linkages__tooltip">
        <p className="ndc-sdg-linkages__tooltip-p">
          <b>{tooltipData.number}: </b>
          {tooltipData.title}
        </p>
        {!isEmpty(tooltipData.sectors) && (
          <p className="ndc-sdg-linkages__tooltip-p">
            <b>Sectors: </b>
            {sectorsLabels.map((sector, index) => (
              <span key={`${tooltipData.targetKey}-${sector}`}>
                <span>{sector}</span>
                <span>
                  {index === tooltipData.sectors.length - 1 ? '' : ', '}
                </span>
              </span>
            ))}
          </p>
        )}
      </div>
    ) : null;
  }

  renderCards() {
    const {
      goals,
      targets,
      targetsData,
      activeSector,
      loading,
      setTooltipData,
      handleOnDotClick,
      iso
    } = this.props;
    const hasGoals = goals && goals.length > 0;
    if (loading) return <Loading light />;
    if (isEmpty(goals) || isEmpty(targetsData)) {
      return <div />;
    }

    return (
      hasGoals && (
        <div className="ndc-sdg-linkages__grid">
          {goals.map(goal => (
            <div key={goal.title} className="ndc-sdg-linkages__column">
              <SDGCard
                activeSector={activeSector}
                goal={goal}
                iso={iso}
                targets={targets[goal.number]}
                targetData={targetsData[goal.number]}
                tooltipId="sdg-linkages"
                setTooltipData={setTooltipData}
                indicators
                handleOnDotClick={handleOnDotClick}
              />
            </div>
          ))}

          <ReactTooltip id="sdg-linkages" scrollHide={false}>
            {this.getTooltip()}
          </ReactTooltip>
        </div>
      )
    );
  }

  render() {
    const {
      iso,
      activeSector,
      sectorOptions,
      isNdcp,
      isEmbed,
      handleSectorChange,
      handleInfoClick,
      handleAnalyticsClick
    } = this.props;
    const description = (
      <p className="ndc-sdg-linkages__p">
        The colored dots represent the Sustainable Development Goals (SDGs) for
        which there is an aligned climate target, action, policy measure or need
        in the NDC. This alignment was identified based only on the information
        communicated in the NDC, not the domestic policy context. It is
        therefore only an entry point for considering the degree of potential
        alignment between the country’s climate and sustainable development
        objectives.
      </p>
    );

    const href = '/contained/ndcs-sdg?isNdcp=true';
    const link = '/ndcs-sdg';

    const exploreButton = (
      <a
        className="ndc-cw-filter__button ndc-btn ndc-btn--cw"
        href="/climate-data/ndcs-sdg"
        // href={isNdcp ? href : null}
        // link={isNdcp ? null : link}
        // onClick={handleAnalyticsClick}
      >
        Explore global linkages
      </a>
    );
    const buttonGroupConfig = isEmbed
      ? [{ type: 'info', onClick: handleInfoClick }]
      : [
        { type: 'info', onClick: handleInfoClick },
        {
          type: 'share',
          shareUrl: `/embed/countries/${iso}/ndc-sdg-linkages`,
          positionRight: true
        }
      ];

    const buttonGroup = (
      <ButtonGroup key="action1" buttonsConfig={buttonGroupConfig} />
    );

    const sectorFilterDescription =
      'Only linkages relevant to the selected sector are shown';

    return (
      <div className="ndc-container">
        <NdcsSdgsDataProvider />

        <h3 className="ndc-section__subtitle">NDC-SDG Linkages</h3>
        {description}

        <div className="ndc-cw-filter ndc-cw-filter--grey">
          <div className="ndc-cw-filter__left">
            <div className="ndc-cw-filter__dropdown">
              <Dropdown
                label="Filter by sector"
                placeholder="Choose a sector"
                options={sectorOptions}
                onValueChange={handleSectorChange}
                value={activeSector}
                info
                infoText={sectorFilterDescription}
              />
            </div>
          </div>
          <div className="ndc-cw-filter__right">
            <div className="ndc-cw-filter__buttons">
              {buttonGroup}
              {exploreButton}
            </div>
          </div>
        </div>

        <NdcsSdgsMetaProvider />
        {this.renderCards()}

        <ModalMetadata />
        {isEmbed && <ReactTooltip />}
      </div>
    );
  }
}

CountrySDGLinkages.propTypes = {
  goals: Proptypes.array,
  targets: Proptypes.object,
  targetsData: Proptypes.object,
  sectorOptions: Proptypes.array,
  sectors: Proptypes.object,
  handleSectorChange: Proptypes.func,
  activeSector: Proptypes.object,
  isNdcp: Proptypes.bool,
  isEmbed: Proptypes.bool,
  loading: Proptypes.bool,
  setTooltipData: Proptypes.func,
  tooltipData: Proptypes.object,
  targetsMeta: Proptypes.object,
  iso: Proptypes.string,
  handleInfoClick: Proptypes.func.isRequired,
  handleOnDotClick: Proptypes.func.isRequired,
  handleAnalyticsClick: Proptypes.func.isRequired
};

CountrySDGLinkages.defaultProps = {
  targetsData: {}
};

export default CountrySDGLinkages;
