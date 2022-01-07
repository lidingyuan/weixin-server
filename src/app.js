const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const jwt = require('koa-jwt');

const index = require('./routes/index');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
// app.use(require('koa-static')('/home/admin/web'));


// logger
const log = require('./log');
log.initLog(app);

app.use(function(ctx, next) {
  return next().catch((err) => {
    const userId= user.getId(ctx);
    log.err('user:' + userId + ' err:' + err);
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      ctx.status = 200;
      ctx.body = r.err('请求出错');
    }
  });
});
app.use(
    jwt({
      secret: config.SECRET_KEY,
      cookie: config.TOKEN, // 从 cookie 中获取token
    }).unless({path: [/^\/service\/login/]}),
);

// routes
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  log.err(err, ctx);
});


log.write('启动成功');

module.exports = app;
