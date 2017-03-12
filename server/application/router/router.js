var express = require('express');
var router = express.Router();
var multipartMiddleware = require('connect-multiparty')({
    uploadDir: '../client/content/images/avatars'
});

router.get('/logout', require('./routes/logout'));
router.get('/authorized', require('./routes/authorized'));
router.post('/login', require('./routes/login'));
module.exports = router;