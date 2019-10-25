import Service from '../scalardl-web-client-sdk';

let clientService;

const clientProperties = {
  'scalar.ledger.client.server_host': '127.0.0.1',
  'scalar.ledger.client.server_port': '50051',
  'scalar.ledger.client.cert_holder_id': 'mocked_id',
  'scalar.ledger.client.private_key_pem': '-----BEGIN EC PRIVATE KEY-----\n' +
      'MHcCAQEEIIbElY/Vs5nEoVGsHZ8G9icxZcsRlT2DcHIfxFNkZrnHoAoGCCqGSM49\n' +
      'AwEHoUQDQgAE/TzGEcYJNcwe5d+BlPuxuwiIhMhKpMpTMZM94L+bRhDPFn4nMigc\n' +
      'Cijley7qhOfwplVrTtnNLTNMD82ttwnR7g==\n' +
      '-----END EC PRIVATE KEY-----\n',
  'scalar.ledger.client.cert_pem': '-----BEGIN CERTIFICATE-----\n' +
      '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\n' +
      '-----END CERTIFICATE-----\n',
  'scalar.ledger.client.cert_version': 1,
  'scalar.ledger.client.tls.enabled': false,
};
beforeEach(() => {
  clientService = new Service(clientProperties);
});

describe('Integration test on ClientService', () => {
  const mockedFunctionId = 21341;
  const mockedContractId = 12345;
  const mockedAssertId = 13532;
  const mockedName = 'foo';
  const mockedArgument = {'mocked': 'argument'};
  const mockedFunctionArgument = 'mockedFunctionArgument';
  const mockedByteCode = new Uint8Array([1, 2, 3]);
  describe('registerCertificate', () => {
    it('should works as expected', async () => {
      const request = await clientService.registerCertificate();
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
  describe('registerFunction', () => {
    it('should works as expected', async () => {
      const request = await clientService.registerFunction(mockedFunctionId,
          mockedName, mockedByteCode);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });

  describe('registerContract', () => {
    it('should works as expected', async () => {
      const request = await clientService.registerContract(mockedContractId,
          mockedName,
          mockedByteCode, clientProperties);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
  describe('listContracts', () => {
    it('should works as expected', async () => {
      const request = await clientService.listContracts(mockedContractId);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
  describe('validateLedger', () => {
    it('should works as expected', async () => {
      const request = await clientService.validateLedger(mockedAssertId);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
  describe('executeContract', () => {
    it('should works as expected', async () => {
      const request = await clientService.executeContract(mockedContractId,
          mockedArgument, mockedFunctionArgument);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
});
