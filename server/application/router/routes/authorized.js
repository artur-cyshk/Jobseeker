var connection = require('../../../configuration/database/connection');

module.exports = function (req, res, next) {

	const query = 'select users.id, users.name, users.avatarUrl user_roles.name as role from users join user_roles where user_roles.id = users.role_id and users.id = ?';
	connection.query(query, [req.user.id], (error, users) => {
		if(error){
			return res.next({
				status : 401,
				data : 'Unauthorized'
			})
		}
		res.status(200).json(users[0]);
	})
};