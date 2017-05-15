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
                    const query = `select vacancies.id, vacancies.name, vacancies.description, vacancies.salary, vacancies.lastChangedDate, vacancies.companyId, vacancies.neededExperienceYears, vacancies.cityId, cities.name as cityName, countries.id as countryId, countries.name as countryName
                     from vacancies
                     left join cities on (vacancies.cityId = cities.id)
                     left join countries on (cities.countryId = countries.id)
                     where vacancies.companyId IN (${companiesQuery})`;
                     connection.query(query, (error, vacancies) => {
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