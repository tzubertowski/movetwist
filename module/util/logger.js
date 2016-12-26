var Logger = require('bunyan');
log = new Logger({
  name: 'MoveTwist',
  streams: [
  {
    stream: process.stdout,
    level: 'debug'
  }
  ],
});
Logger = function () { };

Logger.prototype = {
getSystemLogger: function () {
  return log;
 }
};

module.exports = Logger;
