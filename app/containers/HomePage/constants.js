/*
 *
 * HomePagePage constants
 *
 */
import sunny from '../../images/sunny.svg';
import partlyCloudy from '../../images/partly_cloudy.svg';
import cloud from '../../images/cloud.svg';
import rain from '../../images/rain.svg';
import storm from '../../images/strom.svg';

export const APPID = '9906938518415ab172cd8e0a5874fb58';

export const SEARCH_BY_COORDS = 'coords';
export const SEARCH_BY_NAME = 'name';
export const UNIT_METRIC = 'metric';
export const UNIT_IMPERIAL = 'imperial';
export const UNIT_VALUE = { [UNIT_METRIC]: 'C', [UNIT_IMPERIAL]: 'F' };
export const PARAMS = {
  searchBy: SEARCH_BY_NAME,
  cityName: '',
  coords: [],
  unit: UNIT_METRIC,
};

export const SUNNY = 'sunny';
export const PARTLY_CLOUDY = 'partlyCloudy';
export const CLOUD = 'cloud';
export const RAIN = 'rain';
export const STORM = 'storm';
export const ICON_OBJECTS = {
  [SUNNY]: { backgroundColor: '#498CEC', url: sunny },
  [PARTLY_CLOUDY]: { backgroundColor: '#619aec', url: partlyCloudy },
  [CLOUD]: { backgroundColor: '#80a7de', url: cloud },
  [RAIN]: { backgroundColor: '#8396b1', url: rain },
  [STORM]: { backgroundColor: '#6a727d', url: storm },
};

export const GET_WEATHER = 'app/HomePage/GET_WEATHER';
export const GET_WEATHER_SUCCESS = 'app/HomePage/GET_WEATHER_SUCCESS';
export const GET_WEATHER_FAILURE = 'app/HomePage/GET_WEATHER_FAILURE';

export const CLOSE_SNACKBAR = 'app/HomePage/CLOSE_SNACKBAR';

export const DEFAULT_DATA = {
  coord: {
    lon: -122.08,
    lat: 37.39,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  base: 'stations',
  main: {
    temp: 282.55,
    feels_like: 281.86,
    temp_min: 280.37,
    temp_max: 284.26,
    pressure: 1023,
    humidity: 100,
  },
  visibility: 16093,
  wind: {
    speed: 1.5,
    deg: 350,
  },
  clouds: {
    all: 1,
  },
  dt: 1560350645,
  sys: {
    type: 1,
    id: 5122,
    message: 0.0139,
    country: 'US',
    sunrise: 1560343627,
    sunset: 1560396563,
  },
  timezone: -25200,
  id: 420006353,
  name: 'Mountain View',
  cod: 200,
};
