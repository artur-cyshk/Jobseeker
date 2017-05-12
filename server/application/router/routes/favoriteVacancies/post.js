var connection = require('../../../../configuration/database/connection');

module.exports = function(req, res, next) {
    const query = 'insert into favoritevacancies set ?';
    console.log(req.body);
    connection.query(query, {userId: req.body.userId, vacancyId: req.body.vacancyId}, (err, result) => {
        console.log(2);
        console.log(err);
        if(err) {
            return next({
                status : 500,
                data : (typeof err == "string") ? err : 'There was an error while adding favorite vacancy'
            })
        }
        res.status(200).send(result);
    });
};