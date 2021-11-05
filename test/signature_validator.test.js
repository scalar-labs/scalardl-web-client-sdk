const certificate = `
-----BEGIN CERTIFICATE-----
MIICjTCCAjKgAwIBAgIUOt6KMwZpclftxxQzdJsptjxNjdMwCgYIKoZIzj0EAwIw
bzELMAkGA1UEBhMCSlAxDjAMBgNVBAgTBVRva3lvMQ4wDAYDVQQHEwVUb2t5bzEf
MB0GA1UEChMWU2FtcGxlIEludGVybWVkaWF0ZSBDQTEfMB0GA1UEAxMWU2FtcGxl
IEludGVybWVkaWF0ZSBDQTAeFw0xODA5MTAwODA2MDBaFw0yMTA5MDkwODA2MDBa
MEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIEwpTb21lLVN0YXRlMSEwHwYDVQQKExhJ
bnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNC
AAT9PMYRxgk1zB7l34GU+7G7CIiEyEqkylMxkz3gv5tGEM8WficyKBwKKOV7LuqE
5/CmVWtO2c0tM0wPza23CdHuo4HVMIHSMA4GA1UdDwEB/wQEAwIFoDATBgNVHSUE
DDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBS1Neb+7m9wyM2h
oRs75x86gbzS5TAfBgNVHSMEGDAWgBR+Y+v8yByDNp39G7trYrTfZ0UjJzAxBggr
BgEFBQcBAQQlMCMwIQYIKwYBBQUHMAGGFWh0dHA6Ly9sb2NhbGhvc3Q6ODg4OTAq
BgNVHR8EIzAhMB+gHaAbhhlodHRwOi8vbG9jYWxob3N0Ojg4ODgvY3JsMAoGCCqG
SM49BAMCA0kAMEYCIQDxqVzuhLWxnX6fajucPcjCcvtWTl/4fAAN/n8Py1qmfwIh
AKtP641f4dGZTV0R6uMYDrZjunwbG+kmt9+vSuE8rjO0
-----END CERTIFICATE-----
`;

const privateKey =
  'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0waw' +
  'IBAQQghsSVj9WzmcShUawdnwb2JzFlyxGVPYNwch/EU' +
  '2RmucehRANCAAT9PMYRxgk1zB7l34GU+7G7CIiEyEqky' +
  'lMxkz3gv5tGEM8WficyKBwKKOV7LuqE5/CmVWtO2c0tM0wPza23CdHu';

const {SignatureValidator} = require('../signature_validator.js');
const jsrsasign = require('jsrsasign');

const validator = new SignatureValidator(certificate);

let testingKey;
before(async () => {
  testingKey = await window.crypto.subtle.importKey(
      'pkcs8',
      jsrsasign.hextoArrayBuffer(jsrsasign.b64utohex(privateKey)),
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      false,
      ['sign'],
  );
});

describe('SignatureValidator', async () => {
  it('should be able to verify the content', async () => {
    const testingContent = new Uint8Array([0, 1, 2, 4]);
    const signature = await window.crypto.subtle.sign(
        {name: 'ECDSA', hash: 'SHA-256'},
        testingKey,
        testingContent,
    );

    const validated = await validator.validate(testingContent, signature);

    assert.equal(true, validated);
  });

  it('should be able to verify the negative content', async () => {
    const correctContent = new Uint8Array([0, 1, 2, 4]);
    const signature = await window.crypto.subtle.sign(
        {name: 'ECDSA', hash: 'SHA-256'},
        testingKey,
        correctContent,
    );
    const wrongContent = new Uint8Array([0]);

    const validated = await validator.validate(wrongContent, signature);

    assert.equal(false, validated);
  });
});
