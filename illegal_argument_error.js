/**
 * This class is used to create illegal argument errors.
 * @extends {Error}
 */
class IllegalArgumentError extends Error {
  /**
   * @override
   * @param {string} args
   */
  constructor(...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IllegalArgumentError);
    }
    this.name = 'IllegalArgumentError';
  }
}

module.exports = {
  IllegalArgumentError,
};
