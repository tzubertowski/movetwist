const Health = {};
Health.health = function (req, res, next) {
  res.send({
    'status' : 'ok'
  });
  next();
};

module.exports = Health;
