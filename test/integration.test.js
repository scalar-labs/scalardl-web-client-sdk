describe('ClientService', () => {
  const {ClientService} = require('../scalardl-web-client-sdk.js');
  const properties = {
    'scalar.ledger.client.server_host': '127.0.0.1',
    'scalar.ledger.client.server_port': 80,
    'scalar.ledger.client.server_privileged_port': 8080,
    'scalar.ledger.client.cert_holder_id': `foo@${Date.now()}`,
    'scalar.ledger.client.private_key_pem': '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEICcJGMEw3dyXUGFu/5a36HqY0ynZi9gLUfKgYWMYgr/IoAoGCCqGSM49\nAwEHoUQDQgAEBGuhqumyh7BVNqcNKAQQipDGooUpURve2dO66pQCgjtSfu7lJV20\nXYWdrgo0Y3eXEhvK0lsURO9N0nrPiQWT4A==\n-----END EC PRIVATE KEY-----\n',
    'scalar.ledger.client.cert_pem': '-----BEGIN CERTIFICATE-----\nMIICizCCAjKgAwIBAgIUMEUDTdWsQpftFkqs6bCd6U++4nEwCgYIKoZIzj0EAwIw\nbzELMAkGA1UEBhMCSlAxDjAMBgNVBAgTBVRva3lvMQ4wDAYDVQQHEwVUb2t5bzEf\nMB0GA1UEChMWU2FtcGxlIEludGVybWVkaWF0ZSBDQTEfMB0GA1UEAxMWU2FtcGxl\nIEludGVybWVkaWF0ZSBDQTAeFw0xODA5MTAwODA3MDBaFw0yMTA5MDkwODA3MDBa\nMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJ\nbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC\nAAQEa6Gq6bKHsFU2pw0oBBCKkMaihSlRG97Z07rqlAKCO1J+7uUlXbRdhZ2uCjRj\nd5cSG8rSWxRE703Ses+JBZPgo4HVMIHSMA4GA1UdDwEB/wQEAwIFoDATBgNVHSUE\nDDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRDd2MS9Ndo68PJ\ny9K/RNY6syZW0zAfBgNVHSMEGDAWgBR+Y+v8yByDNp39G7trYrTfZ0UjJzAxBggr\nBgEFBQcBAQQlMCMwIQYIKwYBBQUHMAGGFWh0dHA6Ly9sb2NhbGhvc3Q6ODg4OTAq\nBgNVHR8EIzAhMB+gHaAbhhlodHRwOi8vbG9jYWxob3N0Ojg4ODgvY3JsMAoGCCqG\nSM49BAMCA0cAMEQCIC/Bo4oNU6yHFLJeme5ApxoNdyu3rWyiqWPxJmJAr9L0AiBl\nGc/v+yh4dHIDhCrimajTQAYOG9n0kajULI70Gg7TNw==\n-----END CERTIFICATE-----\n',
    'scalar.ledger.client.cert_version': 1,
    'scalar.ledger.client.tls.enabled': false,
  };


  describe('Integration test on ClientService', async () => {
    const mockedFunctionId = 'TestFunction';
    const mockedContractId = `StateUpdater${Date.now()}`;
    const mockedContractName = 'com.org1.contract.StateUpdater';
    const mockedFunctionName = 'com.org1.function.TestFunction';
    const mockedAssetId = `mockedAssetId${Date.now()}`;
    const mockedState = 1;
    const mockedContractArgument = {
      asset_id: mockedAssetId,
      state: mockedState,
    };
    const contractProperty = {
      properties: 'bar',
    };
    const mockedByteContract = new Uint8Array(
        require('arraybuffer-loader!./StateUpdater.class'));
    const mockedByteFunction = new Uint8Array(
        require('arraybuffer-loader!./TestFunction.class'));
    const clientService = new ClientService(properties);
    describe('registerCertificate', () => {
      it('should be successful', async () => {
        const response = await clientService.registerCertificate();
        assert.deepEqual(response, {});
      });
    });
    describe('registerFunction', () => {
      it('should return 200 when correct inputs are specified', async () => {
        const response = await clientService.registerFunction(mockedFunctionId,
            mockedFunctionName,
            mockedByteFunction);
        assert.deepEqual(response, {});
      });
    });
    describe('registerContract', () => {
      it('should be successful', async () => {
        const response = await clientService.registerContract(
            mockedContractId,
            mockedContractName,
            mockedByteContract, contractProperty);
        assert.deepEqual(response, {});
      });
    });
    describe('listContracts', () => {
      it( 'should return contract metadata when the correct contract id is specified',
          async () => {
            const response = await clientService.listContracts();
            assert.ok(response.hasOwnProperty(mockedContractId));
          });
    });
    describe('executeContract', () => {
      it('should work as expected when executing a registered contract',
          async () => {
            const response = await clientService.executeContract(
                mockedContractId,
                mockedContractArgument, {});
            const contractResult = response.result;
            assert.equal(contractResult.asset_id, mockedAssetId);
            assert.equal(contractResult.state, mockedState);
            assert.equal(contractResult.properties,
                contractProperty.properties);
          });
      it('should work as expected when executing a registered contract and function',
          async () => {
            const functionArgument = {
              asset_id: mockedAssetId,
              state: mockedState,
            };
            const contractArgumentWithFunction = {
              asset_id: mockedAssetId,
              state: Date.now(),
              _functions_: [mockedFunctionId],
            };
            const response = await clientService.executeContract(
                mockedContractId, contractArgumentWithFunction, functionArgument);
            assert.equal(response.result.state,
                contractArgumentWithFunction.state);
          });
    });
    describe('validateLedger', () => {
      it('should return 200 when correct asset id is specified', async () => {
        const response = await clientService.validateLedger(mockedAssetId);
        assert.equal(response.statusCode, 200);
      });
    });
  });
});
