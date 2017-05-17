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
router.get('/skills', auth.authenticate(), require('./routes/skills'));
router.get('/languages', auth.authenticate(), require('./routes/languages'));

router.get('/companies', auth.authenticate(), require('./routes/companies/get'));
router.post('/companies', auth.authenticate(), require('./routes/companies/post'));
router.delete('/companies/:id', auth.authenticate(), require('./routes/companies/delete'));

router.get('/vacancies/:id', auth.authenticate(), require('./routes/vacancies/get'));
router.post('/vacancies', auth.authenticate(), require('./routes/vacancies/post'));
router.put('/vacancies', auth.authenticate(), require('./routes/vacancies/put'));
router.delete('/vacancies/:id', auth.authenticate(), require('./routes/vacancies/delete'));

router.get('/cvs', auth.authenticate(), require('./routes/cvs/getAll'));
router.get('/cvs/:id', auth.authenticate(), require('./routes/cvs/get'));
router.post('/cvs', auth.authenticate(), require('./routes/cvs/post'));
router.put('/cvs', auth.authenticate(), require('./routes/cvs/put'));
router.delete('/cvs/:id', auth.authenticate(), require('./routes/cvs/delete'));

router.get('/favorite', auth.authenticate(), require('./routes/favorite/get'));
router.post('/favoriteVacancies', auth.authenticate(), require('./routes/favorite/favoriteVacancies/post'));
router.delete('/favoriteVacancies/:id', auth.authenticate(), require('./routes/favorite/favoriteVacancies/delete'));
router.post('/favoriteCvs', auth.authenticate(), require('./routes/favorite/favoriteCvs/post'));
router.delete('/favoriteCvs/:id', auth.authenticate(), require('./routes/favorite/favoriteCvs/delete'));

router.get('/filteredVacancies', auth.authenticate(), require('./routes/filtered/vacancies'));
router.get('/filteredCvs', auth.authenticate(), require('./routes/filtered/cvs'));

module.exports = router;