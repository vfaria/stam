
const enumHelper = Object.freeze({
  tables: {
    transaction: 'transaction',
    transactionStatus: 'transaction_status',
  },
  transactionStatus: {
    active: {
      value: 1,
      name: 'active'
    },
    inactive: {
      value: 2,
      name: 'inactive'
    }
  },
});

module.exports = enumHelper;
