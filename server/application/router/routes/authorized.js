var connection = require('../../../configuration/database/connection');

module.exports = function (req, res, next) {

	const query = 'select users.id, users.name, users.avatarUrl, user_roles.name as role from users left join user_roles ON ( user_roles.id = users.role_id ) where users.id = ?';
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