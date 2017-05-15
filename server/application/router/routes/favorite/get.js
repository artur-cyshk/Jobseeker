var connection = require('../../../../configuration/database/connection');
var async = require('async');

function deleteFields(obj, fields){
    fields.forEach((item) => {
        delete obj[item];
    })
}

module.exports = function(req, res, next) {
    async.waterfall(
        [
            (callback) => {
                const query = `select favoritevacancies.id, favoritevacancies.userId, vacancies.id as vacancyId,
                vacancies.name, vacancies.description, vacancies.descriptionHtml, vacancies.salary,
                vacancies.lastChangedDate, vacancies.neededExperienceYears, companies.id as companyId,
                companies.name as companyName, cities.name as cityName, cities.id as cityId, countries.name as countryName, countries.id as countryId
                from favoritevacancies
                left join vacancies ON ( favoritevacancies.vacancyId = vacancies.id )
                left join companies ON ( vacancies.companyId = companies.id )
                left join cities ON ( vacancies.cityId = cities.id )
                left join countries ON ( cities.countryId = countries.id )
                where favoritevacancies.userId = ?`;
                connection.query(query, [req.user.id], (error, favoritevacancies) => {
                    for(let i = 0; i < favoritevacancies.length; i++) {  
                        favoritevacancies[i].company = {
                            id : favoritevacancies[i].companyId,
                            name : favoritevacancies[i].companyName
                        }
                        favoritevacancies[i].city = {
                            id : favoritevacancies[i].cityId,
                            name : favoritevacancies[i].cityName
                        }
                        favoritevacancies[i].country = {
                            id : favoritevacancies[i].countryId,
                            name : favoritevacancies[i].countryName
                        }
                        deleteFields(favoritevacancies[i], ['cityId', 'cityName', 'countryId', 'countryName', 'companyId', 'companyName']);
                    }
                    let favorite = {
                        vacancies: favoritevacancies
                    }
                    callback(error, favorite);
                });
            },
            (favorite, callback) => {
                const query = `select favoritecvs.id, favoritecvs.userId, cvs.id as cvId,
                cvs.name, cvs.description, cvs.lastChangedDate, cvs.wantedSalary,
                cvs.careerStartDate, personalinformation.firstName as userFirstName, personalinformation.lastName as userLastName
                from favoritecvs
                left join cvs ON ( favoritecvs.cvId = cvs.id )
                left join personalinformation ON ( cvs.userId = personalinformation.userId )
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