const Router = require('koa-router');
const {connectionDB, testConnection} = require('../core/db/connection');
const userRoutes = require('./user.routes');

const router = new Router();

connectionDB.sync().then(() => console.log('Banco pronto'))

router.get('/', async (ctx, next) => {
  const connection = await testConnection();
  ctx.body({
    sqlConnection: connection
  })
});

router.use('/user', userRoutes);

module.exports = router