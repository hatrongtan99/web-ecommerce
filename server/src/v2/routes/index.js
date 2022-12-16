const usersRoute = require('./users.route');

const routes = function (app) {
    app.use('/v2/api/users', usersRoute);
};

module.exports = routes;
