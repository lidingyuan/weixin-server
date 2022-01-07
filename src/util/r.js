const r = {
  ok: (data)=>{
    return {
      code: 0,
      data,
    };
  },
  err: (msg)=>{
    return {
      code: -1,
      msg,
    };
  },
};


module.exports = r;
