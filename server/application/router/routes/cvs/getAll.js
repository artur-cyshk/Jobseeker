var connection = require('../../../../configuration/database/connection');
var async = require('async');
module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
                const query = 'select * from cvs where userId = ?';
                connection.query(query, [req.user.id], function(err, result) {
                    callback(err, result);
                });             
            },
        ],
        (err, result) => {
            if(err) {
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while getting cvs'
                })
            }
            res.status(200).send(result);
        } 
    );
}   