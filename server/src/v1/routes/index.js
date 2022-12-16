const userRouter = require('./userRouter');
const productionsRouter = require('./productionsRouter');
const imageRouter = require('./imageRouter');
const orderRouter = require('./orderRouter');

module.exports = function routes(app) {
    app.use('/v1/api', imageRouter);
    app.use('/v1/api', userRouter);
    app.use('/v1/api', orderRouter);
    app.use('/v1/api', productionsRouter);
};
