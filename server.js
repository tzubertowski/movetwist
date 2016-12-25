var restify = require('restify');
var port = process.env.PORT || 8080,
    restify = require('restify');
    Logger = require('./module/utils/logger');
    logger = new Logger();
var server = restify.createServer({
    name: 'MoveTwist',
    version: '1.0.0',
    log: logger.getSystemLogger()   // Pass our logger to restify.
});
require('./routes')[server];
server.use(restify.gzipResponse());
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.on('uncaughtException', function(req, res, route, err) {
  var auditer = restify.auditLogger({log:log});
  auditer(req, res, route, err);
  res.send(500, "Unexpected error occured");
});
server.on('after', function(req, res, route, err) {
  if (route &&
      (
        route.spec.path === '_health'
      )
    ) {
    return;
  }
  var auditer = restify.auditLogger({log:log});
  auditer(req, res, route, err);
});

server.listen(port, function() {
  log.info('%s listening at <%s>', server.name, server.url);
});
