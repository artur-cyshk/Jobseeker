var connection = require('../../../../configuration/database/connection');
module.exports = function(req, res, next) {
    const query = 'insert into vacancies set ?';
    connection.query(query, {companyId : req.body.companyId, name : req.body.name}, (err, result) => {
        if(err) {
            return next({
                status : 500,
                data : 'There was an error while adding vacancy'
            })
        }
        res.status(200).json({
            id : result.insertId,
            name : req.body.name
        });
    });
};