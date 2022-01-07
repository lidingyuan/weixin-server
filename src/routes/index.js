const router = require('koa-router')();

router.prefix('/service');

const routeList = [
];

routeList.forEach((key)=>{
  const route = require('./'+key);
  router.use('/'+key, route.routes(), route.allowedMethods());
});

module.exports = router;
