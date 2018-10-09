import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'query-string';

import actions from './ndcs-country-accordion-actions';
import reducers, { initialState } from './ndcs-country-accordion-reducers';

import NdcsCountryAccordionComponent from './ndcs-country-accordion-component';
import {
  filterNDCs,
  filterSectoralNDCs
} from './ndcs-country-accordion-selectors';

const mapStateToProps = (state, { match, location, category }) => {
  const iso = state.ndcsSdgsData.activeIso;
  const ndcsData = {
    data: state.ndcCountryAccordion.data,
    iso,
    countries: iso ? [iso] : null
  };
  return {
    loading: state.ndcCountryAccordion.loading,
    ndcsData:
      category === 'sectoral_information'
        ? filterSectoralNDCs(ndcsData)
        : filterNDCs(ndcsData),
    searchParams: state.ndcCountryAccordion.params,
    iso,
  };
};

class NdcsCountryAccordionContainer extends PureComponent {
  componentWillMount() {
    const {
      iso,
      fetchNdcsCountryAccordion,
      category,
      compare
    } = this.props;
    const locations = iso;
    fetchNdcsCountryAccordion({ locations, category, compare });
  }

  componentWillReceiveProps(nextProps) {
    const { fetchNdcsCountryAccordion, compare, iso, category, params, removeParams } = this.props;

    if ( iso !== nextProps.iso || category !== nextProps.category) {
      removeParams();

      fetchNdcsCountryAccordion({
        locations: [nextProps.iso],
        category: nextProps.category,
        compare
      });
    }
  }

  render() {
    return createElement(NdcsCountryAccordionComponent, {
      ...this.props
    });
  }
}

NdcsCountryAccordionContainer.propTypes = {
  fetchNdcsCountryAccordion: PropTypes.func,
  setParam: PropTypes.func,
  removeParams: PropTypes.func,
  iso: PropTypes.string,
  category: PropTypes.string,
  search: PropTypes.object,
  location: PropTypes.object,
  compare: PropTypes.bool
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NdcsCountryAccordionContainer)
);
