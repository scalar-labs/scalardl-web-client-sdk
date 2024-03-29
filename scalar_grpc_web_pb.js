/**
 * @fileoverview gRPC-Web generated client stub for rpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.rpc = require('./scalar_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Ledger_RegisterContract = new grpc.web.MethodDescriptor(
  '/rpc.Ledger/RegisterContract',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.ContractRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.registerContract =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/RegisterContract',
      request,
      metadata || {},
      methodDescriptor_Ledger_RegisterContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.registerContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/RegisterContract',
      request,
      metadata || {},
      methodDescriptor_Ledger_RegisterContract);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractsListingRequest,
 *   !proto.rpc.ContractsListingResponse>}
 */
const methodDescriptor_Ledger_ListContracts = new grpc.web.MethodDescriptor(
  '/rpc.Ledger/ListContracts',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractsListingRequest,
  proto.rpc.ContractsListingResponse,
  /**
   * @param {!proto.rpc.ContractsListingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ContractsListingResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractsListingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ContractsListingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ContractsListingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.listContracts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/ListContracts',
      request,
      metadata || {},
      methodDescriptor_Ledger_ListContracts,
      callback);
};


/**
 * @param {!proto.rpc.ContractsListingRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ContractsListingResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.listContracts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/ListContracts',
      request,
      metadata || {},
      methodDescriptor_Ledger_ListContracts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractExecutionRequest,
 *   !proto.rpc.ContractExecutionResponse>}
 */
const methodDescriptor_Ledger_ExecuteContract = new grpc.web.MethodDescriptor(
  '/rpc.Ledger/ExecuteContract',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractExecutionRequest,
  proto.rpc.ContractExecutionResponse,
  /**
   * @param {!proto.rpc.ContractExecutionRequest} request
   * @return {!Uint8Array}
   */
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
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ContractExecutionResponse)}
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
      methodDescriptor_Ledger_ExecuteContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractExecutionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ContractExecutionResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.executeContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/ExecuteContract',
      request,
      metadata || {},
      methodDescriptor_Ledger_ExecuteContract);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.LedgerValidationRequest,
 *   !proto.rpc.LedgerValidationResponse>}
 */
const methodDescriptor_Ledger_ValidateLedger = new grpc.web.MethodDescriptor(
  '/rpc.Ledger/ValidateLedger',
  grpc.web.MethodType.UNARY,
  proto.rpc.LedgerValidationRequest,
  proto.rpc.LedgerValidationResponse,
  /**
   * @param {!proto.rpc.LedgerValidationRequest} request
   * @return {!Uint8Array}
   */
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
 * @param {function(?grpc.web.RpcError, ?proto.rpc.LedgerValidationResponse)}
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
      methodDescriptor_Ledger_ValidateLedger,
      callback);
};


/**
 * @param {!proto.rpc.LedgerValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerValidationResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.validateLedger =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/ValidateLedger',
      request,
      metadata || {},
      methodDescriptor_Ledger_ValidateLedger);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.AssetProofRetrievalRequest,
 *   !proto.rpc.AssetProofRetrievalResponse>}
 */
const methodDescriptor_Ledger_RetrieveAssetProof = new grpc.web.MethodDescriptor(
  '/rpc.Ledger/RetrieveAssetProof',
  grpc.web.MethodType.UNARY,
  proto.rpc.AssetProofRetrievalRequest,
  proto.rpc.AssetProofRetrievalResponse,
  /**
   * @param {!proto.rpc.AssetProofRetrievalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.AssetProofRetrievalResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.AssetProofRetrievalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.AssetProofRetrievalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.AssetProofRetrievalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.retrieveAssetProof =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/RetrieveAssetProof',
      request,
      metadata || {},
      methodDescriptor_Ledger_RetrieveAssetProof,
      callback);
};


/**
 * @param {!proto.rpc.AssetProofRetrievalRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.AssetProofRetrievalResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.retrieveAssetProof =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/RetrieveAssetProof',
      request,
      metadata || {},
      methodDescriptor_Ledger_RetrieveAssetProof);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ExecutionAbortRequest,
 *   !proto.rpc.ExecutionAbortResponse>}
 */
const methodDescriptor_Ledger_AbortExecution = new grpc.web.MethodDescriptor(
  '/rpc.Ledger/AbortExecution',
  grpc.web.MethodType.UNARY,
  proto.rpc.ExecutionAbortRequest,
  proto.rpc.ExecutionAbortResponse,
  /**
   * @param {!proto.rpc.ExecutionAbortRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ExecutionAbortResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ExecutionAbortRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ExecutionAbortResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ExecutionAbortResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerClient.prototype.abortExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Ledger/AbortExecution',
      request,
      metadata || {},
      methodDescriptor_Ledger_AbortExecution,
      callback);
};


/**
 * @param {!proto.rpc.ExecutionAbortRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ExecutionAbortResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPromiseClient.prototype.abortExecution =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Ledger/AbortExecution',
      request,
      metadata || {},
      methodDescriptor_Ledger_AbortExecution);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerPrivilegedClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.LedgerPrivilegedPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.CertificateRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_LedgerPrivileged_RegisterCert = new grpc.web.MethodDescriptor(
  '/rpc.LedgerPrivileged/RegisterCert',
  grpc.web.MethodType.UNARY,
  proto.rpc.CertificateRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.CertificateRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerPrivilegedClient.prototype.registerCert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterCert',
      request,
      metadata || {},
      methodDescriptor_LedgerPrivileged_RegisterCert,
      callback);
};


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPrivilegedPromiseClient.prototype.registerCert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterCert',
      request,
      metadata || {},
      methodDescriptor_LedgerPrivileged_RegisterCert);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.FunctionRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_LedgerPrivileged_RegisterFunction = new grpc.web.MethodDescriptor(
  '/rpc.LedgerPrivileged/RegisterFunction',
  grpc.web.MethodType.UNARY,
  proto.rpc.FunctionRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.FunctionRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.FunctionRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerPrivilegedClient.prototype.registerFunction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterFunction',
      request,
      metadata || {},
      methodDescriptor_LedgerPrivileged_RegisterFunction,
      callback);
};


/**
 * @param {!proto.rpc.FunctionRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPrivilegedPromiseClient.prototype.registerFunction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RegisterFunction',
      request,
      metadata || {},
      methodDescriptor_LedgerPrivileged_RegisterFunction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.StateRetrievalRequest,
 *   !proto.rpc.StateRetrievalResponse>}
 */
const methodDescriptor_LedgerPrivileged_RetrieveState = new grpc.web.MethodDescriptor(
  '/rpc.LedgerPrivileged/RetrieveState',
  grpc.web.MethodType.UNARY,
  proto.rpc.StateRetrievalRequest,
  proto.rpc.StateRetrievalResponse,
  /**
   * @param {!proto.rpc.StateRetrievalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.StateRetrievalResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.StateRetrievalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.StateRetrievalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.StateRetrievalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.LedgerPrivilegedClient.prototype.retrieveState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RetrieveState',
      request,
      metadata || {},
      methodDescriptor_LedgerPrivileged_RetrieveState,
      callback);
};


/**
 * @param {!proto.rpc.StateRetrievalRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.StateRetrievalResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.LedgerPrivilegedPromiseClient.prototype.retrieveState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.LedgerPrivileged/RetrieveState',
      request,
      metadata || {},
      methodDescriptor_LedgerPrivileged_RetrieveState);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.AuditorClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.AuditorPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Auditor_RegisterContract = new grpc.web.MethodDescriptor(
  '/rpc.Auditor/RegisterContract',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.ContractRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.AuditorClient.prototype.registerContract =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Auditor/RegisterContract',
      request,
      metadata || {},
      methodDescriptor_Auditor_RegisterContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.AuditorPromiseClient.prototype.registerContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Auditor/RegisterContract',
      request,
      metadata || {},
      methodDescriptor_Auditor_RegisterContract);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractsListingRequest,
 *   !proto.rpc.ContractsListingResponse>}
 */
const methodDescriptor_Auditor_ListContracts = new grpc.web.MethodDescriptor(
  '/rpc.Auditor/ListContracts',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractsListingRequest,
  proto.rpc.ContractsListingResponse,
  /**
   * @param {!proto.rpc.ContractsListingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ContractsListingResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractsListingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ContractsListingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ContractsListingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.AuditorClient.prototype.listContracts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Auditor/ListContracts',
      request,
      metadata || {},
      methodDescriptor_Auditor_ListContracts,
      callback);
};


/**
 * @param {!proto.rpc.ContractsListingRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ContractsListingResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.AuditorPromiseClient.prototype.listContracts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Auditor/ListContracts',
      request,
      metadata || {},
      methodDescriptor_Auditor_ListContracts);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractExecutionRequest,
 *   !proto.rpc.ExecutionOrderingResponse>}
 */
const methodDescriptor_Auditor_OrderExecution = new grpc.web.MethodDescriptor(
  '/rpc.Auditor/OrderExecution',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractExecutionRequest,
  proto.rpc.ExecutionOrderingResponse,
  /**
   * @param {!proto.rpc.ContractExecutionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ExecutionOrderingResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractExecutionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ExecutionOrderingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ExecutionOrderingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.AuditorClient.prototype.orderExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Auditor/OrderExecution',
      request,
      metadata || {},
      methodDescriptor_Auditor_OrderExecution,
      callback);
};


/**
 * @param {!proto.rpc.ContractExecutionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ExecutionOrderingResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.AuditorPromiseClient.prototype.orderExecution =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Auditor/OrderExecution',
      request,
      metadata || {},
      methodDescriptor_Auditor_OrderExecution);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ExecutionValidationRequest,
 *   !proto.rpc.ContractExecutionResponse>}
 */
const methodDescriptor_Auditor_ValidateExecution = new grpc.web.MethodDescriptor(
  '/rpc.Auditor/ValidateExecution',
  grpc.web.MethodType.UNARY,
  proto.rpc.ExecutionValidationRequest,
  proto.rpc.ContractExecutionResponse,
  /**
   * @param {!proto.rpc.ExecutionValidationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ContractExecutionResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ExecutionValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ContractExecutionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ContractExecutionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.AuditorClient.prototype.validateExecution =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Auditor/ValidateExecution',
      request,
      metadata || {},
      methodDescriptor_Auditor_ValidateExecution,
      callback);
};


/**
 * @param {!proto.rpc.ExecutionValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ContractExecutionResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.AuditorPromiseClient.prototype.validateExecution =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Auditor/ValidateExecution',
      request,
      metadata || {},
      methodDescriptor_Auditor_ValidateExecution);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.LedgerValidationRequest,
 *   !proto.rpc.LedgerValidationResponse>}
 */
const methodDescriptor_Auditor_ValidateLedger = new grpc.web.MethodDescriptor(
  '/rpc.Auditor/ValidateLedger',
  grpc.web.MethodType.UNARY,
  proto.rpc.LedgerValidationRequest,
  proto.rpc.LedgerValidationResponse,
  /**
   * @param {!proto.rpc.LedgerValidationRequest} request
   * @return {!Uint8Array}
   */
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
 * @param {function(?grpc.web.RpcError, ?proto.rpc.LedgerValidationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgerValidationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.AuditorClient.prototype.validateLedger =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Auditor/ValidateLedger',
      request,
      metadata || {},
      methodDescriptor_Auditor_ValidateLedger,
      callback);
};


/**
 * @param {!proto.rpc.LedgerValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgerValidationResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.AuditorPromiseClient.prototype.validateLedger =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Auditor/ValidateLedger',
      request,
      metadata || {},
      methodDescriptor_Auditor_ValidateLedger);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.AuditorPrivilegedClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.AuditorPrivilegedPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.CertificateRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_AuditorPrivileged_RegisterCert = new grpc.web.MethodDescriptor(
  '/rpc.AuditorPrivileged/RegisterCert',
  grpc.web.MethodType.UNARY,
  proto.rpc.CertificateRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.CertificateRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.AuditorPrivilegedClient.prototype.registerCert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.AuditorPrivileged/RegisterCert',
      request,
      metadata || {},
      methodDescriptor_AuditorPrivileged_RegisterCert,
      callback);
};


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.AuditorPrivilegedPromiseClient.prototype.registerCert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.AuditorPrivileged/RegisterCert',
      request,
      metadata || {},
      methodDescriptor_AuditorPrivileged_RegisterCert);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.ProofRegistryClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.ProofRegistryPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ProofsRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_ProofRegistry_RegisterProofs = new grpc.web.MethodDescriptor(
  '/rpc.ProofRegistry/RegisterProofs',
  grpc.web.MethodType.UNARY,
  proto.rpc.ProofsRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.ProofsRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.ProofsRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProofRegistryClient.prototype.registerProofs =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.ProofRegistry/RegisterProofs',
      request,
      metadata || {},
      methodDescriptor_ProofRegistry_RegisterProofs,
      callback);
};


/**
 * @param {!proto.rpc.ProofsRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.ProofRegistryPromiseClient.prototype.registerProofs =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.ProofRegistry/RegisterProofs',
      request,
      metadata || {},
      methodDescriptor_ProofRegistry_RegisterProofs);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ProofRetrievalRequest,
 *   !proto.rpc.ProofRetrievalResponse>}
 */
const methodDescriptor_ProofRegistry_RetrieveProof = new grpc.web.MethodDescriptor(
  '/rpc.ProofRegistry/RetrieveProof',
  grpc.web.MethodType.UNARY,
  proto.rpc.ProofRetrievalRequest,
  proto.rpc.ProofRetrievalResponse,
  /**
   * @param {!proto.rpc.ProofRetrievalRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.ProofRetrievalResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.ProofRetrievalRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ProofRetrievalResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ProofRetrievalResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProofRegistryClient.prototype.retrieveProof =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.ProofRegistry/RetrieveProof',
      request,
      metadata || {},
      methodDescriptor_ProofRegistry_RetrieveProof,
      callback);
};


/**
 * @param {!proto.rpc.ProofRetrievalRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ProofRetrievalResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.ProofRegistryPromiseClient.prototype.retrieveProof =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.ProofRegistry/RetrieveProof',
      request,
      metadata || {},
      methodDescriptor_ProofRegistry_RetrieveProof);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.ProxyClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.rpc.ProxyPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.CertificateRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Proxy_RegisterCert = new grpc.web.MethodDescriptor(
  '/rpc.Proxy/RegisterCert',
  grpc.web.MethodType.UNARY,
  proto.rpc.CertificateRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.CertificateRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProxyClient.prototype.registerCert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Proxy/RegisterCert',
      request,
      metadata || {},
      methodDescriptor_Proxy_RegisterCert,
      callback);
};


/**
 * @param {!proto.rpc.CertificateRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.ProxyPromiseClient.prototype.registerCert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Proxy/RegisterCert',
      request,
      metadata || {},
      methodDescriptor_Proxy_RegisterCert);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Proxy_RegisterContract = new grpc.web.MethodDescriptor(
  '/rpc.Proxy/RegisterContract',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.ContractRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProxyClient.prototype.registerContract =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Proxy/RegisterContract',
      request,
      metadata || {},
      methodDescriptor_Proxy_RegisterContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.ProxyPromiseClient.prototype.registerContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Proxy/RegisterContract',
      request,
      metadata || {},
      methodDescriptor_Proxy_RegisterContract);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.FunctionRegistrationRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Proxy_RegisterFunction = new grpc.web.MethodDescriptor(
  '/rpc.Proxy/RegisterFunction',
  grpc.web.MethodType.UNARY,
  proto.rpc.FunctionRegistrationRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.FunctionRegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.FunctionRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProxyClient.prototype.registerFunction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Proxy/RegisterFunction',
      request,
      metadata || {},
      methodDescriptor_Proxy_RegisterFunction,
      callback);
};


/**
 * @param {!proto.rpc.FunctionRegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.ProxyPromiseClient.prototype.registerFunction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Proxy/RegisterFunction',
      request,
      metadata || {},
      methodDescriptor_Proxy_RegisterFunction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.ContractExecutionRequest,
 *   !proto.rpc.ContractExecutionResponse>}
 */
const methodDescriptor_Proxy_ExecuteContract = new grpc.web.MethodDescriptor(
  '/rpc.Proxy/ExecuteContract',
  grpc.web.MethodType.UNARY,
  proto.rpc.ContractExecutionRequest,
  proto.rpc.ContractExecutionResponse,
  /**
   * @param {!proto.rpc.ContractExecutionRequest} request
   * @return {!Uint8Array}
   */
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
 * @param {function(?grpc.web.RpcError, ?proto.rpc.ContractExecutionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.ContractExecutionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProxyClient.prototype.executeContract =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Proxy/ExecuteContract',
      request,
      metadata || {},
      methodDescriptor_Proxy_ExecuteContract,
      callback);
};


/**
 * @param {!proto.rpc.ContractExecutionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.ContractExecutionResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.ProxyPromiseClient.prototype.executeContract =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Proxy/ExecuteContract',
      request,
      metadata || {},
      methodDescriptor_Proxy_ExecuteContract);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.LedgersValidationRequest,
 *   !proto.rpc.LedgersValidationResponse>}
 */
const methodDescriptor_Proxy_ValidateLedgers = new grpc.web.MethodDescriptor(
  '/rpc.Proxy/ValidateLedgers',
  grpc.web.MethodType.UNARY,
  proto.rpc.LedgersValidationRequest,
  proto.rpc.LedgersValidationResponse,
  /**
   * @param {!proto.rpc.LedgersValidationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.rpc.LedgersValidationResponse.deserializeBinary
);


/**
 * @param {!proto.rpc.LedgersValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.rpc.LedgersValidationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.rpc.LedgersValidationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProxyClient.prototype.validateLedgers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Proxy/ValidateLedgers',
      request,
      metadata || {},
      methodDescriptor_Proxy_ValidateLedgers,
      callback);
};


/**
 * @param {!proto.rpc.LedgersValidationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.rpc.LedgersValidationResponse>}
 *     Promise that resolves to the response
 */
proto.rpc.ProxyPromiseClient.prototype.validateLedgers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Proxy/ValidateLedgers',
      request,
      metadata || {},
      methodDescriptor_Proxy_ValidateLedgers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.rpc.IdentifiableResponse,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Proxy_ProxyResponse = new grpc.web.MethodDescriptor(
  '/rpc.Proxy/ProxyResponse',
  grpc.web.MethodType.UNARY,
  proto.rpc.IdentifiableResponse,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.rpc.IdentifiableResponse} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.rpc.IdentifiableResponse} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.rpc.ProxyClient.prototype.proxyResponse =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/rpc.Proxy/ProxyResponse',
      request,
      metadata || {},
      methodDescriptor_Proxy_ProxyResponse,
      callback);
};


/**
 * @param {!proto.rpc.IdentifiableResponse} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.rpc.ProxyPromiseClient.prototype.proxyResponse =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/rpc.Proxy/ProxyResponse',
      request,
      metadata || {},
      methodDescriptor_Proxy_ProxyResponse);
};


module.exports = proto.rpc;

