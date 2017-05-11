var connection = require('../../../../configuration/database/connection');
var async = require('async');
const query = 'select COUNT(personalInformation.id) as exist from personalInformation, users where personalInformation.userId = users.id and users.id = ?'
const queryInsert = 'insert into personalInformation set ?';
const queryUpdate = 'update personalInformation set ? where personalInformation.userId = ?';
const dataProccessing = function(user) {
    let error;
    const fields = ['role', 'firstName', 'lastName', 'gender', 'dob', 'city', 'avatarUrl', 'email', 'phone', 'city'];
    fields.forEach((fieldName) => {
        if(!user[fieldName]) {
            error = `Please, select ${fieldName}`;
            return false;
        }
        if(fieldName == 'city') {
            if(user.city && user.city.id){
                user.cityId = user.city.id;
            }else{
                error = `Please, select ${fieldName}`;
                return false;
            }
        }

        if(fieldName == 'dob') {
            user.dob = new Date(user.dob).toISOString().substring(0, 19).replace('T', ' ');
        }
    })
    return {
        isError : !!error,
        data : error || user
    };
}
const deleteMinorFieldsToExecuteQuery = (obj, fields) => {
    fields.map((field) => delete obj[field]);
}

module.exports = function (req, res, next) {
    async.waterfall(
        [
            (callback) => {
                const  result = dataProccessing(req.body);
                callback(result.isError  ? result.data : null, result.data);
            },
            (newUserData, callback) => {
                connection.query(query, [req.user.id], (error, users) => {
                    callback(error, users[0], newUserData);
                })
            },
            (user, newUserData, callback) => {
                const queryString = (user.exist == 0) ? queryInsert : queryUpdate;
                newUserData.userId = newUserData.id;
                deleteMinorFieldsToExecuteQuery(newUserData, ['country', 'city', 'avatarUrl', 'role', 'isAdmin', 'name', 'id']);
                const params = (user.exist == 0) ? newUserData : [newUserData, req.user.id];
                connection.query(queryString, params, (error) => {
                    console.log(error);
                    callback(error);
                });
            }
        ],
        (err, result) => {
            if(err) {
                return next({
                    status : 500,
                    data : (typeof err == "string") ? err : 'There was an error while updating profile'
                })
            }
            res.status(200).end();
        } 
    );
}