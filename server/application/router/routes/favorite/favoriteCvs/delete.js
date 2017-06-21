var connection = require('../../../../../configuration/database/connection');
module.exports = function(req, res, next) {
    const query = 'delete from favoritecvs where cvId = ?';
    connection.query(query, [req.params.id], (err) => {
        if(err) {
            return next({
                status : 500,
                data : 'There was an error while deleting favorite cv'
            })
        }
        res.status(200).end();
    });
};
