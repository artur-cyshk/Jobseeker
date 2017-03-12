var session = require('express-session');
var database = require('../../configuration/config').database;
var SessionStore = require('express-mysql-session');

var options = {
    host : database.host,
    user : database.username,
    password : database.password,
    database : database.dbname
};

var sessionStore = new SessionStore(options);

module.exports = session( {
    key : 'session_cookie_name',
    secret : 'session_cookie_secret',
    cookie : {
        path : "/",
        httpOnly : true,
        maxAge : null
    },
    resave : true,
    saveUninitialized : true,
    store : sessionStore
} );
