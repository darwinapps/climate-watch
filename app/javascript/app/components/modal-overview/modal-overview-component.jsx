import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/modal/modal-component';
import { NavLink } from 'react-router-dom';
import ModalHeader from 'components/modal/modal-header-component';
import NoContent from 'components/no-content';
import cx from 'classnames';
import { toStartCase } from 'app/utils';
import isArray from 'lodash/isArray';
import styles from './modal-overview-styles.scss';

const MetadataProp = ({ title, children }) => (
  <p className={styles.text}>
    <span className={styles.textHighlight}>{toStartCase(title)}: </span>
    {children || null}
  </p>
);

MetadataProp.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

class ModalOverview extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  renderData() {
    const { data, tabTitles, onRequestClose } = this.props;
    if (!data) return <NoContent />;
    const renderKey = (d, marginBottom) =>
      d && (
        <div
          key={d.name || d.full_name}
          className={cx({ [styles.marginBottom]: marginBottom })}
        >
          {Object.keys(d).map(
            key =>
              (key === 'Link' ? (
                <NavLink
                  className={styles.link}
                  onClick={onRequestClose}
                  to={d[key]}
                  key={key}
                >
                  Show info page
                </NavLink>
              ) : (
                <MetadataProp key={key} title={key}>
                  <span
                    className={cx({
                      [styles.empty]: d[key] === 'Not specified'
                    })}
                  >
                    {d[key]}
                  </span>
                </MetadataProp>
              ))
          )}
        </div>
      );
    let selectedData = data;
    if (tabTitles) selectedData = data[this.state.selectedIndex];
    return isArray(selectedData)
      ? selectedData.map(d => renderKey(d, true))
      : renderKey(selectedData);
  }

  render() {
    const { isOpen, title, tabTitles, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        header={
          <ModalHeader
            title={title}
            tabTitles={tabTitles}
            selectedIndex={this.state.selectedIndex}
            handleTabIndexChange={i => this.setState({ selectedIndex: i })}
          />
        }
      >
        {this.renderData()}
      </Modal>
    );
  }
}

ModalOverview.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
  tabTitles: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ModalOverview;
