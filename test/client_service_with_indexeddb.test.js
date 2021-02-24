const {
  ClientService,
  ClientServiceWithIndexedDb,
  IndexedDbKeyNotFoundError,
} = require('../scalardl-web-client-sdk');

const chai = require('chai');
chai.use(require('chai-as-promised'));

const Dexie = require('dexie').default;

let generatedKeyPair;
let db;

describe('ClientServiceWithIndexedDb', function() {
  beforeEach(async function() {
    db = new Dexie('scalar');
    db.version(1).stores({keystore: 'id'});
    generatedKeyPair = await window.crypto.subtle.generateKey(
        {name: 'ECDSA', namedCurve: 'P-256'},
        false, // cannot extractable
        ['sign', 'verify'],
    );
  });

  describe('#getIndexedDb()', function() {
    it('should work if key is stored', async function() {
      const privateKey = generatedKeyPair.privateKey;
      const certHolderId = `${new Date().getTime()}`;
      const certVersion = 1;
      const keyId = `${certHolderId}_${certVersion}`;
      db.keystore.put({id: keyId, key: privateKey});

      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 50051,
        'scalar.dl.client.server.privileged_port': 50052,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
      };

      const clientService = await new ClientServiceWithIndexedDb(
          new ClientService(properties)
      );
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
        'scalar.dl.client.server.port': 80,
        'scalar.dl.client.server.privileged_port': 8080,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
        'scalar.dl.client.private_key_pem': '-----BEGIN EC PRIVATE KEY-----\n' +
          'MHcCAQEEICcJGMEw3dyXUGFu/5a36HqY0ynZi9gLUfKgYWMYgr/IoAoGCCqGSM49\n' +
          'AwEHoUQDQgAEBGuhqumyh7BVNqcNKAQQipDGooUpURve2dO66pQCgjtSfu7lJV20\n' +
          'XYWdrgo0Y3eXEhvK0lsURO9N0nrPiQWT4A==\n' +
          '-----END EC PRIVATE KEY-----\n',
        'scalar.dl.client.cert_pem': '-----BEGIN CERTIFICATE-----\n' +
          'MIICizCCAjKgAwIBAgIUMEUDTdWsQpftFkqs6bCd6U++4nEwCgYIKoZIzj0EAwIw\n' +
          'bzELMAkGA1UEBhMCSlAxDjAMBgNVBAgTBVRva3lvMQ4wDAYDVQQHEwVUb2t5bzEf\n' +
          'MB0GA1UEChMWU2FtcGxlIEludGVybWVkaWF0ZSBDQTEfMB0GA1UEAxMWU2FtcGxl\n' +
          'IEludGVybWVkaWF0ZSBDQTAeFw0xODA5MTAwODA3MDBaFw0yMTA5MDkwODA3MDBa\n' +
          'MEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJ\n' +
          'bnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC\n' +
          'AAQEa6Gq6bKHsFU2pw0oBBCKkMaihSlRG97Z07rqlAKCO1J+7uUlXbRdhZ2uCjRj\n' +
          'd5cSG8rSWxRE703Ses+JBZPgo4HVMIHSMA4GA1UdDwEB/wQEAwIFoDATBgNVHSUE\n' +
          'DDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRDd2MS9Ndo68PJ\n' +
          'y9K/RNY6syZW0zAfBgNVHSMEGDAWgBR+Y+v8yByDNp39G7trYrTfZ0UjJzAxBggr\n' +
          'BgEFBQcBAQQlMCMwIQYIKwYBBQUHMAGGFWh0dHA6Ly9sb2NhbGhvc3Q6ODg4OTAq\n' +
          'BgNVHR8EIzAhMB+gHaAbhhlodHRwOi8vbG9jYWxob3N0Ojg4ODgvY3JsMAoGCCqG\n' +
          'SM49BAMCA0cAMEQCIC/Bo4oNU6yHFLJeme5ApxoNdyu3rWyiqWPxJmJAr9L0AiBl\n' +
          'Gc/v+yh4dHIDhCrimajTQAYOG9n0kajULI70Gg7TNw==\n' +
          '-----END CERTIFICATE-----\n',
      };
      const keyId = `${certHolderId}_${certVersion}`;

      const before = await db.keystore.get(keyId); ;
      const clientService = await new ClientServiceWithIndexedDb(
          new ClientService(properties)
      );
      const after = await db.keystore.get(keyId); ;

      chai.assert.equal(undefined, before);
      chai.assert.notEqual(undefined, after);
      await chai.expect(clientService.registerCertificate()).to.not.be.rejected;
      await chai.expect(clientService.validateLedger('foo', 0, 1)).to.not.be.rejected;
    });

    it('should work to store CryptoKey', async function() {
      const certHolderId = `${new Date().getTime()}`;
      const certVersion = 1;
      const key = generatedKeyPair.privateKey;
      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 50051,
        'scalar.dl.client.server.privileged_port': 50052,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
        'scalar.dl.client.private_key_cryptokey': key,
      };
      const keyId = `${certHolderId}_${certVersion}`;

      const before = await db.keystore.get(keyId); ;
      await new ClientServiceWithIndexedDb(
          new ClientService(properties)
      );
      const after = await db.keystore.get(keyId); ;

      chai.assert.equal(undefined, before);
      chai.assert.notEqual(undefined, after);
    });

    it('should be able to throw IndexedDbKeyNotFoundError', async function() {
      const certHolderId = `${new Date().getTime()}`;
      const certVersion = 1;
      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 50051,
        'scalar.dl.client.server.privileged_port': 50052,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
      };

      await chai.expect(new ClientServiceWithIndexedDb(
          new ClientService(properties)
      )).to.be.rejectedWith(IndexedDbKeyNotFoundError);
    });
  });

  describe('#deleteIndexedDb', function() {
    it('shoud work fine', async function() {
      const privateKey = generatedKeyPair.privateKey;
      const certHolderId = `${new Date().getTime()}`;
      const certVersion = 1;
      const keyId = `${certHolderId}_${certVersion}`;
      db.keystore.put({id: keyId, key: privateKey});
      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 50051,
        'scalar.dl.client.server.privileged_port': 50052,
        'scalar.dl.client.cert_holder_id': certHolderId,
        'scalar.dl.client.cert_version': certVersion,
      };

      const clientService = await new ClientServiceWithIndexedDb(
          new ClientService(properties)
      );
      const before = await db.keystore.get(keyId);
      await clientService.deleteIndexedDb();
      const after = await db.keystore.get(keyId);

      chai.assert.notEqual(undefined, before);
      chai.assert.equal(undefined, after);
    });
  });
});
