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
                    whereArr.push('cvs.name LIKE "%' + req.body.searchName + '%" ');
                }
                if(req.body.salary) {
                    whereArr.push('cvs.wantedSalary < ' + req.body.salary + ' ');
                }
                if(req.body.additionalSkills instanceof Array && req.body.additionalSkills.length > 0) {
                    fields += ', cvsAdditionalSkills.skillId as skillId';
                    let additionalSkills = req.body.additionalSkills.map((skill) => skill.id);
                    whereArr.push('cvsAdditionalSkills.skillId in (' + additionalSkills.join(',') + ')');
                    join += 'join cvsAdditionalSkills on (cvs.id = cvsAdditionalSkills.cvId)';
                }
                if(whereArr.length > 0) {
                    where = 'where ' + whereArr.join(' and ');
                }
                const query = `select cvs.*, personalInformation.firstName as firstName, personalInformation.lastName as lastName ${fields}
                from cvs join personalInformation on (cvs.userId = personalInformation.userId) ${join} ${where}`;
                connection.query(query, function(err, cvs) {
                    callback(err, cvs);
                });
            },
            (cvs, callback) => {
                if(req.body.experience) {
                    let newCvs = cvs.filter((cv) => Math.round((Date.now() - cv.careerStartDate.valueOf()) / 31536000000) >= req.body.experience);
                    callback(null, newCvs);
                } else {
                    callback(null, cvs);
                }
            },
            (cvs, callback) => {
                if(req.body.skills instanceof Array && req.body.skills.length > 0) {
                    let skills = req.body.skills.map((skill) => skill.id);
                    let newCvs;
                    const query = `select cvId, count(cvId) as countCvId from cvsSkills where skillId in (${skills.join(',')})
                    group by cvId having countCvId=${skills.length}`;
                    connection.query(query, function(err, cvIds) {
                        console.log(err);
                        cvIds = cvIds.map((cvId) => cvId.cvId);
                        newCvs = cvs.filter( (cv) => cvIds.indexOf(cv.id) > -1);
                        callback(err, newCvs);
                    });
                } else {
                    callback(null, cvs);
                }
            },
            (cvs, callback) => {
                if(req.body.languages instanceof Array && req.body.skills.languages > 0) {
                    let languages = req.body.languages.map((language) => language.id);
                    let newCvs;
                    const query = `select cvId from cvsLanguages where languageId in (${languages.join(',')})
                    group by cvId`;
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
            let ids = cvs.map(item => item.id);
            if(!ids.length) {
              callback(null, []);
            }
            const query = `select * from favoriteCvs where cvId in (${ids.join()}) and userId=${req.user.id}`;
            console.log(query);
            connection.query(query, (err, favoriteCvs) => {
              callback(null, cvs.map(item => {
                item.isFavorited = !!favoriteCvs.filter(fav => fav.cvId === item.id).length;
                return item;
            }));
            } )
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
