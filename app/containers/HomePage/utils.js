import { SUNNY, PARTLY_CLOUDY, CLOUD, RAIN, STORM } from './constants';

export default function getIconObject(num) {
  const arr = num.toString().split('');
  const myArray = arr.map(x => parseInt(x, 10));
  if (myArray[0] === 2) {
    return STORM;
  }
  if (myArray[0] === 2 || myArray[0] === 5 || myArray[0] === 6) {
    return RAIN;
  }
  if (myArray[0] === 7) {
    return CLOUD;
  }
  if (myArray[0] === 8 && myArray[2] === 0) {
    return SUNNY;
  }
  if (myArray[0] === 8 && myArray[2] !== 0) {
    return PARTLY_CLOUDY;
  }
  return '';
}
