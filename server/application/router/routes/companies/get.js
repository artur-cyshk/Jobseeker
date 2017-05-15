var connection = require('../../../../configuration/database/connection');
var async = require('async');
module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
			    const query = 'select * from companies join employers on (companies.id = employers.companyId) where userId = ?';
			    connection.query(query, [req.user.id], function(err, result) {
			        callback(err, result);
			    });         	
            },
            (companies, callback) => {
            	let companiesQuery = companies.map( (company) => company.id );
                if(companiesQuery.length) {
                    const query = `select *
                     from vacancies
                     where vacancies.companyId IN (${companiesQuery})`;
                     console.log(query);
                     connection.query(query, (error, vacancies) => {
                        console.log(vacancies);
                        callback(error, companies, vacancies);
                     })                    
                 }else{
                    callback(null, [], companies);
                 }

            },
            (companies, vacancies, callback) => {
                companies = companies.map((company) => {
                    company.vacancies = vacancies.filter((vacancy) => company.id === vacancy.companyId);
                    return company;
                })      
            	callback(null, companies);
            }           

        ],
        (err, result) => {
            if(err) {
                console.log(err);
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while getting company'
                })
            }
            res.status(200).send(result);
        } 
    );
}	