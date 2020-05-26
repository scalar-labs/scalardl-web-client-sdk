const jsrsasign = require('jsrsasign');

/**
 * @param {String} pkcs8
 * @return {CryptoKey}
 */
async function toCryptoKeyFrom(pkcs8) {
  pkcs8 = pkcs8.replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\n/g, '');
  const keyInArrayBuffer = jsrsasign.hextoArrayBuffer(
      jsrsasign.b64utohex(pkcs8),
  );
  return window.crypto.subtle.importKey(
      'pkcs8',
      keyInArrayBuffer,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      true,
      ['sign'],
  );
}

/**
   * @param {String} pkcs1
   * @return {String}
   */
async function toPkcs8From(pkcs1) {
  pkcs1 = pkcs1.replace('-----BEGIN EC PRIVATE KEY-----', '')
      .replace('-----END EC PRIVATE KEY-----', '')
      .replace(/\n/g, '');
  const k = jsrsasign.KEYUTIL.getKey(
      jsrsasign.b64utohex(pkcs1), null, 'pkcs5prv',
  );
  return jsrsasign.KEYUTIL.getPEM(k, 'PKCS8PRV');
}

module.exports = {
  toCryptoKeyFrom,
  toPkcs8From,
};
