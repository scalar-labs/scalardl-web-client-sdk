/**
 * @fileoverview gRPC-Web generated client stub for rpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.rpc = require('./scalar_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.ContractRegistrationRequest,
 *   !proto.rpc.LedgerServiceResponse>}
 */
const methodInfo_Ledger_RegisterContract = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.LedgerServiceResponse,
  /** @param {!proto.rpc.ContractRegistrationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.LedgerServiceResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.LedgerServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgerServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.registerContract =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/RegisterContract',
      request,
      metadata || {},
      methodInfo_Ledger_RegisterContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerServiceResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.registerContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/RegisterContract',
      request,
      metadata || {},
      methodInfo_Ledger_RegisterContract);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.ContractsListingRequest,
 *   !proto.rpc.LedgerServiceResponse>}
 */
const methodInfo_Ledger_ListContracts = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.LedgerServiceResponse,
  /** @param {!proto.rpc.ContractsListingRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.LedgerServiceResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractsListingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.LedgerServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgerServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.listContracts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/ListContracts',
      request,
      metadata || {},
      methodInfo_Ledger_ListContracts,
      callback);
};


/**
 * @param {!proto.rpc.ContractsListingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerServiceResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.listContracts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/ListContracts',
      request,
      metadata || {},
      methodInfo_Ledger_ListContracts);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.ContractExecutionRequest,
 *   !proto.rpc.ContractExecutionResponse>}
 */
const methodInfo_Ledger_ExecuteContract = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.ContractExecutionResponse,
  /** @param {!proto.rpc.ContractExecutionRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ContractExecutionResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractExecutionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.ContractExecutionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ContractExecutionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.executeContract =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/ExecuteContract',
      request,
      metadata || {},
      methodInfo_Ledger_ExecuteContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractExecutionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ContractExecutionResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.executeContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/ExecuteContract',
      request,
      metadata || {},
      methodInfo_Ledger_ExecuteContract);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.LedgerValidationRequest,
 *   !proto.rpc.LedgerValidationResponse>}
 */
const methodInfo_Ledger_ValidateLedger = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.LedgerValidationResponse,
  /** @param {!proto.rpc.LedgerValidationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.LedgerValidationResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.LedgerValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.LedgerValidationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgerValidationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.validateLedger =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/ValidateLedger',
      request,
      metadata || {},
      methodInfo_Ledger_ValidateLedger,
      callback);
};


/**
 * @param {!proto.rpc.LedgerValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerValidationResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.validateLedger =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/ValidateLedger',
      request,
      metadata || {},
      methodInfo_Ledger_ValidateLedger);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerPrivilegedClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerPrivilegedPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.CertificateRegistrationRequest,
 *   !proto.rpc.LedgerServiceResponse>}
 */
const methodInfo_LedgerPrivileged_RegisterCert = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.LedgerServiceResponse,
  /** @param {!proto.rpc.CertificateRegistrationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.LedgerServiceResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.LedgerServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgerServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerPrivilegedClient.prototype.registerCert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterCert',
      request,
      metadata || {},
      methodInfo_LedgerPrivileged_RegisterCert,
      callback);
};


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerServiceResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.LedgerPrivilegedPromiseClient.prototype.registerCert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterCert',
      request,
      metadata || {},
      methodInfo_LedgerPrivileged_RegisterCert);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.FunctionRegistrationRequest,
 *   !proto.rpc.LedgerServiceResponse>}
 */
const methodInfo_LedgerPrivileged_RegisterFunction = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.LedgerServiceResponse,
  /** @param {!proto.rpc.FunctionRegistrationRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.LedgerServiceResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.FunctionRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.LedgerServiceResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgerServiceResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerPrivilegedClient.prototype.registerFunction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterFunction',
      request,
      metadata || {},
      methodInfo_LedgerPrivileged_RegisterFunction,
      callback);
};


/**
 * @param {!proto.rpc.FunctionRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerServiceResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.LedgerPrivilegedPromiseClient.prototype.registerFunction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterFunction',
      request,
      metadata || {},
      methodInfo_LedgerPrivileged_RegisterFunction);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.ProofRegistryClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.ProofRegistryPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.AssetProofs,
 *   !proto.rpc.ProofRegistryResponse>}
 */
const methodInfo_ProofRegistry_Store = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.ProofRegistryResponse,
  /** @param {!proto.rpc.AssetProofs} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ProofRegistryResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.AssetProofs} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.ProofRegistryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ProofRegistryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProofRegistryClient.prototype.store =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.ProofRegistry/Store',
      request,
      metadata || {},
      methodInfo_ProofRegistry_Store,
      callback);
};


/**
 * @param {!proto.rpc.AssetProofs} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ProofRegistryResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.ProofRegistryPromiseClient.prototype.store =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.ProofRegistry/Store',
      request,
      metadata || {},
      methodInfo_ProofRegistry_Store);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.rpc.AssetReference,
 *   !proto.rpc.ProofRegistryResponse>}
 */
const methodInfo_ProofRegistry_Retrieve = new grpc.web.AbstractClientBase.MethodInfo(
  proto.rpc.ProofRegistryResponse,
  /** @param {!proto.rpc.AssetReference} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ProofRegistryResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.AssetReference} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.rpc.ProofRegistryResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ProofRegistryResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProofRegistryClient.prototype.retrieve =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.ProofRegistry/Retrieve',
      request,
      metadata || {},
      methodInfo_ProofRegistry_Retrieve,
      callback);
};


/**
 * @param {!proto.rpc.AssetReference} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ProofRegistryResponse>}
 *     A native promise that resolves to the response
 */
proto.rpc.ProofRegistryPromiseClient.prototype.retrieve =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.ProofRegistry/Retrieve',
      request,
      metadata || {},
      methodInfo_ProofRegistry_Retrieve);
};


module.exports = proto.rpc;

