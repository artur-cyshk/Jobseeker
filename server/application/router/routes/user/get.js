var connection = require('../../../../configuration/database/connection');

module.exports = function (req, res, next) {
	const query = `select users.id, users.name, users.role, users.isAdmin, personalInformation.firstName, personalInformation.lastName, personalInformation.patronomic, personalInformation.gender, 
	personalInformation.avatarUrl, UNIX_TIMESTAMP(personalInformation.dob) as dob, personalInformation.email, personalInformation.phone, personalInformation.skype,
	cities.name as cityName, cities.id as cityId, countries.name as countryName, countries.id as countryId
	from users
	left join personalInformation ON ( users.id = personalInformation.userId )
	left join cities ON ( personalInformation.cityId = cities.id )
	left join countries ON ( cityId = countries.id )
	where users.id = ?`;
	connection.query(query, [req.user.id], (error, users) => {
		if(error){
			return next({
				status : 401,
				data : 'Unauthorized'
			})
		}
		res.status(200).json(users[0]);
	})
};
