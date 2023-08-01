const { UNAUTHORIZED } = require('./status-code');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
    this.name = 'Unauthorized';
  }
}

module.exports = Unauthorized;
