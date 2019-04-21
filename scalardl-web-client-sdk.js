const {StatusCode} = require('./status_code');

const {
  CertificateRegistrationRequestBuilder,
  ContractRegistrationRequestBuilder,
  ContractsListingRequestBuilder,
  LedgerValidationRequestBuilder,
  ContractExecutionRequestBuilder,
} = require('./request/builder');

const {
  ContractExecutionResponse,
  LedgerServiceResponse,
  LedgerValidationResponse,
} = require('./scalar_pb');

const {LedgerPromiseClient} = require('./scalar_grpc_web_pb');
const {IllegalArgumentError} = require('./illegal_argument_error');
const {SignatureSigner} = require('./signer');

/**
 * This class handles all client interactions including registering certificates
 * and contracts, listing contracts, validating the ledger, and executing
 * contracts.
 * @class
 */
class ClientService {
  /**
   * @param {Object} properties JSON Object used for setting client properties
   */
  constructor(properties) {
    /** @const */
    this.properties = properties;
    /** @const */
    this.serverHost = properties['scalar.ledger.client.server_host'];
    /** @const */
    this.serverPort = properties['scalar.ledger.client.server_port'];
    /** @const */
    this.tlsEnabled = properties['scalar.ledger.client.tls.enabled'];
    if (this.tlsEnabled !== undefined && typeof this.tlsEnabled !== 'boolean') {
      throw new IllegalArgumentError(
          'property \'scalar.ledger.client.tls.enabled\' is not a boolean');
    }
    /** @const */
    this.privateKeyPem = this.getRequiredProperty_(properties,
        'scalar.ledger.client.private_key_pem');
    /** @const */
    this.certPem = this.getRequiredProperty_(properties,
        'scalar.ledger.client.cert_pem');
    /** @const */
    this.certHolderId = this.getRequiredProperty_(properties,
        'scalar.ledger.client.cert_holder_id');
    /** @const */
    this.credential =
      properties['scalar.ledger.client.authorization.credential'];
    /** @const */
    this.certVersion = properties['scalar.ledger.client.cert_version'];

    /** @const */
    this.metadata = {};
    if (this.credential) {
      this.metadata.Authorization = this.credential;
    }

    /** @const */
    this.signer = new SignatureSigner(this.privateKeyPem);

    const url = `${this.tlsEnabled ?
        'https' :
        'http'}://${this.serverHost}:${this.serverPort}`;
    /** @const */
    this.client = new LedgerPromiseClient(url);
  }

  /**
   * @param {Object} properties JSON Object used for setting client properties
   * @param {string} name the name of the property to get
   * @return {Object} The client property specified in the @name parameter
   */
  getRequiredProperty_(properties, name) {
    const value = properties[name];
    if (!value) {
      throw new IllegalArgumentError(`property '${name}' is required`);
    }
    return value;
  }

  /**
   * @return {Promise<ClientServiceResponse>}
   */
  async registerCertificate() {
    const request = new CertificateRegistrationRequestBuilder()
        .withCertHolderId(this.certHolderId)
        .withCertVersion(this.certVersion)
        .withCertPem(this.certPem)
        .build();
    return this.sendRequest('registerCert', () => {
      return this.client.registerCert(request, this.metadata);
    });
  }

  /**
   * @param {number} id the contract id
   * @param {string} name  the canonical name of the contract class.
   *  For example "com.banking.contract1"
   * @param {Uint8Array} contractBytes
   * @param {Object}  [properties]
   *  JSON Object used for setting client properties
   * @return {Promise<ClientServiceResponse>}
   */
  async registerContract(id, name, contractBytes, properties) {
    if (!(contractBytes instanceof Uint8Array)) {
      throw new IllegalArgumentError(
          'parameter contractBytes is not a \'Uint8Array\''
      );
    }

    const propertiesJson = JSON.stringify(properties);
    const request = new ContractRegistrationRequestBuilder(this.signer)
        .withContractId(id)
        .withContractBinaryName(name)
        .withContractByteCode(contractBytes)
        .withContractProperties(propertiesJson)
        .withCertHolderId(this.certHolderId)
        .withCertVersion(this.certVersion)
        .build();
    return this.sendRequest('registerContract', () => {
      return this.client.registerContract(request, this.metadata);
    });
  }

  /**
   * List the registered contract for the current user
   * @param {string} [contractId]
   *  to verify if a specific contractId is registered
   * @return {Promise<ClientServiceResponse>}
   */
  async listContracts(contractId) {
    const request = new ContractsListingRequestBuilder(this.signer)
        .withCertHolderId(this.certHolderId)
        .withCertVersion(this.certVersion)
        .withContractId(contractId)
        .build();
    return this.sendRequest('listContracts', () => {
      return this.client.listContracts(request, this.metadata);
    });
  }

  /**
   * Validate the integrity of an asset
   * @param {number} [assetId]
   * @return {Promise<ClientServiceResponse>}
   */
  async validateLedger(assetId) {
    const request = new LedgerValidationRequestBuilder(this.signer)
        .withAssetId(assetId)
        .withCertHolderId(this.certHolderId)
        .withCertVersion(this.certVersion)
        .build();

    return this.sendRequest('validateLedger', () => {
      return this.client.validateLedger(request, this.metadata);
    });
  }

  /**
   * @param {number} contractId
   * @param {Object} argument
   * @return {Promise<ContractExecutionResponse|void|*>}
   */
  async executeContract(contractId, argument) {
    argument['nonce'] = new Date().getTime().toString();
    const argumentJson = JSON.stringify(argument);

    const request = new ContractExecutionRequestBuilder(this.signer)
        .withContractId(contractId)
        .withContractArgument(argumentJson)
        .withCertHolderId(this.certHolderId)
        .withCertVersion(this.certVersion)
        .build();

    return this.sendRequest('executeContract', () => {
      return this.client.executeContract(request, this.metadata);
    });
  }

  /**
   * @param {string} funcName
   * @param {Promise} func
   * @return {Promise}
   */
  async sendRequest(funcName, func) {
    try {
      return await func();
    } catch (e) {
      let response;
      switch (funcName) {
        case 'registerCert':
        case 'registerContract':
        case 'listContracts':
          response = new LedgerServiceResponse();
          break;
        case 'validateLedger':
          response = new LedgerValidationResponse();
          break;
        case 'executeContract':
          response = new ContractExecutionResponse();
          break;
      }
      response.setMessage(e.message);
      response.setStatus(StatusCode.RUNTIME_ERROR);
      return response;
    }
  }
}

module.exports = {
  ClientService,
  StatusCode,
};
