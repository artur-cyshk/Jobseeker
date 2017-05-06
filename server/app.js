const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./application/router/router');
const errorHandler = require('./configuration/errorHandler');
const config = require('./configuration/config');
const socketRouter = require('./application/socketRouter/router');
const auth = require("./configuration/jwt/jwtAuth.js")();  
const app = express();

app.use(express.static('./dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(auth.initialize());

var server = app.listen(config.port, function() {
    console.log(`server listening on port ${config.port}`);
});

var io = require('socket.io').listen(server);
socketRouter(io);

app.use('/api',router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.use(errorHandler.handler);