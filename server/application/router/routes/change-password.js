var connection = require('../../../configuration/database/connection');
var encrypt = require('../../encrypt');
var _ = require('lodash');

module.exports = function (req, res, next) {
    var validate = function(user) {
        var noError = true;
        if(user.password.length < 8 || user.repeatedPassword.length < 8) {
            noError = false;
        }
        if(user.password != user.repeatedPassword) {
            noError = false;
        }
        if(_.isNil(user.id)) {
            noError = false;
        }
        return noError;
    };

    var quering = function(user) {
        var query = 'update users set users.password = ? where users.id = ?' ;
        connection.query(query, [user.password, user.id] , function(err) {
            if(err) {
                if(err.code == "ER_DUP_ENTRY") {
                    next({
                        data: "data already exists"
                    });
                }else {
                    next(true);
                }
                return;
            }
            res.status(200).json(null);
        })
    };
    if(!_.isEmpty(req.body) && validate(req.body) ) {
        quering(req.body);
    }else {
        return next({
            status : 402,
            data : "Ups, problems with data!"
        });
    }
};
