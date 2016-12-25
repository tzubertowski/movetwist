info = require('./../../package.json');

module.exports = Health;

function Health(service) {
  this.service = service;
}

var Service = require('./../services/health');
di.annotate(Health, new di.Inject(Service));

Health.prototype.health = function (req, res, next) {
  res.send(this.service.getInfo());
  next();
};
