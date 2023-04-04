const usersRoute = require("./users.route");
const productsRoute = require("./products.route");
const imagesRoute = require("./images.route");
const brandsRoute = require("./brands.route");
const cartsRoute = require("./carts.route");
const categoryRote = require("./category.route");
const orderRoute = require("./order.route");
const commentRoute = require("./comment.route");
const feedbackRoute = require("./feedbacks.route");
const searchRoute = require("./search.route");

const routes = function (app) {
    // users
    app.use("/v2/api/users", usersRoute);
    // products
    app.use("/v2/api/products", productsRoute);
    // image
    app.use("/v2/api/images", imagesRoute);
    // brands
    app.use("/v2/api/brands", brandsRoute);
    // carts
    app.use("/v2/api/cart", cartsRoute);
    // category
    app.use("/v2/api/category", categoryRote);
    // order
    app.use("/v2/api/order", orderRoute);
    //comment
    app.use("/v2/api/comment", commentRoute);
    // feeback
    app.use("/v2/api/feedback", feedbackRoute);
    //search
    app.use("/v2/api/search", searchRoute);

    // all
    app.use("*", (req, res) => {
        res.status(404).send("Not Found");
    });
};

module.exports = routes;
