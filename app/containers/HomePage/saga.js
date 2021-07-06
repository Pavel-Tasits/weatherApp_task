import { takeLatest, call, put } from 'redux-saga/effects';
import {
  APPID,
  SEARCH_BY_COORDS,
  GET_WEATHER,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE,
} from './constants';

// eslint-disable-next-line consistent-return
function* apiFetch(url, method = 'GET') {
  const headers = {};
  headers['Content-Type'] = 'application/json';
  const params = { headers, method };
  const response = yield call(fetch, url, params);
  const { status } = response;
  const { statusText } = response;
  if (status === 200) {
    return yield response.json();
  }
  const err = { message: statusText, status };
  throw err;
}

export function* apiGet(url) {
  return yield apiFetch(url, 'GET');
}

export function* getData(action) {
  let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?appid=${APPID}&lang=ru&units=${
    action.params.unit
  }`;
  if (action.params.searchBy === SEARCH_BY_COORDS) {
    url += `&lat=${action.params.coords[0]}&lon=${action.params.coords[1]}`;
  } else {
    url += `&q=${action.params.cityName}`;
  }
  try {
    const response = yield call(apiGet, url);
    yield put({ type: GET_WEATHER_SUCCESS, data: response });
  } catch (err) {
    yield put({
      type: GET_WEATHER_FAILURE,
      dataError: err,
    });
  }
}

export default function* homePageSaga() {
  yield takeLatest(GET_WEATHER, getData);
}
