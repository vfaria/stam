const customerOGM = {
  document_number: {
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
  nature: {
    type: 'string',
    required: true
  },
  date_of_birth: {
    type: 'string',
    required: true
  },
  address_line: {
    type: 'string',
    required: true
  },
  sends: {
    type: 'relationship',
    target: 'Beneficiary',
    relationship: 'transaction',
    direction: 'out',
    properties: {
      amount: 'decimal',
      currency: 'string',
      date: 'string',
      purpose: 'string',
      rdmsId: 'string'
    }
  }
};

module.exports = customerOGM;
