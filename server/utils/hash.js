const crypto = require("crypto");

function hashPhoneNumber(phone) {
  return crypto.createHash("sha256").update(phone).digest("hex");
}

module.exports = hashPhoneNumber;
