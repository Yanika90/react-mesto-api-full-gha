const { NOT_FOUND } = require('./status-code');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = 'NotFound';
  }
}

module.exports = NotFound;
