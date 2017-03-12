var connection = require('../../../configuration/database/connection');
var encrypt = require('../../encrypt');
var _ = require('lodash');
module.exports = function (req, res, next) {
    var validate = function(user) {
        var noError = true;
        if(!user.name || user.name.length < 4) {
            noError = false;
        }
        if(user.password.length < 8 || user.repeatedPassword.length < 8) {
            noError = false;
        }
        if(user.password != user.repeatedPassword) {
            noError = false;
        }
        return noError;
    };

    var quering = function(user) {
        var query = 'insert into users (type, name, password, honor) values ("user", "' +
            user.name + '" , "'+ encrypt(user.password) +'",0)';
        connection.query(query, function(err) {
            if(err) {
                if(err.code == "ER_DUP_ENTRY") {
                    next({
                        data: "username already exists"
                    });
                }else {
                    next(true);
                }
                return;
            }
            res.status(200).end();
        })
    };

    if(!_.isEmpty(req.body) && validate(req.body) ) {
        quering(req.body);
    }else {
        return next({
            data : "not correct data"
        });
    }
};