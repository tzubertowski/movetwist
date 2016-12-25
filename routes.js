module.exports = function(server) {
  server.get('health', function health(req, res, next) {
    Resource = require('./module/controller/health');
    resource.health(req, res, next);
  });
}
