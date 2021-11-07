const request = require('request-promise-native');


const fetchMyIP =  () => {
   return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (body) => {

  const ipObj = JSON.parse(body);
  const ip = ipObj.ip

  return request(`https://freegeoip.app/json/${ip}`)

}

const fetchISSFlyOverTimes = (body) => {

  const {latitude, longitude} = JSON.parse(body);

  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP ()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    })
}

module.exports = {nextISSTimesForMyLocation};