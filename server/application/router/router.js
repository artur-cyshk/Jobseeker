var express = require('express');
var router = express.Router();
const auth = require("../../configuration/jwt/jwtAuth.js")();  
// auth.authenticate() - set second param to router functions if route need authorized user
router.post('/login', require('./routes/authentication/login'));
router.post('/registration', require('./routes/authentication/registration'));

router.get('/user', auth.authenticate(), require('./routes/user/get')); //{id, profile_user}
router.put('/user', auth.authenticate(), require('./routes/user/put')); //{id, profile_user}
router.put('/user/changePassword', auth.authenticate(), require('./routes/user/changePassword')); // {id, password}
router.post('/user/uploadAvatar', auth.authenticate(), require('./routes/user/uploadAvatar'));


router.post('/companies', auth.authenticate(), require('./routes/companies'));
router.get('/countries', auth.authenticate(), require('./routes/countries'));
router.get('/cities', auth.authenticate(), require('./routes/cities'));
module.exports = router;