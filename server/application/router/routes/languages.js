var connection = require('../../../configuration/database/connection');

module.exports = function(req, res, next) {
    const query = 'select * from languages';
    connection.query(query, function(err, result) {
        if(err) {
            return next({
                status : 500,
                data : 'Server error'
            })
        }
        res.status(200).json(result);
    });
}