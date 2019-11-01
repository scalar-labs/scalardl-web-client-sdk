const Service = require('../scalardl-web-client-sdk');
// import ClientService from '../scalardl-web-client-sdk';

let clientService;

const clientProperties = {
  'scalar.ledger.client.server_host': 'localhost',
  'scalar.ledger.client.server_port': 50051,
  'scalar.ledger.client.cert_holder_id': 'foo@example.com',
  'scalar.ledger.client.private_key_pem': '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEICcJGMEw3dyXUGFu/5a36HqY0ynZi9gLUfKgYWMYgr/IoAoGCCqGSM49\nAwEHoUQDQgAEBGuhqumyh7BVNqcNKAQQipDGooUpURve2dO66pQCgjtSfu7lJV20\nXYWdrgo0Y3eXEhvK0lsURO9N0nrPiQWT4A==\n-----END EC PRIVATE KEY-----\n',
  'scalar.ledger.client.cert_pem': '-----BEGIN CERTIFICATE-----\nMIICizCCAjKgAwIBAgIUMEUDTdWsQpftFkqs6bCd6U++4nEwCgYIKoZIzj0EAwIw\nbzELMAkGA1UEBhMCSlAxDjAMBgNVBAgTBVRva3lvMQ4wDAYDVQQHEwVUb2t5bzEf\nMB0GA1UEChMWU2FtcGxlIEludGVybWVkaWF0ZSBDQTEfMB0GA1UEAxMWU2FtcGxl\nIEludGVybWVkaWF0ZSBDQTAeFw0xODA5MTAwODA3MDBaFw0yMTA5MDkwODA3MDBa\nMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJ\nbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC\nAAQEa6Gq6bKHsFU2pw0oBBCKkMaihSlRG97Z07rqlAKCO1J+7uUlXbRdhZ2uCjRj\nd5cSG8rSWxRE703Ses+JBZPgo4HVMIHSMA4GA1UdDwEB/wQEAwIFoDATBgNVHSUE\nDDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBRDd2MS9Ndo68PJ\ny9K/RNY6syZW0zAfBgNVHSMEGDAWgBR+Y+v8yByDNp39G7trYrTfZ0UjJzAxBggr\nBgEFBQcBAQQlMCMwIQYIKwYBBQUHMAGGFWh0dHA6Ly9sb2NhbGhvc3Q6ODg4OTAq\nBgNVHR8EIzAhMB+gHaAbhhlodHRwOi8vbG9jYWxob3N0Ojg4ODgvY3JsMAoGCCqG\nSM49BAMCA0cAMEQCIC/Bo4oNU6yHFLJeme5ApxoNdyu3rWyiqWPxJmJAr9L0AiBl\nGc/v+yh4dHIDhCrimajTQAYOG9n0kajULI70Gg7TNw==\n-----END CERTIFICATE-----\n',
  'scalar.ledger.client.cert_version': 1,
  'scalar.ledger.client.tls.enabled': false,
  'scalar.ledger.client.tls.ca_root_cert': '-----BEGIN CERTIFICATE-----\nMIIE/jCCAuagAwIBAgIJAJO8tpVEEORLMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV\nBAMMCWxvY2FsaG9zdDAeFw0xOTAzMTMxMDUyMTFaFw0yMDAzMTIxMDUyMTFaMBQx\nEjAQBgNVBAMMCWxvY2FsaG9zdDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC\nggIBAKFeFSrXRh5jA+OodMPw0XFO4sd4G9wYERlxgCjDmd9eC+loLpjGwRwwO7os\n/+rhW+Cg/NGhNn64xCmS/JtZf91SBD1QfQ4wk4094sAUIHsztaWtZTATl6aIy0BN\n21A0ueFgVQGehwO1FdRKtS7X+45YV2vMMK/UQ69VSCwY82olBRgWp45TXLUmWVgC\nUAJkE/V2Ch8WLyKpCggtaxYmn8YfzA1X20QDK1b2IW4YPDcPapQLtU6wqIjrXX1E\nw992GgfERm//I14QEyu+qIPafsniDGYxiR6HK8nqeR70QcGHt+Qql24xyjwWHEA/\n43pn3jjrNVRhiVAD8tkVyRmfWjIngksRHPwEh3jG34gshOi9xAaID+mx2AWhThsk\nXbuqSxHckPlvgWHugZmFOwKZAgU5/gpnWR7oHPOSYffhGwmc/+SK/SQ4UDeTFI2c\n40Xw22P8CWbIq4gKi66kSvuFbLSeKQIRMJd50hf7kw3SqnkqEaeRXy5jBovut7CU\nnwcgGPceYmWhKxhkg5urzk+CQZENf+9+pVvArOQemn9bMuaBPwtwXE42+fktQpQ2\nPG3k7ryVL5R0jhuVNXf9ioU2z1ONQ2IdsuFtCKnozfVBAhy9bPfm120rTV/UBOCD\nzcmfRnv081lG9BN/KtZBo7hfFH/ZD2542yVRvibRIIdPWIkTAgMBAAGjUzBRMB0G\nA1UdDgQWBBQ61fQAtAgd7sM/NDtIX4D8GSA/8DAfBgNVHSMEGDAWgBQ61fQAtAgd\n7sM/NDtIX4D8GSA/8DAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IC\nAQCaYh1bxlj9Impoq3rmFHl5/9Fb2o2H2Ne8VjTHb8eSoHuLwXdWzKnw6UhiCaN4\nEZgrsqq1L2Tc8Y+eqT4gz3uDLc5Cj29HHC/suZezIo3lgyZ/A6stYQXE5Gy8e+to\nQhmf4u8RMZ8zt6i355un6mTJxJq7JxoVqpECf5tg6pMdOUzbcKLTmN6i50jH/PSO\nNQsJhiSJg3caNdWviob+UwEuUineMF/X08dB3gphZ7kmfDeRjmONALMXS1uvPwk2\n3s8S45LmxETx+tcJSvckKRC9JaQf6dgHfKAWHpkIqvLKyqy9Dmvg2RSJi3kI9oaj\ndm64zc6CAsqVaPvoMfWIN7JZq9jvzc8msGiilfhiYoc+M3jvnmM81FuGbAw7Utq4\nuuHtpCcpbxRMChD4WdlrPeBONyBKp+RRWTGfBY1GW5aGWVp/cbcpIc2RSgnZcrxb\n6ef2iTMtUjRd76JlkobTyvgo0GKdLgnr8c711I2YNp+TabKIKZOEvw2X+oGbfxBN\n1WvRB5YJo2rzwZj0fSvN9IwT9TGxSZIo5zcaQuwLEmDZBJShgXN5Ya71Vag1AP2i\nmOwUJRvfTVPWg+wtF2JQwaPpK0+Kb7oCq9tl3PUW40FRgqWV1Tgp6Co/U1W/1BU6\n02Vmic/M/HmRMwWuX1PyVOVr8Mjyj+OMF1JsmdR5eL5Mtg==\n-----END CERTIFICATE-----\n',
};

describe('Integration test on ClientService', () => {
  const mockedFunctionId = 21341;
  const mockedContractId = 12345;
  const mockedAssertId = 13532;
  const mockedName = 'foo';
  const mockedArgument = {'mocked': 'argument'};
  const mockedFunctionArgument = 'mockedFunctionArgument';
  const mockedByteCode = new Uint8Array([1, 2, 3]);
  clientService = new Service.ClientService(clientProperties);
  describe('registerCertificate', () => {
    it('should works as expected', async () => {
      const request = await clientService.registerCertificate();
      console.log(request);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
  describe('registerFunction', () => {
    it('should works as expected', async () => {
      const request = await clientService.registerFunction(mockedFunctionId,
          mockedName, mockedByteCode);
      console.log(request);
      assert.equal(request.getStatus(), 200);
      assert.instanceOf(request, Function);
    });
  });
  //
  // describe('registerContract', () => {
  //   it('should works as expected', async () => {
  //     const request = await clientService.registerContract(mockedContractId,
  //         mockedName,
  //         mockedByteCode, clientProperties);
  //     assert.equal(request.getStatus(), 200);
  //     assert.instanceOf(request, Function);
  //   });
  // });
  // describe('listContracts', () => {
  //   it('should works as expected', async () => {
  //     const request = await clientService.listContracts(mockedContractId);
  //     assert.equal(request.getStatus(), 200);
  //     assert.instanceOf(request, Function);
  //   });
  // });
  // describe('validateLedger', () => {
  //   it('should works as expected', async () => {
  //     const request = await clientService.validateLedger(mockedAssertId);
  //     assert.equal(request.getStatus(), 200);
  //     assert.instanceOf(request, Function);
  //   });
  // });
  // describe('executeContract', () => {
  //   it('should works as expected', async () => {
  //     const request = await clientService.executeContract(mockedContractId,
  //         mockedArgument, mockedFunctionArgument);
  //     assert.equal(request.getStatus(), 200);
  //     assert.instanceOf(request, Function);
  //   });
  // });
});
