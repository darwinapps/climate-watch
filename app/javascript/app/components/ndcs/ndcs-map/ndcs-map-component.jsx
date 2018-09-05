import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { TabletLandscape } from 'components/responsive';
import Map from 'components/map';
import MapLegend from 'components/map-legend';
import Dropdown from 'components/dropdown';
import ButtonGroup from 'components/button-group';
import Loading from 'components/loading';
import ModalMetadata from 'components/modal-metadata';

const getTooltip = (country, tooltipTxt) => (
  <Link className="ndc-map__tooltip" to={`/ndcs/country/${country.id}`}>
    <p className="ndc-map__tooltip-title">{country.name}</p>
    <p className="ndc-map__tooltip-p">{tooltipTxt}</p>
  </Link>
);

const renderButtonGroup = clickHandler => (
  <ButtonGroup
    buttonsConfig={[
      {
        type: 'info',
        onClick: clickHandler
      },
      {
        type: 'share',
        shareUrl: '/embed/ndcs',
        analyticsGraphName: 'Ndcs',
        positionRight: true
      },
      {
        type: 'download',
        section: 'ndcs-content'
      },
      {
        type: 'addToUser'
      }
    ]}
  />
);

const NDCMap = ({
  categories,
  selectedCategory,
  indicators,
  selectedIndicator,
  loading,
  paths,
  tooltipTxt,
  countryData,
  handleIndicatorChange,
  handleCategoryChange,
  handleInfoClick,
  handleCountryClick,
  handleCountryEnter
}) => (
  <TabletLandscape>
    {isTablet => (
      <div className="ndc-container">
        <h3 className="ndc-section__subtitle">Climate Watch</h3>

        <div className="ndc-cw-filter">
          <div className="ndc-cw-filter__left">
            <div className="ndc-cw-filter__dropdown">
              <Dropdown
                label="Category"
                paceholder="Select a category"
                options={categories}
                onValueChange={handleCategoryChange}
                value={selectedCategory}
                hideResetButton
                plain
              />
            </div>
            <div className="ndc-cw-filter__dropdown">
              <Dropdown
                label="Indicator"
                options={indicators}
                onValueChange={handleIndicatorChange}
                value={selectedIndicator}
                hideResetButton
                plain
              />
            </div>
          </div>

          <div className="ndc-cw-filter__right">
            <div className="ndc-cw-filter__buttons">
              {renderButtonGroup(handleInfoClick)}
            </div>
          </div>
        </div>

        {loading && <Loading light />}

        <Map
          paths={paths}
          tooltipId="ndcs-map-tooltip"
          onCountryClick={handleCountryClick}
          onCountryEnter={handleCountryEnter}
          onCountryFocus={handleCountryEnter}
          dragEnable={false}
          customCenter={!isTablet ? [10, -50] : null}
        />
        {countryData && (
          <ReactTooltip id="ndcs-map-tooltip" delayHide={isTablet ? 0 : 3000}>
            {getTooltip(countryData, tooltipTxt)}
          </ReactTooltip>
        )}
        {selectedIndicator && (
          <MapLegend
            title={selectedIndicator.legend}
            buckets={selectedIndicator.legendBuckets}
          />
        )}
        <ModalMetadata />
      </div>
    )}
  </TabletLandscape>
);

NDCMap.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.array,
  indicators: PropTypes.array,
  selectedCategory: PropTypes.object,
  selectedIndicator: PropTypes.object,
  paths: PropTypes.array.isRequired,
  tooltipTxt: PropTypes.string,
  countryData: PropTypes.object,
  handleCountryClick: PropTypes.func.isRequired,
  handleCountryEnter: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleIndicatorChange: PropTypes.func.isRequired,
  handleInfoClick: PropTypes.func.isRequired
};

export default NDCMap;
