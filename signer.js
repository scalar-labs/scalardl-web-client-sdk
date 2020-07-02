const {toCryptoKeyFrom, toPkcs8From} = require('./lib/keyutil');

/** @description The signer based on Web Crypto API */
class WebCryptoSigner {
  /**
   * @param {String|Object} key key can be a CryptoKey or PKCS#1 PEM
   */
  constructor(key) {
    if (typeof key == 'string') {
      this.pkcs1 = key;
    } else if (typeof key === 'object') {
      this.key = key;
    } else {
      throw new Error(
          'key type should be either String (PEM) or Object (CryptoKey)'
      );
    }
  }

  /**
   * @param {Uint8Array} content
   * @return {Uint8Array}
   */
  async sign(content) {
    let key;
    if (this.key) {
      key = this.key;
    } else {
      if (!this.pkcs8) {
        this.pkcs8 = await toPkcs8From(this.pkcs1);
      }
      try {
        key = await toCryptoKeyFrom(this.pkcs8);
      } catch (_) {
        throw new Error('Failed load the PEM file');
      }
    }

    const algorithm = { // EcdsaParams
      name: 'ECDSA',
      hash: 'SHA-256',
    };
    const data = content;

    try {
      const signature = await window.crypto.subtle.sign(algorithm, key, data);
      return this._P1363ToDer(new Uint8Array(signature));
    } catch (_) {
      throw new Error(`Failed to sign the request`);
    }
  }

  /**
   * @param {Uint8Array} sig - P1363 signature
   * @return {Uint8Array} DER signature
   *
   * This function is taken from the SDK of token.io (https://github.com/tokenio/sdk-js)
   *
   * Copyright (c) 2020, Token, Inc. (https://token.io)
   * Permission to use, copy, modify, and distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * Converts an ECDSA signature from P1363 to DER format
   *
   * IEEE P1363: bytes array of [
   *   r,
   *   s
   * ]
   *
   * ASN.1 DER: bytes array of [
   *   0x30 (DER sequence tag),
   *   (length of the bytes after this byte),
   *   0x02 (DER integer tag),
   *   (length of the bytes of r),
   *   (padding, if necessary)
   *   r,
   *   0x02 (DER integer tag),
   *   (length of the bytes of s),
   *   (padding, if necessary)
   *   s
   * ]
   */
  _P1363ToDer(sig) {
    const signature = Array
        .from(sig, (x) => ('00' + x.toString(16)).slice(-2))
        .join('');
    let r = signature.substr(0, signature.length / 2);
    let s = signature.substr(signature.length / 2);
    r = r.replace(/^(00)+/, '');
    s = s.replace(/^(00)+/, '');
    if ((parseInt(r, 16) & '0x80') > 0) r = `00${r}`;
    if ((parseInt(s, 16) & '0x80') > 0) s = `00${s}`;
    const rString = `02${(r.length / 2).toString(16).padStart(2, '0')}${r}`;
    const sString = `02${(s.length / 2).toString(16).padStart(2, '0')}${s}`;
    const derSig = `30${((rString.length + sString.length) / 2)
        .toString(16).padStart(2, '0')}${rString}${sString}`;
    return new Uint8Array( derSig.match(/[\da-f]{2}/gi).map(
        (h) => parseInt(h, 16)),
    );
  }
}

/** @description A factory to create EllipticSigner by given PEM */
class SignerFactory {
  /**
   * @param {String|Object} key
   * @return {WebCryptoSigner}
   */
  create(key) {
    return new WebCryptoSigner(key);
  }
}

module.exports = {
  SignerFactory,
};
