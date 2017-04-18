var express = require('express');
var router = express.Router();
const auth = require("../../configuration/jwt/jwtAuth.js")();  
router.get('/logout', auth.authenticate(), require('./routes/logout'));
router.get('/authorized', require('./routes/authorized'));
router.post('/login', require('./routes/login'));
router.post('/registration', require('./routes/registration'));
module.exports = router;