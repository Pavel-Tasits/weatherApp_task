/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  GET_WEATHER,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
  CLOSE_SNACKBAR,
} from './constants';

export const initialState = {
  loading: false,
  data: {},
  dataError: {},
  corsError: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_WEATHER:
        draft.loading = true;
        draft.data = {};
        draft.corsError = false;
        break;
      case GET_WEATHER_SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        draft.corsError = false;
        break;
      case GET_WEATHER_FAILURE:
        draft.loading = false;
        draft.dataError = action.dataError;
        if (action.dataError.message === 'Forbidden') {
          draft.corsError = true;
        } else {
          draft.corsError = false;
        }
        break;
      case CLOSE_SNACKBAR:
        draft.dataError = initialState.dataError;
        break;
    }
  });

export default homePageReducer;
