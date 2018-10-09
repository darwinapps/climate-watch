export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false,
  activeIso: '',
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });
const setError = (state, error) => ({ ...state, error });

export default {
  getTimelineInit: state => setLoading(true, state),
  getTimelineReady: (state, { payload }) => {
    const activeIso = Object.keys(payload)[0];
    return setLoaded(
      true,
      setLoading( false, { ...state, data: Object.assign(state.data, payload), activeIso })
    );
  },
  getTimelineFail: state => setLoading(setError(state, true), false)
};
