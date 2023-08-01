const { NOT_UNIQUE } = require('./status-code');

class NotUnique extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_UNIQUE;
    this.name = 'NotUnique';
  }
}

module.exports = NotUnique;
