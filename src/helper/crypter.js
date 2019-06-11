const Cryptr = require('cryptr');
const settings = require('../../config/settings');

const crypter = new Cryptr(settings.crypter.secret, settings.crypter.algorithm);

module.exports = {
  encrypt: (data, key) => crypter.encrypt(String(`${data}${key}`)),
  decrypt: (data, key) => parseInt(crypter.decrypt(data).replace(key, ''), 10)
};
