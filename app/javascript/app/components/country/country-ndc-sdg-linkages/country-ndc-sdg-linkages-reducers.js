export const initialState = {
  tooltipData: {},
  activeSector: '',
};

const setTooltipData = (state, { payload }) => ({
  ...state,
  tooltipData: payload
});

const setSector = (state, { payload }) => ({
  ...state,
  activeSector: payload
});

export default {
  setTooltipData,
  setSector,
};
