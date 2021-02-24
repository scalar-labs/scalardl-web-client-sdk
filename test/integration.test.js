describe('ClientService', () => {
  const {
    ClientService,
    ClientServiceWithIndexedDb,
    StatusCode,
  } = require('../scalardl-web-client-sdk.js');
  const properties = {
    'scalar.dl.client.server.host': '127.0.0.1',
    'scalar.dl.client.server.port': 80,
    'scalar.dl.client.server.privileged_port': 8080,

    // Make the test idempotent.
    'scalar.dl.client.cert_holder_id': `foo@${Date.now()}`,

    'scalar.dl.client.private_key_pem': '-----BEGIN EC PRIVATE KEY-----\n' +
    'MHcCAQEEICcJGMEw3dyXUGFu/5a36HqY0ynZi9gLUfKgYWMYgr/IoAoGCCqGSM49\n' +
    'AwEHoUQDQgAEBGuhqumyh7BVNqcNKAQQipDGooUpURve2dO66pQCgjtSfu7lJV20\n' +
    'XYWdrgo0Y3eXEhvK0lsURO9N0nrPiQWT4A==\n-----END EC PRIVATE KEY-----\n',

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
    'Gc/v+yh4dHIDhCrimajTQAYOG9n0kajULI70Gg7TNw==\n-----END CERTIFICATE-----\n',

    'scalar.dl.client.cert_version': 1,
    'scalar.dl.client.tls.enabled': false,

    'scalar.dl.client.tls.ca_root_cert_pem': '-----BEGIN CERTIFICATE-----\n' +
    'MIIE/jCCAuagAwIBAgIJAJO8tpVEEORLMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNV\n' +
    'BAMMCWxvY2FsaG9zdDAeFw0xOTAzMTMxMDUyMTFaFw0yMDAzMTIxMDUyMTFaMBQx\n' +
    'EjAQBgNVBAMMCWxvY2FsaG9zdDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC\n' +
    'ggIBAKFeFSrXRh5jA+OodMPw0XFO4sd4G9wYERlxgCjDmd9eC+loLpjGwRwwO7os\n' +
    '/+rhW+Cg/NGhNn64xCmS/JtZf91SBD1QfQ4wk4094sAUIHsztaWtZTATl6aIy0BN\n' +
    '21A0ueFgVQGehwO1FdRKtS7X+45YV2vMMK/UQ69VSCwY82olBRgWp45TXLUmWVgC\n' +
    'UAJkE/V2Ch8WLyKpCggtaxYmn8YfzA1X20QDK1b2IW4YPDcPapQLtU6wqIjrXX1E\n' +
    'w992GgfERm//I14QEyu+qIPafsniDGYxiR6HK8nqeR70QcGHt+Qql24xyjwWHEA/\n' +
    '43pn3jjrNVRhiVAD8tkVyRmfWjIngksRHPwEh3jG34gshOi9xAaID+mx2AWhThsk\n' +
    'XbuqSxHckPlvgWHugZmFOwKZAgU5/gpnWR7oHPOSYffhGwmc/+SK/SQ4UDeTFI2c\n' +
    '40Xw22P8CWbIq4gKi66kSvuFbLSeKQIRMJd50hf7kw3SqnkqEaeRXy5jBovut7CU\n' +
    'nwcgGPceYmWhKxhkg5urzk+CQZENf+9+pVvArOQemn9bMuaBPwtwXE42+fktQpQ2\n' +
    'PG3k7ryVL5R0jhuVNXf9ioU2z1ONQ2IdsuFtCKnozfVBAhy9bPfm120rTV/UBOCD\n' +
    'zcmfRnv081lG9BN/KtZBo7hfFH/ZD2542yVRvibRIIdPWIkTAgMBAAGjUzBRMB0G\n' +
    'A1UdDgQWBBQ61fQAtAgd7sM/NDtIX4D8GSA/8DAfBgNVHSMEGDAWgBQ61fQAtAgd\n' +
    '7sM/NDtIX4D8GSA/8DAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IC\n' +
    'AQCaYh1bxlj9Impoq3rmFHl5/9Fb2o2H2Ne8VjTHb8eSoHuLwXdWzKnw6UhiCaN4\n' +
    'EZgrsqq1L2Tc8Y+eqT4gz3uDLc5Cj29HHC/suZezIo3lgyZ/A6stYQXE5Gy8e+to\n' +
    'Qhmf4u8RMZ8zt6i355un6mTJxJq7JxoVqpECf5tg6pMdOUzbcKLTmN6i50jH/PSO\n' +
    'NQsJhiSJg3caNdWviob+UwEuUineMF/X08dB3gphZ7kmfDeRjmONALMXS1uvPwk2\n' +
    '3s8S45LmxETx+tcJSvckKRC9JaQf6dgHfKAWHpkIqvLKyqy9Dmvg2RSJi3kI9oaj\n' +
    'dm64zc6CAsqVaPvoMfWIN7JZq9jvzc8msGiilfhiYoc+M3jvnmM81FuGbAw7Utq4\n' +
    'uuHtpCcpbxRMChD4WdlrPeBONyBKp+RRWTGfBY1GW5aGWVp/cbcpIc2RSgnZcrxb\n' +
    '6ef2iTMtUjRd76JlkobTyvgo0GKdLgnr8c711I2YNp+TabKIKZOEvw2X+oGbfxBN\n' +
    '1WvRB5YJo2rzwZj0fSvN9IwT9TGxSZIo5zcaQuwLEmDZBJShgXN5Ya71Vag1AP2i\n' +
    'mOwUJRvfTVPWg+wtF2JQwaPpK0+Kb7oCq9tl3PUW40FRgqWV1Tgp6Co/U1W/1BU6\n' +
    '02Vmic/M/HmRMwWuX1PyVOVr8Mjyj+OMF1JsmdR5eL5Mtg==\n' +
    '-----END CERTIFICATE-----\n',
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
        assert.deepEqual(response);
        assert.deepEqual(response, undefined);
      });
    });
    describe('registerFunction', () => {
      it('should return 200 when correct inputs are specified', async () => {
        const response = await clientService.registerFunction(mockedFunctionId,
            mockedFunctionName,
            mockedByteFunction);
        assert.deepEqual(response, undefined);
      });
    });
    describe('registerContract', () => {
      it('should be successful', async () => {
        const response = await clientService.registerContract(
            mockedContractId,
            mockedContractName,
            mockedByteContract, contractProperty);
        assert.deepEqual(response, undefined);
      });
    });
    describe('listContracts', () => {
      it(
          'should return contract metadata ' +
          'when the correct contract id is specified',
          async () => {
            const response = await clientService.listContracts();
            assert.ok(response.hasOwnProperty(mockedContractId));
          },
      );
    });
    describe('executeContract', () => {
      it('should work as expected when executing a registered contract',
          async () => {
            const response = await clientService.executeContract(
                mockedContractId,
                mockedContractArgument, {});
            const contractResult = response.getResult();
            assert.equal(contractResult.asset_id, mockedAssetId);
            assert.equal(contractResult.state, mockedState);
            assert.equal(contractResult.properties,
                contractProperty.properties);
          });
      it(
          'should work as expected ' +
          'when executing a registered contract and function',
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
                mockedContractId,
                contractArgumentWithFunction,
                functionArgument,
            );
            assert.equal(response.getResult().state,
                contractArgumentWithFunction.state);
          });
    });
    describe('validateLedger', () => {
      it('should return 200 when correct asset id is specified', async () => {
        const response = await clientService.validateLedger(mockedAssetId, 0, 1);
        assert.equal(response.getCode(), 200);
      });
    });
  });

  describe('Integration test with ClientServiceWithIndexedDb', function() {
    it('should be able to use prestored private key', async function() {
      const Dexie = require('dexie').default;
      const db = new Dexie('scalar');
      db.version(1).stores({keystore: 'id'});

      const holderId = `foo${Date.now()}`;
      const certVersion = 1;
      const keyId = `${holderId}_${certVersion}`;
      const {toCryptoKeyFromJwk, toJwkFromPkcs1} = require('../lib/keyutil');
      const pem = '-----BEGIN EC PRIVATE KEY-----\n' +
        'MHcCAQEEICcJGMEw3dyXUGFu/5a36HqY0ynZi9gLUfKgYWMYgr/IoAoGCCqGSM49\n' +
        'AwEHoUQDQgAEBGuhqumyh7BVNqcNKAQQipDGooUpURve2dO66pQCgjtSfu7lJV20\n' +
        'XYWdrgo0Y3eXEhvK0lsURO9N0nrPiQWT4A==\n' +
        '-----END EC PRIVATE KEY-----\n';
      const key = await toCryptoKeyFromJwk(toJwkFromPkcs1(pem));
      await db.keystore.put({id: keyId, key: key});
      const properties = {
        'scalar.dl.client.server.host': '127.0.0.1',
        'scalar.dl.client.server.port': 80,
        'scalar.dl.client.server.privileged_port': 8080,
        'scalar.dl.client.cert_holder_id': holderId,
        'scalar.dl.client.cert_version': certVersion,
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

      const clientService = await new ClientServiceWithIndexedDb(
          new ClientService(properties),
      );
      await clientService.registerCertificate();
      const response = await clientService.validateLedger('non_existing_asset', 0, 1);

      assert.equal(StatusCode.ASSET_NOT_FOUND, response.getCode());
    });
  });
});
