// Test libraries dependencies
const assert = require('chai').assert;
const sinon = require('sinon');

const {
  ClientService,
} = require('../scalardl-web-client-sdk');
const {
  IllegalArgumentError,
} = require('../illegal_argument_error');

const {
  CertificateRegistrationRequest,
  ContractRegistrationRequest,
  LedgerValidationRequest,
  ContractsListingRequest,
} = require('../scalar_pb.js');

const clientProperties = {
  'scalar.ledger.client.server_host': 'localhost',
  'scalar.ledger.client.server_port': '80',
  'scalar.ledger.client.private_key_pem': 'key',
  'scalar.ledger.client.cert_pem': 'cert',
  'scalar.ledger.client.cert_holder_id': 'hold',
  'scalar.ledger.client.cert_version': 3,
};

describe('The constructor', () => {
  describe('should throw an error', () => {
    // arrange
    it('when the private key is missing', () => {
      const clientProperties = {
        'scalar.ledger.client.server_host': 'localhost',
        'scalar.ledger.client.server_port': '80',
        // "scalar.ledger.client.private_key_pem": "key",
        'scalar.ledger.client.cert_pem': 'cert',
        'scalar.ledger.client.cert_holder_id': 'hold',
      };
      // act
      // assert
      assert.throws(() => {
        new ClientService(clientProperties);
      }, IllegalArgumentError, 'private_key_pem');
    });
    it('when the certificate is missing', () => {
      // arrange
      const clientProperties = {
        'scalar.ledger.client.server_host': 'localhost',
        'scalar.ledger.client.server_port': '80',
        'scalar.ledger.client.private_key_pem': 'key',
        // 'scalar.ledger.client.cert_pem': 'cert',
        'scalar.ledger.client.cert_holder_id': 'hold',
      };
      // act
      // assert
      assert.throws(() => {
        new ClientService(clientProperties);
      }, IllegalArgumentError, 'cert_pem');
    });
    it('when holder id is missing', () => {
      // arrange
      const clientProperties = {
        'scalar.ledger.client.server_host': 'localhost',
        'scalar.ledger.client.server_port': '80',
        'scalar.ledger.client.private_key_pem': 'key',
        'scalar.ledger.client.cert_pem': 'cert',
        // 'scalar.ledger.client.cert_holder_id': 'hold',
      };
      // act
      // assert
      assert.throws(() => {
        new ClientService(clientProperties);
      }, IllegalArgumentError, 'cert_holder_id');
    });
  });
});

describe('RegisterCertificate', () => {
  describe('should work properly', () => {
    it('when called with all the parameters', async () => {
      // arrange
      const request = new CertificateRegistrationRequest();
      request.setCertHolderId(
          clientProperties['scalar.ledger.client.cert_holder_id']);
      request.setCertVersion(
          clientProperties['scalar.ledger.client.cert_version']);
      request.setCertPem(
          clientProperties['scalar.ledger.client.cert_pem']);
      const service = new ClientService(clientProperties);

      const clientMock = sinon.mock(service.client);
      await clientMock.expects('registerCert')
          .once()
          .withExactArgs(request, {});
      // act
      service.registerCertificate();
      // assert
      clientMock.verify();
    });
  });
});

describe('RegisterContract', () => {
  describe('should throw an error', () => {
    it('when contractBytes is not a Uint8Array', async () => {
      // arrange
      const service = new ClientService(clientProperties);
      try {
        // act
        await service.registerContract('contract1', 'foo', 'wrongType');
      } catch (e) {
        // assert
        assert.instanceOf(e, IllegalArgumentError);
      }
    });
  });
  describe('should work properly', () => {
    it('when called with all the parameters', async () => {
      const service = new ClientService(clientProperties);
      const id = 'contract1';
      const name = 'foo';
      const contractBytes = new TextEncoder('code').encode('¢');

      const requestSignature = 'fakeRequestSignature';
      const request = new ContractRegistrationRequest();
      request.setContractId(id);
      request.setContractBinaryName(name);
      request.setContractByteCode(contractBytes);
      request.setContractProperties(JSON.stringify({}));
      request.setCertHolderId(
          clientProperties['scalar.ledger.client.cert_holder_id']);
      request.setCertVersion(
          clientProperties['scalar.ledger.client.cert_version']);
      request.setSignature(requestSignature);
      const clientMock = sinon.mock(service.client);
      const signStub = sinon.stub(service.signer, 'sign');

      signStub.returns(requestSignature);

      clientMock.expects('registerContract').once().withExactArgs(request, {});
      service.registerContract(id, name, contractBytes, {});
      clientMock.verify();
    });
  });
});

describe('ListContract', () => {
  describe('should work properly', () => {
    it('when called with a contract id', async () => {
      // arrange
      const service = new ClientService(clientProperties);
      const contractId = 'contract1';
      const requestSignature = 'fakeRequestSignature';

      const request = new ContractsListingRequest();
      request.setCertHolderId(
          clientProperties['scalar.ledger.client.cert_holder_id']);
      request.setCertVersion(
          clientProperties['scalar.ledger.client.cert_version']);
      request.setContractId(contractId);
      request.setSignature(requestSignature);

      const clientMock = sinon.mock(service.client);
      // stub the 'sign' method of the signer to return a dummy signature when
      // executed
      const signStub = sinon.stub(service.signer, 'sign');
      signStub.returns(requestSignature);
      clientMock.expects('listContracts').once().withExactArgs(request, {});
      // act
      service.listContracts(contractId);
      // assert
      clientMock.verify();
    });
  });
});

describe('ValidateLedger', () => {
  describe('should work properly', () => {
    it('when called with an asset id', async () => {
      // arrange
      const service = new ClientService(clientProperties);
      const assetId = 'asset1';
      const requestSignature = 'fakeRequestSignature';

      const request = new LedgerValidationRequest();
      request.setCertHolderId(
          clientProperties['scalar.ledger.client.cert_holder_id']);
      request.setCertVersion(
          clientProperties['scalar.ledger.client.cert_version']);
      request.setAssetId(assetId);
      request.setSignature(requestSignature);

      const clientMock = sinon.mock(service.client);
      const signStub = sinon.stub(service.signer, 'sign');

      signStub.returns(requestSignature);
      clientMock.expects('validateLedger').once().withExactArgs(request, {});
      // act
      service.validateLedger(assetId);
      // assert
      clientMock.verify();
    });
  });
});

describe('ExecuteContract', () => {
  describe('should work properly', () => {
    it('when called with all the parameters', async () => {
      // arrange
      const service = new ClientService(clientProperties);
      const contractId = 'contract1';
      const argument = {arg1: true, arg2: 'foo'};
      const requestSignature = 'fakeRequestSignature';
      const signStub = sinon.stub(service.signer, 'sign');
      signStub.returns(requestSignature);
      sinon.spy(service.client, 'executeContract');
      // act
      service.executeContract(contractId, argument);
      // assert
      assert.isTrue(service.client.executeContract.calledOnce);
      const requestParam = service.client.executeContract.getCall(0).args[0];

      assert.strictEqual(requestParam.getContractId(), contractId);
      assert.strictEqual(requestParam.getCertHolderId(),
          clientProperties['scalar.ledger.client.cert_holder_id']);
      assert.strictEqual(requestParam.getCertVersion(),
          clientProperties['scalar.ledger.client.cert_version']);
      assert.strictEqual(requestParam.getSignature(), requestSignature);
      const requestArg = JSON.parse(requestParam.getContractArgument());
      assert.strictEqual(requestArg.arg1, argument.arg1);
      assert.strictEqual(requestArg.arg2, argument.arg2);
      // cannot verify the nonce as it a timestamp generated at runtime
      assert.exists(requestArg.nonce);

      assert.deepEqual(service.client.executeContract.getCall(0).args[1], {});
    });
  });
});
