import { MAPS_API_KEY } from '@env';

export const getDistance = async (orig, dest) => {
  const calcCoord = async (address) => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${address}&api_key=${MAPS_API_KEY}`
      );
      const jsonData = await response.json();
      const { lat, lon } = jsonData[0];
      return { lat, lon };
    } catch (err) {
      console.log(err);
    }
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const { lat: lat1, lon: lon1 } = await calcCoord(orig);
  const { lat: lat2, lon: lon2 } = await calcCoord(dest);

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2) *
    Math.cos(radLat1) *
    Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Number(R * c).toFixed(1);

  return distance;
};

//Example:

/*const originAddress = "48.221422, 22.079839";
const destAddress = "4600+kisvarda+kakasto+utca+47";

getDistance(originAddress, destAddress);*/
