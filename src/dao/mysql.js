const mysql = require('mysql');
const log = require('../log');
const config = {
  // 数据库配置
  database: {
    DATABASE: 'rent', // 数据库名称
    USERNAME: 'lidingyuan', // mysql用户名
    PASSWORD: 'Ldy19920714', // mysql密码
    PORT: '3306', // mysql端口号
    HOST: 'rm-bp192u99o50n4146kio.mysql.rds.aliyuncs.com', // 服务器ip
  },
};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  typeCast: function(field, next) {
    if (field.type === 'DATE') {
      const date = field.string();
      return date?date.substr(0, 11):'';
    } else {
      return next();
    }
  },
});


/**
 * @param {String} sql
 * @param {Array} values
 * @return {Promise}
 */
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        const promise = _query(connection, sql, values);
        promise.then((data)=>{
          resolve(data);
          connection.release();
        });
        promise.catch((err)=>{
          reject(err);
          connection.release();
        });
      }
    });
  });
}

/**
 * @param {Object} connection
 * @param {String} sql
 * @param {Array} values
 * @return {Promise}
 */
function _query(connection, sql, values) {
  sql = sql.replace(/[\n|\r\n]/g, ' ');
  return new Promise((resolve, reject) => {
    const time = Date.now();
    connection.query(sql, values, (err, rows) => {
      log.write(sql, values, Date.now() - time);
      if (err) {
        reject(err);
      } else {
        resolve(transform(rows));
      }
    });
  });
}

/**
 * @param {String} sql
 * @param {Array} values
 * @return {Promise}
 */
function transaction() {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        return reject(err);
      }
      connection.beginTransaction(function(err) {
        if (err) {
          return reject(err);
        }
        resolve({
          query: function(sql, values) {
            return new Promise((resolve, reject) => {
              const promise = _query(connection, sql, values);
              promise.then((data)=>resolve(data));
              promise.catch((err)=>{
                reject(err);
              });
            });
          },
          commit: function() {
            return new Promise((resolve, reject)=>{
              connection.commit(function(err) {
                if (err) {
                  return reject(err);
                }
                resolve();
                connection.release();
              });
            });
          },
          rollback: function() {
            connection.rollback(()=>{
              connection.release();
            });
          },
        });
      });
    });
  });
}


/**
 * @param {Array} rows
 * @return {Array}
 */
function transform(rows) {
  if (!rows.length) {
    return rows;
  }
  return rows.map((row)=>{
    const transedRow = {};
    Object.keys(row).forEach((key) => {
      transedRow[sqlUtil.underlineToCamel(key)]=row[key];
    });
    return transedRow;
  });
}

module.exports = {
  query,
  transaction,
};
