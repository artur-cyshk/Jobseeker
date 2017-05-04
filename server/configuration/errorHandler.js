exports.handler = function (err, req, res, next) {
    res.status(err.status || 500).send(err.data || 'There was an error on the server');
};