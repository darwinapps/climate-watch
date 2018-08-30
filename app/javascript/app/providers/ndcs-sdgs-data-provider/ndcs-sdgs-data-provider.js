import { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import actions from './ndcs-sdgs-data-provider-actions';
import reducers, { initialState } from './ndcs-sdgs-data-provider-reducers';

class NdcsSdgsDataProvider extends PureComponent {
  componentWillMount() {
    window.events.on('countrySelected', iso => {
      this.props.getNdcsSdgsData({ iso });
    })
  }

  render() {
    return null;
  }
}

NdcsSdgsDataProvider.propTypes = {
  getNdcsSdgsData: PropTypes.func.isRequired,
  match: PropTypes.object,
  document: PropTypes.string
};

export { actions, reducers, initialState };
export default withRouter(connect(null, actions)(NdcsSdgsDataProvider));
