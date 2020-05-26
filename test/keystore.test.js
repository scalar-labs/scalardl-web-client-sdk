const {Keystore} = require('../keystore');
const chai = require('chai');
chai.use(require('chai-as-promised'));

let keystore;
let generatedKeyPair;

describe('Keystore', function() {
  beforeEach(async function() {
    keystore = new Keystore();

    generatedKeyPair = await window.crypto.subtle.generateKey(
        {name: 'ECDSA', namedCurve: 'P-256'},
        false, // cannot extractable
        ['sign', 'verify'],
    );
  });

  describe('#put()', function() {
    it('should throw an error if the id is not a String', async function() {
      await chai.expect(
          keystore.put(1)
      ).to.be.rejectedWith(Error, '`id` is not a String');
    });

    it('should throw an error if the key is not a CryptoKey', async function() {
      await chai.expect(
          keystore.put('whatever', {})
      ).to.be.rejectedWith(Error, '`key` is not a CryptoKey');
    });

    it('should work fine if id and key are correct in format',
        async function() {
          const id = 'whatever';
          const key = generatedKeyPair.privateKey;

          await chai.expect(keystore.put(id, key)).to.not.be.rejected;
        }
    );

    describe('#get()', function() {
      it('should return null if related key not exist', async function() {
        const id = 'another-key';

        chai.assert.equal(null, await keystore.get(id));
      });

      it('should work fine with #put()', async function() {
        const id = 'whatever';
        const key = generatedKeyPair.privateKey;

        await keystore.put(id, key);
        const signature = await window.crypto.subtle.sign(
            {name: 'ECDSA', hash: 'SHA-256'},
            await keystore.get(id),
            new ArrayBuffer([0, 1, 2, 3]),
        );
        const verified = await window.crypto.subtle.verify(
            {name: 'ECDSA', hash: 'SHA-256'},
            generatedKeyPair.publicKey,
            signature,
            new ArrayBuffer([0, 1, 2, 3]),
        );

        chai.assert(true, verified);
      });
    });

    describe('#delete()', function() {
      it('should work fine', async function() {
        const id = 'whatever';
        const key = generatedKeyPair.privateKey;
        await keystore.put(id, key);

        await chai.expect(keystore.delete(id)).to.not.be.rejected;
        chai.assert.equal(null, await keystore.get(id));
      });
    });
  });
});
