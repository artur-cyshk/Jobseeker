var connection = require('../../../../configuration/database/connection');
const async = require('async');
module.exports = function(req, res, next) {

    async.waterfall(
        [
            (callback) => {
                const query = 'update vacancies set ? where id = ?';
                connection.query(query, [{
                    description : req.body.description,
                    salary : req.body.salary,
                    lastChangedDate : new Date(Date.now()).toISOString().substring(0, 19).replace('T', ' '),
                    neededExperienceYears : req.body.neededExperienceYears,
                    ready : req.body.ready
                }, req.body.id], (err, result) => {
                    callback(err);
                });
            },
            (callback) => {
                var query = 'DELETE from vacanciesLanguages where vacancyId = ? ';
                connection.query(query, [req.body.id], (err) => callback(err) );
            },
            (callback) => {
                var query = "INSERT INTO vacanciesLanguages (languageId, vacancyId) VALUES ?";
                connection.query(query, [ req.body.languages.map( (language) => [language.id, req.body.id] ) ], (err) => callback(err) );
            },
            (callback) => {
                var query = 'DELETE from vacanciesSkills where vacancyId = ? ';
                connection.query(query, [req.body.id], (err) => callback(err) );
            },
            (callback) => {
                var query = "INSERT INTO vacanciesSkills (skillId, vacancyId) VALUES ?";
                connection.query(query, [ req.body.skills.map( (skill) => [skill.id, req.body.id] ) ], (err) => callback(err) );
            },
            (callback) => {
                var query = 'DELETE from vacanciesAdditionalSkills where vacancyId = ? ';
                connection.query(query, [req.body.id], (err) => callback(err) );
            },
            (callback) => {
                var query = "INSERT INTO vacanciesAdditionalSkills (skillId, vacancyId) VALUES ?";
                connection.query(query, [ req.body.additionalSkills.map( (skill) => [skill.id, req.body.id] ) ], (err) => callback(err) );
            },            
        ],
        (err, result) => {
            console.log(err);
            if(err) {
                return next(true);
            }
            res.status(200).end();
        });
};