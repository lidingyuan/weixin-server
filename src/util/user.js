
const jsonwebtoken = require('jsonwebtoken');

const user = {
  getId(ctx) {
    const userInfo = this.getInfo(ctx);
    return userInfo.id;
  },
  getCompId(ctx) {
    const userInfo = this.getInfo(ctx);
    return userInfo.compId;
  },
  getInfo(ctx) {
    const token = ctx.cookies.get(config.TOKEN);
    if (!token) {
      return {};
    }
    const userInfo = jsonwebtoken.decode(token);
    return userInfo || {};
  },
};

module.exports = user;
