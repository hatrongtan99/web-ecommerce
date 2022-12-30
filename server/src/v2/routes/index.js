const usersRoute = require('./users.route');
const productsRoute = require('./products.route');
const imagesRoute = require('./images.route');
const brandsRoute = require('./brands.route');
const cartsRoute = require('./carts.route');
const categoryRote = require('./category.route');

const routes = function (app) {
    app.get('/', (req, res) => {
        res.json({ success: true });
    });
    // users
    app.use('/v2/api/users', usersRoute);
    // products
    app.use('/v2/api/products', productsRoute);
    // image
    app.use('/v2/api/images', imagesRoute);
    // brands
    app.use('/v2/api/brands', brandsRoute);
    // carts
    app.use('/v2/api/cart', cartsRoute);
    // category
    app.use('/v2/api/category', categoryRote);
};

module.exports = routes;
