const jsrsasign = require('jsrsasign');

/**
 * This class is used for signing certificates
 */
class SignatureSigner {
  /**
   * @param {string} pem
   */
  constructor(pem) {
    this.pem = pem;
  }

  /**
   * This method turns a hex value into a Uint8Array
   * @param {number} hex
   * @return {Uint8Array}
   */
  hex2uint8array(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g)
        .map((byte) => parseInt(byte, 16)));
  }

  /**
   * This method turns a uint8array into a hex value
   * @param {Uint8Array} array
   * @return {string}
   */
  uint8array2hex(array) {
    const buffer = array.buffer;
    return Array.prototype.map.call(
        new Uint8Array(buffer),
        (x) => ('00' + x.toString(16)).slice(-2)).join('');
  }

  /**
   * This method is used for signing the certificate
   * @param {Uint8Array} buffer
   * @return {Uint8Array}
   */
  sign(buffer) {
    // const hex = this.uint8array2hex(buffer);
    const hex = this.uint8array2hex(buffer);
    const ecdsa = new jsrsasign.KJUR.crypto.ECDSA();
    try {
      const base64 = this.pem.replace('-----BEGIN EC PRIVATE KEY-----', '').
          replace('-----END EC PRIVATE KEY-----', '').
          replace(/\n/g, '');
      ecdsa.readPKCS5PrvKeyHex(this.base64toHex(base64));
    } catch (err) {
      throw new Error(`Failed to load private key ${err}`);
    }

    try {
      const signature = new jsrsasign.KJUR.crypto.Signature({
        'alg': 'SHA256withECDSA',
      });
      signature.init(ecdsa);
      signature.updateHex(hex);
      return this.hex2uint8array(signature.sign());
    } catch (err) {
      throw new Error(`Failed to sign the request ${err}`);
    }
  }

  /**
   * Converts base64 to hex
   * @param {number} base64
   * @return {string}
   */
  base64toHex(base64) {
    const raw = atob(base64);
    let hex = '';
    for (let i = 0; i < raw.length; i++) {
      const _hex = raw.charCodeAt(i).toString(16);
      hex += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return hex;
  }
}

module.exports = {
  SignatureSigner,
};
