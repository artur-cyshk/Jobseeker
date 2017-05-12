var connection = require('../../../../configuration/database/connection');
async = require('async');
module.exports = function(req, res, next) {
    if(!req.body || !req.body.name) {
        return next(true);
    }
    async.waterfall(
        [
            (callback) => {
                const query = 'insert into companies set ?';
                connection.query(query, {name: req.body.name}, (err, result) => {
                    callback((err && err.code == "ER_DUP_ENTRY") ? "Company already exists" : err, {
                        name : req.body.name,
                        id : (result) ? result.insertId : null
                    });
                });                
            },
            (company, callback) => {
                const query = 'insert into employers set ?';
                connection.query(query, {userId : req.user.id, companyId : company.id}, (err, result) =>{
                    callback(err, company);
                })
            }
        ], 
        (err, result) => {
            if(err) {
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while creating company'
                })
            }
            res.status(200).send(result);
        })
};