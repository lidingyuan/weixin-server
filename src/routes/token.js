const router = require('koa-router')();
const weixinService = require('../service/weixinService');
const config = require('@/config');
const request = require('@/util/requestUtil');

router.get('/token', async (ctx, next) => {
  const {code}= ctx.request.query
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token
    ?appid=${config.WEIXIN_APPID}
    &secret=${config.WEIXIN_SECRET}
    &code=${code}
    &grant_type=authorization_code`
    const options = {
      method: 'get',
      url: url
    }
  const {res, body}= await request(options)
  console.log(res, body);
});