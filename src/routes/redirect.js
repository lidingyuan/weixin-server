const router = require('koa-router')();
const config = require('@/config');
const redirectService = require('../service/redirectService');

router.get('/', async (ctx, next) => {

  const url = 'http://www.dxserver.top/front/rent-mob'

  ctx.response.redirect(`
  https://open.weixin.qq.com/connect/oauth2/authorize
  ?appid=${config.WEIXIN_APPID}
  &redirect_uri=${url}
  &response_type=code
  &scope=snsapi_base
  &state=STATE
  #wechat_redirect
  `);
});