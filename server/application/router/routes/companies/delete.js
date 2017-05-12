var connection = require('../../../../configuration/database/connection');
module.exports = function(req, res, next) {
    const query = 'delete from jobseeker.companies where id = ?';
    console.log(req.params.id);
    connection.query(query, [req.params.id], (err,result) => {
        if(err) {
            return next({
                status : 500,
                data : 'There was an error while deleteing company'
            })
        }
        res.status(200).end();
    });
};