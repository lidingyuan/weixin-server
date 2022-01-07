
const mysql = require('@/dao/mysql');

function serviceTransaction(serviceMap) {
  const serviceTransactionMap = {};
  Object.keys(serviceMap).forEach((key)=>{
    serviceTransactionMap[key] = getTransaction(serviceMap[key]);
  });
  return serviceTransactionMap;
}
function getTransaction(service) {
  return async (...args)=> {
    let query;
    let commit;
    let rollback;
    if (this.query) {
      query = this.query;
    } else {
      const sql = await mysql.transaction();
      query = sql.query;
      commit = sql.commit;
      rollback = sql.rollback;
    }
    try {
      const returnObj = await service.call({
        query,
      }, ...args);
      commit && await commit();
      return returnObj;
    } catch (error) {
      rollback && await rollback();
      throw error;
    }
  };
}


module.exports = serviceTransaction;
