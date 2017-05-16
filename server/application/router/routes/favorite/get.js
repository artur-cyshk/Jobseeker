var connection = require('../../../../configuration/database/connection');
var async = require('async');

module.exports = function(req, res, next) {
    async.waterfall(
        [
            (callback) => {
                const query = `select favoritevacancies.id, favoritevacancies.userId, favoritevacancies.vacancyId, vacancies.name
                from favoritevacancies
                left join vacancies ON ( favoritevacancies.vacancyId = vacancies.id )
                where favoritevacancies.userId = ?`;
                connection.query(query, [req.user.id], (error, favoritevacancies) => {
                    let favorite = {
                        vacancies: favoritevacancies
                    }
                    callback(error, favorite);
                });
            },
            (favorite, callback) => {
                const query = `select favoritecvs.id, favoritecvs.userId, favoritecvs.cvId, cvs.name
                from favoritecvs
                left join cvs ON ( favoritecvs.cvId = cvs.id )
                where favoritecvs.userId = ?`;
                connection.query(query, [req.user.id], (error, favoritecvs) => {
                    favorite.cvs = favoritecvs;
                    callback(error, favorite);
                });
            }
        ],
        (error, favorite) => {
            if(error) {
                return next(true);
            }
            res.status(200).json(favorite);
        }
        );
};