var connection = require('../../../../../configuration/database/connection');

module.exports = function(req, res, next) {
    const query = 'insert into favoritecvs set ?';
    connection.query(query, {userId: req.body.userId, cvId: req.body.cvId}, (err, result) => {
        if(err) {
            return next({
                status : 500,
                data : (typeof err == "string") ? err : 'There was an error while adding favorite cv'
            })
        }
        res.status(200).send(result);
    });
};