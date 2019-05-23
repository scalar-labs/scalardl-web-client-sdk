const {
  ClientServiceBase,
  StatusCode,
} = require('@scalar-labs/scalardl-javascript-sdk-base');

const protobuf = require('./scalar_pb');
const {LedgerClient} = require('./scalar_grpc_web_pb');

/**
 * This class handles all client interactions including registering certificates
 * and contracts, listing contracts, validating the ledger, and executing
 * contracts.
 * @class
 */
class ClientService extends ClientServiceBase {
  /**
   * @param {Object} properties JSON Object used for setting client properties
   */
  constructor(properties) {
    const url = `${properties['scalar.ledger.client.tls.enabled'] ?
        'https' :
        'http'}://${properties['scalar.ledger.client.server_host']}:${properties['scalar.ledger.client.server_port']}`;
    /** @const */
    const ledgerClient = new LedgerClient(url);
    super(ledgerClient, protobuf, properties);
  }
}

module.exports = {
  ClientService,
  StatusCode,
};
