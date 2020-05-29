const {
  ClientServiceBase,
  StatusCode,
  ClientProperties,
  ClientPropertiesField,
} = require('@scalar-labs/scalardl-javascript-sdk-base');

const protobuf = require('./scalar_pb');
const {LedgerClient, LedgerPrivilegedClient} = require('./scalar_grpc_web_pb');

const {SignerFactory} = require('./signer');
const {Keystore} = require('./lib/keystore');
const {toCryptoKeyFrom, toPkcs8From} = require('./lib/keyutil');

const KEYSTORE_DATABASE_NAME = 'scalar';

/**
 * This class inherits ClientServiceBase.
 * It needs to be constructed with LedgerClient
 * and protobuf messages that generated by gRPC tools
 * @class
 */
class ClientService extends ClientServiceBase {
  /**
   * Inject LedgerClient and protobuf messages
   * @constructor
   * @param {Object} properties JSON Object used for setting client properties
   */
  constructor(properties) {
    const clientProperties = new ClientProperties(
        properties,
        [
          ClientPropertiesField.SERVER_HOST,
          ClientPropertiesField.SERVER_PORT,
          ClientPropertiesField.SERVER_PRIVILEGED_PORT,
        ],
    );

    const host = clientProperties.getServerHost();
    const tlsEnabled = clientProperties.getTlsEnabled();
    const ledgerClientServiceURL =
      `${tlsEnabled ? 'https' : 'http'}://${host}:${clientProperties.getServerPort()}`;
    const ledgerPriviledgedClientServiceURL =
      `${tlsEnabled ? 'https' : 'http'}://${host}:${clientProperties.getServerPrivilegedPort()}`;

    const services = {
      ledgerClient: new LedgerClient(ledgerClientServiceURL),
      ledgerPrivileged: new LedgerPrivilegedClient(
          ledgerPriviledgedClientServiceURL,
      ),
      signerFactory: new SignerFactory(),
    };

    super(services, protobuf, properties);
  }

  /**
   * @description initiate indexedDB
   *  and check if it is necessary to load keys for the users
   */
  async enableIndexedDB() {
    const keystore = new Keystore(KEYSTORE_DATABASE_NAME);
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
    if (cryptoKey || pem) {
      key = cryptoKey || await toCryptoKeyFrom(toPkcs8From(pem));
      await keystore.put(keyId, key);
    } else {
      key = await keystore.get(keyId);
      if (!key) {
        throw new Error('Key is not found in keystore');
      }
    }

    this.properties['scalar.dl.client.private_key_cryptokey'] = key;
  }

  /**
   * @description
   *  Remove the private key stored in indexedDB for `cert_holder_id`
   */
  async removeCachedPrivateKey() {
    const keystore = new Keystore(KEYSTORE_DATABASE_NAME);
    const clientProperties = new ClientProperties(
        this.properties,
        [
          ClientPropertiesField.CERT_HOLDER_ID,
          ClientPropertiesField.CERT_VERSION,
        ], // cert_holder_id and cert_version are required
    );
    const keyId = `${clientProperties.getCertHolderId()}_` +
      `${clientProperties.getCertVersion()}`;

    await keystore.delete(keyId);
  }
}

module.exports = {
  ClientService,
  StatusCode,
};
