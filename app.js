const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const serve = require('koa-static');
const debug = require('debug')('SmartFan_Web:app');

// Routers
const router = require('./router');

// Server port settings
const port = 3000;

// Error Handler
onerror(app);

// Middlewares
app.use(logger());
app.use(cors());
app.use(bodyparser());
app.use(json());
app.use(serve(__dirname + '/public'));

app.use(router.routes(), router.allowedMethods());

app.listen(port);
debug(`Web server started at port: ${port}!`);
