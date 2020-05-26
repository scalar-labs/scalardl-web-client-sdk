const Dexie = require('dexie').default;

const DATABASE_NAME = 'scalar';

/** @description A keystore based on indexedDB */
class Keystore {
  /** @description connect to indexedDB and preserve the instance */
  constructor() {
    this.db = new Dexie(DATABASE_NAME);
    this.db.version(1).stores({keystore: 'id'});
  }

  /**
   * @param {String} id
   * @param {CryptoKey} key
   * @throws {Error} if key is not an instance of CryptoKey
   */
  async put(id, key) {
    if (typeof id !== 'string') {
      throw new Error('`id` is not a String');
    }
    if (!key || !(key instanceof CryptoKey)) {
      throw new Error('`key` is not a CryptoKey');
    }

    this.db.keystore.put({
      id: id,
      key: key,
    });
  }

  /**
   * @param {String} id
   * @return {CryptoKey|null} null if not key exists for the id
   */
  async get(id) {
    if (typeof id !== 'string') {
      throw new Error('`id` is not a String');
    }

    const item = await this.db.keystore.get(id);

    return (item && item.key) ? item.key : null;
  }

  /**
   * @param {String} id
   */
  async delete(id) {
    if (typeof id !== 'string') {
      throw new Error('`id` is not a String');
    }

    this.db.keystore.delete(id);
  }
}

module.exports = {
  Keystore,
};
