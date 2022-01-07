const util = {
  camelToUnderline(text) {
    const _text = text;
    return _text.replace(/[A-Z]/g, (a)=>{
      return '_'+a.toLocaleLowerCase();
    });
  },
  underlineToCamel(text) {
    const _text = text.toLocaleLowerCase();
    return _text.replace(/_./g, (a)=>a.substr(1).toLocaleUpperCase());
  },
  camelToUnderlineTransform(obj) {
    const _obj = {};
    Object.keys({...obj}).forEach((key)=>{
      _obj[this.camelToUnderline(key)] = obj[key];
    });
    return _obj;
  },
  async getCount(sql, values, query) {
    const countsql = `select count(1) as count from (${sql}) a`;
    const rows = await query(countsql, values);
    const row = rows[0];
    return row.count;
  },
  async insert(table, param, query) {
    let keyStr = '';
    let queryStr = '';
    const values = [table];
    if (Object.prototype.toString.call(param) === '[object Array]') {
      param = param.map((row)=>this.camelToUnderlineTransform(row));
      console.log(param);
      if (!param.length) {
        throw new Error('内容为空');
      }
      const row = param[0];
      keyStr = Object.keys(row).reduce((a, b)=>{
        values.push(b);
        return a+',??';
      }, '').substr(1);
      const rowStr = '('+Object.keys(row).reduce((a, b)=>a+',?', '').substr(1)+')';
      queryStr = param.reduce((a, b)=>{
        values.push(...Object.values(b));
        return a+','+rowStr;
      }, '').substr(1);
    } else if (Object.prototype.toString.call(param) === '[object Object]') {
      param = this.camelToUnderlineTransform(param);
      if (!Object.keys(param).length) {
        throw new Error('内容为空');
      }
      const row = param;
      keyStr = Object.keys(row).reduce((a, b)=>{
        values.push(b);
        return a+',??';
      }, '').substr(1);
      queryStr = '('+Object.keys(row).reduce((a, b)=>{
        values.push(row[b]);
        return a+',?';
      }, '').substr(1)+')';
    } else {
      throw new Error('格式不正确');
    }
    const sql = `insert into ?? 
      (${keyStr}) 
      values${queryStr}`;
    const rows = await query(sql, values);
    return rows;
  },
  async update(table, data, param, query) {
    data = this.camelToUnderlineTransform(data);
    param = this.camelToUnderlineTransform(param);
    const values = [table];
    const dataStr = Object.keys(data).reduce((a, key)=>{
      values.push(key);
      values.push(data[key]);
      return a+', ??=? ';
    }, '').substr(1);
    const paramStr = Object.keys(param).reduce((a, key)=>{
      values.push(key);
      values.push(param[key]);
      return a+'and ??=? ';
    }, '').substr(3);
    const sql = `update ?? set ${dataStr} where ${paramStr}`;
    const rows = await query(sql, values);
    return rows;
  },
  async updateOrInsert(table, list, updateMap, query) {
    list = list.map((row)=>this.camelToUnderlineTransform(row));
    updateMap = this.camelToUnderlineTransform(updateMap);
    let propStr = '';
    const propArr = [];
    let valuesStr = '';
    const valuesArr = [];
    let updateStr = '';
    const updateArr = [];
    const values = [table];
    list.forEach((row, index)=>{
      let valueStr = '';
      Object.keys(row).forEach((key)=>{
        if (!index) {
          propStr += ',??';
          propArr.push(key);
        }
        valueStr+=',?';
        valuesArr.push(row[key]);
      });
      valuesStr += `,(${valueStr.substr(1)})`;
    });
    Object.keys(updateMap).forEach((key)=>{
      if (updateMap[key] === 0) {
        updateStr+=',?? = values(??)';
        updateArr.push(key, key);
      }
      if (updateMap[key] === 1) {
        updateStr+=',?? =?? + values(??)';
        updateArr.push(key, key, key);
      }
      if (!updateMap[key] === -1) {
        updateStr+=',?? =?? - values(??)';
        updateArr.push(key, key, key);
      }
    });
    const sql = `
    INSERT INTO ??(${propStr.substr(1)})
    values ${valuesStr.substr(1)}
    ON DUPLICATE KEY UPDATE ${updateStr.substr(1)};
    `;
    values.push(...propArr);
    values.push(...valuesArr);
    values.push(...updateArr);
    const rows = await query(sql, values);
    return rows;
  },
  async list(table, param, query) {
    param = this.camelToUnderlineTransform(param);
    const values = [table];
    let queryStr = Object.keys(param).reduce((a, key)=>{
      if (Object.prototype.toString.call(param[key]) === '[object Array]') {
        const str = param[key].reduce((a, b) => a+',?', '').substr(1);
        if (param[key].length) {
          values.push(key, ...param[key]);
          return a+`and ?? in (${str}) `;
        }
      }
      if (param[key] !== '' && param[key] !== null && param[key] !== undefined) {
        values.push(key, param[key]);
        return a+'and ?? = ? ';
      }
      return a;
    }, '').substr(3);
    if (queryStr) {
      queryStr= ' where '+queryStr;
    }
    const sql = `select * from ?? ${queryStr}`;

    return await query(sql, values);
  },
  async page(table, param, query) {
    param = this.camelToUnderlineTransform(param);
    const size = Number(param.size);
    const current = Number(param.current);
    let total = Number(param.total);
    delete param.size;
    delete param.current;
    delete param.total;
    const values = [table];
    let queryStr = Object.keys(param).reduce((a, key)=>{
      if (Object.prototype.toString.call(param[key]) === '[object Array]') {
        const str = param[key].reduce((a, b) => a+',?', '').substr(1);
        if (param[key].length) {
          values.push(key, ...param[key]);
          return a+`and ?? in (${str}) `;
        }
      }
      if (param[key] !== '' && param[key] !== null && param[key] !== undefined) {
        values.push(key, param[key]);
        return a+'and ??=? ';
      }
      return a;
    }, '').substr(3);
    if (queryStr) {
      queryStr= ' where '+queryStr;
    }
    let sql = `select * from ?? ${queryStr} order by id desc`;
    if (total === 0) {
      total= await this.getCount(sql, [...values], query);
    }
    sql += ` limit ?,?`;
    values.push((current-1)*size, size);
    const records= await query(sql, values);
    return {
      current,
      size,
      total,
      records,
    };
  },
};

module.exports = util;
