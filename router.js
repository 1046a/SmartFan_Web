const router = require('koa-router')();
const debug = require('debug')('SmartFan_Web:router');
const Boom = require('boom');
const Fan = require('./fan');

const fan = new Fan();

router.get('/', async ctx => {
    ctx.body = 'Hello World';
});

router.get('/status', async ctx => {
    fan.refresh();
    ctx.body = fan.getjson();
});

router.put('/power', async ctx => {
    ctx.throw(Boom.notImplemented());
    ctx.body = fan.getjson();
});

router.put('/mode', async ctx => {
    ctx.throw(Boom.notImplemented());
    ctx.body = fan.getjson();
});

router.put('/rpm', async ctx => {
    ctx.throw(Boom.notImplemented());
    ctx.body = fan.getjson();
});

module.exports = router;