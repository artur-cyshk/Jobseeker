var express = require('express');
var router = express.Router();
const AVATAR_PATH = require('../../configuration/config').avatarPath;
var multipartMiddleware = require('connect-multiparty')({
    uploadDir: AVATAR_PATH
});
const auth = require("../../configuration/jwt/jwtAuth.js")();  
// auth.authenticate() - set second param to router functions if route need authorized user
router.post('/login', require('./routes/authentication/login'));
router.post('/registration', require('./routes/authentication/registration'));

router.get('/user', auth.authenticate(), require('./routes/user/get')); //{id, profile_user}
router.put('/user', auth.authenticate(), require('./routes/user/put')); //{id, profile_user}
router.post('/user/uploadAvatar', auth.authenticate(), multipartMiddleware, require('./routes/user/uploadAvatar'));

router.get('/countries', auth.authenticate(), require('./routes/countries'));
router.get('/cities/:countryId', auth.authenticate(), require('./routes/cities'));

router.get('/companies', auth.authenticate(), require('./routes/companies/get'));
router.post('/companies', auth.authenticate(), require('./routes/companies/post'));
router.delete('/companies/:id', auth.authenticate(), require('./routes/companies/delete'));


router.delete('/vacancies/:id', auth.authenticate(), require('./routes/vacancies/delete'));

module.exports = router;