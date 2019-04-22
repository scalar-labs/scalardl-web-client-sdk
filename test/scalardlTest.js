let {
  ClientService,
} = require('../scalardl-web-client-sdk');
let {
  IllegalArgumentError,
} = require('../illegal_argument_error');
var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');

const {
  CertificateRegistrationRequest,
  ContractRegistrationRequest,
  ContractExecutionRequest,
  LedgerValidationRequest,
  ContractsListingRequest,
} = require('../scalar_pb.js');

const clientProperties = {
  'scalar.ledger.client.server_host': 'localhost',
  'scalar.ledger.client.server_port': '80',
  'scalar.ledger.client.private_key_pem': 'key',
  'scalar.ledger.client.cert_pem': 'cert',
  'scalar.ledger.client.cert_holder_id': 'hold',
};

describe('The constructor', () => {
  describe('should throw an error', () => {
    it('when the private key is missing', () => {
      const clientProperties = {
        'scalar.ledger.client.server_host': 'localhost',
        'scalar.ledger.client.server_port': '80',
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
        'scalar.ledger.client.server_host': 'localhost',
        'scalar.ledger.client.server_port': '80',
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
        'scalar.ledger.client.server_host': 'localhost',
        'scalar.ledger.client.server_port': '80',
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

describe('RegisterContract', () => {
  describe('should throw an error', () => {
    it('when contractBytes is not a Uint8Array', async () => {
      let service = new ClientService(clientProperties);
      try {
        await service.registerContract('contract1', 'foo', 'wrongType');
      } catch (e) {
        assert.instanceOf(e, IllegalArgumentError);
      }
    });
  });
  describe('should register the user without a cert version', () => {
    it('when the version is not set in the properties', async () => {
      const request = new CertificateRegistrationRequest();
      request.setCertHolderId(
          clientProperties['scalar.ledger.client.cert_holder_id']);
      request.setCertVersion();
      request.setCertPem(
          clientProperties['scalar.ledger.client.cert_pem']);
      let service = new ClientService(clientProperties);

      const clientMock = sinon.mock(service.client);
      await clientMock.expects('registerCert').once().withArgs(request, {});
      service.registerCertificate();
      clientMock.verify();
    });
  });
});
