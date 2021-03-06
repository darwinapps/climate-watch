import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import actions from './ndc-country-full-actions';
import reducers, { initialState } from './ndc-country-full-reducers';

import NDCCountryFullComponent from './ndc-country-full-component';
import {
  getCountry,
  getSelectedContent,
  getContentOptions,
  getContentOptionSelected
} from './ndc-country-full-selectors';

const mapStateToProps = (state, { match }) => {
  const search = qs.parse(location.search);
  const { iso } = match.params;
  const contentData = {
    content: state.countryNDCFull.data[iso],
    document: search.document,
    iso
  };
  return {
    loading: state.countryNDCFull.loading,
    loaded: state.countryNDCFull.loaded,
    country: getCountry(state, iso),
    content: getSelectedContent(contentData),
    contentOptions: getContentOptions(contentData),
    contentOptionSelected: getContentOptionSelected(contentData),
    search,
    iso
  };
};

class NDCCountryFullContainer extends PureComponent {
  componentWillMount() {
    const { match, fetched, loading, fetchCountryNDCFull } = this.props;
    const { iso } = match.params;
    const search = qs.parse(location.search);
    if (iso && !loading && !fetched) {
      fetchCountryNDCFull({ search, iso });
    }
  }

  componentWillUnmount() {
    const { match, clearCountryNDCFull } = this.props;
    const { iso } = match.params;
    clearCountryNDCFull(iso);
  }

  onDocumentChange = selected => {
    this.updateUrlParam({ name: 'document', value: selected.value });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;
    history.replace(getLocationParamUpdated(location, params, clear));
  };

  render() {
    return createElement(NDCCountryFullComponent, {
      ...this.props,
      onSearchChange: this.onSearchChange,
      onDocumentChange: this.onDocumentChange,
      handleKeyUp: this.handleKeyUp
    });
  }
}

NDCCountryFullContainer.propTypes = {
  match: Proptypes.object.isRequired,
  history: Proptypes.object.isRequired,
  location: Proptypes.object.isRequired,
  fetched: Proptypes.array,
  loading: Proptypes.bool,
  fetchCountryNDCFull: Proptypes.func,
  clearCountryNDCFull: Proptypes.func
};

export { actions, reducers, initialState };

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryFullContainer)
);
