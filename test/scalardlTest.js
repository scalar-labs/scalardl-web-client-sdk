let {
  ClientService,
} = require('../scalardl');
let {
  IllegalArgumentError,
} = require('../illegal_argument_error');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('The constructor', () => {
  describe('should throw an error', () => {
    it('when the private key is missing', () => {
      const clientProperties = {
        // "scalar.ledger.client.private_key_pem": "key",
        'scalar.ledger.client.cert_pem': 'cert',
        'scalar.ledger.client.cert_holder_id': 'hold',
      };
      assert.throws(() => {
        let service = new ClientService(clientProperties);
      }, IllegalArgumentError, 'private_key_pem');
    });
    it('when the certificate is missing', () => {
      const clientProperties = {
        'scalar.ledger.client.private_key_pem': 'key',
        // 'scalar.ledger.client.cert_pem': 'cert',
        'scalar.ledger.client.cert_holder_id': 'hold',
      };
      assert.throws(() => {
        let service = new ClientService(clientProperties);
      }, IllegalArgumentError, 'cert_pem');
    });
    it('when holder id is missing', () => {
      const clientProperties = {
        'scalar.ledger.client.private_key_pem': 'key',
        'scalar.ledger.client.cert_pem': 'cert',
        // 'scalar.ledger.client.cert_holder_id': 'hold',
      };
      assert.throws(() => {
        let service = new ClientService(clientProperties);
      }, IllegalArgumentError, 'cert_holder_id');
    });
  });
});
it('Register contract should throw an error when contractBytes is not a Uint8Array',
    async () => {
      const clientProperties = {
        'scalar.ledger.client.private_key_pem': 'key',
        'scalar.ledger.client.cert_pem': 'cert',
        'scalar.ledger.client.cert_holder_id': 'hold',
      };
      let service = new ClientService(clientProperties);
      service.client = 'toto';
      try {
        await service.registerContract('contract1', 'foo', 'wrongType');
      } catch (e) {
        assert.instanceOf(e, IllegalArgumentError);
      }
    });