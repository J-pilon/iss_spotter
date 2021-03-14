const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
}).catch((error) => {
  console.log('it didnt work: ', error.message);
});
