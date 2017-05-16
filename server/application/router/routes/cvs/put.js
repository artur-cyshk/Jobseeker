var connection = require('../../../../configuration/database/connection');
const async = require('async');
module.exports = function(req, res, next) {

    async.waterfall(
        [
            (callback) => {
                const query = 'update vacancies set ? where id = ?';
                connection.query(query, [{
                    description : req.body.description,
                    wantedSalary : req.body.wantedSalary,
                    lastChangedDate : new Date(Date.now()).toISOString().substring(0, 19).replace('T', ' '),
                    careerStartDate :  new Date(req.body.careerStartDate).toISOString().substring(0, 19).replace('T', ' '),
                    ready : req.body.ready
                }, req.body.id], (err, result) => {
                    callback(err);
                });
            },
            (callback) => {
                var query = 'DELETE from cvsLanguages where cvId = ? ';
                connection.query(query, [req.body.id], (err) => callback(err) );
            },
            (callback) => {
                var query = "INSERT INTO cvsLanguages (languageId, cvId) VALUES ?";
                connection.query(query, [ req.body.languages.map( (language) => [language.id, req.body.id] ) ], (err) => callback(err) );
            },
            (callback) => {
                var query = 'DELETE from cvsSkills where cvId = ? ';
                connection.query(query, [req.body.id], (err) => callback(err) );
            },
            (callback) => {
                var query = "INSERT INTO cvsSkills (skillId, cvId) VALUES ?";
                connection.query(query, [ req.body.skills.map( (skill) => [skill.id, req.body.id] ) ], (err) => callback(err) );
            },
            (callback) => {
                var query = 'DELETE from cvsAdditionalSkills where cvId = ? ';
                connection.query(query, [req.body.id], (err) => callback(err) );
            },
            (callback) => {
                var query = "INSERT INTO cvsAdditionalSkills (skillId, cvId) VALUES ?";
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