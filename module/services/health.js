info = require('./../../package.json');

module.exports = Health;

function Health() {
}

Health.prototype.health = function () {
  return {
    name: info.name,
    version: info.version
  };
};
