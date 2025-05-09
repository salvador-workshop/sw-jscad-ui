// found declaration style on SO:
// https://stackoverflow.com/a/5251506
function SwError(message) {
    this.name = 'SwError';
    this.message = message;
    this.stack = (new Error()).stack;
}

function SwInputError(message) {
    this.name = 'SwInputError';
    this.message = message;
    this.stack = (new Error()).stack;
}

SwInputError.prototype = new Error;

const errors = {
    SwError,
    SwInputError,
}

module.exports = errors;
