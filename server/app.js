var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    router = require('./application/router/router'),
    errorHandler = require('./configuration/errorHandler'),
    port = require('./configuration/config').port,
    app = express(),
    socketRouter = require('./application/socketRouter/router');

app.use(express.static('../dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var server = app.listen(port, function() {
    console.log(`server listening on port ${port}`);
});

var io = require('socket.io').listen(server);
socketRouter(io);

app.use('/',router);
app.use(errorHandler.handler);