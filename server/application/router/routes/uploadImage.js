var multer = require('multer');
var fs = require('fs');

/** API path that will upload the files */
module.exports = function(req, res, next) {

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    upload(req, res, function(err){
        if(err){
             next(true);
             return;
        }
        res.status(200).json(null);
    })
};