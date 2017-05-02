var connection = require('../../../configuration/database/connection');

module.exports = function(req, res, next) {
    const validate = function(user_id, company) {
        var noError = true;
        if(user_id) {
            noError = false;
        }
        if(company.name || company.name.length < 8) {
            noError = false;
        }
        if(!company.active) {
            company.active = 1;
        }
        return noError;
    };

    const quering = function(user_id, company) {
        const query = 'insert into companies set ?';
        connection.query(query, {name: company.name, active: company.active}, function(err, result) {
            if(err) {
                if(err.code == "ER_DUP_ENTRY") {
                    next({
                        data: "company already exists"
                    });
                }else {
                    next(true);
                }
                return;
            }
            
        });
    }

};