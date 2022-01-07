
/**
 * @param {Koa} app
 */
function initLog(app) {
  app.use(require('koa-logger')());
  app.use(async (ctx, next) => {
    write(`userId:${user.getId(ctx) || ''} ${ctx.method} ${ctx.url} - begin`);
    const start = new Date();
    await next();
    const ms = new Date() - start;
    write(`userId:${user.getId(ctx) || ''} ${ctx.method} ${ctx.url} - ${ms}ms`);
  });
}

function getNowDateString() {
  const date = new Date();
  const str = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  return str;
}

/**
 * @param {String} text
 */
function write(...args) {
  const fs = require('fs');
  const path = require('path');
  const file = path.resolve(__dirname, `../../log-${getNowDateString()}.txt`);
  const data = args.reduce((a, b)=>{
    return a +`[${getIPAdress()} ${new Date().toLocaleString()}]`+b+'\n';
  }, '');
  // 异步写入数据到文件
  fs.writeFile(
      file,
      data+'\n',
      {encoding: 'utf8', flag: 'a'},
      () => {},
  );
}

/**
 * @param {String} text
 * @param {ctx} ctx
 */
function err(text,ctx) {
  const fs = require('fs');
  const path = require('path');
  const file = path.resolve(__dirname, `../../log-${getNowDateString()}-error.txt`);
  const data = `[${getIPAdress()} ${new Date().toLocaleString()}] <${getReqRemoteIp(ctx.request)}>`+text;
  // 异步写入数据到文件
  fs.writeFile(
      file,
      data+'\n',
      {encoding: 'utf8', flag: 'a'},
      () => {},
  );
}

/**
 * @return {String}
 */
function getIPAdress() {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    if (Object.prototype.hasOwnProperty.call(interfaces, devName)) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
  }
}

function getReqRemoteIp(req){return (req.headers['x-forwarded-for'] || '').split(',')[0] || req.ip;};

module.exports = {
  initLog,
  write,
  err,
};
