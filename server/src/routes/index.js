const userRouter = require('./userRouter');
const productionsRouter = require('./productionsRouter');
const imageRouter = require('./imageRouter');

module.exports = function route(app) {
    app.use('/api', imageRouter)
    app.use('/api', userRouter)
    app.use('/api', productionsRouter)
}
