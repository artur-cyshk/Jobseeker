var connection = require('../../../../configuration/database/connection');
module.exports = function(req, res, next) {
    const query = 'update vacancies set ? where id = ?';
    connection.query(query, [req.body, req.body.id], (err, result) => {
        if(err) {
            return next({
                status : 500,
                data : 'There was an error while updating vacancy'
            })
        }
        res.status(200).end();
    });
};