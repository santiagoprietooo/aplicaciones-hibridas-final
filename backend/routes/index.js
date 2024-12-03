const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');
const camisetaRouter = require('./camisetaRouter');
const ropaRouter = require('./ropaRouter');

function routerAPI(app){
    app.use('/api/admin', adminRouter);
    app.use('/api/users', userRouter);
    app.use('/api/camisetas', camisetaRouter);
    app.use('/api/ropa', ropaRouter);
}

module.exports = routerAPI;