export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  params: {},
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  fetchNdcsCountryAccordionInit: state => setLoading(true, state),
  fetchNdcsCountryAccordionReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: payload
    };

    return setLoaded(true, setLoading(false, newState));
  },
  fetchNdcsCountryAccordionFailed: state => {
    const newState = {
      ...state,
      data: {}
    };

    return setLoaded(true, setLoading(false, newState));
  },
  setParam: (state, { payload }) => ({
      ...state,
      params: {
        ...state.params,
        [payload.name]: payload.value
      },
  }),
  removeParams: state => ({
    ...state,
    params: {},
  }),
};
