const usersRoute = require('./users.route');
const productsRoute = require('./products.route');
const imagesRoute = require('./images.route');

const routes = function (app) {
    app.use('/v2/api/users', usersRoute);
    app.use('/v2/api/products', productsRoute);
    app.use('/v2/api/images', imagesRoute);
};

module.exports = routes;
