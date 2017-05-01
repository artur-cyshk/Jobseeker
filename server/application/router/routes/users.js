var connection = require('../../../configuration/database/connection');

module.exports = function (req, res, next) {
    const query = 'select COUNT(personal_information.id) as exist from personal_information, users where personal_information.user_id = users.id and users.id = ?'
    const queryInsert = 'insert into personal_information set ?';
    const queryUpdate = 'update personal_information set ? where personal_information.user_id = ?';
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
            dataUpdate.first_name = user.first_name;
        }
        if(user.last_name) {
            dataUpdate.last_name = user.last_name;
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
            dataUpdate.country_id = user.country_id;
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
            res.status(200).json(null);
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
            res.status(200).json(null);
            });
        }
        // res.status(200).json(users[0]);
    })
};