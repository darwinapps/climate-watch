export const initialState = {
  loading: false,
  loaded: false,
  data: {},
  activeIso: '',
};

const setLoading = (loading, state) => ({ ...state, loading });
const setLoaded = (loaded, state) => ({ ...state, loaded });

export default {
  getNdcsSdgsDataInit: state => setLoading(true, state),
  getNdcsSdgsDataReady: (state, { payload }) => {
    const newState = {
      ...state,
      data: {
        ...state.data,
        [payload.iso_code3]: payload
      },
      activeIso: payload.iso_code3,
    };
    return setLoaded(true, setLoading(false, newState));
  }
};
