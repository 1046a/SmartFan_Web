const Koa = require('koa');
const app = new Koa();
const errorHandler = require('koa-better-error-handler');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const serve = require('koa-static');
const debug = require('debug')('SmartFan_Web:app');
const Boom = require('boom');

// Routers
const router = require('./router');

// Server port settings
const port = 3000;

// Error Handler
app.context.onerror = errorHandler;

// Middlewares
app.use(logger());
app.use(cors());
app.use(bodyparser());
app.use(json());
app.use(serve(__dirname + '/public'));
app.use(serve(__dirname + '/semantic/dist'))

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);
debug(`Web server started at port: ${port}!`);
