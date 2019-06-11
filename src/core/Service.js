const { BeeService } = require('@beetech/bee-server-entities');
const validator = require('../common/validator');

class Service extends BeeService {
  constructor(params) {
    super({
      ...params,
      validator
    });
  }
}

module.exports = Service;
