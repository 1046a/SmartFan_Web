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
    if (!ctx.request.body['power']) {
        ctx.throw(Boom.badRequest());
    }

    let val = parseInt(ctx.request.body['power'], 10);
    if (isNaN(val)) {
        ctx.throw(Boom.badRequest());
    }

    fan.setPower(val !== 0);
    ctx.body = fan.getjson();
});

router.put('/mode', async ctx => {
    if (!ctx.request.body['mode']) {
        ctx.throw(Boom.badRequest());
    }

    let val = parseInt(ctx.request.body['mode'], 10);
    if (isNaN(val)) {
        ctx.throw(Boom.badRequest());
    }

    fan.setMode(val);
    ctx.body = fan.getjson();
});

router.put('/rpm', async ctx => {
    if (!ctx.request.body['rpm']) {
        ctx.throw(Boom.badRequest());
    }

    let val = parseInt(ctx.request.body['rpm'], 10);
    if (isNaN(val)) {
        ctx.throw(Boom.badRequest());
    }

    fan.setRPM(val);
    ctx.body = fan.getjson();
});

module.exports = router;