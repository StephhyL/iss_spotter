/* make a single API request to retrive the use's IP adress:
input:
- a callback (to pass back an error or the IP string
Returns (via callback):
- an error if any (nullable)
- The IP address as a string (null if error)  ex. '165.234.134.322"
*/

const request = require('request');

const fetchMyIP = (callback) => {
  const url = "https://api.ipify.org?format=json";

  request(url, (error, response, body) => {

    // error can be set if invalid domain, user is offline, etc...
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const ipAddress = data.ip;
    // console.log(data, typeof data, ipAddress, typeof ipAddress)
    return callback(null, ipAddress);
  });

};


const fetchCoordsByIP = (ip, callback) => {


  const url = `https://freegeoip.app/json/${ip}`;

  request(url, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    // console.log(body);
    const obj = JSON.parse(body);
    const latitude = obj.latitude;
    const longitude = obj.longitude;
    const data = { latitude, longitude };
    return callback(null, data);

  });

};


const fetchISSFlyOverTimes = (coords, callback) => {

  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    // console.log(body);
    const passes = JSON.parse(body).response;
    // const latitude = obj.latitude;
    // const longitude = obj.longitude;
    // const data = { latitude, longitude };
    return callback(null, passes);

  });





};





module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };