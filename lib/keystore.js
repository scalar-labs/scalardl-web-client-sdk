const Dexie = require('dexie').default;

/** @description A keystore based on indexedDB */
class Keystore {
  /**
   * @description connect to indexedDB and preserve the instance
   * @param {String} databaseName the database to put keystore
   * @throws {Error} if databaseName is not string
   */
  constructor(databaseName) {
    if (typeof databaseName !== 'string') {
      throw new Error('`databaseName` is not a String');
    }

    this.db = new Dexie(databaseName);
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

    await this.db.keystore.put({
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

    await this.db.keystore.delete(id);
  }
}

module.exports = {
  Keystore,
};