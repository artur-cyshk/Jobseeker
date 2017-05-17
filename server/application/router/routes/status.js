const connection = require('../../../configuration/database/connection');

module.exports = function (req, res, next) {
	const query = `select status.id, status.status, status.type, cvs.name as cvName, vacancies.name as vacancyName,
	personalInformation.firstName, companies.name as companyName
	from status
	left join cvs ON ( status.cvId = cvs.id )
	left join personalInformation ON (cvs.userId = personalInformation.userId)
	left join vacancies ON ( status.vacancyId = vacancies.id )
	left join companies ON ( vacancies.companyId = companies.id )
    left join employers ON ( companies.id = employers.companyId)
    left join users ON (employers.userId = users.id)
	where personalinformation.userId = ? OR users.id = ?`;
	connection.query(query, [req.user.id, req.user.id], (error, result) => {
		if(error) {
			return next(true);
		}
		const editedResult = {
			cvs : result.filter((item) => item.type === 'cv'),
			vacancies : result.filter((item) => item.type === 'vacancy')
		}
		res.status(200).json(editedResult);
	})
};
