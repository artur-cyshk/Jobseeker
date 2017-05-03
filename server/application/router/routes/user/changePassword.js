var connection = require('../../../../configuration/database/connection');
var encrypt = require('../../../encrypt');
var _ = require('lodash');

module.exports = function (req, res, next) {
    console.log(6);
    console.log(req.body);
    var validate = function(user) {
        var noError = true;
        if(user.newPassword.length < 8 || user.oldPassword.length < 8) {
            noError = false;
        }
        if(_.isNil(user.user.id)) {
            noError = false;
        }
        console.log(noError);
        return noError;
    };

    var quering = function(user) {
        console.log(user);
        var query = 'update users set users.password = ? where users.id = ? and users.password = ?' ;
        connection.query(query, [encrypt(user.newPassword), user.user.id, encrypt(user.oldPassword)] , function(err) {
            console.log(err);
            if(err) {
                if(err.code == "ER_DUP_ENTRY") {
                    next({
                        data: "Data already exists"
                    });
                }else {
                    next(true);
                }
                return;
            }
            res.status(200).end();
        })
    };
    console.log(3);
    if(!_.isEmpty(req.body) && validate(req.body) ) {
        console.log(1);
        quering(req.body);
    } else {
        console.log(2);
        return next({
            status : 402,
            data : "Ups, problems with data!"
        });
    }
};
