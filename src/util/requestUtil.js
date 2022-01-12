
const request = require('request');

module.exports = function(options) {
  return new Promise((resolve, reject)=>{
    request(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve({res, body});
      }
    });
  });
};

