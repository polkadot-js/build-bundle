# build-bundle

Browser bundles that can be included as-is, without a build step. These bundles operate in sections of functionality, for instance `polkadot-bundle-util` would need to be included before `polkadot-bundle-api` since the latter uses the former.

For a full example of the bundles being includes, look at the [index.html](index.html) file that has a full example for util & the API itself. For those that just want to get started quickly a trimmed-down example is included below:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>build-bundle</title>
  </head>
  <body>
    <!-- @polkadot/util -->
    <script src="bundle-polkadot-util.js"></script>
    <script>
      console.log('polkadotUtil');

      const { bnToBn, u8aToHex } = polkadotUtil;

      console.log('u8aToHex', u8aToHex(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])));
    </script>

    <!-- @polkadot/util-crypto -->
    <script src="bundle-polkadot-util-crypto.js"></script>
    <script>
      console.log('polkadotUtilCrypto');

      const { blake2AsHex, randomAsHex, selectableNetworks } = polkadotUtilCrypto;

      console.log('blake2AsHex', blake2AsHex(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])));
    </script>

    <!-- @polkadot/keyring -->
    <script src="bundle-polkadot-keyring.js"></script>
    <script>
      console.log('polkadotKeyring');

      const { Keyring } = polkadotKeyring;
      const { cryptoWaitReady } = polkadotUtilCrypto;

      cryptoWaitReady().then(() => {
        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri('//Alice');

        console.log('alice.address', alice.address);
        console.log('signature', u8aToHex(alice.sign('hello world')));
      });
    </script>
  </body>
</html>
```
