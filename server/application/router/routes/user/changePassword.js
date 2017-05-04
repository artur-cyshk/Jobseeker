var connection = require('../../../../configuration/database/connection');
var encrypt = require('../../../encrypt');
var _ = require('lodash');
var async = require('async');

module.exports = function (req, res, next) {
    var validate = function(user) {
        var noError = true;
        if(user.newPassword.length < 8 || user.oldPassword.length < 8) {
            noError = false;
        }
        return noError;
    };

    var quering = function(user) {

        async.waterfall(
            [
                (callback) => {
                    var query = `select id from users where ?` ;
                    connection.query(query, [ { password : encrypt(user.oldPassword) } ] , function(err, data) {
                        if(data && data.length === 0) {
                            err = "There are no users with such password";
                        }
                        callback(err)
                    })
                },
                (callback) => {
                    var query = `update users set ? where ?` ;
                    connection.query(query, [{ password : encrypt(user.newPassword) }, {id : req.user.id }] , function(err) {
                        callback(err);
                    })
                }
            ], 
            (err, result) => {
                if(err) {
                    return next( {
                        data : typeof err == 'string' ? err : true
                    } );
                }
                res.status(200).end();
            } 
        )
    };

    if(!_.isEmpty(req.body) && validate(req.body) ) {
        quering(req.body);
    } else {
        return next({
            status : 402,
            data : "Ups, problems with data!"
        });
    }
};
