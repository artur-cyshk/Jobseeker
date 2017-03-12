var connection = require('../../../configuration/database/connection');
var _ = require('lodash');
module.exports = function (req, res, next) {
	if(!req.session.authorized) {
		return next({
			status: 401
		})
	} else {
		var query = 'select user_id as userId, type from users where user_id=?';
		connection.query(query, req.session.userId,
			function(err, data) {
				if(err || !_.isObject(data) || !_.isObject(data[0])){
					return next(true);
				}
				req.session.currUserRole = data[0].type;
				res.status(200).send(data[0]);
			});
	}
};