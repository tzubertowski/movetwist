const user = require('./../model/user');

let AuthenticationService = {};

AuthenticationService.statics.authenticateByCredentials = function(username, password, cb) {
    user.findOne({ username: username }, function(err, user) {
        if (err) return cb(err);
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        if (user.isLocked) {
            return user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err);
            if (isMatch) {
                if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
                var updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }

            user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });
    });
};

module.exports = AuthenticationService;
