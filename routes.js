function route (server) {
  server.get('health', function health(req, res, next) {
    const resource = require('./module/controller/health');
    resource.health(req, res, next);
  });
}

module.exports = route;
