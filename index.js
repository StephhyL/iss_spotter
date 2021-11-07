// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

const {nextISSTimesForMyLocation} = require('./iss')


const printPassTimes = (passes) => {
  for (const pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}


nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
}); 




// let a = "";

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// })


// fetchCoordsByIP('142.126.182.191', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);

//   } else {


//     console.log("It worked! Returned coordinates: ", data);
//   }
// });

// fetchISSFlyOverTimes({ latitude: 43.6911, longitude: -79.3353 }, (error, data) =>{
//   if (error) {
//     console.log("It didn't work!", error);

//   } else {


//     console.log("It worked! Returned coordinates: ", data);
//   }
// });
