const router = require('koa-router')();
const debug = require('debug')('SmartFan_Web:router');
const Boom = require('boom');
const Fan = require('./fan');
const mqtt  = require('mqtt')
let mqClient = mqtt.connect('mqtt://192.168.0.1', {host: 'localhost', port: 1883})

const fan = new Fan(mqClient);

function parse(val) {
    if (typeof val === "number") {
        return val;
    }
    return parseInt(val, 10);
}

router.get('/', async ctx => {
    ctx.body = 'Hello';
});

router.get('/status', async ctx => {
    fan.refresh();
    ctx.body = fan.getjson();
});

router.put('/power', async ctx => {
    debug(ctx.request.body);
    if (ctx.request.body['power'] === undefined) {
        ctx.throw(Boom.badRequest());
    }


    let val = parse(ctx.request.body['power']);
    if (isNaN(val)) {
        ctx.throw(Boom.badRequest());
    }

    fan.setPower(val !== 0);
    ctx.body = fan.getjson();
});

router.put('/mode', async ctx => {
    debug(ctx.request.body);
    if (ctx.request.body['mode'] === undefined) {
        ctx.throw(Boom.badRequest());
    }

    let val = parse(ctx.request.body['mode']);
    if (isNaN(val)) {
        ctx.throw(Boom.badRequest());
    }

    fan.setMode(val);
    ctx.body = fan.getjson();
});

router.put('/rpm', async ctx => {
    debug(ctx.request.body);
    if (ctx.request.body['rpm'] === undefined) {
        ctx.throw(Boom.badRequest());
    }

    let val = parse(ctx.request.body['rpm']);
    if (isNaN(val)) {
        ctx.throw(Boom.badRequest());
    }

    fan.setRPM(val);
    ctx.body = fan.getjson();
});

module.exports = router;