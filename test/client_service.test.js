const {ClientService} = require('../scalardl-web-client-sdk');
const {Keystore} = require('../lib/keystore');

const chai = require('chai');
chai.use(require('chai-as-promised'));

let keystore;
let generatedKeyPair;

describe('ClientService', function() {
  beforeEach(async function() {
    keystore = new Keystore('scalar');
    generatedKeyPair = await window.crypto.subtle.generateKey(
        {name: 'ECDSA', namedCurve: 'P-256'},
        false, // cannot extractable
        ['sign', 'verify'],
    );
  });

  describe('#constructor()', function() {
    it('should work if key is stored when indexedDB is enabled',
        async function() {
          const privateKey = generatedKeyPair.privateKey;
          const certHolderId = `${new Date().getTime()}`;
          const certVersion = 1;
          const keyId = `${certHolderId}_${certVersion}`;
          await keystore.put(keyId, privateKey);
          const properties = {
            'scalar.dl.client.server.host': '127.0.0.1',
            'scalar.dl.client.server.port': 50051,
            'scalar.dl.client.server.privileged_port': 50052,
            'scalar.dl.client.cert_holder_id': certHolderId,
            'scalar.dl.client.cert_version': certVersion,
            'scalar.dl.client.private_key_indexeddb_enabled': true,
          };

          const clientService = await new ClientService(properties);
          const signature = await window.crypto.subtle.sign(
              {name: 'ECDSA', hash: 'SHA-256'},
              clientService.properties[
                  'scalar.dl.client.private_key_cryptokey'
              ],
              new ArrayBuffer([1, 2, 3]),
          );
          const verified = await window.crypto.subtle.verify(
              {name: 'ECDSA', hash: 'SHA-256'},
              generatedKeyPair.publicKey,
              signature,
              new ArrayBuffer([0, 1, 2, 3]),
          );

          chai.assert.equal(true, verified);
        }
    );

    it('should work to store pem', async function() {
      const certHolderId = `${new Date().getTime()}`;
      const certVersion = 1;
      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 50051,
        'scalar.dl.client.server.privileged_port': 50052,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
        'scalar.dl.client.private_key_indexeddb_enabled': true,
        'scalar.dl.client.private_key_pem': '-----BEGIN EC PRIVATE KEY-----\n' +
          'MHcCAQEEICcJGMEw3dyXUGFu/5a36HqY0ynZi9gLUfKgYWMYgr/IoAoGCCqGSM49\n' +
          'AwEHoUQDQgAEBGuhqumyh7BVNqcNKAQQipDGooUpURve2dO66pQCgjtSfu7lJV20\n' +
          'XYWdrgo0Y3eXEhvK0lsURO9N0nrPiQWT4A==\n' +
          '-----END EC PRIVATE KEY-----\n',
      };
      const keyId = `${certHolderId}_${certVersion}`;

      const before = await keystore.get(keyId);
      await new ClientService(properties);
      const after = await keystore.get(keyId);

      chai.assert.equal(null, before);
      chai.assert.notEqual(null, after);
    });

    it('should work to store CryptoKey',
        async function() {
          const certHolderId = `${new Date().getTime()}`;
          const certVersion = 1;
          const key = generatedKeyPair.privateKey;
          const properties = {
            'scalar.dl.client.server.host': '127.0.0.1',
            'scalar.dl.client.server.port': 50051,
            'scalar.dl.client.server.privileged_port': 50052,
            'scalar.dl.client.cert_holder_id': certHolderId,
            'scalar.dl.client.cert_version': certVersion,
            'scalar.dl.client.private_key_indexeddb_enabled': true,
            'scalar.dl.client.private_key_cryptokey': key,
          };
          const keyId = `${certHolderId}_${certVersion}`;

          const before = await keystore.get(keyId);
          await new ClientService(properties);
          const after = await keystore.get(keyId);

          chai.assert.equal(null, before);
          chai.assert.notEqual(null, after);
        }
    );
  });

  describe('#removeCachedPrivateKey', function() {
    it('shoud work fine', async function() {
      const privateKey = generatedKeyPair.privateKey;
      const certHolderId = `${new Date().getTime()}`;
      const certVersion = 1;
      const keyId = `${certHolderId}_${certVersion}`;
      await keystore.put(keyId, privateKey);
      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 50051,
        'scalar.dl.client.server.privileged_port': 50052,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
      };

      const clientService = await new ClientService(properties);
      const before = await keystore.get(keyId);
      await clientService.removeCachedPrivateKey();
      const after = await keystore.get(keyId);

      chai.assert.notEqual(null, before);
      chai.assert.equal(null, after);
    });
  });
});
