const enumHelper = Object.freeze({
  tables: {
    customer: 'customer',
    beneficiary: 'beneficiary',
    transaction: 'transaction',
    report: 'report',
    graphQuery: 'graph_query',
    scoreLevel: 'score_level',
    purpose: 'purpose',
    flag: 'flag',
    flagsOnCustomer: 'flags_on_customer',
    flagsOnBeneficiary: 'flags_on_beneficiary',
    flagsOnReport: 'flags_on_report',
    flagType: 'flag_type',
  },
  purposes: {
    RESIDENT_MAINTENANCE: 1,
    OWN_ACCOUNT_ABROAD: 2
  }
});

module.exports = enumHelper;
