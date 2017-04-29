var connection = require('../../../configuration/database/connection');
var encrypt = require('../../encrypt');
var jwt = require("jwt-simple");  
var cfg = require("../../../configuration/jwt/jwtConfig.js");  
module.exports = function (req, res, next) {
    if (req.body.name && req.body.password) {
        var query = 'select id, name from users where name = "' + req.body.name +
            '" and password = "' + encrypt(req.body.password) + '" limit 1';
        connection.query(query, (error, users) => {
	        if (users && users[0]) {
	            var payload = {
	                id: users[0].id
	            };
	            var token = jwt.encode(payload, cfg.jwtSecret);
	            res.json({
	                token: token
	            });
	        }else{
	        	return next({status : 401, data : 'Check your username or password'});
	        }
        })
    } else {
        return next({status : 401, data : 'Check your username or password'});
    }
};