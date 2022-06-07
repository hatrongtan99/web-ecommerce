require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./src/routes');
const path = require('path');
// app
const app = express();

// apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// static files
app.use('/public', express.static(path.join(__dirname, 'public')))

// route
route(app)

//#########################

//####################

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 5000;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('server is runing on port ' + port);
})