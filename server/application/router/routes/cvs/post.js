var connection = require('../../../../configuration/database/connection');
module.exports = function(req, res, next) {
    const query = 'insert into cvs set ?';
    connection.query(query, {name : req.body.name, userId : req.user.id}, (err, result) => {
        if(err) {
            return next({
                status : 500,
                data : 'There was an error while adding cv'
            })
        }
        res.status(200).json({
            id : result.insertId,
            name : req.body.name
        });
    });
};