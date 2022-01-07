module.exports = {
  SECRET_KEY: 'dingxin',
  TOKEN: 'User-Token',
  ORDER_STATE: {
    confirmed: 0,
    toBeConfirmed: 1,
    toBeConfirmedByOther: 2,
    withdraw: 3,
    toBeWithdraw: 4,
    toBeWithdrawByOther: 5,
    trans(state) {
      const map = {
        1: 0,
        4: 3,
      };
      return map[state];
    },
  },
  ORDER_TYPE: {
    output: 1,
    input: 2,
    map: {
      1: 2,
      2: 1,
    },
    trans(type) {
      return this.map[type];
    },
  },
};
