export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  fetchAdaptationsInit: state => setLoading(true, state),
  fetchAdaptationsReady: (state, { payload }) =>
    setLoaded(true, setLoading(false, { ...state, data: payload })),
  fetchAdaptationsFail: state => setLoading(setError(state, true), false)
};
