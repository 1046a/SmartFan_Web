const router = require('koa-router')();
const debug = require('debug')('SmartFan_Web:router');

router.get('/', async ctx => {
    ctx.body = 'Hello World';
});

module.exports = router;