var express = require('express');
var router = express.Router();
const auth = require("../../configuration/jwt/jwtAuth.js")();  
// auth.authenticate() - set second param to router functions if route need authorized user
router.post('/login', require('./routes/login'));
router.post('/registration', require('./routes/registration'));
module.exports = router;