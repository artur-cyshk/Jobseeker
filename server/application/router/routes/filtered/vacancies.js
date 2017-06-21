var connection = require('../../../../configuration/database/connection');
var async = require('async');
module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
                let whereArr = [];
                let where = ' ';
                let join = ' ';
                let fields = ' ';
                if(req.body.searchName) {
                    whereArr.push('vacancies.name LIKE "%' + req.body.searchName + '%" ');
                }
                if(req.body.salary) {
                    whereArr.push('vacancies.salary < ' + req.body.salary + ' ');
                }
                if(req.body.additionalSkills instanceof Array && req.body.additionalSkills.length > 0) {
                    fields += ', vacanciesAdditionalSkills.skillId as skillId';
                    let additionalSkills = req.body.additionalSkills.map((skill) => skill.id);
                    whereArr.push('vacanciesAdditionalSkills.skillId in (' + additionalSkills.join(',') + ')');
                    join += 'join vacanciesAdditionalSkills on (vacancies.id = vacanciesAdditionalSkills.vacancyId)';
                }
                if(req.body.experience) {
                    whereArr.push('vacancies.neededExperienceYears <= ' + req.body.experience + ' ');
                }
                if(whereArr.length > 0) {
                    where = 'where ' + whereArr.join(' and ');
                }
                const query = `select vacancies.*, companies.name as companyName ${fields}
                from vacancies join companies on (vacancies.companyId = companies.id) ${join} ${where}`;
                connection.query(query, function(err, vacancies) {
                    callback(err, vacancies);
                });
            },
            (vacancies, callback) => {
                if(req.body.skills instanceof Array && req.body.skills.length > 0) {
                    let skills = req.body.skills.map((skill) => skill.id);
                    let newVacancies;
                    const query = `select vacancyId, count(vacancyId) as countVacancyId from vacanciesSkills where skillId in (${skills.join(',')})
                    group by vacancyId having countVacancyId=${skills.length}`;
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
                if(req.body.languages instanceof Array && req.body.skills.languages > 0) {
                    let languages = req.body.languages.map((language) => language.id);
                    let newVacancies;
                    const query = `select vacancyId from vacanciesLanguages where languageId in (${languages.join(',')})
                    group by vacancyId`;
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
              let ids = vacancies.map(item => item.id);
              if(!ids.length) {
                callback(null, []);
              }
              const query = `select * from favoriteVacancies where vacancyId in (${ids.join()}) and userId=${req.user.id}`;
              console.log(query);
              connection.query(query, (err, favoriteVacancies) => {
                callback(null, vacancies.map(item => {
                item.isFavorited = !!favoriteVacancies.filter(fav => fav.vacancyId === item.id).length;
              return item;
            }));
            } )
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
