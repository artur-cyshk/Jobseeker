let connection = require('../../../../configuration/database/connection');
let _ = require('lodash');
const CONFIG = require('../../../../configuration/config');
module.exports = function (req, res, next) {
    let query = 'UPDATE users SET avatarUrl = ? WHERE id = ?';
    let imageName = req.files.file.path.split(CONFIG.avatarPathFromClient)[1];
    connection.query(query,
        [imageName, req.user.id],
        function (err, data) {
            if(err){
                return next(true);
            }
            res.status(200).send(`${CONFIG.avatarPath}/${imageName}`);
        });
};