import { createAction } from 'redux-actions';

const setIndicator = createAction('setIndicator');
const setCategory = createAction('setCategory');

export default {
  setIndicator,
  setCategory,
};
