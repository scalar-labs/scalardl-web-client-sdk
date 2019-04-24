## Scalar DL Web Client SDK

This is a client-side library for web applications to interact with [Scalar DL](https://github.com/scalar-labs/scalardl) network.

## Install

We can use package managers to install this library.

**NPM**
```
npm install @scalar-labs/scalardl-web-client-sdk
```

**Yarn**
```
yarn add @scalar-labs/scalardl-web-client-sdk
```

## HOWTO

### Create ClientService instance

`ClientService` class is the main class of this package.
It provides following functions to request Scalar DL network.

|Name|use|
|----|---|
|registerCertificate|To register a client's certificate to a Scalar DL network|
|registerContract|To register the contracts to the registered client of the Scalar DL network|
|listContracts|To list all registered contracts of the client|
|executeContract|To execute a registered contract of the client|
|validateLedger|To validate an asset of the Scalar DL network to determine if it is tampered|

Use the code snippet below to create a ClientService instance.
```
import { ClientService } from '@scalar-labs/scalardl-web-client-sdk';
const clientService = new ClientService(clientProperties);
```

Or, if you use the static release, try following
```
<head>
    <script src="scalardl-web-client-sdk.bundle.js"></script>
</head>

<script>
    const clientService = new Scalar.ClientService(clientProperties);
</script>
```

The argument `clientProperties` object is mandatory for the constructor.
It is an example in which a user `foo@example.com` tries to connect to the server `scalardl.example.com:50051` of the Scalar DL network.
```
{
    'scalar.ledger.client.server_host': 'scalardl.example.com',
    'scalar.ledger.client.server_port': 50051,
    'scalar.ledger.client.cert_holder_id': 'foo@example.com',
    'scalar.ledger.client.private_key_pem': "-----BEGIN EC PRIVATE KEY-----\nMHc...",
    'scalar.ledger.client.cert_pem': "-----BEGIN CERTIFICATE-----\nMIICjTCCAj...n",
    'scalar.ledger.client.cert_version': 1,
    'scalar.ledger.client.tls.enabled': false
}
```

### Register the certificate
When you have a clientService instance.
Use the registerCertificate function to register your certificate on the Scalar DL network.
```
const response = await clientService.registerCertificate();
const status = response.getStatus();
const message = response.getMessage();
```
Please refer to the [Status code](#status-code) section below for the details of status.

### Register contracts
You can use registerContract function to register contracts.
```
const response = await clientService.registerContract('contractId', 'com.example.contract.contractName', contractUint8Array, propertiesObject);
const status = response.getStatus();
const message = response.getMessage();
```

### List registered contracts
Use listContracts function to list all registered contracts.
```
const response = await clientService.listContracts();
const message = response.getMessage();
const contracts = JSON.parse(message);
```

### Execute a contract
Use executeContract function to execute a registered contract.
```
const response = await clientService.executeContract('contractId', argumentObject);
const status = response.getStatus();
const result = JSON.parse(response.getResult());
```

### Validate an asset
Use validateLedger function to validate an asset in the Scalar DL network.
```
const response = await clientService.validateLedger('assetId');
const status = response.getStatus();
const message = response.getMessage();
```

### Status code
Enumeration `StatusCode` enumerate all possible status in a Scalar DL response.
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
  DATABASE_ERROR: 500,
  UNKNOWN_TRANSACTION_STATUS: 501,
  RUNTIME_ERROR: 502,
  CLIENT_IO_ERROR: 600,
  CLIENT_DATABASE_ERROR: 601,
  CLIENT_RUNTIME_ERROR: 602,
};
```

## Contributing
This library is mainly maintained by the Scalar Engineering Team, but of course we appreciate any help.

* For asking questions, finding answers and helping other users, please go to [scalardl-user](https://groups.google.com/forum/#!forum/scalardl-user).
* For filing bugs, suggesting improvements, or requesting new features, help us out by opening an issue.

## License
Scalar DL client SDK is dual-licensed under both the AGPL (found in the LICENSE file in the root directory) and a commercial license. You may select, at your option, one of the above-listed licenses. Regarding the commercial license, please [contact us](https://scalar-labs.com/contact_us/) for more information.
