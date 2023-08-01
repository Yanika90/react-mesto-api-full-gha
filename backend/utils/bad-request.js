const { BAD_REQUEST } = require('./status-code');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.name = 'BadRequest';
  }
}

module.exports = BadRequest;
