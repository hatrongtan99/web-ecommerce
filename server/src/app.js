const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// #### V1 ####
// const routesV1 = require('../src/v1/routes/index');
// routesV1(app);

// #### V2 ####
const routesV2 = require('../src/v2/routes/index');
routesV2(app);

// ##############################

// static file
app.use('/public', express.static(path.join(__dirname, '../public')));

// handling error
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error!';
    res.status(err.statusCode).json({
        message: err.message,
    });
});

module.exports = app;
