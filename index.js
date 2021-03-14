const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((err, passes) => {
  if (err) {
    return console.log('noooo', err);
  }

  console.log('success', passes);

  printPassTimes(passes);
})

module.exports = { printPassTimes };