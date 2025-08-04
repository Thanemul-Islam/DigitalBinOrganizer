const crypto = require('crypto');

function hashPhone(phone) {
  return crypto.createHash('sha256').update(phone).digest('hex');
}

module.exports = { hashPhone };
