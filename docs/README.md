> [!CAUTION]
>
> The `docs` folder has been moved to the centralized documentation repository, [docs-internal](https://github.com/scalar-labs/docs-internal). Please update this documentation in that repository instead.
> 
> To view the ScalarDL documentation, visit [ScalarDL Documentation](https://scalardl.scalar-labs.com/docs/).

## Scalar DL Web Client SDK

This is a library for web applications by which the applications can interact with a [Scalar DL](https://github.com/scalar-labs/scalardl) network.

## Node version used for development and testing
This package has been developed and tested using Node LTS v14.16.0. named "fermium".
This means we cannot guarantee the package nominal behaviour when using other Node versions.

## Install

We can use package manager to install this library. For example, to install with NPM:

**NPM**
```
npm install @scalar-labs/scalardl-web-client-sdk
```

You can also find a bundle `scalardl-web-client-sdk.bundle.js` which can be imported statically in @scalar-labs/scalardl-web-client-sdk/dist.

## HOWTO

### Create ClientService instance

`ClientService` class is the main class of this package.
It provides following functions to request Scalar DL network.

|Name|Use|
|----|---|
|registerCertificate|To register a client's certificate to a Scalar DL network|
|registerContract|To register the contracts to the registered client of the Scalar DL network|
|listContracts|To list all registered contracts of the client|
|executeContract|To execute a registered contract of the client|
|validateLedger|To validate an asset of the Scalar DL network to determine if it is tampered|

If an error occurs when executing one of the above methods, a `ClientError` will be thrown. The
`ClientError.statusCode` provides additional context. Please refer to the [Runtime error](#runtime-error) section below for the status code specification.

Use the code snippet below to create a ClientService instance.
```javascript
import { ClientService } from '@scalar-labs/scalardl-web-client-sdk';
const clientService = new ClientService(clientProperties);
```

Or, if you use the static release, try following
```html
<head>
    <meta charset="utf-8">
    <script src="scalardl-web-client-sdk.bundle.js"></script>
</head>

<script>
    const clientService = new Scalar.ClientService(clientProperties);
</script>
```

The `clientProperties` argument is mandatory for the constructor.
This is a properties example that a user `foo@example.com` would use to try to connect to the server `scalardl.example.com:50051` of the Scalar DL network.
```javascript
{
    'scalar.dl.client.server.host': 'scalardl.example.com',
    'scalar.dl.client.server.port': 50051,
    'scalar.dl.client.server.privileged_port': 50052,
    'scalar.dl.client.cert_holder_id': 'foo@example.com',
    'scalar.dl.client.private_key_pem': "-----BEGIN EC PRIVATE KEY-----\nMHc...",
    'scalar.dl.client.cert_pem': "-----BEGIN CERTIFICATE-----\nMIICjTCCAj...n",
    'scalar.dl.client.cert_version': 1,
    'scalar.dl.client.tls.enabled': false,
}
```

If the auditor capability is enabled on the Scalar DL network, specify additional properties like the following example. In this example, the client interacts with the auditor `scalardl-auditor.example.com` and detects Byzantine faults including data tampering when executing contracts.

```javascript
{
    'scalar.dl.client.auditor.enabled': true,
    'scalar.dl.client.auditor.host': 'scalardl-auditor.example.com',
    'scalar.dl.client.auditor.port': 40051,
    'scalar.dl.client.auditor.privileged_port': 40052,
}
```

In what follows assume that we have a clientService instance.

### Register the certificate
Use the `registerCertificate` function to register a certificate on the Scalar DL network.
```javascript
await clientService.registerCertificate();
```
Please refer to the [Status code](#status-code) section below for the details of status.

### Register contracts
Use the `registerContract` function to register a contract.
```javascript
await clientService.registerContract('contractId', 'com.example.contract.contractName', contractUint8Array, propertiesObject);
```

### Register functions
Use the `registerFunction` function to register a function.
```javascript
await clientService.registerFunction('functionId, 'com.example.function.functionName', functionUint8Array);
```

### List registered contracts
Use `listContracts` function to list all registered contracts.
```javascript
const constracts = await clientService.listContracts();
```

### Execute a contract
Use `executeContract` function to execute a registered contract. It will also execute a function if `_functions_` is given in the argument.
```javascript
const response = await clientService.executeContract('contractId', argumentObject);
const executionResult = response.getResult();
const proofsList = response.getProofs();
```

```javascript
const response = await clientService.executeContract('contractId', { 'arg1': 'a', '_functions_': [functionId] }, { 'arg2': 'b' });
```
`{ 'arg1': 'a', ` will be passed via [contractArgument](https://github.com/scalarindetail/scalardl-node-client-sdk/blob/3e531b4c62fb14702a873b07f44cb37212f04be4/test/TestFunction.java#L14), while `{ 'arg2': 'b' }` will be passed via [functionArgument](https://github.com/scalarindetail/scalardl-node-client-sdk/blob/3e531b4c62fb14702a873b07f44cb37212f04be4/test/TestFunction.java#L15).


### Validate an asset
Use the `validateLedger` function to validate an asset in the Scalar DL network.
```javascript
const response = await clientService.validateLedger('assetId');
const status = response.getCode();
const proof = response.getProof();
```

#### Validate an asset linearizably
The default ledger validation in a Auditor-enabled Scalar DL network is non-linearizable; i.e., there might be cases where Ledger and Auditor look inconsistent temporarily.
Scalar DL supports linearizable ledger validation.
To use it, we can configure the properties as follows
```javascript
{
    'scalar.dl.client.auditor.enabled': true,
    ...
    'scalar.dl.client.auditor.linearizable_validation.enabled': true,
    'scalar.dl.client.auditor.linearizable_validation.contract_id': '<choose a contract ID>',
}
```
and, register the [ValidateLedger](https://github.com/scalar-labs/scalardl-java-client-sdk/blob/master/src/main/java/com/scalar/dl/client/contract/ValidateLedger.java) contract as the contract ID we specified in the properties.
Then, the ClientService.validateLedger function can provide linearizable ledger validation.

### Runtime error
Error thrown by the client present a status code.
```javascript
try {
    await clientService.registerCertificate();
} catch (clientError) {
    const message = clientError.message;
    const statusCode = clientError.code;
}
```
Enumeration `StatusCode` enumerates all the possible status.
```
StatusCode = {
  OK: 200,
  INVALID_HASH: 300,
  INVALID_PREV_HASH: 301,
  INVALID_CONTRACT: 302,
  INVALID_OUTPUT: 303,
  INVALID_NONCE: 304,
  INCONSISTENT_STATES: 305,
  INVALID_SIGNATURE: 400,
  UNLOADABLE_KEY: 401,
  UNLOADABLE_CONTRACT: 402,
  CERTIFICATE_NOT_FOUND: 403,
  CONTRACT_NOT_FOUND: 404,
  CERTIFICATE_ALREADY_REGISTERED: 405,
  CONTRACT_ALREADY_REGISTERED: 406,
  INVALID_REQUEST: 407,
  CONTRACT_CONTEXTUAL_ERROR: 408,
  ASSET_NOT_FOUND: 409,
  FUNCTION_NOT_FOUND: 410,
  UNLOADABLE_FUNCTION: 411,
  INVALID_FUNCTION: 412,
  DATABASE_ERROR: 500,
  UNKNOWN_TRANSACTION_STATUS: 501,
  RUNTIME_ERROR: 502,
  CLIENT_IO_ERROR: 600,
  CLIENT_DATABASE_ERROR: 601,
  CLIENT_RUNTIME_ERROR: 602,
};
```

## IndexedDB support
This library supports storing private keys in the browsers' [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
To use the feature, please decorate `ClientService` object with `ClientServiceWithIndexedDb` as follows.

```
const clientService = await new ClientServiceWithIndexedDb(new ClientService(properties));
```

`ClientServiceWithIndexedDb` stores a private key in IndexedDB if the key is specified in client properties and reads a private key from the IndexedDB if the key is not specified in client properties.

Based on the behavior, it is recommended to use it as follows.
If a private key is not found, `IndexedDbKeyNotFoundError` will be thrown and the application needs to get a private key from an external service.

```javascript
let properties = {
    'scalar.dl.client.cert_holder_id': 'foo@example.com',
    'scalar.dl.client.cert_version': 1,
    ...
}; // Not specify 'scalar.dl.client.private_key_pem' or 'scalar.dl.client.private_key_cryptokey'

let clientService;
try {
    // It tries to read a private key from IndexedDB
    clientService = await new ClientServiceWithIndexedDb(new ClientService(properties));
} catch (err) {
    if (err instanceof IndexedDbKeyNotFoundError) {
        properties['scalar.dl.client.private_key_pem'] = /* from some place */
        // This time, it stores the specified private key in IndexedDB
        clientService = await new ClientServiceWithIndexedDb(new ClientService(properties));
    } else {
        throw err; // How to handle the error should be decided by application side
    }
}
```

### deleteIndexedDb
deleteIndexedDb removes a private key in IndexedDB according to `scalar.dl.client.cert_holder_id` and `scalar.dl.client.cert_version` in client properties.

```javascript
clientService = await new ClientServiceWithIndexedDb(new ClientService(properties));
clientService.deleteIndexedDb(); // Remove stored key in indexedDb
```

## Envoy configuration
Scalar DLT server (grpc) uses a custom header called `rpc.status-bin` to share error metadata with the client. This means envoy needs to be
configured to expose the header to clients.
More specifically, `rpc.status-bin` needs to be added to the `expose-headers` field of the [cors configuration](https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/route/route_components.proto#envoy-api-msg-route-corspolicy).

## Contributing
This library is mainly maintained by the Scalar Engineering Team, but of course we appreciate any help.

* For asking questions, finding answers and helping other users, please go to [stackoverflow](https://stackoverflow.com/) and use [scalardl](https://stackoverflow.com/questions/tagged/scalardl) tag.
* For filing bugs, suggesting improvements, or requesting new features, help us out by opening an issue.

## License
Scalar DL client SDK is dual-licensed under both the AGPL (found in the LICENSE file in the root directory) and a commercial license. You may select, at your option, one of the above-listed licenses. Regarding the commercial license, please [contact us](https://scalar-labs.com/contact_us/) for more information.
