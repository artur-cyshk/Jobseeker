var connection = require('../../../../configuration/database/connection');

module.exports = function (req, res, next) {
    const query = 'select COUNT(personalInformation.id) as exist from personalInformation, users where personalInformation.userId = users.id and users.id = ?'
    const queryInsert = 'insert into personalInformation set ?';
    const queryUpdate = 'update personalInformation set ? where personalInformation.userId = ?';
    const validate = function(user) {
        let dataUpdate = {};
        if(user.id) {
            dataUpdate.user_id = user.id;
        } else {
            next({
                data: "Not user_id"
            });
        }
        if(user.first_name) {
            dataUpdate.first_name = user.firstName;
        }
        if(user.last_name) {
            dataUpdate.last_name = user.lastName;
        }
        if(user.patronomic) {
            dataUpdate.patronomic = user.patronomic;
        }
        if(user.gender) {
            dataUpdate.gender = user.gender;
        }
        if(user.dob) {
            dataUpdate.dob = user.dob;
        }
        if(user.country_id) {
            dataUpdate.country_id = user.countryId;
        }
        if(user.avatarUrl) {
            dataUpdate.avatarUrl = user.avatarUrl;
        }
        return dataUpdate;
    }
    const dataUpdate = validate(req.body);
    connection.query(query, [req.body.user.id], (error, users) => {
        console.log(error, users);
        if(error){
            return next({
                status : 401,
                data : 'Unauthorized'
            })
        }
        if(users[0].exist == 0) {
            connection.query(queryInsert, dataUpdate, (error) => {
                if(err) {
                    if(err.code == "ER_DUP_ENTRY") {
                        next({
                            data: "data already exists"
                        });
                    }else {
                        next(true);
                    }
                    return;
                }
            res.status(200).end();
            });
        } else if([users[0].exist == 1]) {
            connection.query(queryUpdate, [dataUpdate, dataUpdate.user_id], (error) => {
                if(err) {
                    if(err.code == "ER_DUP_ENTRY") {
                        next({
                            data: "data already exists"
                        });
                    }else {
                        next(true);
                    }
                    return;
                }
            res.status(200).end();
            });
        }
        // res.status(200).json(users[0]);
    })
};