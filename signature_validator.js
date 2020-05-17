const jsrsasign = require('jsrsasign');

/** @description A validator of ECDSA-SHA256 signature */
class SignatureValidator {
  /**
   * @param {String} certificate PEM
   */
  constructor(certificate) {
    this.publicKey = jsrsasign.KEYUTIL.getPEM(
        jsrsasign.KEYUTIL.getKey(certificate),
        'PKCS8PUB',
    );
  }

  /**
   * @param {Uint8Array} toBeValidated
   * @param {Uint8Array} signature
   * @return {Boolean}
   */
  async validate(toBeValidated, signature) {
    if (!this.key) {
      const pkcs8 = this.publicKey
          .replace('-----BEGIN PUBLIC KEY-----', '')
          .replace('-----END PUBLIC KEY-----', '')
          .replace(/(\r\n|\n|\r)/gm, '');

      this.key = await window.crypto.subtle.importKey(
          'spki',
          jsrsasign.hextoArrayBuffer(jsrsasign.b64utohex(pkcs8)),
          {
            name: 'ECDSA',
            namedCurve: 'P-256',
          },
          false,
          ['verify'],
      );
    }

    return window.crypto.subtle.verify(
        {name: 'ECDSA', hash: 'SHA-256'},
        this.key,
        signature,
        toBeValidated,
    );
  }
}

module.exports = {
  SignatureValidator,
};
