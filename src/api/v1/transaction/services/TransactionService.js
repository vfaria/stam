const { BeeService } = require('@beetech/bee-server-entities');

class TransactionService extends BeeService {
  async create({ data, trackingId }) {
    const validations = this.JSONSchema
      ? this.createValidations.concat(this.JSONSchema)
      : this.createValidations;

    await this.validator.validate(data, validations);

    const createdTransaction = await this.repository.create({ data, trackingId });

    const analisys = await this.getAnalisys({ transaction: createdTransaction });

    this.repository.saveAnalisys({ analisys });

    const transactionScore = await this.calculateTransactionScore({
      transaction: createdTransaction,
      analisys
    });

    this.repository.saveTransactionScore({
      transactionId: createdTransaction.id,
      score: transactionScore
    });

    return {
      transaction: createdTransaction,
      analisys
    };
  }
}

module.exports = TransactionService;
