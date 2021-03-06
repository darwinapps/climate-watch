import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import cx from 'classnames';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import closeIcon from 'assets/icons/close.svg';
import styles from '../multi-dropdown-styles.scss';

const Selector = props => {
  const {
    isOpen,
    disabled,
    arrowPosition,
    onSelectorClick,
    clearable,
    activeValue,
    activeLabel,
    searchable,
    inputProps,
    handleClearSelection,
    children,
    innerRef,
    placeholder
  } = props;

  const showCloseIcon = clearable && activeValue;
  const showDownArrow = arrowPosition !== 'left' && !disabled;
  return (
    <div
      ref={innerRef}
      className={cx(styles.container, { [styles.isOpen]: isOpen })}
    >
      <div
        className={cx(styles.selector, {
          [styles.alignLeft]: arrowPosition,
          [styles.disabled]: disabled
        })}
      >
        {arrowPosition === 'left' && (
          <button className={styles.arrowBtn} onClick={onSelectorClick}>
            <Icon className={styles.arrow} icon={arrowDownIcon} />
          </button>
        )}
        <span
          className={cx(styles.value, {
            [styles.noValue]: !activeValue,
            [styles.clearable]: clearable,
            [styles.placeholder]: !isOpen && !activeLabel
          })}
        >
          {(isOpen && !searchable) || !isOpen ? activeLabel || placeholder : ''}
        </span>
        <input {...inputProps()} />
        {showCloseIcon && (
          <button className={styles.clearBtn} onClick={handleClearSelection}>
            <Icon icon={closeIcon} className={styles.clearIcon} />
          </button>
        )}
        {showDownArrow && (
          <button className={styles.arrowBtn} onClick={onSelectorClick}>
            <Icon className={styles.arrow} icon={arrowDownIcon} />
          </button>
        )}
      </div>
      <div className={styles.menuArrow} />
      {children}
    </div>
  );
};

Selector.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  arrowPosition: PropTypes.string,
  onSelectorClick: PropTypes.func,
  clearable: PropTypes.bool,
  activeValue: PropTypes.object,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchable: PropTypes.bool,
  inputProps: PropTypes.func,
  handleClearSelection: PropTypes.func,
  placeholder: PropTypes.string,
  innerRef: PropTypes.func
};

export default Selector;
