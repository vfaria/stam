const beneficiaryOGM = {
  bank_account_code: {
    primary: true,
    type: 'string',
    required: true
  },
  name: {
    type: 'string',
    required: true
  },
  country: {
    type: 'string',
    required: true
  },
  customer_document_number: {
    type: 'string'
  },
  receives: {
    type: 'relationship',
    target: 'Customer',
    relationship: 'transaction',
    direction: 'in',
    properties: {

    }
  }
};

module.exports = beneficiaryOGM;
