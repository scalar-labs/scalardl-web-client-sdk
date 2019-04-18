const {
  CertificateRegistrationRequest,
  ContractRegistrationRequest,
  ContractExecutionRequest,
  LedgerValidationRequest,
  ContractsListingRequest,
} = require('../scalar_pb.js');

/**
 * Used to build a CertificateRegistrationRequest.
 */
class CertificateRegistrationRequestBuilder {
  /**
   * Sets the ID of the certificate holder
   * @param {string} id
   * @return {CertificateRegistrationRequestBuilder}
   */
  withCertHolderId(id) {
    /** @const */
    this.certHolderId = id;
    return this;
  }

  /**
   * Sets the certificate version
   * @param {string} version
   * @return {CertificateRegistrationRequestBuilder}
   */
  withCertVersion(version) {
    /** @const */
    this.certVersion = version;
    return this;
  }

  /**
   * Sets the .pem of the certificate
   * @param {string} pem
   * @return {CertificateRegistrationRequestBuilder}
   */
  withCertPem(pem) {
    /** @const */
    this.certPem = pem;
    return this;
  }

  /**
   * Builds the CertificateRegistrationRequest
   * @return {CertificateRegistrationRequest}
   */
  build() {
    const request = new CertificateRegistrationRequest();
    request.setCertHolderId(this.certHolderId);
    request.setCertVersion(this.certVersion);
    request.setCertPem(this.certPem);
    return request;
  }
}

/**
 * Used for building a ContractRegistrationRequest
 */
class ContractRegistrationRequestBuilder {
  /**
   * @constructs
   * @param {SignatureSigner} signer
   */
  constructor(signer) {
    this.signer = signer;
  }
  /**
   * Sets the contract ID
   * @param {string} id
   * @return {ContractRegistrationRequestBuilder}
   */
  withContractId(id) {
    /** @const */
    this.contractId = id;
    return this;
  }

  /**
   * Sets the binary file name of the contract
   * @param {string} binaryName
   * @return {ContractRegistrationRequestBuilder}
   */
  withContractBinaryName(binaryName) {
    /** @const */
    this.contractBinaryName = binaryName;
    return this;
  }

  /**
   * Sets the byte code of the contract
   * @param {Uint8Array} contractBytes
   * @return {ContractRegistrationRequestBuilder}
   */
  withContractByteCode(contractBytes) {
    /** @const */
    this.contractByteCode = contractBytes;
    return this;
  }

  /**
   * Sets the contract's properties
   * @param {string} properties
   * @return {ContractRegistrationRequestBuilder}
   */
  withContractProperties(properties) {
    /** @const */
    this.contractProperties = properties;
    return this;
  }

  /**
   * Sets the ID of the certificate holder
   * @param {string} id
   * @return {ContractRegistrationRequestBuilder}
   */
  withCertHolderId(id) {
    /** @const */
    this.certHolderId = id;
    return this;
  }

  /**
   * Sets the certificate's version
   * @param {string} version
   * @return {ContractRegistrationRequestBuilder}
   */
  withCertVersion(version) {
    /** @const */
    this.certVersion = version;
    return this;
  }

  /**
   * Builds the ContractRegistrationRequest
   * @return {ContractRegistrationRequest}
   */
  build() {
    const request = new ContractRegistrationRequest();
    request.setContractId(this.contractId);
    request.setContractBinaryName(this.contractBinaryName);
    request.setContractByteCode(this.contractByteCode);
    request.setContractProperties(this.contractProperties);
    request.setCertHolderId(this.certHolderId);
    request.setCertVersion(this.certVersion);
    // return request;

    const contractId = new TextEncoder('utf-8').encode(this.contractId);
    const contractBinaryName = new TextEncoder('utf-8')
        .encode(this.contractBinaryName);
    const contractBytes = this.contractByteCode;
    const contractProperties = new TextEncoder('utf-8')
        .encode(this.contractProperties);
    const certHolderId = new TextEncoder('utf-8').encode(this.certHolderId);
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, this.certVersion);
    const certVersion = new Uint8Array(view.buffer);

    const buffer = new Uint8Array(
        contractId.byteLength + contractBinaryName.byteLength +
        contractBytes.byteLength + contractProperties.byteLength +
        certHolderId.byteLength + certVersion.byteLength);

    let offset = 0;
    buffer.set(contractId, offset);
    offset += contractId.byteLength;
    buffer.set(contractBinaryName, offset);
    offset += contractBinaryName.byteLength;
    buffer.set(contractBytes, offset);
    offset += contractBytes.byteLength;
    buffer.set(contractProperties, offset);
    offset += contractProperties.byteLength;
    buffer.set(certHolderId, offset);
    offset += certHolderId.byteLength;
    buffer.set(certVersion, offset);

    request.setSignature(this.signer.sign(buffer));

    return request;
  }
}

/**
 * Used for building a ContractsListingRequest
 */
class ContractsListingRequestBuilder {
  /**
   * @constructs
   * @param {SignatureSigner} signer
   */
  constructor(signer) {
    this.signer = signer;
  }
  /**
   * Sets the ID of the certificate holder
   * @param {string} id
   * @return {ContractsListingRequestBuilder}
   */
  withCertHolderId(id) {
    /** @const */
    this.certHolderId = id;
    return this;
  }

  /**
   * Sets the certificate's version
   * @param {string} version
   * @return {ContractsListingRequestBuilder}
   */
  withCertVersion(version) {
    /** @const */
    this.certVersion = version;
    return this;
  }

  /**
   * Sets the contract ID
   * @param {string} id
   * @return {ContractsListingRequestBuilder}
   */
  withContractId(id) {
    /** @const */
    this.contractId = id;
    return this;
  }

  /**
   * Builds the ContractsListingRequest
   * @return {ContractsListingRequest}
   */
  build() {
    const request = new ContractsListingRequest();
    request.setCertHolderId(this.certHolderId);
    request.setCertVersion(this.certVersion);
    request.setContractId(this.contractId);


    const certHolderId = new TextEncoder('utf-8').encode(this.certHolderId);
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, this.certVersion);
    const certVersion = new Uint8Array(view.buffer);
    const contractIdEncoded = new TextEncoder('utf-8').encode(this.contractId);

    const buffer = new Uint8Array(
        contractIdEncoded.byteLength + certHolderId.byteLength +
        certVersion.byteLength);
    let offset = 0;

    buffer.set(contractIdEncoded, offset);
    offset += contractIdEncoded.byteLength;
    buffer.set(certHolderId, offset);
    offset += certHolderId.byteLength;
    buffer.set(certVersion, offset);

    request.setSignature(this.signer.sign(buffer));

    return request;
  }
}

/**
 * Used for building a LedgerValidationRequest
 */
class LedgerValidationRequestBuilder {
  /**
   * @constructs
   * @param {SignatureSigner} signer
   */
  constructor(signer) {
    this.signer = signer;
  }
  /**
   * Sets the asset ID
   * @param {string} id
   * @return {LedgerValidationRequestBuilder}
   */
  withAssetId(id) {
    /** @const */
    this.assetId = id;
    return this;
  }

  /**
   * Sets the ID of the certificate holder
   * @param {string} id
   * @return {LedgerValidationRequestBuilder}
   */
  withCertHolderId(id) {
    /** @const */
    this.certHolderId = id;
    return this;
  }

  /**
   * Sets the certificate's version
   * @param {string} version
   * @return {LedgerValidationRequestBuilder}
   */
  withCertVersion(version) {
    /** @const */
    this.certVersion = version;
    return this;
  }

  /**
   * Builds a LedgerValidationRequest
   * @return {LedgerValidationRequest}
   */
  build() {
    const request = new LedgerValidationRequest();
    request.setAssetId(this.assetId);
    request.setCertHolderId(this.certHolderId);
    request.setCertVersion(this.certVersion);

    const assetId_ = new TextEncoder('utf-8').encode(this.assetId);
    const certHolderId = new TextEncoder('utf-8').encode(this.certHolderId);
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, this.certVersion);
    const certVersion = new Uint8Array(view.buffer);

    const buffer = new Uint8Array(
        assetId_.byteLength + certHolderId.byteLength + certVersion.byteLength);
    let offset = 0;
    buffer.set(assetId_, offset);
    offset += assetId_.byteLength;
    buffer.set(certHolderId, offset);
    offset += certHolderId.byteLength;
    buffer.set(certVersion, offset);

    request.setSignature(this.signer.sign(buffer));

    return request;
  }
}

/**
 * Used for building a ContractExecutionRequest
 */
class ContractExecutionRequestBuilder {
  /**
   * @constructs
   * @param {SignatureSigner} signer
   */
  constructor(signer) {
    this.signer = signer;
  }
  /**
   * Sets the contract ID
   * @param {string} id
   * @return {ContractExecutionRequestBuilder}
   */
  withContractId(id) {
    /** @const */
    this.contractId = id;
    return this;
  }

  /**
   * Sets the contract argument
   * @param {string} argument
   * @return {ContractExecutionRequestBuilder}
   */
  withContractArgument(argument) {
    /** @const */
    this.contractArgument = argument;
    return this;
  }

  /**
   * Sets the ID of the certificate holder
   * @param {string} id
   * @return {ContractExecutionRequestBuilder}
   */
  withCertHolderId(id) {
    /** @const */
    this.certHolderId = id;
    return this;
  }

  /**
   * Sets the certificate's version
   * @param {string} version
   * @return {ContractExecutionRequestBuilder}
   */
  withCertVersion(version) {
    /** @const */
    this.certVersion = version;
    return this;
  }

  /**
   * Builds the ContractExecutionRequest
   * @return {ContractExecutionRequest}
   */
  build() {
    const request = new ContractExecutionRequest();
    request.setContractId(this.contractId);
    request.setContractArgument(this.contractArgument);
    request.setCertHolderId(this.certHolderId);
    request.setCertVersion(this.certVersion);

    const contractIdEncoded = new TextEncoder('utf-8').encode(this.contractId);
    const contractArgument = new TextEncoder('utf-8')
        .encode(this.contractArgument);
    const certHolderId = new TextEncoder('utf-8').encode(this.certHolderId);
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, this.certVersion);
    const certVersion = new Uint8Array(view.buffer);

    const buffer = new Uint8Array(
        contractIdEncoded.byteLength + contractArgument.byteLength +
        certHolderId.byteLength + certVersion.byteLength);
    let offset = 0;
    buffer.set(contractIdEncoded, offset);
    offset += contractIdEncoded.byteLength;
    buffer.set(contractArgument, offset);
    offset += contractArgument.byteLength;
    buffer.set(certHolderId, offset);
    offset += certHolderId.byteLength;
    buffer.set(certVersion, offset);

    request.setSignature(this.signer.sign(buffer));

    return request;
  }
}

module.exports = {
  CertificateRegistrationRequestBuilder,
  ContractRegistrationRequestBuilder,
  ContractsListingRequestBuilder,
  LedgerValidationRequestBuilder,
  ContractExecutionRequestBuilder,
};
