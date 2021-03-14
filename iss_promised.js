const request = require('request-promise-native');
// const { printPassTimes } = require('./index');


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};


const fetchMyIP = () => {
return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  // confused
  // const { latitude, longitude } = coords;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}





module.exports = { nextISSTimesForMyLocation };