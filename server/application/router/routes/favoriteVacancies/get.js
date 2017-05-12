var connection = require('../../../../configuration/database/connection');

function deleteFields(obj, fields){
    fields.forEach((item) => {
        delete obj[item];
    })
}

module.exports = function(req, res, next) {
    const query = `select favoritevacancies.id, favoritevacancies.userId, vacancies.id as vacancyId, vacancies.name, vacancies.description, vacancies.descriptionHtml, vacancies.salary, vacancies.lastChangedDate, vacancies.neededExperienceYears, 
    companies.id as companyId, companies.name as companyName, cities.name as cityName, cities.id as cityId, countries.name as countryName, countries.id as countryId
    from favoritevacancies
    left join vacancies ON ( favoritevacancies.vacancyId = vacancies.id )
    left join companies ON ( vacancies.companyId = companies.id )
    left join cities ON ( vacancies.cityId = cities.id )
    left join countries ON ( cities.countryId = countries.id )
    where favoritevacancies.userId = ?`;
    connection.query(query, [req.user.id], (error, favoritevacancies) => {
        console.log(error);
        if(error) {
            return next(true);
        }
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
        res.status(200).json(favoritevacancies);
    });
};