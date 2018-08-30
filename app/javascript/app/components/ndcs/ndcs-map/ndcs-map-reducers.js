export const initialState = {
  indicator: '',
  category: '',
};

const setIndicator = (state, { payload }) => ({
  ...state,
  indicator: payload
});

const setCategory = (state, { payload }) => ({
  ...state,
  category: payload
});

export default {
  setIndicator,
  setCategory,
};
