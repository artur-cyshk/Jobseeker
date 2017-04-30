var connection = require('../../../configuration/database/connection');

module.exports = function (req, res, next) {

	const query = 'select users.*, personal_information.* from users left join personal_information ON ( users.id = personal_information.user_id ) where users.id = ?';
	connection.query(query, [req.user.id], (error, users) => {
		console.log(error, users);
		if(error){
			return next({
				status : 401,
				data : 'Unauthorized'
			})
		}
		res.status(200).json(users[0]);
	})
};