var connection = require('../../../../configuration/database/connection');

module.exports = function (req, res, next) {
    const query = 'select COUNT(personalInformation.id) as exist from personalInformation, users where personalInformation.userId = users.id and users.id = ?'
    const queryInsert = 'insert into personalInformation set ?';
    const queryUpdate = 'update personalInformation set ? where personalInformation.userId = ?';
    const validate = function(user) {
        let dataUpdate = {};
        if(user.id) {
            dataUpdate.userId = user.id;
        } else {
            next({
                data: "Not user_id"
            });
        }
        if(user.role) {
            connection.query('update users set role = ? where users.id = ?', [user.role, user.id], (error) => {
                console.log(error);
                if(error) {
                    return next({
                        status : 500,
                        data : 'Server error'
                    })
                    return;
                }
            });
        }
        if(user.firstName) {
            dataUpdate.firstName = user.firstName;
        }
        if(user.lastName) {
            dataUpdate.lastName = user.lastName;
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
        if(user.cityId) {
            dataUpdate.cityId = user.cityId;
        }
        if(user.avatarUrl) {
            dataUpdate.avatarUrl = user.avatarUrl;
        }
        if(user.email) {
            dataUpdate.email = user.email;
        }
        if(user.skype) {
            dataUpdate.skype = user.skype;
        }
        if(user.phone) {
            dataUpdate.phone = user.phone;
        }
        return dataUpdate;
    }
    const dataUpdate = validate(req.body);
    connection.query(query, [req.body.id], (error, users) => {
        console.log(error, users);
        if(error){
            return next({
                status : 401,
                data : 'Unauthorized'
            })
        }
        if(users[0].exist == 0) {
            connection.query(queryInsert, dataUpdate, (error) => {
                console.log(error);
                if(error) {
                    return next({
                        status : 500,
                        data : 'Server error'
                    })
                    return;
                }
            res.status(200).end();
            });
        } else if([users[0].exist == 1]) {
            connection.query(queryUpdate, [dataUpdate, dataUpdate.userId], (error) => {
                console.log(error);
                if(error) {
                    return next({
                        status : 500,
                        data : 'Server error'
                    })
                    return;
                }
            res.status(200).end();
            });
        }
    })
};