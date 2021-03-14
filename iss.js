const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

 const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }
    // console.log('this is the ip: ', ip);

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }
      // console.log('this is the coors: ', coords);
      fetchISSFlyOverTimes(coords, (err, nextPassTimes) => {
        if (err) {
          return callback(err, null);
        }
        // console.log('this is testing: ', nextPassTimes);
        callback(null, nextPassTimes);
      })
    })
  })
 };


  const fetchMyIP = function(callback) { 
    // use request to fetch IP address from JSON API

    request('https://api.ipify.org?format=json', function(error, response, body) {
    
      if(error) {
        return callback(error, null);
        
      }
      
      if (response.statusCode !== 200) {
        callback(Error(`Status code ${response.statusCode} when fetching IP. Response ${body}`), null);
        return;
      }

      const ip = JSON.parse(body).ip
      callback(null, ip);

    })
  };

  const fetchCoordsByIP = function(ip, callback) {

    request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    // error can be set if invalid domain, user is offline, etc.
      if(error) {
        callback(error, null);
        return;
      }

      if(response.statusCode !== 200) {
        callback(Error(`Status code ${response.statusCode} when fetching coordinates for IP: ${body}`), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body);

      // const geoLocation = {};
      // geoLocation.latitude = JSON.parse(body).latitude;
      // geoLocation.longitude = JSON.parse(body).longitude;
      
      callback(null, { latitude, longitude });
    })
  };

  const fetchISSFlyOverTimes = function(coords, callback){
    request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        callback(Error(`Status code ${response.statusCode} when fetching current location of ISS. Response ${body}`), null);
        return;
      }

      const passes = JSON.parse(body).response;
      callback(null, passes);
    }

    );
  }

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };