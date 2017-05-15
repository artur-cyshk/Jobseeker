var connection = require('../../../../configuration/database/connection');
var async = require('async');
module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
                const query = 'select * from vacancies where id = ?';
                connection.query(query, [req.params.id], function(err, result) {
                    callback(err, result[0]);
                });             
            },
            (vacancy, callback) => {
                console.log(vacancy);
                const query = `select vacanciesSkills.skillId, skills.name from vacanciesSkills left join skills on (vacanciesSkills.skillId = skills.id) where  vacanciesSkills.vacancyId = ?`;
                connection.query(query, [req.params.id], (error, skills) => {
                    if(skills){
                        vacancy.skills = skills;
                    }
                    callback(error, vacancy);
                })

            },
            (vacancy, callback) => {
                const query = `select vacanciesAdditionalSkills.skillId, skills.name from vacanciesAdditionalSkills left join skills on (vacanciesAdditionalSkills.skillId = skills.id) where  vacanciesAdditionalSkills.vacancyId = ?`;
                connection.query(query, [req.params.id], (error, additionalSkills) => {
                    if(additionalSkills){
                        vacancy.additionalSkills = additionalSkills;
                    }
                    callback(error, vacancy);
                })
            },
            (vacancy, callback) => {
                const query = `select vacanciesLanguages.languageId, languages.name from vacanciesLanguages left join languages on (vacanciesLanguages.languageId = languages.id) where  vacanciesLanguages.vacancyId = ?`;
                connection.query(query, [req.params.id], (error, languages) => {
                   if(languages) {
                        vacancy.languages = languages;
                   }
                   callback(error, vacancy);
                })
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