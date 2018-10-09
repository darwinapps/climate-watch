import { createElement, PureComponent } from 'react';
import { withRouter } from 'react-router';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { getLocationParamUpdated } from 'utils/navigation';

import AccordionComponent from './accordion-component';

const mapStateToProps = (state, { search, param }) => {
  const openSlug = search[param] || null;
  return {
    openSlug
  };
};

class AccordionContainer extends PureComponent {
  handleOnClick = (slug, open) => {
    const { param } = this.props;
    const newSlug = !open ? slug : 'none';
    this.updateUrlParam({ name: param, value: newSlug });
  };

  updateUrlParam = (params, clear) => {
    const { history, location } = this.props;

    this.props.changeParams(params)
  };

  render() {
    return createElement(AccordionComponent, {
      handleOnClick: this.handleOnClick,
      ...this.props
    });
  }
}

AccordionContainer.propTypes = {
  location: Proptypes.object,
  history: Proptypes.object,
  param: Proptypes.string,
  search: Proptypes.object,
  changeParams: Proptypes.func,
};

export default withRouter(connect(mapStateToProps, null)(AccordionContainer));
