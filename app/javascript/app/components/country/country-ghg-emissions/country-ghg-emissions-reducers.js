export const initialState = {
  loading: true,
  loaded: false,
  error: false,
  data: [],
  calculation: '',
  source: '',
};

const setLoading = (state, loading) => ({ ...state, loading });
const setError = (state, error) => ({ ...state, error });
const setLoaded = (state, loaded) => ({ ...state, loaded });

const setCalculation = (state, { payload }) => ({
	...state,
	calculation: payload
});

const setSource = (state, { payload }) => ({
  ...state,
  source: payload
});

export default {
  fetchCountryGhgEmissionsInit: state => setLoading(state, true),
  fetchCountryGhgEmissionsDataReady: (state, { payload }) =>
    setLoaded(setLoading({ ...state, ...payload }, false), true),
  fetchCountryGhgEmissionsFail: state => setError(state, true),
  setCalculation,
  setSource,
};
