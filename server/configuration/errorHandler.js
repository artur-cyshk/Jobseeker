exports.handler = function (err, req, res, next) {
    res.status(err.status || 500).send(err.data || null);
};