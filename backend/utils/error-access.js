const { ERROR_ACCESS } = require('./status-code');

class ErrorAccess extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_ACCESS;
    this.name = 'ErrorAccess';
  }
}

module.exports = ErrorAccess;
