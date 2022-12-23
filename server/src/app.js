const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');

// apply middlewares
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file
app.use('/public', express.static(path.join(__dirname, '../public')));

// ################## V1 ###################
// const routesV1 = require('../src/v1/routes/index')
// routesV1(app);

// handling error
// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || 'Internal Server Error!';
//     res.status(err.statusCode).json({
//         message: err.message,
//     });
// });

// #################### V2 ###################
const routesV2 = require('../src/v2/routes/index');
const connectMongoose = require('./v2/config/dbMongoDb');
const handleError = require('../src/v2/middleware/handleError');
routesV2(app);
connectMongoose();

// config cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// });

cloudinary.config({
    cloud_name: 'dsxrg8nob',
    api_key: '845522686149698',
    api_secret: 'fVuqGjltHlu6QFhUGYDFoPl6nzE',
});

// handle error
app.use(handleError);

module.exports = app;
