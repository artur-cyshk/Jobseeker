var connection = require('../../../../configuration/database/connection');
_ = require('lodash');
module.exports = function (req, res, next) {
	//todo check db; authorization; and insert or update image name
    // var query = 'UPDATE users SET avatarUrl = ? WHERE user_id = ?';
    // console.log(req.files);
    // connection.query(query,
    //     [req.files.file.path.split('client\\content\\images\\avatars\\')[1], req.session.userId],
    //     function (err, data) {
    //         if(err){
    //             return next(true);
    //         }
    //         res.status(200).send(req.files.file.path.split('client\\content\\images\\avatars\\')[1]);
    // });
};