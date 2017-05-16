var connection = require('../../../../configuration/database/connection');
var async = require('async');
module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
                const query = 'select * from cvs where id = ?';
                connection.query(query, [req.params.id], function(err, result) {
                    callback(err, result[0]);
                });             
            },
            (cv, callback) => {
                const query = `select cvsSkills.skillId as id, skills.name from cvsSkills left join skills on (cvsSkills.skillId = skills.id) where  cvsSkills.cvId = ?`;
                connection.query(query, [req.params.id], (error, skills) => {
                    if(skills){
                        cv.skills = skills;
                    }
                    callback(error, cv);
                })

            },
            (cv, callback) => {
                const query = `select cvsAdditionalSkills.skillId as id, skills.name from cvsAdditionalSkills left join skills on (cvsAdditionalSkills.skillId = skills.id) where  cvsAdditionalSkills.cvId = ?`;
                connection.query(query, [req.params.id], (error, additionalSkills) => {
                    if(additionalSkills){
                        cv.additionalSkills = additionalSkills;
                    }
                    callback(error, cv);
                })
            },
            (cv, callback) => {
                const query = `select cvsLanguages.languageId as id, languages.name from cvsLanguages left join languages on (cvsLanguages.languageId = languages.id) where  cvsLanguages.cvId = ?`;
                connection.query(query, [req.params.id], (error, languages) => {
                   if(languages) {
                        cv.languages = languages;
                   }
                   callback(error, cv);
                })
            }
        ],
        (err, result) => {
            if(err) {
                console.log(err);
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while getting cv'
                })
            }
            res.status(200).send(result);
        } 
    );
}   