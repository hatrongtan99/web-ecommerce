const usersRoute = require('./users.route');
const productsRoute = require('./products.route');
const imagesRoute = require('./images.route');

const routes = function (app) {
    app.get('/', (req, res) => {
        res.json({ success: true });
    });
    app.use('/v2/api/users', usersRoute);
    app.use('/v2/api/products', productsRoute);
    app.use('/v2/api/images', imagesRoute);
};

module.exports = routes;
