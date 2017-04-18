var express = require('express');
var router = express.Router();

router.get('/logout', require('./routes/logout'));
router.get('/authorized', require('./routes/authorized'));
router.post('/login', require('./routes/login'));
router.post('/registration', require('./routes/registration'));
module.exports = router;