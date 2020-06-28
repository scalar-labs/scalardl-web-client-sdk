const {toCryptoKeyFrom, toPkcs8From} = require('./lib/keyutil');
const Dexie = require('dexie').default;
const KEYSTORE_DATABASE_NAME = 'scalar';
const {
  ClientProperties,
  ClientPropertiesField,
} = require('@scalar-labs/scalardl-javascript-sdk-base');

/**
 * @description
 *  This class delegates two functions related indexedDB to for ClientService
 */
class ClientServiceWithIndexedDb {
  /**
     * @param {ClientService} clientService
     * @return {ClientService}
     */
  constructor(clientService) {
    /**
       * @description
       *  Use indexedDB and check if it is necessary to load keys for the users
       * @throws {Error}
       */
    const getIndexedDb = async function() {
      const db = new Dexie(KEYSTORE_DATABASE_NAME);
      db.version(1).stores({keystore: 'id'});
      const clientProperties = new ClientProperties(
          this.properties,
          [
            ClientPropertiesField.CERT_HOLDER_ID,
            ClientPropertiesField.CERT_VERSION,
          ], // cert_holder_id cert_version are required
      );
      const cryptoKey = clientProperties.getPrivateKeyCryptoKey();
      const pem = clientProperties.getPrivateKeyPem();
      const keyId = `${clientProperties.getCertHolderId()}_` +
          `${clientProperties.getCertVersion()}`;

      let key;
      try {
        if (cryptoKey || pem) {
          key = cryptoKey || await toCryptoKeyFrom(toPkcs8From(pem));
          await db.keystore.put({id: keyId, key: key});
        } else {
          const item = await db.keystore.get(keyId);
          key = item && item.key;
        }
      } catch (e) {
        if (e instanceof Dexie.DexieError) {
          throw new Error(`The indexedDB operation is failed: ${e.message}`);
        } else {
          throw e;
        }
      }

      if (!(key instanceof CryptoKey)) {
        throw new Error('Key is not found in the indexedDB');
      }

      this.properties['scalar.dl.client.private_key_cryptokey'] = key;
      delete this.properties['scalar.dl.client.private_key_pem'];
    }.bind(clientService);

    /**
       * @description
       *  Remove the private key stored in indexedDB for `cert_holder_id`
       */
    const deleteIndexedDb = async function() {
      const db = new Dexie(KEYSTORE_DATABASE_NAME);
      db.version(1).stores({keystore: 'id'});
      const clientProperties = new ClientProperties(
          this.properties,
          [
            ClientPropertiesField.CERT_HOLDER_ID,
            ClientPropertiesField.CERT_VERSION,
          ], // cert_holder_id and cert_version are required
      );
      const keyId = `${clientProperties.getCertHolderId()}_` +
          `${clientProperties.getCertVersion()}`;

      try {
        await db.keystore.delete(keyId);
      } catch (e) {
        throw new Error(`The indexedDB operation is failed: ${e.message}`);
      }
    }.bind(clientService);

    clientService.deleteIndexedDb = deleteIndexedDb;
    clientService.getIndexedDb = getIndexedDb;

    return (async () => {
      await getIndexedDb();
      return clientService;
    })();
  }
}

module.exports = {
  ClientServiceWithIndexedDb,
};
