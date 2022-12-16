const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/web-ecommerce';

const connMongoose = function () {
    mongoose
        .connect(url)
        .then((conn) => {
            console.log('Connect to Mongoose successfully.');
        })
        .catch((err) => console.log(err));
};

module.exports = connMongoose;
