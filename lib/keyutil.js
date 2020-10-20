const jsrsasign = require('jsrsasign');

/**
 * @param {Object} jwk
 * @return {CryptoKey}
 */
async function toCryptoKeyFromJwk(jwk) {
  return window.crypto.subtle.importKey(
    'jwk',
    jwk,
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    false, // extractable is false (which means unextractable)
    ['sign'],
  );
}

/**
 * @param {String} pkcs1
 * @return {Object}
 */
function toJwkFromPkcs1(pkcs1) {
  pkcs1 = pkcs1.replace('-----BEGIN EC PRIVATE KEY-----', '')
      .replace('-----END EC PRIVATE KEY-----', '')
      .replace(/\r\n/g, '');
  const key = jsrsasign.KEYUTIL.getKey(jsrsasign.b64utohex(pkcs1), null, 'pkcs5prv');

  return jsrsasign.KEYUTIL.getJWKFromKey(key);
}

module.exports = {
  toCryptoKeyFromJwk,
  toJwkFromPkcs1,
};
