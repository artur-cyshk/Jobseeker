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
                    where += 'cvs.wantedSalary < ' + req.query.salary + ' ';
                }
                if(req.query.additionalSkills instanceof Array) {
                    fields += ', cvsAdditionalSkills.skillId as skillId';
                    where += 'and cvsAdditionalSkills.skillId in (' + req.query.additionalSkills.join(',') + ')';
                    join += 'join cvsAdditionalSkills on (cvs.id = cvsAdditionalSkills.cvId)';
                }
                const query = `select cvs.*, personalInformation.firstName as firstName, personalInformation.lastName as lastName ${fields}
                from cvs join personalInformation on (cvs.userId = personalInformation.userId) ${join} ${where}`;
                connection.query(query, function(err, cvs) {
                    callback(err, cvs);
                });
            },
            (cvs, callback) => {
                if(req.query.skills instanceof Array) {
                    let newCvs;
                    const query = `select cvId, count(cvId) as countCvId from cvsSkills where skillId in (${req.query.skills.join(',')})
                    group by cvId having countCvId=${req.query.skills.length}`;
                    connection.query(query, function(err, cvIds) {
                        cvIds = cvIds.map((cvId) => cvId.cvId);
                        newCvs = cvs.filter( (cv) => cvIds.indexOf(cv.id) > -1);
                        callback(err, newCvs);
                    });
                } else {
                    callback(null, cvs);
                }
            },
            (cvs, callback) => {
                if(req.query.languages instanceof Array) {
                    let newCvs;
                    const query = `select cvId from cvsLanguages where languageId in (${req.query.languages.join(',')})
                    group by cvId`;
                    connection.query(query, function(err, cvIds) {
                        cvIds = cvIds.map((cvId) => cvId.cvId);
                        newCvs = cvs.filter( (cv) => cvIds.indexOf(cv.id) > -1);
                        callback(err, newCvs);
                    });
                } else {
                    callback(null, cvs);
                }
            }
        ],
        (err, result) => {
            if(err) {
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while getting filtered cvs'
                })
            }
            res.status(200).send(result);
        } 
    );
}