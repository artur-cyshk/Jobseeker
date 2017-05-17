var connection = require('../../../../configuration/database/connection');
var async = require('async');
module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
                let where = ' ';
                let join = ' ';
                let fields = ' ';
                if(req.query.salary || req.query.additionalSkills) {
                    where += 'where '
                }
                if(req.query.salary) {
                    where += 'vacancies.salary < ' + req.query.salary + ' ';
                }
                if(req.query.additionalSkills instanceof Array) {
                    fields += ', vacanciesAdditionalSkills.skillId as skillId';
                    where += 'and vacanciesAdditionalSkills.skillId in (' + req.query.additionalSkills.join(',') + ')';
                    join += 'join vacanciesAdditionalSkills on (vacancies.id = vacanciesAdditionalSkills.vacancyId)';
                }
                const query = `select vacancies.*, companies.name as companyName ${fields}
                from vacancies join companies on (vacancies.companyId = companies.id) ${join} ${where}`;
                connection.query(query, function(err, vacancies) {
                    callback(err, vacancies);
                });
            },
            (vacancies, callback) => {
                if(req.query.skills instanceof Array) {
                    let newVacancies;
                    const query = `select vacancyId, count(vacancyId) as countVacancyId from vacanciesSkills where skillId in (${req.query.skills.join(',')})
                    group by vacancyId having countVacancyId=${req.query.skills.length}`;
                    connection.query(query, function(err, vacancyIds) {
                        vacancyIds = vacancyIds.map((vacancyId) => vacancyId.vacancyId);
                        newVacancies = vacancies.filter( (vacancy) => vacancyIds.indexOf(vacancy.id) > -1);
                        callback(err, newVacancies);
                    });
                } else {
                    callback(null, vacancies);
                }
            },
            (vacancies, callback) => {
                if(req.query.languages instanceof Array) {
                    let newVacancies;
                    const query = `select vacancyId from vacanciesLanguages where languageId in (${req.query.languages.join(',')})
                    group by vacancyId`;
                    connection.query(query, function(err, vacancyIds) {
                        vacancyIds = vacancyIds.map((vacancyId) => vacancyId.vacancyId);
                        newVacancies = vacancies.filter( (vacancy) => vacancyIds.indexOf(vacancy.id) > -1);
                        callback(err, newVacancies);
                    });
                } else {
                    callback(null, vacancies);
                }
            }
        ],
        (err, result) => {
            if(err) {
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while getting filtered vacancies'
                })
            }
            res.status(200).send(result);
        } 
    );
}