var connection = require('../../../configuration/database/connection');
module.exports = function (req, res, next) {
    var query = 'select * from users';
    connection.query(query, function(err, data) {
    	console.log(data);
        if(err) {
            return next(true);
        }
         res.status(200).send(data);
    });

};