const { tables, purposes } = require('../../../../common/enum-helper');

class TransactionRepository {
  constructor({ knexInstance }) {
    this.knex = knexInstance;
    this.modelPresenter = this.modelPresenter;
  }

  async create(data) {
    const { knex, neode, modelPresenter } = this;
    const customer = modelPresenter.in(Object.assign({}, data.customer));
    const beneficiary = modelPresenter.in(Object.assign({}, data.beneficiary));

    let customerDocumentNumber = await knex
      .select('document_number')
      .from(tables.customer)
      .then((rows = []) => rows[0]);

    let beneficiaryBankAccountCode = await knex
      .select('bank_account_code')
      .from(tables.beneficiary)
      .then((rows = []) => rows[0]);

    if (!customerDocumentNumber) {
      customerDocumentNumber = await knex(tables.customer)
        .insert(customer, ['document_number'])
        .then((rows = []) => rows[0].document_number);
    }

    if (!beneficiaryBankAccountCode) {
      beneficiaryBankAccountCode = await knex(tables.customer)
        .insert(beneficiary, ['bank_account_code'])
        .then((rows = []) => rows[0].bank_account_code);
    }

    if (data.purpose_id === purposes.OWN_ACCOUNT_ABROAD) {
      knex(tables.beneficiary)
        .where('bank_account_code', beneficiaryBankAccountCode)
        .update('customer_document_number', customerDocumentNumber);
    }

    const transaction = modelPresenter.in(Object.assign({}, data, {
      customerDocumentNumber,
      beneficiaryBankAccountCode
    }));

    delete transaction.customer;
    delete transaction.beneficiary;

    await knex(tables.transaction)
      .insert(transaction)
      .then((rows = []) => rows[0]);

    const {
      customer: customerOgmInstance,
      beneficiary: beneficiaryOgmInstance,
      transction: transactionOgmInstance
    } = this.buildOgmFromJson({ transaction, customer, beneficiary });

    // CYPHER INSERT
    await neode.mergeOn('customer', { document_number: customerDocumentNumber }, customerOgmInstance);
    await neode.mergeOn('beneficiary', { bank_account_code: beneficiaryBankAccountCode }, beneficiaryOgmInstance);
    neode.create('transaction', transactionOgmInstance);
  }
}

module.exports = TransactionRepository;
