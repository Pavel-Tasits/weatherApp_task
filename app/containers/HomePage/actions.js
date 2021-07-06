/*
 *
 * HomePage actions
 *
 */

import { GET_WEATHER, CLOSE_SNACKBAR } from './constants';

export function getData(params) {
  return {
    type: GET_WEATHER,
    params,
  };
}

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}
