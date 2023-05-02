const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./routes')
const swagger = require("swagger2");
const {koaSwagger} = require('koa2-swagger-ui');

const app = new Koa();

const swaggerDocument = swagger.loadDocumentSync("api.yaml");

app.use(logger());
app.use(cors())
app.use(bodyParser())
app.use(koaSwagger({
    routePrefix: '/api',
    swaggerOptions: {
      spec: swaggerDocument
    }
  }));  
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app
