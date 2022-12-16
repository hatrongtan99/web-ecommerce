module.exports = function (fun) {
    return (req, res, next) => {
        Promise.resolve(fun(req, res, next)).catch((err) => next(err));
    };
};
