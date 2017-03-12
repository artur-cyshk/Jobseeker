var connection = require('../../../configuration/database/connection');
var encrypt = require('../../encrypt');
module.exports = function (req, res, next) {
    var query = 'select user_id, type from users where name = "' + req.body.name +
                '" and password = "' + encrypt(req.body.password) + '" limit 1';
    connection.query(query, function(err, data) {
        if(err) {
            return next(true);
        }
        if(data[0]) {
            req.session.authorized = true;
            req.session.userId = data[0].user_id;
            req.session.currUserRole = data[0].type;
            res.status(200).end();
        }else {
            return next({
                data: "not correct user data"
            });
        }

    });

};