var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var cfg = require("./jwtConfig.js");  
var _ = require('lodash');
var connection = require('../database/connection');
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {  
    var strategy = new Strategy(params, function(payload, done) {
        connection.query('Select id, name, password from users where id = ? limit 1',[payload.id], (err, users) => {
            if (!_.isEmpty(users)) {
                console.log(users[0]);
                return done(null, {
                    id: users[0].id
                });
            } else {
                return done(new Error("User not found"), null);
            }            
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};