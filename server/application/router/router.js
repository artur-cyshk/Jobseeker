var express = require('express');
var router = express.Router();
const auth = require("../../configuration/jwt/jwtAuth.js")();  
// auth.authenticate() - set second param to router functions if route need authorized user
router.post('/login', require('./routes/login'));
router.post('/registration', require('./routes/registration'));
router.get('/authorized',auth.authenticate(), require('./routes/authorized'));
router.put('/users', require('./routes/users')); //{id, profile_user}
router.put('/user/change-password', require('./routes/change-password')); // {id, password}
router.post('/uploadImage', require('./routes/uploadImage'));
router.post('/companies', require('./routes/companies'));
router.get('/countries', require('./routes/countries'));
router.get('/cities', require('./routes/cities'));
module.exports = router;