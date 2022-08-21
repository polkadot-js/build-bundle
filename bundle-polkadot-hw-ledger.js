(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/util')) :
	typeof define === 'function' && define.amd ? define(['exports', '@polkadot/util'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotHwLedger = {}, global.polkadotUtil));
})(this, (function (exports, util) { 'use strict';

	const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function () {
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var dist = {};

	var legacy_apps = {};

	var supported_apps = {};

	var substrate_app = {};

	var common = {};

	(function (exports) {
		var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
		    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
		    return new (P || (P = Promise))(function (resolve, reject) {
		        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		        step((generator = generator.apply(thisArg, _arguments || [])).next());
		    });
		};
		var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
		    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
		    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
		    function verb(n) { return function (v) { return step([n, v]); }; }
		    function step(op) {
		        if (f) throw new TypeError("Generator is already executing.");
		        while (_) try {
		            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
		            if (y = 0, t) op = [op[0] & 2, t.value];
		            switch (op[0]) {
		                case 0: case 1: t = op; break;
		                case 4: _.label++; return { value: op[1], done: false };
		                case 5: _.label++; y = op[1]; op = [0]; continue;
		                case 7: op = _.ops.pop(); _.trys.pop(); continue;
		                default:
		                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
		                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
		                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
		                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
		                    if (t[2]) _.ops.pop();
		                    _.trys.pop(); continue;
		            }
		            op = body.call(thisArg, _);
		        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
		        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
		    }
		};
		exports.__esModule = true;
		exports.getVersion = exports.processErrorResponse = exports.errorCodeToString = exports.ERROR_DESCRIPTION = exports.ERROR_CODE = exports.SCHEME = exports.P1_VALUES = exports.PAYLOAD_TYPE = exports.INS = exports.CHUNK_SIZE = void 0;
		exports.CHUNK_SIZE = 250;
		exports.INS = {
		    GET_VERSION: 0x00,
		    GET_ADDR: 0x01,
		    SIGN: 0x02,
		    ALLOWLIST_GET_PUBKEY: 0x90,
		    ALLOWLIST_SET_PUBKEY: 0x91,
		    ALLOWLIST_GET_HASH: 0x92,
		    ALLOWLIST_UPLOAD: 0x93
		};
		exports.PAYLOAD_TYPE = {
		    INIT: 0x00,
		    ADD: 0x01,
		    LAST: 0x02
		};
		exports.P1_VALUES = {
		    ONLY_RETRIEVE: 0x00,
		    SHOW_ADDRESS_IN_DEVICE: 0x01
		};
		exports.SCHEME = {
		    ED25519: 0x00,
		    SR25519: 0x01
		};
		exports.ERROR_CODE = {
		    NoError: 0x9000
		};
		exports.ERROR_DESCRIPTION = {
		    1: 'U2F: Unknown',
		    2: 'U2F: Bad request',
		    3: 'U2F: Configuration unsupported',
		    4: 'U2F: Device Ineligible',
		    5: 'U2F: Timeout',
		    14: 'Timeout',
		    0x9000: 'No errors',
		    0x9001: 'Device is busy',
		    0x6802: 'Error deriving keys',
		    0x6400: 'Execution Error',
		    0x6700: 'Wrong Length',
		    0x6982: 'Empty Buffer',
		    0x6983: 'Output buffer too small',
		    0x6984: 'Data is invalid',
		    0x6985: 'Conditions not satisfied',
		    0x6986: 'Transaction rejected',
		    0x6a80: 'Bad key handle',
		    0x6b00: 'Invalid P1/P2',
		    0x6d00: 'Instruction not supported',
		    0x6e00: 'App does not seem to be open',
		    0x6f00: 'Unknown error',
		    0x6f01: 'Sign/verify error'
		};
		function errorCodeToString(statusCode) {
		    if (statusCode in exports.ERROR_DESCRIPTION)
		        return exports.ERROR_DESCRIPTION[statusCode];
		    return "Unknown Status Code: ".concat(statusCode);
		}
		exports.errorCodeToString = errorCodeToString;
		function isDict(v) {
		    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
		}
		function processErrorResponse(response) {
		    if (response) {
		        if (isDict(response)) {
		            if (Object.prototype.hasOwnProperty.call(response, 'statusCode')) {
		                return {
		                    return_code: response.statusCode,
		                    error_message: errorCodeToString(response.statusCode)
		                };
		            }
		            if (Object.prototype.hasOwnProperty.call(response, 'return_code') &&
		                Object.prototype.hasOwnProperty.call(response, 'error_message')) {
		                return response;
		            }
		        }
		        return {
		            return_code: 0xffff,
		            error_message: response.toString()
		        };
		    }
		    return {
		        return_code: 0xffff,
		        error_message: response.toString()
		    };
		}
		exports.processErrorResponse = processErrorResponse;
		function getVersion(transport, cla) {
		    return __awaiter(this, void 0, void 0, function () {
		        return __generator(this, function (_a) {
		            return [2 , transport.send(cla, exports.INS.GET_VERSION, 0, 0).then(function (response) {
		                    var errorCodeData = response.slice(-2);
		                    var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
		                    if (response.length !== 14) {
		                        return {
		                            return_code: 0x6984,
		                            error_message: errorCodeToString(0x6984)
		                        };
		                    }
		                    var major = response[1] * 256 + response[2];
		                    var minor = response[3] * 256 + response[4];
		                    var patch = response[5] * 256 + response[6];
		                    var deviceLocked = response[7] === 1;
		                    var targetId = (response[8] << 24) + (response[9] << 16) + (response[10] << 8) + (response[11] << 0);
		                    return {
		                        return_code: returnCode,
		                        error_message: errorCodeToString(returnCode),
		                        test_mode: response[0] !== 0,
		                        major: major,
		                        minor: minor,
		                        patch: patch,
		                        deviceLocked: deviceLocked,
		                        target_id: targetId.toString(16)
		                    };
		                }, processErrorResponse)];
		        });
		    });
		}
		exports.getVersion = getVersion;
	} (common));
	getDefaultExportFromCjs(common);

	var __awaiter$4 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator$4 = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	substrate_app.__esModule = true;
	substrate_app.SubstrateApp = void 0;
	var common_1 = common;
	var SubstrateApp =  (function () {
	    function SubstrateApp(transport, cla, slip0044) {
	        if (!transport) {
	            throw new Error('Transport has not been defined');
	        }
	        this.transport = transport;
	        this.cla = cla;
	        this.slip0044 = slip0044;
	    }
	    SubstrateApp.serializePath = function (slip0044, account, change, addressIndex) {
	        if (!Number.isInteger(account))
	            throw new Error('Input must be an integer');
	        if (!Number.isInteger(change))
	            throw new Error('Input must be an integer');
	        if (!Number.isInteger(addressIndex))
	            throw new Error('Input must be an integer');
	        var buf = Buffer.alloc(20);
	        buf.writeUInt32LE(0x8000002c, 0);
	        buf.writeUInt32LE(slip0044, 4);
	        buf.writeUInt32LE(account, 8);
	        buf.writeUInt32LE(change, 12);
	        buf.writeUInt32LE(addressIndex, 16);
	        return buf;
	    };
	    SubstrateApp.GetChunks = function (message) {
	        var chunks = [];
	        var buffer = Buffer.from(message);
	        for (var i = 0; i < buffer.length; i += common_1.CHUNK_SIZE) {
	            var end = i + common_1.CHUNK_SIZE;
	            if (i > buffer.length) {
	                end = buffer.length;
	            }
	            chunks.push(buffer.slice(i, end));
	        }
	        return chunks;
	    };
	    SubstrateApp.signGetChunks = function (slip0044, account, change, addressIndex, message) {
	        var chunks = [];
	        var bip44Path = SubstrateApp.serializePath(slip0044, account, change, addressIndex);
	        chunks.push(bip44Path);
	        chunks.push.apply(chunks, SubstrateApp.GetChunks(message));
	        return chunks;
	    };
	    SubstrateApp.prototype.getVersion = function () {
	        return __awaiter$4(this, void 0, void 0, function () {
	            var e_1;
	            return __generator$4(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        _a.trys.push([0, 2, , 3]);
	                        return [4 , (0, common_1.getVersion)(this.transport, this.cla)];
	                    case 1: return [2 , _a.sent()];
	                    case 2:
	                        e_1 = _a.sent();
	                        return [2 , (0, common_1.processErrorResponse)(e_1)];
	                    case 3: return [2 ];
	                }
	            });
	        });
	    };
	    SubstrateApp.prototype.appInfo = function () {
	        return __awaiter$4(this, void 0, void 0, function () {
	            return __generator$4(this, function (_a) {
	                return [2 , this.transport.send(0xb0, 0x01, 0, 0).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        var appName = '';
	                        var appVersion = '';
	                        var flagLen = 0;
	                        var flagsValue = 0;
	                        if (response[0] !== 1) {
	                            return {
	                                return_code: 0x9001,
	                                error_message: 'response format ID not recognized'
	                            };
	                        }
	                        else {
	                            var appNameLen = response[1];
	                            appName = response.slice(2, 2 + appNameLen).toString('ascii');
	                            var idx = 2 + appNameLen;
	                            var appVersionLen = response[idx];
	                            idx += 1;
	                            appVersion = response.slice(idx, idx + appVersionLen).toString('ascii');
	                            idx += appVersionLen;
	                            var appFlagsLen = response[idx];
	                            idx += 1;
	                            flagLen = appFlagsLen;
	                            flagsValue = response[idx];
	                        }
	                        return {
	                            return_code: returnCode,
	                            error_message: (0, common_1.errorCodeToString)(returnCode),
	                            appName: appName ? appName : 'err',
	                            appVersion: appVersion ? appVersion : 'err',
	                            flagLen: flagLen,
	                            flagsValue: flagsValue,
	                            flag_recovery: (flagsValue & 1) !== 0,
	                            flag_signed_mcu_code: (flagsValue & 2) !== 0,
	                            flag_onboarded: (flagsValue & 4) !== 0,
	                            flag_pin_validated: (flagsValue & 128) !== 0
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.getAddress = function (account, change, addressIndex, requireConfirmation, scheme) {
	        if (requireConfirmation === void 0) { requireConfirmation = false; }
	        if (scheme === void 0) { scheme = common_1.SCHEME.ED25519; }
	        return __awaiter$4(this, void 0, void 0, function () {
	            var bip44Path, p1, p2;
	            return __generator$4(this, function (_a) {
	                bip44Path = SubstrateApp.serializePath(this.slip0044, account, change, addressIndex);
	                p1 = 0;
	                if (requireConfirmation)
	                    p1 = 1;
	                p2 = 0;
	                if (!isNaN(scheme))
	                    p2 = scheme;
	                return [2 , this.transport.send(this.cla, common_1.INS.GET_ADDR, p1, p2, bip44Path).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var errorCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        return {
	                            pubKey: response.slice(0, 32).toString('hex'),
	                            address: response.slice(32, response.length - 2).toString('ascii'),
	                            return_code: errorCode,
	                            error_message: (0, common_1.errorCodeToString)(errorCode)
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.signSendChunk = function (chunkIdx, chunkNum, chunk, scheme) {
	        if (scheme === void 0) { scheme = common_1.SCHEME.ED25519; }
	        return __awaiter$4(this, void 0, void 0, function () {
	            var payloadType, p2;
	            return __generator$4(this, function (_a) {
	                payloadType = common_1.PAYLOAD_TYPE.ADD;
	                if (chunkIdx === 1) {
	                    payloadType = common_1.PAYLOAD_TYPE.INIT;
	                }
	                if (chunkIdx === chunkNum) {
	                    payloadType = common_1.PAYLOAD_TYPE.LAST;
	                }
	                p2 = 0;
	                if (!isNaN(scheme))
	                    p2 = scheme;
	                return [2 , this.transport.send(this.cla, common_1.INS.SIGN, payloadType, p2, chunk, [common_1.ERROR_CODE.NoError, 0x6984, 0x6a80]).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        var errorMessage = (0, common_1.errorCodeToString)(returnCode);
	                        var signature = null;
	                        if (returnCode === 0x6a80 || returnCode === 0x6984) {
	                            errorMessage = response.slice(0, response.length - 2).toString('ascii');
	                        }
	                        else if (response.length > 2) {
	                            signature = response.slice(0, response.length - 2);
	                        }
	                        return {
	                            signature: signature,
	                            return_code: returnCode,
	                            error_message: errorMessage
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.sign = function (account, change, addressIndex, message, scheme) {
	        if (scheme === void 0) { scheme = common_1.SCHEME.ED25519; }
	        return __awaiter$4(this, void 0, void 0, function () {
	            var chunks;
	            var _this = this;
	            return __generator$4(this, function (_a) {
	                chunks = SubstrateApp.signGetChunks(this.slip0044, account, change, addressIndex, message);
	                return [2 , this.signSendChunk(1, chunks.length, chunks[0], scheme).then(function () { return __awaiter$4(_this, void 0, void 0, function () {
	                        var result, i;
	                        return __generator$4(this, function (_a) {
	                            switch (_a.label) {
	                                case 0:
	                                    i = 1;
	                                    _a.label = 1;
	                                case 1:
	                                    if (!(i < chunks.length)) return [3 , 4];
	                                    return [4 , this.signSendChunk(1 + i, chunks.length, chunks[i], scheme)];
	                                case 2:
	                                    result = _a.sent();
	                                    if (result.return_code !== common_1.ERROR_CODE.NoError) {
	                                        return [3 , 4];
	                                    }
	                                    _a.label = 3;
	                                case 3:
	                                    i += 1;
	                                    return [3 , 1];
	                                case 4: return [2 , {
	                                        return_code: result.return_code,
	                                        error_message: result.error_message,
	                                        signature: result.signature
	                                    }];
	                            }
	                        });
	                    }); }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.getAllowlistPubKey = function () {
	        return __awaiter$4(this, void 0, void 0, function () {
	            return __generator$4(this, function (_a) {
	                return [2 , this.transport.send(this.cla, common_1.INS.ALLOWLIST_GET_PUBKEY, 0, 0).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        console.log(response);
	                        var pubkey = response.slice(0, 32);
	                        if (response.length !== 34) {
	                            return {
	                                return_code: 0x6984,
	                                error_message: (0, common_1.errorCodeToString)(0x6984)
	                            };
	                        }
	                        return {
	                            return_code: returnCode,
	                            error_message: (0, common_1.errorCodeToString)(returnCode),
	                            pubkey: pubkey
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.setAllowlistPubKey = function (pk) {
	        return __awaiter$4(this, void 0, void 0, function () {
	            return __generator$4(this, function (_a) {
	                return [2 , this.transport.send(this.cla, common_1.INS.ALLOWLIST_SET_PUBKEY, 0, 0, pk).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        return {
	                            return_code: returnCode,
	                            error_message: (0, common_1.errorCodeToString)(returnCode)
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.getAllowlistHash = function () {
	        return __awaiter$4(this, void 0, void 0, function () {
	            return __generator$4(this, function (_a) {
	                return [2 , this.transport.send(this.cla, common_1.INS.ALLOWLIST_GET_HASH, 0, 0).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        console.log(response);
	                        var hash = response.slice(0, 32);
	                        if (response.length !== 34) {
	                            return {
	                                return_code: 0x6984,
	                                error_message: (0, common_1.errorCodeToString)(0x6984)
	                            };
	                        }
	                        return {
	                            return_code: returnCode,
	                            error_message: (0, common_1.errorCodeToString)(returnCode),
	                            hash: hash
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.uploadSendChunk = function (chunkIdx, chunkNum, chunk) {
	        return __awaiter$4(this, void 0, void 0, function () {
	            var payloadType;
	            return __generator$4(this, function (_a) {
	                payloadType = common_1.PAYLOAD_TYPE.ADD;
	                if (chunkIdx === 1) {
	                    payloadType = common_1.PAYLOAD_TYPE.INIT;
	                }
	                if (chunkIdx === chunkNum) {
	                    payloadType = common_1.PAYLOAD_TYPE.LAST;
	                }
	                return [2 , this.transport.send(this.cla, common_1.INS.ALLOWLIST_UPLOAD, payloadType, 0, chunk, [common_1.ERROR_CODE.NoError]).then(function (response) {
	                        var errorCodeData = response.slice(-2);
	                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	                        var errorMessage = (0, common_1.errorCodeToString)(returnCode);
	                        return {
	                            return_code: returnCode,
	                            error_message: errorMessage
	                        };
	                    }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    SubstrateApp.prototype.uploadAllowlist = function (message) {
	        return __awaiter$4(this, void 0, void 0, function () {
	            var chunks;
	            var _this = this;
	            return __generator$4(this, function (_a) {
	                chunks = [];
	                chunks.push(Buffer.from([0]));
	                chunks.push.apply(chunks, SubstrateApp.GetChunks(message));
	                return [2 , this.uploadSendChunk(1, chunks.length, chunks[0]).then(function (result) { return __awaiter$4(_this, void 0, void 0, function () {
	                        var i;
	                        return __generator$4(this, function (_a) {
	                            switch (_a.label) {
	                                case 0:
	                                    if (result.return_code !== common_1.ERROR_CODE.NoError) {
	                                        return [2 , {
	                                                return_code: result.return_code,
	                                                error_message: result.error_message
	                                            }];
	                                    }
	                                    i = 1;
	                                    _a.label = 1;
	                                case 1:
	                                    if (!(i < chunks.length)) return [3 , 4];
	                                    return [4 , this.uploadSendChunk(1 + i, chunks.length, chunks[i])];
	                                case 2:
	                                    result = _a.sent();
	                                    if (result.return_code !== common_1.ERROR_CODE.NoError) {
	                                        return [3 , 4];
	                                    }
	                                    _a.label = 3;
	                                case 3:
	                                    i += 1;
	                                    return [3 , 1];
	                                case 4: return [2 , {
	                                        return_code: result.return_code,
	                                        error_message: result.error_message
	                                    }];
	                            }
	                        });
	                    }); }, common_1.processErrorResponse)];
	            });
	        });
	    };
	    return SubstrateApp;
	}());
	substrate_app.SubstrateApp = SubstrateApp;

	(function (exports) {
		exports.__esModule = true;
		exports.supportedApps = exports.getAppParams = exports.newSubstrateApp = void 0;
		var substrate_app_1 = substrate_app;
		function newSubstrateApp(transport, chainName) {
		    var requestedApp = exports.supportedApps.find(function (app) {
		        return app.name.toLowerCase() === chainName.toLowerCase();
		    });
		    if (requestedApp) {
		        return new substrate_app_1.SubstrateApp(transport, requestedApp.cla, requestedApp.slip0044);
		    }
		    throw new Error("Error: ".concat(chainName, " not supported"));
		}
		exports.newSubstrateApp = newSubstrateApp;
		function getAppParams(chainName) {
		    var params = exports.supportedApps.find(function (app) {
		        return app.name.toLowerCase() === chainName.toLowerCase();
		    });
		    return params;
		}
		exports.getAppParams = getAppParams;
		exports.supportedApps = [
		    {
		        name: 'Polkadot',
		        cla: 0x90,
		        slip0044: 0x80000162,
		        ss58_addr_type: 0
		    },
		    {
		        name: 'Polymesh',
		        cla: 0x91,
		        slip0044: 0x80000253,
		        ss58_addr_type: 12
		    },
		    {
		        name: 'Dock',
		        cla: 0x92,
		        slip0044: 0x80000252,
		        ss58_addr_type: 22
		    },
		    {
		        name: 'Centrifuge',
		        cla: 0x93,
		        slip0044: 0x800002eb,
		        ss58_addr_type: 36
		    },
		    {
		        name: 'Edgeware',
		        cla: 0x94,
		        slip0044: 0x8000020b,
		        ss58_addr_type: 7
		    },
		    {
		        name: 'Equilibrium',
		        cla: 0x95,
		        slip0044: 0x85f5e0fd,
		        ss58_addr_type: 67
		    },
		    {
		        name: 'Statemint',
		        cla: 0x96,
		        slip0044: 0x80000162,
		        ss58_addr_type: 0
		    },
		    {
		        name: 'Statemine',
		        cla: 0x97,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 2
		    },
		    {
		        name: 'Nodle',
		        cla: 0x98,
		        slip0044: 0x800003eb,
		        ss58_addr_type: 37
		    },
		    {
		        name: 'Kusama',
		        cla: 0x99,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 2
		    },
		    {
		        name: 'Karura',
		        cla: 0x9a,
		        slip0044: 0x800002ae,
		        ss58_addr_type: 8
		    },
		    {
		        name: 'Acala',
		        cla: 0x9b,
		        slip0044: 0x80000313,
		        ss58_addr_type: 10
		    },
		    {
		        name: 'Genshiro',
		        cla: 0x9e,
		        slip0044: 0x85f5e0fc,
		        ss58_addr_type: 67
		    },
		    {
		        name: 'Sora',
		        cla: 0x9f,
		        slip0044: 0x80000269,
		        ss58_addr_type: 69
		    },
		    {
		        name: 'Polkadex',
		        cla: 0xa0,
		        slip0044: 0x8000031f,
		        ss58_addr_type: 88
		    },
		    {
		        name: 'Bifrost',
		        cla: 0xa1,
		        slip0044: 0x80000314,
		        ss58_addr_type: 6
		    },
		    {
		        name: 'Reef',
		        cla: 0xa2,
		        slip0044: 0x80000333,
		        ss58_addr_type: 42
		    },
		    {
		        name: 'XXNetwork',
		        cla: 0xa3,
		        slip0044: 0x800007a3,
		        ss58_addr_type: 55
		    },
		    {
		        name: 'AlephZero',
		        cla: 0xa4,
		        slip0044: 0x80000283,
		        ss58_addr_type: 42
		    },
		    {
		        name: 'Interlay',
		        cla: 0xa5,
		        slip0044: 0x80000162,
		        ss58_addr_type: 2032
		    },
		    {
		        name: 'Parallel',
		        cla: 0xa6,
		        slip0044: 0x80000162,
		        ss58_addr_type: 172
		    },
		    {
		        name: 'Composable',
		        cla: 0xa8,
		        slip0044: 0x80000162,
		        ss58_addr_type: 49
		    },
		    {
		        name: 'Astar',
		        cla: 0xa9,
		        slip0044: 0x8000032a,
		        ss58_addr_type: 5
		    },
		    {
		        name: 'Stafi',
		        cla: 0xac,
		        slip0044: 0x8000038b,
		        ss58_addr_type: 20
		    },
		    {
		        name: 'Unique',
		        cla: 0xad,
		        slip0044: 0x80000162,
		        ss58_addr_type: 7391
		    },
		    {
		        name: 'BifrostKusama',
		        cla: 0xae,
		        slip0044: 0x80000314,
		        ss58_addr_type: 6
		    },
		];
	} (supported_apps));
	getDefaultExportFromCjs(supported_apps);

	legacy_apps.__esModule = true;
	legacy_apps.newBifrostKusamaApp = legacy_apps.newUniqueApp = legacy_apps.newInterlayApp = legacy_apps.newAlephZeroApp = legacy_apps.newStafiApp = legacy_apps.newComposableApp = legacy_apps.newAstarApp = legacy_apps.newParallelApp = legacy_apps.newXXNetworkApp = legacy_apps.newAcalaApp = legacy_apps.newReefApp = legacy_apps.newKaruraApp = legacy_apps.newBifrostApp = legacy_apps.newPolkadexApp = legacy_apps.newSoraApp = legacy_apps.newNodleApp = legacy_apps.newStatemineApp = legacy_apps.newStatemintApp = legacy_apps.newGenshiroApp = legacy_apps.newEquilibriumApp = legacy_apps.newEdgewareApp = legacy_apps.newCentrifugeApp = legacy_apps.newDockApp = legacy_apps.newPolymeshApp = legacy_apps.newPolkadotApp = legacy_apps.newKusamaApp = void 0;
	var supported_apps_1 = supported_apps;
	function newKusamaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Kusama');
	}
	legacy_apps.newKusamaApp = newKusamaApp;
	function newPolkadotApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Polkadot');
	}
	legacy_apps.newPolkadotApp = newPolkadotApp;
	function newPolymeshApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Polymesh');
	}
	legacy_apps.newPolymeshApp = newPolymeshApp;
	function newDockApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Dock');
	}
	legacy_apps.newDockApp = newDockApp;
	function newCentrifugeApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Centrifuge');
	}
	legacy_apps.newCentrifugeApp = newCentrifugeApp;
	function newEdgewareApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Edgeware');
	}
	legacy_apps.newEdgewareApp = newEdgewareApp;
	function newEquilibriumApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Equilibrium');
	}
	legacy_apps.newEquilibriumApp = newEquilibriumApp;
	function newGenshiroApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Genshiro');
	}
	legacy_apps.newGenshiroApp = newGenshiroApp;
	function newStatemintApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Statemint');
	}
	legacy_apps.newStatemintApp = newStatemintApp;
	function newStatemineApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Statemine');
	}
	legacy_apps.newStatemineApp = newStatemineApp;
	function newNodleApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Nodle');
	}
	legacy_apps.newNodleApp = newNodleApp;
	function newSoraApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Sora');
	}
	legacy_apps.newSoraApp = newSoraApp;
	function newPolkadexApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Polkadex');
	}
	legacy_apps.newPolkadexApp = newPolkadexApp;
	function newBifrostApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Bifrost');
	}
	legacy_apps.newBifrostApp = newBifrostApp;
	function newKaruraApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Karura');
	}
	legacy_apps.newKaruraApp = newKaruraApp;
	function newReefApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Reef');
	}
	legacy_apps.newReefApp = newReefApp;
	function newAcalaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Acala');
	}
	legacy_apps.newAcalaApp = newAcalaApp;
	function newXXNetworkApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'XXNetwork');
	}
	legacy_apps.newXXNetworkApp = newXXNetworkApp;
	function newParallelApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Parallel');
	}
	legacy_apps.newParallelApp = newParallelApp;
	function newAstarApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Astar');
	}
	legacy_apps.newAstarApp = newAstarApp;
	function newComposableApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Composable');
	}
	legacy_apps.newComposableApp = newComposableApp;
	function newStafiApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Stafi');
	}
	legacy_apps.newStafiApp = newStafiApp;
	function newAlephZeroApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'AlephZero');
	}
	legacy_apps.newAlephZeroApp = newAlephZeroApp;
	function newInterlayApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Interlay');
	}
	legacy_apps.newInterlayApp = newInterlayApp;
	function newUniqueApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Unique');
	}
	legacy_apps.newUniqueApp = newUniqueApp;
	function newBifrostKusamaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'BifrostKusama');
	}
	legacy_apps.newBifrostKusamaApp = newBifrostKusamaApp;

	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		exports.__esModule = true;
		exports.supportedApps = exports.newSubstrateApp = exports.SubstrateApp = void 0;
		__exportStar(legacy_apps, exports);
		var substrate_app_1 = substrate_app;
		__createBinding(exports, substrate_app_1, "SubstrateApp");
		var supported_apps_1 = supported_apps;
		__createBinding(exports, supported_apps_1, "newSubstrateApp");
		__createBinding(exports, supported_apps_1, "supportedApps");
	} (dist));
	getDefaultExportFromCjs(dist);

	var browser = {};

	var interopRequireDefault = {exports: {}};

	(function (module) {
		function _interopRequireDefault(obj) {
		  return obj && obj.__esModule ? obj : {
		    "default": obj
		  };
		}
		module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
	} (interopRequireDefault));
	getDefaultExportFromCjs(interopRequireDefault.exports);

	const EventEmitter = {};

	var __extends$2 = (global && global.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	(global && global.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	var createCustomErrorClass = function (name) {
	    var CustomErrorClass =  (function (_super) {
	        __extends$2(CustomErrorClass, _super);
	        function CustomErrorClass(message, fields, options) {
	            var _this =
	            _super.call(this, message || name, options) || this;
	            Object.setPrototypeOf(_this, CustomErrorClass.prototype);
	            _this.name = name;
	            for (var k in fields) {
	                _this[k] = fields[k];
	            }
	            if (isObject(options) && "cause" in options && !("cause" in _this)) {
	                var cause = options.cause;
	                _this.cause = cause;
	                if ("stack" in cause) {
	                    _this.stack = _this.stack + "\nCAUSE: " + cause.stack;
	                }
	            }
	            return _this;
	        }
	        return CustomErrorClass;
	    }(Error));
	    return CustomErrorClass;
	};
	function isObject(value) {
	    return value !== null && typeof value === "object";
	}

	createCustomErrorClass("AccountNameRequired");
	createCustomErrorClass("AccountNotSupported");
	createCustomErrorClass("AmountRequired");
	createCustomErrorClass("BluetoothRequired");
	createCustomErrorClass("BtcUnmatchedApp");
	createCustomErrorClass("CantOpenDevice");
	createCustomErrorClass("CashAddrNotSupported");
	createCustomErrorClass("CurrencyNotSupported");
	createCustomErrorClass("DeviceAppVerifyNotSupported");
	createCustomErrorClass("DeviceGenuineSocketEarlyClose");
	createCustomErrorClass("DeviceNotGenuine");
	createCustomErrorClass("DeviceOnDashboardExpected");
	createCustomErrorClass("DeviceOnDashboardUnexpected");
	createCustomErrorClass("DeviceInOSUExpected");
	createCustomErrorClass("DeviceHalted");
	createCustomErrorClass("DeviceNameInvalid");
	createCustomErrorClass("DeviceSocketFail");
	createCustomErrorClass("DeviceSocketNoBulkStatus");
	var DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
	var DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
	createCustomErrorClass("DeviceExtractOnboardingStateError");
	createCustomErrorClass("DeviceOnboardingStatePollingError");
	createCustomErrorClass("EnpointConfig");
	createCustomErrorClass("EthAppPleaseEnableContractData");
	createCustomErrorClass("FeeEstimationFailed");
	createCustomErrorClass("FirmwareNotRecognized");
	createCustomErrorClass("HardResetFail");
	createCustomErrorClass("InvalidXRPTag");
	createCustomErrorClass("InvalidAddress");
	createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
	createCustomErrorClass("LatestMCUInstalledError");
	createCustomErrorClass("UnknownMCU");
	createCustomErrorClass("LedgerAPIError");
	createCustomErrorClass("LedgerAPIErrorWithMessage");
	createCustomErrorClass("LedgerAPINotAvailable");
	createCustomErrorClass("ManagerAppAlreadyInstalled");
	createCustomErrorClass("ManagerAppRelyOnBTC");
	createCustomErrorClass("ManagerAppDepInstallRequired");
	createCustomErrorClass("ManagerAppDepUninstallRequired");
	createCustomErrorClass("ManagerDeviceLocked");
	createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
	createCustomErrorClass("ManagerNotEnoughSpace");
	createCustomErrorClass("ManagerUninstallBTCDep");
	createCustomErrorClass("NetworkDown");
	createCustomErrorClass("NoAddressesFound");
	createCustomErrorClass("NotEnoughBalance");
	createCustomErrorClass("NotEnoughBalanceToDelegate");
	createCustomErrorClass("NotEnoughBalanceInParentAccount");
	createCustomErrorClass("NotEnoughSpendableBalance");
	createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
	createCustomErrorClass("NoAccessToCamera");
	createCustomErrorClass("NotEnoughGas");
	createCustomErrorClass("NotSupportedLegacyAddress");
	createCustomErrorClass("GasLessThanEstimate");
	createCustomErrorClass("PasswordsDontMatch");
	createCustomErrorClass("PasswordIncorrect");
	createCustomErrorClass("RecommendSubAccountsToEmpty");
	createCustomErrorClass("RecommendUndelegation");
	createCustomErrorClass("TimeoutTagged");
	createCustomErrorClass("UnexpectedBootloader");
	createCustomErrorClass("MCUNotGenuineToDashboard");
	createCustomErrorClass("RecipientRequired");
	createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
	createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
	createCustomErrorClass("UpdateFetchFileFail");
	createCustomErrorClass("UpdateIncorrectHash");
	createCustomErrorClass("UpdateIncorrectSig");
	createCustomErrorClass("UpdateYourApp");
	createCustomErrorClass("UserRefusedDeviceNameChange");
	createCustomErrorClass("UserRefusedAddress");
	createCustomErrorClass("UserRefusedFirmwareUpdate");
	createCustomErrorClass("UserRefusedAllowManager");
	createCustomErrorClass("UserRefusedOnDevice");
	var TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
	var TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
	var TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
	var TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
	createCustomErrorClass("DeviceShouldStayInApp");
	createCustomErrorClass("WebsocketConnectionError");
	createCustomErrorClass("WebsocketConnectionFailed");
	createCustomErrorClass("WrongDeviceForAccount");
	createCustomErrorClass("WrongAppForCurrency");
	createCustomErrorClass("ETHAddressNonEIP");
	createCustomErrorClass("CantScanQRCode");
	createCustomErrorClass("FeeNotLoaded");
	createCustomErrorClass("FeeRequired");
	createCustomErrorClass("FeeTooHigh");
	createCustomErrorClass("SyncError");
	createCustomErrorClass("PairingFailed");
	createCustomErrorClass("GenuineCheckFailed");
	createCustomErrorClass("LedgerAPI4xx");
	createCustomErrorClass("LedgerAPI5xx");
	createCustomErrorClass("FirmwareOrAppUpdateRequired");
	createCustomErrorClass("NoDBPathGiven");
	createCustomErrorClass("DBWrongPassword");
	createCustomErrorClass("DBNotReset");
	function TransportError(message, id) {
	    this.name = "TransportError";
	    this.message = message;
	    this.stack = new Error().stack;
	    this.id = id;
	}
	TransportError.prototype = new Error();
	var StatusCodes = {
	    PIN_REMAINING_ATTEMPTS: 0x63c0,
	    INCORRECT_LENGTH: 0x6700,
	    MISSING_CRITICAL_PARAMETER: 0x6800,
	    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
	    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
	    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
	    INCORRECT_DATA: 0x6a80,
	    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
	    REFERENCED_DATA_NOT_FOUND: 0x6a88,
	    FILE_ALREADY_EXISTS: 0x6a89,
	    INCORRECT_P1_P2: 0x6b00,
	    INS_NOT_SUPPORTED: 0x6d00,
	    CLA_NOT_SUPPORTED: 0x6e00,
	    TECHNICAL_PROBLEM: 0x6f00,
	    OK: 0x9000,
	    MEMORY_PROBLEM: 0x9240,
	    NO_EF_SELECTED: 0x9400,
	    INVALID_OFFSET: 0x9402,
	    FILE_NOT_FOUND: 0x9404,
	    INCONSISTENT_FILE: 0x9408,
	    ALGORITHM_NOT_SUPPORTED: 0x9484,
	    INVALID_KCV: 0x9485,
	    CODE_NOT_INITIALIZED: 0x9802,
	    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
	    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
	    CONTRADICTION_INVALIDATION: 0x9810,
	    CODE_BLOCKED: 0x9840,
	    MAX_VALUE_REACHED: 0x9850,
	    GP_AUTH_FAILED: 0x6300,
	    LICENSING: 0x6f42,
	    HALTED: 0x6faa
	};
	function getAltStatusMessage(code) {
	    switch (code) {
	        case 0x6700:
	            return "Incorrect length";
	        case 0x6800:
	            return "Missing critical parameter";
	        case 0x6982:
	            return "Security not satisfied (dongle locked or have invalid access rights)";
	        case 0x6985:
	            return "Condition of use not satisfied (denied by the user?)";
	        case 0x6a80:
	            return "Invalid data received";
	        case 0x6b00:
	            return "Invalid parameter received";
	    }
	    if (0x6f00 <= code && code <= 0x6fff) {
	        return "Internal error, please report";
	    }
	}
	function TransportStatusError(statusCode) {
	    this.name = "TransportStatusError";
	    var statusText = Object.keys(StatusCodes).find(function (k) { return StatusCodes[k] === statusCode; }) ||
	        "UNKNOWN_ERROR";
	    var smsg = getAltStatusMessage(statusCode) || statusText;
	    var statusCodeStr = statusCode.toString(16);
	    this.message = "Ledger device: ".concat(smsg, " (0x").concat(statusCodeStr, ")");
	    this.stack = new Error().stack;
	    this.statusCode = statusCode;
	    this.statusText = statusText;
	}
	TransportStatusError.prototype = new Error();

	var __awaiter$3 = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator$3 = (global && global.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __read$1 = (global && global.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var __spreadArray = (global && global.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	var __values = (global && global.__values) || function(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	};
	var Transport =  (function () {
	    function Transport() {
	        var _this = this;
	        this.exchangeTimeout = 30000;
	        this.unresponsiveTimeout = 15000;
	        this.deviceModel = null;
	        this._events = new EventEmitter();
	        this.send = function (cla, ins, p1, p2, data, statusList) {
	            if (data === void 0) { data = Buffer.alloc(0); }
	            if (statusList === void 0) { statusList = [StatusCodes.OK]; }
	            return __awaiter$3(_this, void 0, void 0, function () {
	                var response, sw;
	                return __generator$3(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            if (data.length >= 256) {
	                                throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
	                            }
	                            return [4 , this.exchange(Buffer.concat([
	                                    Buffer.from([cla, ins, p1, p2]),
	                                    Buffer.from([data.length]),
	                                    data,
	                                ]))];
	                        case 1:
	                            response = _a.sent();
	                            sw = response.readUInt16BE(response.length - 2);
	                            if (!statusList.some(function (s) { return s === sw; })) {
	                                throw new TransportStatusError(sw);
	                            }
	                            return [2 , response];
	                    }
	                });
	            });
	        };
	        this.exchangeAtomicImpl = function (f) { return __awaiter$3(_this, void 0, void 0, function () {
	            var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
	            var _this = this;
	            return __generator$3(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        if (this.exchangeBusyPromise) {
	                            throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
	                        }
	                        busyPromise = new Promise(function (r) {
	                            resolveBusy = r;
	                        });
	                        this.exchangeBusyPromise = busyPromise;
	                        unresponsiveReached = false;
	                        timeout = setTimeout(function () {
	                            unresponsiveReached = true;
	                            _this.emit("unresponsive");
	                        }, this.unresponsiveTimeout);
	                        _a.label = 1;
	                    case 1:
	                        _a.trys.push([1, , 3, 4]);
	                        return [4 , f()];
	                    case 2:
	                        res = _a.sent();
	                        if (unresponsiveReached) {
	                            this.emit("responsive");
	                        }
	                        return [2 , res];
	                    case 3:
	                        clearTimeout(timeout);
	                        if (resolveBusy)
	                            resolveBusy();
	                        this.exchangeBusyPromise = null;
	                        return [7 ];
	                    case 4: return [2 ];
	                }
	            });
	        }); };
	        this._appAPIlock = null;
	    }
	    Transport.prototype.exchange = function (_apdu) {
	        throw new Error("exchange not implemented");
	    };
	    Transport.prototype.setScrambleKey = function (_key) { };
	    Transport.prototype.close = function () {
	        return Promise.resolve();
	    };
	    Transport.prototype.on = function (eventName, cb) {
	        this._events.on(eventName, cb);
	    };
	    Transport.prototype.off = function (eventName, cb) {
	        this._events.removeListener(eventName, cb);
	    };
	    Transport.prototype.emit = function (event) {
	        var _a;
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        (_a = this._events).emit.apply(_a, __spreadArray([event], __read$1(args), false));
	    };
	    Transport.prototype.setDebugMode = function () {
	        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
	    };
	    Transport.prototype.setExchangeTimeout = function (exchangeTimeout) {
	        this.exchangeTimeout = exchangeTimeout;
	    };
	    Transport.prototype.setExchangeUnresponsiveTimeout = function (unresponsiveTimeout) {
	        this.unresponsiveTimeout = unresponsiveTimeout;
	    };
	    Transport.create = function (openTimeout, listenTimeout) {
	        var _this = this;
	        if (openTimeout === void 0) { openTimeout = 3000; }
	        return new Promise(function (resolve, reject) {
	            var found = false;
	            var sub = _this.listen({
	                next: function (e) {
	                    found = true;
	                    if (sub)
	                        sub.unsubscribe();
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    _this.open(e.descriptor, openTimeout).then(resolve, reject);
	                },
	                error: function (e) {
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    reject(e);
	                },
	                complete: function () {
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    if (!found) {
	                        reject(new TransportError(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
	                    }
	                }
	            });
	            var listenTimeoutId = listenTimeout
	                ? setTimeout(function () {
	                    sub.unsubscribe();
	                    reject(new TransportError(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
	                }, listenTimeout)
	                : null;
	        });
	    };
	    Transport.prototype.decorateAppAPIMethods = function (self, methods, scrambleKey) {
	        var e_1, _a;
	        try {
	            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
	                var methodName = methods_1_1.value;
	                self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
	            }
	        }
	        catch (e_1_1) { e_1 = { error: e_1_1 }; }
	        finally {
	            try {
	                if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
	            }
	            finally { if (e_1) throw e_1.error; }
	        }
	    };
	    Transport.prototype.decorateAppAPIMethod = function (methodName, f, ctx, scrambleKey) {
	        var _this = this;
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            return __awaiter$3(_this, void 0, void 0, function () {
	                var _appAPIlock;
	                return __generator$3(this, function (_a) {
	                    switch (_a.label) {
	                        case 0:
	                            _appAPIlock = this._appAPIlock;
	                            if (_appAPIlock) {
	                                return [2 , Promise.reject(new TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))];
	                            }
	                            _a.label = 1;
	                        case 1:
	                            _a.trys.push([1, , 3, 4]);
	                            this._appAPIlock = methodName;
	                            this.setScrambleKey(scrambleKey);
	                            return [4 , f.apply(ctx, args)];
	                        case 2: return [2 , _a.sent()];
	                        case 3:
	                            this._appAPIlock = null;
	                            return [7 ];
	                        case 4: return [2 ];
	                    }
	                });
	            });
	        };
	    };
	    Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
	    Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
	    return Transport;
	}());

	var Tag = 0x05;
	function asUInt16BE(value) {
	    var b = Buffer.alloc(2);
	    b.writeUInt16BE(value, 0);
	    return b;
	}
	var initialAcc = {
	    data: Buffer.alloc(0),
	    dataLength: 0,
	    sequence: 0
	};
	var createHIDframing = function (channel, packetSize) {
	    return {
	        makeBlocks: function (apdu) {
	            var data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
	            var blockSize = packetSize - 5;
	            var nbBlocks = Math.ceil(data.length / blockSize);
	            data = Buffer.concat([
	                data,
	                Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0),
	            ]);
	            var blocks = [];
	            for (var i = 0; i < nbBlocks; i++) {
	                var head = Buffer.alloc(5);
	                head.writeUInt16BE(channel, 0);
	                head.writeUInt8(Tag, 2);
	                head.writeUInt16BE(i, 3);
	                var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
	                blocks.push(Buffer.concat([head, chunk]));
	            }
	            return blocks;
	        },
	        reduceResponse: function (acc, chunk) {
	            var _a = acc || initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
	            if (chunk.readUInt16BE(0) !== channel) {
	                throw new TransportError("Invalid channel", "InvalidChannel");
	            }
	            if (chunk.readUInt8(2) !== Tag) {
	                throw new TransportError("Invalid tag", "InvalidTag");
	            }
	            if (chunk.readUInt16BE(3) !== sequence) {
	                throw new TransportError("Invalid sequence", "InvalidSequence");
	            }
	            if (!acc) {
	                dataLength = chunk.readUInt16BE(5);
	            }
	            sequence++;
	            var chunkData = chunk.slice(acc ? 5 : 7);
	            data = Buffer.concat([data, chunkData]);
	            if (data.length > dataLength) {
	                data = data.slice(0, dataLength);
	            }
	            return {
	                data: data,
	                dataLength: dataLength,
	                sequence: sequence
	            };
	        },
	        getReducedResult: function (acc) {
	            if (acc && acc.dataLength === acc.data.length) {
	                return acc.data;
	            }
	        }
	    };
	};

	var re$3 = {exports: {}};

	const SEMVER_SPEC_VERSION = '2.0.0';
	const MAX_LENGTH$2 = 256;
	const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
	 9007199254740991;
	const MAX_SAFE_COMPONENT_LENGTH = 16;
	var constants = {
	  SEMVER_SPEC_VERSION,
	  MAX_LENGTH: MAX_LENGTH$2,
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
	  MAX_SAFE_COMPONENT_LENGTH,
	};

	const debug$1 = (
	  typeof process === 'object' &&
	  process.env &&
	  process.env.NODE_DEBUG &&
	  /\bsemver\b/i.test(process.env.NODE_DEBUG)
	) ? (...args) => console.error('SEMVER', ...args)
	  : () => {};
	var debug_1 = debug$1;

	(function (module, exports) {
		const { MAX_SAFE_COMPONENT_LENGTH } = constants;
		const debug = debug_1;
		exports = module.exports = {};
		const re = exports.re = [];
		const src = exports.src = [];
		const t = exports.t = {};
		let R = 0;
		const createToken = (name, value, isGlobal) => {
		  const index = R++;
		  debug(name, index, value);
		  t[name] = index;
		  src[index] = value;
		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
		};
		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
		createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');
		createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');
		createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
		                   `(${src[t.NUMERICIDENTIFIER]})`);
		createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
		                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
		createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
	}|${src[t.NONNUMERICIDENTIFIER]})`);
		createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
	}|${src[t.NONNUMERICIDENTIFIER]})`);
		createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
	}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
		createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
	}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
		createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');
		createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
	}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
		createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
	}${src[t.PRERELEASE]}?${
	  src[t.BUILD]}?`);
		createToken('FULL', `^${src[t.FULLPLAIN]}$`);
		createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
	}${src[t.PRERELEASELOOSE]}?${
	  src[t.BUILD]}?`);
		createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
		createToken('GTLT', '((?:<|>)?=?)');
		createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
		createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
		createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
		                   `(?:${src[t.PRERELEASE]})?${
	                     src[t.BUILD]}?` +
		                   `)?)?`);
		createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
		                        `(?:${src[t.PRERELEASELOOSE]})?${
	                          src[t.BUILD]}?` +
		                        `)?)?`);
		createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
		createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
		createToken('COERCE', `${'(^|[^\\d])' +
	              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
		              `(?:$|[^\\d])`);
		createToken('COERCERTL', src[t.COERCE], true);
		createToken('LONETILDE', '(?:~>?)');
		createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
		exports.tildeTrimReplace = '$1~';
		createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
		createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
		createToken('LONECARET', '(?:\\^)');
		createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
		exports.caretTrimReplace = '$1^';
		createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
		createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
		createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
		createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
		createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
	}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
		exports.comparatorTrimReplace = '$1$2$3';
		createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
		                   `\\s+-\\s+` +
		                   `(${src[t.XRANGEPLAIN]})` +
		                   `\\s*$`);
		createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s+-\\s+` +
		                        `(${src[t.XRANGEPLAINLOOSE]})` +
		                        `\\s*$`);
		createToken('STAR', '(<|>)?=?\\s*\\*');
		createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
		createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
	} (re$3, re$3.exports));

	const opts = ['includePrerelease', 'loose', 'rtl'];
	const parseOptions$2 = options =>
	  !options ? {}
	  : typeof options !== 'object' ? { loose: true }
	  : opts.filter(k => options[k]).reduce((o, k) => {
	    o[k] = true;
	    return o
	  }, {});
	var parseOptions_1 = parseOptions$2;

	const numeric = /^[0-9]+$/;
	const compareIdentifiers$1 = (a, b) => {
	  const anum = numeric.test(a);
	  const bnum = numeric.test(b);
	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }
	  return a === b ? 0
	    : (anum && !bnum) ? -1
	    : (bnum && !anum) ? 1
	    : a < b ? -1
	    : 1
	};
	const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
	var identifiers = {
	  compareIdentifiers: compareIdentifiers$1,
	  rcompareIdentifiers,
	};

	const debug = debug_1;
	const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants;
	const { re: re$2, t: t$2 } = re$3.exports;
	const parseOptions$1 = parseOptions_1;
	const { compareIdentifiers } = identifiers;
	class SemVer$c {
	  constructor (version, options) {
	    options = parseOptions$1(options);
	    if (version instanceof SemVer$c) {
	      if (version.loose === !!options.loose &&
	          version.includePrerelease === !!options.includePrerelease) {
	        return version
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }
	    if (version.length > MAX_LENGTH$1) {
	      throw new TypeError(
	        `version is longer than ${MAX_LENGTH$1} characters`
	      )
	    }
	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    this.includePrerelease = !!options.includePrerelease;
	    const m = version.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL]);
	    if (!m) {
	      throw new TypeError(`Invalid Version: ${version}`)
	    }
	    this.raw = version;
	    this.major = +m[1];
	    this.minor = +m[2];
	    this.patch = +m[3];
	    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
	      throw new TypeError('Invalid major version')
	    }
	    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
	      throw new TypeError('Invalid minor version')
	    }
	    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
	      throw new TypeError('Invalid patch version')
	    }
	    if (!m[4]) {
	      this.prerelease = [];
	    } else {
	      this.prerelease = m[4].split('.').map((id) => {
	        if (/^[0-9]+$/.test(id)) {
	          const num = +id;
	          if (num >= 0 && num < MAX_SAFE_INTEGER) {
	            return num
	          }
	        }
	        return id
	      });
	    }
	    this.build = m[5] ? m[5].split('.') : [];
	    this.format();
	  }
	  format () {
	    this.version = `${this.major}.${this.minor}.${this.patch}`;
	    if (this.prerelease.length) {
	      this.version += `-${this.prerelease.join('.')}`;
	    }
	    return this.version
	  }
	  toString () {
	    return this.version
	  }
	  compare (other) {
	    debug('SemVer.compare', this.version, this.options, other);
	    if (!(other instanceof SemVer$c)) {
	      if (typeof other === 'string' && other === this.version) {
	        return 0
	      }
	      other = new SemVer$c(other, this.options);
	    }
	    if (other.version === this.version) {
	      return 0
	    }
	    return this.compareMain(other) || this.comparePre(other)
	  }
	  compareMain (other) {
	    if (!(other instanceof SemVer$c)) {
	      other = new SemVer$c(other, this.options);
	    }
	    return (
	      compareIdentifiers(this.major, other.major) ||
	      compareIdentifiers(this.minor, other.minor) ||
	      compareIdentifiers(this.patch, other.patch)
	    )
	  }
	  comparePre (other) {
	    if (!(other instanceof SemVer$c)) {
	      other = new SemVer$c(other, this.options);
	    }
	    if (this.prerelease.length && !other.prerelease.length) {
	      return -1
	    } else if (!this.prerelease.length && other.prerelease.length) {
	      return 1
	    } else if (!this.prerelease.length && !other.prerelease.length) {
	      return 0
	    }
	    let i = 0;
	    do {
	      const a = this.prerelease[i];
	      const b = other.prerelease[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }
	  compareBuild (other) {
	    if (!(other instanceof SemVer$c)) {
	      other = new SemVer$c(other, this.options);
	    }
	    let i = 0;
	    do {
	      const a = this.build[i];
	      const b = other.build[i];
	      debug('prerelease compare', i, a, b);
	      if (a === undefined && b === undefined) {
	        return 0
	      } else if (b === undefined) {
	        return 1
	      } else if (a === undefined) {
	        return -1
	      } else if (a === b) {
	        continue
	      } else {
	        return compareIdentifiers(a, b)
	      }
	    } while (++i)
	  }
	  inc (release, identifier) {
	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier);
	        break
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier);
	        break
	      case 'prepatch':
	        this.prerelease.length = 0;
	        this.inc('patch', identifier);
	        this.inc('pre', identifier);
	        break
	      case 'prerelease':
	        if (this.prerelease.length === 0) {
	          this.inc('patch', identifier);
	        }
	        this.inc('pre', identifier);
	        break
	      case 'major':
	        if (
	          this.minor !== 0 ||
	          this.patch !== 0 ||
	          this.prerelease.length === 0
	        ) {
	          this.major++;
	        }
	        this.minor = 0;
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'minor':
	        if (this.patch !== 0 || this.prerelease.length === 0) {
	          this.minor++;
	        }
	        this.patch = 0;
	        this.prerelease = [];
	        break
	      case 'patch':
	        if (this.prerelease.length === 0) {
	          this.patch++;
	        }
	        this.prerelease = [];
	        break
	      case 'pre':
	        if (this.prerelease.length === 0) {
	          this.prerelease = [0];
	        } else {
	          let i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) {
	            this.prerelease.push(0);
	          }
	        }
	        if (identifier) {
	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
	            if (isNaN(this.prerelease[1])) {
	              this.prerelease = [identifier, 0];
	            }
	          } else {
	            this.prerelease = [identifier, 0];
	          }
	        }
	        break
	      default:
	        throw new Error(`invalid increment argument: ${release}`)
	    }
	    this.format();
	    this.raw = this.version;
	    return this
	  }
	}
	var semver$1 = SemVer$c;

	const { MAX_LENGTH } = constants;
	const { re: re$1, t: t$1 } = re$3.exports;
	const SemVer$b = semver$1;
	const parseOptions = parseOptions_1;
	const parse$5 = (version, options) => {
	  options = parseOptions(options);
	  if (version instanceof SemVer$b) {
	    return version
	  }
	  if (typeof version !== 'string') {
	    return null
	  }
	  if (version.length > MAX_LENGTH) {
	    return null
	  }
	  const r = options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL];
	  if (!r.test(version)) {
	    return null
	  }
	  try {
	    return new SemVer$b(version, options)
	  } catch (er) {
	    return null
	  }
	};
	var parse_1 = parse$5;

	const parse$4 = parse_1;
	const valid$1 = (version, options) => {
	  const v = parse$4(version, options);
	  return v ? v.version : null
	};
	var valid_1 = valid$1;

	const parse$3 = parse_1;
	const clean = (version, options) => {
	  const s = parse$3(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	};
	var clean_1 = clean;

	const SemVer$a = semver$1;
	const inc = (version, release, options, identifier) => {
	  if (typeof (options) === 'string') {
	    identifier = options;
	    options = undefined;
	  }
	  try {
	    return new SemVer$a(
	      version instanceof SemVer$a ? version.version : version,
	      options
	    ).inc(release, identifier).version
	  } catch (er) {
	    return null
	  }
	};
	var inc_1 = inc;

	const SemVer$9 = semver$1;
	const compare$a = (a, b, loose) =>
	  new SemVer$9(a, loose).compare(new SemVer$9(b, loose));
	var compare_1 = compare$a;

	const compare$9 = compare_1;
	const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;
	var eq_1 = eq$2;

	const parse$2 = parse_1;
	const eq$1 = eq_1;
	const diff = (version1, version2) => {
	  if (eq$1(version1, version2)) {
	    return null
	  } else {
	    const v1 = parse$2(version1);
	    const v2 = parse$2(version2);
	    const hasPre = v1.prerelease.length || v2.prerelease.length;
	    const prefix = hasPre ? 'pre' : '';
	    const defaultResult = hasPre ? 'prerelease' : '';
	    for (const key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return prefix + key
	        }
	      }
	    }
	    return defaultResult
	  }
	};
	var diff_1 = diff;

	const SemVer$8 = semver$1;
	const major = (a, loose) => new SemVer$8(a, loose).major;
	var major_1 = major;

	const SemVer$7 = semver$1;
	const minor = (a, loose) => new SemVer$7(a, loose).minor;
	var minor_1 = minor;

	const SemVer$6 = semver$1;
	const patch = (a, loose) => new SemVer$6(a, loose).patch;
	var patch_1 = patch;

	const parse$1 = parse_1;
	const prerelease = (version, options) => {
	  const parsed = parse$1(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	};
	var prerelease_1 = prerelease;

	const compare$8 = compare_1;
	const rcompare = (a, b, loose) => compare$8(b, a, loose);
	var rcompare_1 = rcompare;

	const compare$7 = compare_1;
	const compareLoose = (a, b) => compare$7(a, b, true);
	var compareLoose_1 = compareLoose;

	const SemVer$5 = semver$1;
	const compareBuild$2 = (a, b, loose) => {
	  const versionA = new SemVer$5(a, loose);
	  const versionB = new SemVer$5(b, loose);
	  return versionA.compare(versionB) || versionA.compareBuild(versionB)
	};
	var compareBuild_1 = compareBuild$2;

	const compareBuild$1 = compareBuild_1;
	const sort = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));
	var sort_1 = sort;

	const compareBuild = compareBuild_1;
	const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
	var rsort_1 = rsort;

	const compare$6 = compare_1;
	const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;
	var gt_1 = gt$3;

	const compare$5 = compare_1;
	const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;
	var lt_1 = lt$2;

	const compare$4 = compare_1;
	const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
	var neq_1 = neq$1;

	const compare$3 = compare_1;
	const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;
	var gte_1 = gte$2;

	const compare$2 = compare_1;
	const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;
	var lte_1 = lte$2;

	const eq = eq_1;
	const neq = neq_1;
	const gt$2 = gt_1;
	const gte$1 = gte_1;
	const lt$1 = lt_1;
	const lte$1 = lte_1;
	const cmp = (a, op, b, loose) => {
	  switch (op) {
	    case '===':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a === b
	    case '!==':
	      if (typeof a === 'object') {
	        a = a.version;
	      }
	      if (typeof b === 'object') {
	        b = b.version;
	      }
	      return a !== b
	    case '':
	    case '=':
	    case '==':
	      return eq(a, b, loose)
	    case '!=':
	      return neq(a, b, loose)
	    case '>':
	      return gt$2(a, b, loose)
	    case '>=':
	      return gte$1(a, b, loose)
	    case '<':
	      return lt$1(a, b, loose)
	    case '<=':
	      return lte$1(a, b, loose)
	    default:
	      throw new TypeError(`Invalid operator: ${op}`)
	  }
	};
	var cmp_1 = cmp;

	const SemVer$4 = semver$1;
	const parse = parse_1;
	const { re, t } = re$3.exports;
	const coerce = (version, options) => {
	  if (version instanceof SemVer$4) {
	    return version
	  }
	  if (typeof version === 'number') {
	    version = String(version);
	  }
	  if (typeof version !== 'string') {
	    return null
	  }
	  options = options || {};
	  let match = null;
	  if (!options.rtl) {
	    match = version.match(re[t.COERCE]);
	  } else {
	    let next;
	    while ((next = re[t.COERCERTL].exec(version)) &&
	        (!match || match.index + match[0].length !== version.length)
	    ) {
	      if (!match ||
	            next.index + next[0].length !== match.index + match[0].length) {
	        match = next;
	      }
	      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
	    }
	    re[t.COERCERTL].lastIndex = -1;
	  }
	  if (match === null) {
	    return null
	  }
	  return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
	};
	var coerce_1 = coerce;

	var iterator;
	var hasRequiredIterator;
	function requireIterator () {
		if (hasRequiredIterator) return iterator;
		hasRequiredIterator = 1;
		iterator = function (Yallist) {
		  Yallist.prototype[Symbol.iterator] = function* () {
		    for (let walker = this.head; walker; walker = walker.next) {
		      yield walker.value;
		    }
		  };
		};
		return iterator;
	}

	var yallist;
	var hasRequiredYallist;
	function requireYallist () {
		if (hasRequiredYallist) return yallist;
		hasRequiredYallist = 1;
		yallist = Yallist;
		Yallist.Node = Node;
		Yallist.create = Yallist;
		function Yallist (list) {
		  var self = this;
		  if (!(self instanceof Yallist)) {
		    self = new Yallist();
		  }
		  self.tail = null;
		  self.head = null;
		  self.length = 0;
		  if (list && typeof list.forEach === 'function') {
		    list.forEach(function (item) {
		      self.push(item);
		    });
		  } else if (arguments.length > 0) {
		    for (var i = 0, l = arguments.length; i < l; i++) {
		      self.push(arguments[i]);
		    }
		  }
		  return self
		}
		Yallist.prototype.removeNode = function (node) {
		  if (node.list !== this) {
		    throw new Error('removing node which does not belong to this list')
		  }
		  var next = node.next;
		  var prev = node.prev;
		  if (next) {
		    next.prev = prev;
		  }
		  if (prev) {
		    prev.next = next;
		  }
		  if (node === this.head) {
		    this.head = next;
		  }
		  if (node === this.tail) {
		    this.tail = prev;
		  }
		  node.list.length--;
		  node.next = null;
		  node.prev = null;
		  node.list = null;
		  return next
		};
		Yallist.prototype.unshiftNode = function (node) {
		  if (node === this.head) {
		    return
		  }
		  if (node.list) {
		    node.list.removeNode(node);
		  }
		  var head = this.head;
		  node.list = this;
		  node.next = head;
		  if (head) {
		    head.prev = node;
		  }
		  this.head = node;
		  if (!this.tail) {
		    this.tail = node;
		  }
		  this.length++;
		};
		Yallist.prototype.pushNode = function (node) {
		  if (node === this.tail) {
		    return
		  }
		  if (node.list) {
		    node.list.removeNode(node);
		  }
		  var tail = this.tail;
		  node.list = this;
		  node.prev = tail;
		  if (tail) {
		    tail.next = node;
		  }
		  this.tail = node;
		  if (!this.head) {
		    this.head = node;
		  }
		  this.length++;
		};
		Yallist.prototype.push = function () {
		  for (var i = 0, l = arguments.length; i < l; i++) {
		    push(this, arguments[i]);
		  }
		  return this.length
		};
		Yallist.prototype.unshift = function () {
		  for (var i = 0, l = arguments.length; i < l; i++) {
		    unshift(this, arguments[i]);
		  }
		  return this.length
		};
		Yallist.prototype.pop = function () {
		  if (!this.tail) {
		    return undefined
		  }
		  var res = this.tail.value;
		  this.tail = this.tail.prev;
		  if (this.tail) {
		    this.tail.next = null;
		  } else {
		    this.head = null;
		  }
		  this.length--;
		  return res
		};
		Yallist.prototype.shift = function () {
		  if (!this.head) {
		    return undefined
		  }
		  var res = this.head.value;
		  this.head = this.head.next;
		  if (this.head) {
		    this.head.prev = null;
		  } else {
		    this.tail = null;
		  }
		  this.length--;
		  return res
		};
		Yallist.prototype.forEach = function (fn, thisp) {
		  thisp = thisp || this;
		  for (var walker = this.head, i = 0; walker !== null; i++) {
		    fn.call(thisp, walker.value, i, this);
		    walker = walker.next;
		  }
		};
		Yallist.prototype.forEachReverse = function (fn, thisp) {
		  thisp = thisp || this;
		  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
		    fn.call(thisp, walker.value, i, this);
		    walker = walker.prev;
		  }
		};
		Yallist.prototype.get = function (n) {
		  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
		    walker = walker.next;
		  }
		  if (i === n && walker !== null) {
		    return walker.value
		  }
		};
		Yallist.prototype.getReverse = function (n) {
		  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
		    walker = walker.prev;
		  }
		  if (i === n && walker !== null) {
		    return walker.value
		  }
		};
		Yallist.prototype.map = function (fn, thisp) {
		  thisp = thisp || this;
		  var res = new Yallist();
		  for (var walker = this.head; walker !== null;) {
		    res.push(fn.call(thisp, walker.value, this));
		    walker = walker.next;
		  }
		  return res
		};
		Yallist.prototype.mapReverse = function (fn, thisp) {
		  thisp = thisp || this;
		  var res = new Yallist();
		  for (var walker = this.tail; walker !== null;) {
		    res.push(fn.call(thisp, walker.value, this));
		    walker = walker.prev;
		  }
		  return res
		};
		Yallist.prototype.reduce = function (fn, initial) {
		  var acc;
		  var walker = this.head;
		  if (arguments.length > 1) {
		    acc = initial;
		  } else if (this.head) {
		    walker = this.head.next;
		    acc = this.head.value;
		  } else {
		    throw new TypeError('Reduce of empty list with no initial value')
		  }
		  for (var i = 0; walker !== null; i++) {
		    acc = fn(acc, walker.value, i);
		    walker = walker.next;
		  }
		  return acc
		};
		Yallist.prototype.reduceReverse = function (fn, initial) {
		  var acc;
		  var walker = this.tail;
		  if (arguments.length > 1) {
		    acc = initial;
		  } else if (this.tail) {
		    walker = this.tail.prev;
		    acc = this.tail.value;
		  } else {
		    throw new TypeError('Reduce of empty list with no initial value')
		  }
		  for (var i = this.length - 1; walker !== null; i--) {
		    acc = fn(acc, walker.value, i);
		    walker = walker.prev;
		  }
		  return acc
		};
		Yallist.prototype.toArray = function () {
		  var arr = new Array(this.length);
		  for (var i = 0, walker = this.head; walker !== null; i++) {
		    arr[i] = walker.value;
		    walker = walker.next;
		  }
		  return arr
		};
		Yallist.prototype.toArrayReverse = function () {
		  var arr = new Array(this.length);
		  for (var i = 0, walker = this.tail; walker !== null; i++) {
		    arr[i] = walker.value;
		    walker = walker.prev;
		  }
		  return arr
		};
		Yallist.prototype.slice = function (from, to) {
		  to = to || this.length;
		  if (to < 0) {
		    to += this.length;
		  }
		  from = from || 0;
		  if (from < 0) {
		    from += this.length;
		  }
		  var ret = new Yallist();
		  if (to < from || to < 0) {
		    return ret
		  }
		  if (from < 0) {
		    from = 0;
		  }
		  if (to > this.length) {
		    to = this.length;
		  }
		  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
		    walker = walker.next;
		  }
		  for (; walker !== null && i < to; i++, walker = walker.next) {
		    ret.push(walker.value);
		  }
		  return ret
		};
		Yallist.prototype.sliceReverse = function (from, to) {
		  to = to || this.length;
		  if (to < 0) {
		    to += this.length;
		  }
		  from = from || 0;
		  if (from < 0) {
		    from += this.length;
		  }
		  var ret = new Yallist();
		  if (to < from || to < 0) {
		    return ret
		  }
		  if (from < 0) {
		    from = 0;
		  }
		  if (to > this.length) {
		    to = this.length;
		  }
		  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
		    walker = walker.prev;
		  }
		  for (; walker !== null && i > from; i--, walker = walker.prev) {
		    ret.push(walker.value);
		  }
		  return ret
		};
		Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
		  if (start > this.length) {
		    start = this.length - 1;
		  }
		  if (start < 0) {
		    start = this.length + start;
		  }
		  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
		    walker = walker.next;
		  }
		  var ret = [];
		  for (var i = 0; walker && i < deleteCount; i++) {
		    ret.push(walker.value);
		    walker = this.removeNode(walker);
		  }
		  if (walker === null) {
		    walker = this.tail;
		  }
		  if (walker !== this.head && walker !== this.tail) {
		    walker = walker.prev;
		  }
		  for (var i = 0; i < nodes.length; i++) {
		    walker = insert(this, walker, nodes[i]);
		  }
		  return ret;
		};
		Yallist.prototype.reverse = function () {
		  var head = this.head;
		  var tail = this.tail;
		  for (var walker = head; walker !== null; walker = walker.prev) {
		    var p = walker.prev;
		    walker.prev = walker.next;
		    walker.next = p;
		  }
		  this.head = tail;
		  this.tail = head;
		  return this
		};
		function insert (self, node, value) {
		  var inserted = node === self.head ?
		    new Node(value, null, node, self) :
		    new Node(value, node, node.next, self);
		  if (inserted.next === null) {
		    self.tail = inserted;
		  }
		  if (inserted.prev === null) {
		    self.head = inserted;
		  }
		  self.length++;
		  return inserted
		}
		function push (self, item) {
		  self.tail = new Node(item, self.tail, null, self);
		  if (!self.head) {
		    self.head = self.tail;
		  }
		  self.length++;
		}
		function unshift (self, item) {
		  self.head = new Node(item, null, self.head, self);
		  if (!self.tail) {
		    self.tail = self.head;
		  }
		  self.length++;
		}
		function Node (value, prev, next, list) {
		  if (!(this instanceof Node)) {
		    return new Node(value, prev, next, list)
		  }
		  this.list = list;
		  this.value = value;
		  if (prev) {
		    prev.next = this;
		    this.prev = prev;
		  } else {
		    this.prev = null;
		  }
		  if (next) {
		    next.prev = this;
		    this.next = next;
		  } else {
		    this.next = null;
		  }
		}
		try {
		  requireIterator()(Yallist);
		} catch (er) {}
		return yallist;
	}

	var lruCache;
	var hasRequiredLruCache;
	function requireLruCache () {
		if (hasRequiredLruCache) return lruCache;
		hasRequiredLruCache = 1;
		const Yallist = requireYallist();
		const MAX = Symbol('max');
		const LENGTH = Symbol('length');
		const LENGTH_CALCULATOR = Symbol('lengthCalculator');
		const ALLOW_STALE = Symbol('allowStale');
		const MAX_AGE = Symbol('maxAge');
		const DISPOSE = Symbol('dispose');
		const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
		const LRU_LIST = Symbol('lruList');
		const CACHE = Symbol('cache');
		const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');
		const naiveLength = () => 1;
		class LRUCache {
		  constructor (options) {
		    if (typeof options === 'number')
		      options = { max: options };
		    if (!options)
		      options = {};
		    if (options.max && (typeof options.max !== 'number' || options.max < 0))
		      throw new TypeError('max must be a non-negative number')
		    this[MAX] = options.max || Infinity;
		    const lc = options.length || naiveLength;
		    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc;
		    this[ALLOW_STALE] = options.stale || false;
		    if (options.maxAge && typeof options.maxAge !== 'number')
		      throw new TypeError('maxAge must be a number')
		    this[MAX_AGE] = options.maxAge || 0;
		    this[DISPOSE] = options.dispose;
		    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
		    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
		    this.reset();
		  }
		  set max (mL) {
		    if (typeof mL !== 'number' || mL < 0)
		      throw new TypeError('max must be a non-negative number')
		    this[MAX] = mL || Infinity;
		    trim(this);
		  }
		  get max () {
		    return this[MAX]
		  }
		  set allowStale (allowStale) {
		    this[ALLOW_STALE] = !!allowStale;
		  }
		  get allowStale () {
		    return this[ALLOW_STALE]
		  }
		  set maxAge (mA) {
		    if (typeof mA !== 'number')
		      throw new TypeError('maxAge must be a non-negative number')
		    this[MAX_AGE] = mA;
		    trim(this);
		  }
		  get maxAge () {
		    return this[MAX_AGE]
		  }
		  set lengthCalculator (lC) {
		    if (typeof lC !== 'function')
		      lC = naiveLength;
		    if (lC !== this[LENGTH_CALCULATOR]) {
		      this[LENGTH_CALCULATOR] = lC;
		      this[LENGTH] = 0;
		      this[LRU_LIST].forEach(hit => {
		        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
		        this[LENGTH] += hit.length;
		      });
		    }
		    trim(this);
		  }
		  get lengthCalculator () { return this[LENGTH_CALCULATOR] }
		  get length () { return this[LENGTH] }
		  get itemCount () { return this[LRU_LIST].length }
		  rforEach (fn, thisp) {
		    thisp = thisp || this;
		    for (let walker = this[LRU_LIST].tail; walker !== null;) {
		      const prev = walker.prev;
		      forEachStep(this, fn, walker, thisp);
		      walker = prev;
		    }
		  }
		  forEach (fn, thisp) {
		    thisp = thisp || this;
		    for (let walker = this[LRU_LIST].head; walker !== null;) {
		      const next = walker.next;
		      forEachStep(this, fn, walker, thisp);
		      walker = next;
		    }
		  }
		  keys () {
		    return this[LRU_LIST].toArray().map(k => k.key)
		  }
		  values () {
		    return this[LRU_LIST].toArray().map(k => k.value)
		  }
		  reset () {
		    if (this[DISPOSE] &&
		        this[LRU_LIST] &&
		        this[LRU_LIST].length) {
		      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
		    }
		    this[CACHE] = new Map();
		    this[LRU_LIST] = new Yallist();
		    this[LENGTH] = 0;
		  }
		  dump () {
		    return this[LRU_LIST].map(hit =>
		      isStale(this, hit) ? false : {
		        k: hit.key,
		        v: hit.value,
		        e: hit.now + (hit.maxAge || 0)
		      }).toArray().filter(h => h)
		  }
		  dumpLru () {
		    return this[LRU_LIST]
		  }
		  set (key, value, maxAge) {
		    maxAge = maxAge || this[MAX_AGE];
		    if (maxAge && typeof maxAge !== 'number')
		      throw new TypeError('maxAge must be a number')
		    const now = maxAge ? Date.now() : 0;
		    const len = this[LENGTH_CALCULATOR](value, key);
		    if (this[CACHE].has(key)) {
		      if (len > this[MAX]) {
		        del(this, this[CACHE].get(key));
		        return false
		      }
		      const node = this[CACHE].get(key);
		      const item = node.value;
		      if (this[DISPOSE]) {
		        if (!this[NO_DISPOSE_ON_SET])
		          this[DISPOSE](key, item.value);
		      }
		      item.now = now;
		      item.maxAge = maxAge;
		      item.value = value;
		      this[LENGTH] += len - item.length;
		      item.length = len;
		      this.get(key);
		      trim(this);
		      return true
		    }
		    const hit = new Entry(key, value, len, now, maxAge);
		    if (hit.length > this[MAX]) {
		      if (this[DISPOSE])
		        this[DISPOSE](key, value);
		      return false
		    }
		    this[LENGTH] += hit.length;
		    this[LRU_LIST].unshift(hit);
		    this[CACHE].set(key, this[LRU_LIST].head);
		    trim(this);
		    return true
		  }
		  has (key) {
		    if (!this[CACHE].has(key)) return false
		    const hit = this[CACHE].get(key).value;
		    return !isStale(this, hit)
		  }
		  get (key) {
		    return get(this, key, true)
		  }
		  peek (key) {
		    return get(this, key, false)
		  }
		  pop () {
		    const node = this[LRU_LIST].tail;
		    if (!node)
		      return null
		    del(this, node);
		    return node.value
		  }
		  del (key) {
		    del(this, this[CACHE].get(key));
		  }
		  load (arr) {
		    this.reset();
		    const now = Date.now();
		    for (let l = arr.length - 1; l >= 0; l--) {
		      const hit = arr[l];
		      const expiresAt = hit.e || 0;
		      if (expiresAt === 0)
		        this.set(hit.k, hit.v);
		      else {
		        const maxAge = expiresAt - now;
		        if (maxAge > 0) {
		          this.set(hit.k, hit.v, maxAge);
		        }
		      }
		    }
		  }
		  prune () {
		    this[CACHE].forEach((value, key) => get(this, key, false));
		  }
		}
		const get = (self, key, doUse) => {
		  const node = self[CACHE].get(key);
		  if (node) {
		    const hit = node.value;
		    if (isStale(self, hit)) {
		      del(self, node);
		      if (!self[ALLOW_STALE])
		        return undefined
		    } else {
		      if (doUse) {
		        if (self[UPDATE_AGE_ON_GET])
		          node.value.now = Date.now();
		        self[LRU_LIST].unshiftNode(node);
		      }
		    }
		    return hit.value
		  }
		};
		const isStale = (self, hit) => {
		  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
		    return false
		  const diff = Date.now() - hit.now;
		  return hit.maxAge ? diff > hit.maxAge
		    : self[MAX_AGE] && (diff > self[MAX_AGE])
		};
		const trim = self => {
		  if (self[LENGTH] > self[MAX]) {
		    for (let walker = self[LRU_LIST].tail;
		      self[LENGTH] > self[MAX] && walker !== null;) {
		      const prev = walker.prev;
		      del(self, walker);
		      walker = prev;
		    }
		  }
		};
		const del = (self, node) => {
		  if (node) {
		    const hit = node.value;
		    if (self[DISPOSE])
		      self[DISPOSE](hit.key, hit.value);
		    self[LENGTH] -= hit.length;
		    self[CACHE].delete(hit.key);
		    self[LRU_LIST].removeNode(node);
		  }
		};
		class Entry {
		  constructor (key, value, length, now, maxAge) {
		    this.key = key;
		    this.value = value;
		    this.length = length;
		    this.now = now;
		    this.maxAge = maxAge || 0;
		  }
		}
		const forEachStep = (self, fn, node, thisp) => {
		  let hit = node.value;
		  if (isStale(self, hit)) {
		    del(self, node);
		    if (!self[ALLOW_STALE])
		      hit = undefined;
		  }
		  if (hit)
		    fn.call(thisp, hit.value, hit.key, self);
		};
		lruCache = LRUCache;
		return lruCache;
	}

	var range;
	var hasRequiredRange;
	function requireRange () {
		if (hasRequiredRange) return range;
		hasRequiredRange = 1;
		class Range {
		  constructor (range, options) {
		    options = parseOptions(options);
		    if (range instanceof Range) {
		      if (
		        range.loose === !!options.loose &&
		        range.includePrerelease === !!options.includePrerelease
		      ) {
		        return range
		      } else {
		        return new Range(range.raw, options)
		      }
		    }
		    if (range instanceof Comparator) {
		      this.raw = range.value;
		      this.set = [[range]];
		      this.format();
		      return this
		    }
		    this.options = options;
		    this.loose = !!options.loose;
		    this.includePrerelease = !!options.includePrerelease;
		    this.raw = range;
		    this.set = range
		      .split('||')
		      .map(r => this.parseRange(r.trim()))
		      .filter(c => c.length);
		    if (!this.set.length) {
		      throw new TypeError(`Invalid SemVer Range: ${range}`)
		    }
		    if (this.set.length > 1) {
		      const first = this.set[0];
		      this.set = this.set.filter(c => !isNullSet(c[0]));
		      if (this.set.length === 0) {
		        this.set = [first];
		      } else if (this.set.length > 1) {
		        for (const c of this.set) {
		          if (c.length === 1 && isAny(c[0])) {
		            this.set = [c];
		            break
		          }
		        }
		      }
		    }
		    this.format();
		  }
		  format () {
		    this.range = this.set
		      .map((comps) => {
		        return comps.join(' ').trim()
		      })
		      .join('||')
		      .trim();
		    return this.range
		  }
		  toString () {
		    return this.range
		  }
		  parseRange (range) {
		    range = range.trim();
		    const memoOpts = Object.keys(this.options).join(',');
		    const memoKey = `parseRange:${memoOpts}:${range}`;
		    const cached = cache.get(memoKey);
		    if (cached) {
		      return cached
		    }
		    const loose = this.options.loose;
		    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
		    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
		    debug('hyphen replace', range);
		    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
		    debug('comparator trim', range);
		    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
		    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
		    range = range.split(/\s+/).join(' ');
		    let rangeList = range
		      .split(' ')
		      .map(comp => parseComparator(comp, this.options))
		      .join(' ')
		      .split(/\s+/)
		      .map(comp => replaceGTE0(comp, this.options));
		    if (loose) {
		      rangeList = rangeList.filter(comp => {
		        debug('loose invalid filter', comp, this.options);
		        return !!comp.match(re[t.COMPARATORLOOSE])
		      });
		    }
		    debug('range list', rangeList);
		    const rangeMap = new Map();
		    const comparators = rangeList.map(comp => new Comparator(comp, this.options));
		    for (const comp of comparators) {
		      if (isNullSet(comp)) {
		        return [comp]
		      }
		      rangeMap.set(comp.value, comp);
		    }
		    if (rangeMap.size > 1 && rangeMap.has('')) {
		      rangeMap.delete('');
		    }
		    const result = [...rangeMap.values()];
		    cache.set(memoKey, result);
		    return result
		  }
		  intersects (range, options) {
		    if (!(range instanceof Range)) {
		      throw new TypeError('a Range is required')
		    }
		    return this.set.some((thisComparators) => {
		      return (
		        isSatisfiable(thisComparators, options) &&
		        range.set.some((rangeComparators) => {
		          return (
		            isSatisfiable(rangeComparators, options) &&
		            thisComparators.every((thisComparator) => {
		              return rangeComparators.every((rangeComparator) => {
		                return thisComparator.intersects(rangeComparator, options)
		              })
		            })
		          )
		        })
		      )
		    })
		  }
		  test (version) {
		    if (!version) {
		      return false
		    }
		    if (typeof version === 'string') {
		      try {
		        version = new SemVer(version, this.options);
		      } catch (er) {
		        return false
		      }
		    }
		    for (let i = 0; i < this.set.length; i++) {
		      if (testSet(this.set[i], version, this.options)) {
		        return true
		      }
		    }
		    return false
		  }
		}
		range = Range;
		const LRU = requireLruCache();
		const cache = new LRU({ max: 1000 });
		const parseOptions = parseOptions_1;
		const Comparator = requireComparator();
		const debug = debug_1;
		const SemVer = semver$1;
		const {
		  re,
		  t,
		  comparatorTrimReplace,
		  tildeTrimReplace,
		  caretTrimReplace,
		} = re$3.exports;
		const isNullSet = c => c.value === '<0.0.0-0';
		const isAny = c => c.value === '';
		const isSatisfiable = (comparators, options) => {
		  let result = true;
		  const remainingComparators = comparators.slice();
		  let testComparator = remainingComparators.pop();
		  while (result && remainingComparators.length) {
		    result = remainingComparators.every((otherComparator) => {
		      return testComparator.intersects(otherComparator, options)
		    });
		    testComparator = remainingComparators.pop();
		  }
		  return result
		};
		const parseComparator = (comp, options) => {
		  debug('comp', comp, options);
		  comp = replaceCarets(comp, options);
		  debug('caret', comp);
		  comp = replaceTildes(comp, options);
		  debug('tildes', comp);
		  comp = replaceXRanges(comp, options);
		  debug('xrange', comp);
		  comp = replaceStars(comp, options);
		  debug('stars', comp);
		  return comp
		};
		const isX = id => !id || id.toLowerCase() === 'x' || id === '*';
		const replaceTildes = (comp, options) =>
		  comp.trim().split(/\s+/).map((c) => {
		    return replaceTilde(c, options)
		  }).join(' ');
		const replaceTilde = (comp, options) => {
		  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
		  return comp.replace(r, (_, M, m, p, pr) => {
		    debug('tilde', comp, _, M, m, p, pr);
		    let ret;
		    if (isX(M)) {
		      ret = '';
		    } else if (isX(m)) {
		      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
		    } else if (isX(p)) {
		      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
		    } else if (pr) {
		      debug('replaceTilde pr', pr);
		      ret = `>=${M}.${m}.${p}-${pr
	      } <${M}.${+m + 1}.0-0`;
		    } else {
		      ret = `>=${M}.${m}.${p
	      } <${M}.${+m + 1}.0-0`;
		    }
		    debug('tilde return', ret);
		    return ret
		  })
		};
		const replaceCarets = (comp, options) =>
		  comp.trim().split(/\s+/).map((c) => {
		    return replaceCaret(c, options)
		  }).join(' ');
		const replaceCaret = (comp, options) => {
		  debug('caret', comp, options);
		  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
		  const z = options.includePrerelease ? '-0' : '';
		  return comp.replace(r, (_, M, m, p, pr) => {
		    debug('caret', comp, _, M, m, p, pr);
		    let ret;
		    if (isX(M)) {
		      ret = '';
		    } else if (isX(m)) {
		      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
		    } else if (isX(p)) {
		      if (M === '0') {
		        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
		      } else {
		        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
		      }
		    } else if (pr) {
		      debug('replaceCaret pr', pr);
		      if (M === '0') {
		        if (m === '0') {
		          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${m}.${+p + 1}-0`;
		        } else {
		          ret = `>=${M}.${m}.${p}-${pr
	          } <${M}.${+m + 1}.0-0`;
		        }
		      } else {
		        ret = `>=${M}.${m}.${p}-${pr
	        } <${+M + 1}.0.0-0`;
		      }
		    } else {
		      debug('no pr');
		      if (M === '0') {
		        if (m === '0') {
		          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${m}.${+p + 1}-0`;
		        } else {
		          ret = `>=${M}.${m}.${p
	          }${z} <${M}.${+m + 1}.0-0`;
		        }
		      } else {
		        ret = `>=${M}.${m}.${p
	        } <${+M + 1}.0.0-0`;
		      }
		    }
		    debug('caret return', ret);
		    return ret
		  })
		};
		const replaceXRanges = (comp, options) => {
		  debug('replaceXRanges', comp, options);
		  return comp.split(/\s+/).map((c) => {
		    return replaceXRange(c, options)
		  }).join(' ')
		};
		const replaceXRange = (comp, options) => {
		  comp = comp.trim();
		  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
		  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
		    debug('xRange', comp, ret, gtlt, M, m, p, pr);
		    const xM = isX(M);
		    const xm = xM || isX(m);
		    const xp = xm || isX(p);
		    const anyX = xp;
		    if (gtlt === '=' && anyX) {
		      gtlt = '';
		    }
		    pr = options.includePrerelease ? '-0' : '';
		    if (xM) {
		      if (gtlt === '>' || gtlt === '<') {
		        ret = '<0.0.0-0';
		      } else {
		        ret = '*';
		      }
		    } else if (gtlt && anyX) {
		      if (xm) {
		        m = 0;
		      }
		      p = 0;
		      if (gtlt === '>') {
		        gtlt = '>=';
		        if (xm) {
		          M = +M + 1;
		          m = 0;
		          p = 0;
		        } else {
		          m = +m + 1;
		          p = 0;
		        }
		      } else if (gtlt === '<=') {
		        gtlt = '<';
		        if (xm) {
		          M = +M + 1;
		        } else {
		          m = +m + 1;
		        }
		      }
		      if (gtlt === '<') {
		        pr = '-0';
		      }
		      ret = `${gtlt + M}.${m}.${p}${pr}`;
		    } else if (xm) {
		      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
		    } else if (xp) {
		      ret = `>=${M}.${m}.0${pr
	      } <${M}.${+m + 1}.0-0`;
		    }
		    debug('xRange return', ret);
		    return ret
		  })
		};
		const replaceStars = (comp, options) => {
		  debug('replaceStars', comp, options);
		  return comp.trim().replace(re[t.STAR], '')
		};
		const replaceGTE0 = (comp, options) => {
		  debug('replaceGTE0', comp, options);
		  return comp.trim()
		    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
		};
		const hyphenReplace = incPr => ($0,
		  from, fM, fm, fp, fpr, fb,
		  to, tM, tm, tp, tpr, tb) => {
		  if (isX(fM)) {
		    from = '';
		  } else if (isX(fm)) {
		    from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
		  } else if (isX(fp)) {
		    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
		  } else if (fpr) {
		    from = `>=${from}`;
		  } else {
		    from = `>=${from}${incPr ? '-0' : ''}`;
		  }
		  if (isX(tM)) {
		    to = '';
		  } else if (isX(tm)) {
		    to = `<${+tM + 1}.0.0-0`;
		  } else if (isX(tp)) {
		    to = `<${tM}.${+tm + 1}.0-0`;
		  } else if (tpr) {
		    to = `<=${tM}.${tm}.${tp}-${tpr}`;
		  } else if (incPr) {
		    to = `<${tM}.${tm}.${+tp + 1}-0`;
		  } else {
		    to = `<=${to}`;
		  }
		  return (`${from} ${to}`).trim()
		};
		const testSet = (set, version, options) => {
		  for (let i = 0; i < set.length; i++) {
		    if (!set[i].test(version)) {
		      return false
		    }
		  }
		  if (version.prerelease.length && !options.includePrerelease) {
		    for (let i = 0; i < set.length; i++) {
		      debug(set[i].semver);
		      if (set[i].semver === Comparator.ANY) {
		        continue
		      }
		      if (set[i].semver.prerelease.length > 0) {
		        const allowed = set[i].semver;
		        if (allowed.major === version.major &&
		            allowed.minor === version.minor &&
		            allowed.patch === version.patch) {
		          return true
		        }
		      }
		    }
		    return false
		  }
		  return true
		};
		return range;
	}

	var comparator;
	var hasRequiredComparator;
	function requireComparator () {
		if (hasRequiredComparator) return comparator;
		hasRequiredComparator = 1;
		const ANY = Symbol('SemVer ANY');
		class Comparator {
		  static get ANY () {
		    return ANY
		  }
		  constructor (comp, options) {
		    options = parseOptions(options);
		    if (comp instanceof Comparator) {
		      if (comp.loose === !!options.loose) {
		        return comp
		      } else {
		        comp = comp.value;
		      }
		    }
		    debug('comparator', comp, options);
		    this.options = options;
		    this.loose = !!options.loose;
		    this.parse(comp);
		    if (this.semver === ANY) {
		      this.value = '';
		    } else {
		      this.value = this.operator + this.semver.version;
		    }
		    debug('comp', this);
		  }
		  parse (comp) {
		    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
		    const m = comp.match(r);
		    if (!m) {
		      throw new TypeError(`Invalid comparator: ${comp}`)
		    }
		    this.operator = m[1] !== undefined ? m[1] : '';
		    if (this.operator === '=') {
		      this.operator = '';
		    }
		    if (!m[2]) {
		      this.semver = ANY;
		    } else {
		      this.semver = new SemVer(m[2], this.options.loose);
		    }
		  }
		  toString () {
		    return this.value
		  }
		  test (version) {
		    debug('Comparator.test', version, this.options.loose);
		    if (this.semver === ANY || version === ANY) {
		      return true
		    }
		    if (typeof version === 'string') {
		      try {
		        version = new SemVer(version, this.options);
		      } catch (er) {
		        return false
		      }
		    }
		    return cmp(version, this.operator, this.semver, this.options)
		  }
		  intersects (comp, options) {
		    if (!(comp instanceof Comparator)) {
		      throw new TypeError('a Comparator is required')
		    }
		    if (!options || typeof options !== 'object') {
		      options = {
		        loose: !!options,
		        includePrerelease: false,
		      };
		    }
		    if (this.operator === '') {
		      if (this.value === '') {
		        return true
		      }
		      return new Range(comp.value, options).test(this.value)
		    } else if (comp.operator === '') {
		      if (comp.value === '') {
		        return true
		      }
		      return new Range(this.value, options).test(comp.semver)
		    }
		    const sameDirectionIncreasing =
		      (this.operator === '>=' || this.operator === '>') &&
		      (comp.operator === '>=' || comp.operator === '>');
		    const sameDirectionDecreasing =
		      (this.operator === '<=' || this.operator === '<') &&
		      (comp.operator === '<=' || comp.operator === '<');
		    const sameSemVer = this.semver.version === comp.semver.version;
		    const differentDirectionsInclusive =
		      (this.operator === '>=' || this.operator === '<=') &&
		      (comp.operator === '>=' || comp.operator === '<=');
		    const oppositeDirectionsLessThan =
		      cmp(this.semver, '<', comp.semver, options) &&
		      (this.operator === '>=' || this.operator === '>') &&
		        (comp.operator === '<=' || comp.operator === '<');
		    const oppositeDirectionsGreaterThan =
		      cmp(this.semver, '>', comp.semver, options) &&
		      (this.operator === '<=' || this.operator === '<') &&
		        (comp.operator === '>=' || comp.operator === '>');
		    return (
		      sameDirectionIncreasing ||
		      sameDirectionDecreasing ||
		      (sameSemVer && differentDirectionsInclusive) ||
		      oppositeDirectionsLessThan ||
		      oppositeDirectionsGreaterThan
		    )
		  }
		}
		comparator = Comparator;
		const parseOptions = parseOptions_1;
		const { re, t } = re$3.exports;
		const cmp = cmp_1;
		const debug = debug_1;
		const SemVer = semver$1;
		const Range = requireRange();
		return comparator;
	}

	const Range$8 = requireRange();
	const satisfies$3 = (version, range, options) => {
	  try {
	    range = new Range$8(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	var satisfies_1 = satisfies$3;

	const Range$7 = requireRange();
	const toComparators = (range, options) =>
	  new Range$7(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));
	var toComparators_1 = toComparators;

	const SemVer$3 = semver$1;
	const Range$6 = requireRange();
	const maxSatisfying = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range$6(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      if (!max || maxSV.compare(v) === -1) {
	        max = v;
	        maxSV = new SemVer$3(max, options);
	      }
	    }
	  });
	  return max
	};
	var maxSatisfying_1 = maxSatisfying;

	const SemVer$2 = semver$1;
	const Range$5 = requireRange();
	const minSatisfying = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range$5(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      if (!min || minSV.compare(v) === 1) {
	        min = v;
	        minSV = new SemVer$2(min, options);
	      }
	    }
	  });
	  return min
	};
	var minSatisfying_1 = minSatisfying;

	const SemVer$1 = semver$1;
	const Range$4 = requireRange();
	const gt$1 = gt_1;
	const minVersion = (range, loose) => {
	  range = new Range$4(range, loose);
	  let minver = new SemVer$1('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }
	  minver = new SemVer$1('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }
	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];
	    let setMin = null;
	    comparators.forEach((comparator) => {
	      const compver = new SemVer$1(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	        case '':
	        case '>=':
	          if (!setMin || gt$1(compver, setMin)) {
	            setMin = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          break
	        default:
	          throw new Error(`Unexpected operation: ${comparator.operator}`)
	      }
	    });
	    if (setMin && (!minver || gt$1(minver, setMin))) {
	      minver = setMin;
	    }
	  }
	  if (minver && range.test(minver)) {
	    return minver
	  }
	  return null
	};
	var minVersion_1 = minVersion;

	const Range$3 = requireRange();
	const validRange = (range, options) => {
	  try {
	    return new Range$3(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	var valid = validRange;

	const SemVer = semver$1;
	const Comparator$1 = requireComparator();
	const { ANY: ANY$1 } = Comparator$1;
	const Range$2 = requireRange();
	const satisfies$2 = satisfies_1;
	const gt = gt_1;
	const lt = lt_1;
	const lte = lte_1;
	const gte = gte_1;
	const outside$2 = (version, range, hilo, options) => {
	  version = new SemVer(version, options);
	  range = new Range$2(range, options);
	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }
	  if (satisfies$2(version, range, options)) {
	    return false
	  }
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];
	    let high = null;
	    let low = null;
	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY$1) {
	        comparator = new Comparator$1('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	};
	var outside_1 = outside$2;

	const outside$1 = outside_1;
	const gtr = (version, range, options) => outside$1(version, range, '>', options);
	var gtr_1 = gtr;

	const outside = outside_1;
	const ltr = (version, range, options) => outside(version, range, '<', options);
	var ltr_1 = ltr;

	const Range$1 = requireRange();
	const intersects = (r1, r2, options) => {
	  r1 = new Range$1(r1, options);
	  r2 = new Range$1(r2, options);
	  return r1.intersects(r2)
	};
	var intersects_1 = intersects;

	const satisfies$1 = satisfies_1;
	const compare$1 = compare_1;
	var simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare$1(a, b, options));
	  for (const version of v) {
	    const included = satisfies$1(version, range, options);
	    if (included) {
	      prev = version;
	      if (!first) {
	        first = version;
	      }
	    } else {
	      if (prev) {
	        set.push([first, prev]);
	      }
	      prev = null;
	      first = null;
	    }
	  }
	  if (first) {
	    set.push([first, null]);
	  }
	  const ranges = [];
	  for (const [min, max] of set) {
	    if (min === max) {
	      ranges.push(min);
	    } else if (!max && min === v[0]) {
	      ranges.push('*');
	    } else if (!max) {
	      ranges.push(`>=${min}`);
	    } else if (min === v[0]) {
	      ranges.push(`<=${max}`);
	    } else {
	      ranges.push(`${min} - ${max}`);
	    }
	  }
	  const simplified = ranges.join(' || ');
	  const original = typeof range.raw === 'string' ? range.raw : String(range);
	  return simplified.length < original.length ? simplified : range
	};

	const Range = requireRange();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const satisfies = satisfies_1;
	const compare = compare_1;
	const subset = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }
	  sub = new Range(sub, options);
	  dom = new Range(dom, options);
	  let sawNonNull = false;
	  OUTER: for (const simpleSub of sub.set) {
	    for (const simpleDom of dom.set) {
	      const isSub = simpleSubset(simpleSub, simpleDom, options);
	      sawNonNull = sawNonNull || isSub !== null;
	      if (isSub) {
	        continue OUTER
	      }
	    }
	    if (sawNonNull) {
	      return false
	    }
	  }
	  return true
	};
	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }
	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = [new Comparator('>=0.0.0-0')];
	    } else {
	      sub = [new Comparator('>=0.0.0')];
	    }
	  }
	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = [new Comparator('>=0.0.0')];
	    }
	  }
	  const eqSet = new Set();
	  let gt, lt;
	  for (const c of sub) {
	    if (c.operator === '>' || c.operator === '>=') {
	      gt = higherGT(gt, c, options);
	    } else if (c.operator === '<' || c.operator === '<=') {
	      lt = lowerLT(lt, c, options);
	    } else {
	      eqSet.add(c.semver);
	    }
	  }
	  if (eqSet.size > 1) {
	    return null
	  }
	  let gtltComp;
	  if (gt && lt) {
	    gtltComp = compare(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }
	  for (const eq of eqSet) {
	    if (gt && !satisfies(eq, String(gt), options)) {
	      return null
	    }
	    if (lt && !satisfies(eq, String(lt), options)) {
	      return null
	    }
	    for (const c of dom) {
	      if (!satisfies(eq, String(c), options)) {
	        return false
	      }
	    }
	    return true
	  }
	  let higher, lower;
	  let hasDomLT, hasDomGT;
	  let needDomLTPre = lt &&
	    !options.includePrerelease &&
	    lt.semver.prerelease.length ? lt.semver : false;
	  let needDomGTPre = gt &&
	    !options.includePrerelease &&
	    gt.semver.prerelease.length ? gt.semver : false;
	  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
	      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
	    needDomLTPre = false;
	  }
	  for (const c of dom) {
	    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
	    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
	    if (gt) {
	      if (needDomGTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomGTPre.major &&
	            c.semver.minor === needDomGTPre.minor &&
	            c.semver.patch === needDomGTPre.patch) {
	          needDomGTPre = false;
	        }
	      }
	      if (c.operator === '>' || c.operator === '>=') {
	        higher = higherGT(gt, c, options);
	        if (higher === c && higher !== gt) {
	          return false
	        }
	      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (lt) {
	      if (needDomLTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomLTPre.major &&
	            c.semver.minor === needDomLTPre.minor &&
	            c.semver.patch === needDomLTPre.patch) {
	          needDomLTPre = false;
	        }
	      }
	      if (c.operator === '<' || c.operator === '<=') {
	        lower = lowerLT(lt, c, options);
	        if (lower === c && lower !== lt) {
	          return false
	        }
	      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
	        return false
	      }
	    }
	    if (!c.operator && (lt || gt) && gtltComp !== 0) {
	      return false
	    }
	  }
	  if (gt && hasDomLT && !lt && gtltComp !== 0) {
	    return false
	  }
	  if (lt && hasDomGT && !gt && gtltComp !== 0) {
	    return false
	  }
	  if (needDomGTPre || needDomLTPre) {
	    return false
	  }
	  return true
	};
	const higherGT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};
	var subset_1 = subset;

	const internalRe = re$3.exports;
	var semver = {
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  SemVer: semver$1,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	  parse: parse_1,
	  valid: valid_1,
	  clean: clean_1,
	  inc: inc_1,
	  diff: diff_1,
	  major: major_1,
	  minor: minor_1,
	  patch: patch_1,
	  prerelease: prerelease_1,
	  compare: compare_1,
	  rcompare: rcompare_1,
	  compareLoose: compareLoose_1,
	  compareBuild: compareBuild_1,
	  sort: sort_1,
	  rsort: rsort_1,
	  gt: gt_1,
	  lt: lt_1,
	  eq: eq_1,
	  neq: neq_1,
	  gte: gte_1,
	  lte: lte_1,
	  cmp: cmp_1,
	  coerce: coerce_1,
	  Comparator: requireComparator(),
	  Range: requireRange(),
	  satisfies: satisfies_1,
	  toComparators: toComparators_1,
	  maxSatisfying: maxSatisfying_1,
	  minSatisfying: minSatisfying_1,
	  minVersion: minVersion_1,
	  validRange: valid,
	  outside: outside_1,
	  gtr: gtr_1,
	  ltr: ltr_1,
	  intersects: intersects_1,
	  simplifyRange: simplify,
	  subset: subset_1,
	};

	var __assign = (global && global.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	var _a;
	var DeviceModelId;
	(function (DeviceModelId) {
	    DeviceModelId["blue"] = "blue";
	    DeviceModelId["nanoS"] = "nanoS";
	    DeviceModelId["nanoSP"] = "nanoSP";
	    DeviceModelId["nanoX"] = "nanoX";
	    DeviceModelId["nanoFTS"] = "nanoFTS";
	})(DeviceModelId || (DeviceModelId = {}));
	var devices = (_a = {},
	    _a[DeviceModelId.blue] = {
	        id: DeviceModelId.blue,
	        productName: "Ledger Blue",
	        productIdMM: 0x00,
	        legacyUsbProductId: 0x0000,
	        usbOnly: true,
	        memorySize: 480 * 1024,
	        masks: [0x31000000, 0x31010000],
	        getBlockSize: function (_firwareVersion) { return 4 * 1024; }
	    },
	    _a[DeviceModelId.nanoS] = {
	        id: DeviceModelId.nanoS,
	        productName: "Ledger Nano S",
	        productIdMM: 0x10,
	        legacyUsbProductId: 0x0001,
	        usbOnly: true,
	        memorySize: 320 * 1024,
	        masks: [0x31100000],
	        getBlockSize: function (firmwareVersion) {
	            var _a;
	            return semver.lt((_a = semver.coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0")
	                ? 4 * 1024
	                : 2 * 1024;
	        }
	    },
	    _a[DeviceModelId.nanoSP] = {
	        id: DeviceModelId.nanoSP,
	        productName: "Ledger Nano S Plus",
	        productIdMM: 0x50,
	        legacyUsbProductId: 0x0005,
	        usbOnly: true,
	        memorySize: 1536 * 1024,
	        masks: [0x33100000],
	        getBlockSize: function (_firmwareVersion) { return 32; }
	    },
	    _a[DeviceModelId.nanoX] = {
	        id: DeviceModelId.nanoX,
	        productName: "Ledger Nano X",
	        productIdMM: 0x40,
	        legacyUsbProductId: 0x0004,
	        usbOnly: false,
	        memorySize: 2 * 1024 * 1024,
	        masks: [0x33000000],
	        getBlockSize: function (_firwareVersion) { return 4 * 1024; },
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572"
	            },
	        ]
	    },
	    _a[DeviceModelId.nanoFTS] = {
	        id: DeviceModelId.nanoFTS,
	        productName: "Ledger Nano FTS",
	        productIdMM: 0x60,
	        legacyUsbProductId: 0x0006,
	        usbOnly: false,
	        memorySize: 2 * 1024 * 1024,
	        masks: [0x33200000],
	        getBlockSize: function (_firwareVersion) { return 4 * 1024; },
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572"
	            },
	        ]
	    },
	    _a);
	({
	    Blue: DeviceModelId.blue,
	    "Nano S": DeviceModelId.nanoS,
	    "Nano S Plus": DeviceModelId.nanoSP,
	    "Nano X": DeviceModelId.nanoX,
	    "Nano FTS": DeviceModelId.nanoFTS
	});
	var devicesList = Object.values(devices);
	var ledgerUSBVendorId = 0x2c97;
	var identifyUSBProductId = function (usbProductId) {
	    var legacy = devicesList.find(function (d) { return d.legacyUsbProductId === usbProductId; });
	    if (legacy)
	        return legacy;
	    var mm = usbProductId >> 8;
	    var deviceModel = devicesList.find(function (d) { return d.productIdMM === mm; });
	    return deviceModel;
	};
	var bluetoothServices = [];
	var serviceUuidToInfos = {};
	for (var id$1 in devices) {
	    var deviceModel = devices[id$1];
	    var bluetoothSpec = deviceModel.bluetoothSpec;
	    if (bluetoothSpec) {
	        for (var i = 0; i < bluetoothSpec.length; i++) {
	            var spec = bluetoothSpec[i];
	            bluetoothServices.push(spec.serviceUuid);
	            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = __assign({ deviceModel: deviceModel }, spec);
	        }
	    }
	}

	var id = 0;
	var subscribers = [];
	var log = function (type, message, data) {
	    var obj = {
	        type: type,
	        id: String(++id),
	        date: new Date()
	    };
	    if (message)
	        obj.message = message;
	    if (data)
	        obj.data = data;
	    dispatch(obj);
	};
	var listen = function (cb) {
	    subscribers.push(cb);
	    return function () {
	        var i = subscribers.indexOf(cb);
	        if (i !== -1) {
	            subscribers[i] = subscribers[subscribers.length - 1];
	            subscribers.pop();
	        }
	    };
	};
	function dispatch(log) {
	    for (var i = 0; i < subscribers.length; i++) {
	        try {
	            subscribers[i](log);
	        }
	        catch (e) {
	            console.error(e);
	        }
	    }
	}
	if (typeof window !== "undefined") {
	    window.__ledgerLogsListen = listen;
	}

	var __extends$1 = (global && global.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __awaiter$2 = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator$2 = (global && global.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var __read = (global && global.__read) || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o), r, ar = [], e;
	    try {
	        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	    }
	    catch (error) { e = { error: error }; }
	    finally {
	        try {
	            if (r && !r.done && (m = i["return"])) m.call(i);
	        }
	        finally { if (e) throw e.error; }
	    }
	    return ar;
	};
	var ledgerDevices$1 = [
	    {
	        vendorId: ledgerUSBVendorId
	    },
	];
	var isSupported$1 = function () {
	    return Promise.resolve(!!(window.navigator && window.navigator.hid));
	};
	var getHID = function () {
	    var hid = navigator.hid;
	    if (!hid)
	        throw new TransportError("navigator.hid is not supported", "HIDNotSupported");
	    return hid;
	};
	function requestLedgerDevices() {
	    return __awaiter$2(this, void 0, void 0, function () {
	        var device;
	        return __generator$2(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 , getHID().requestDevice({
	                        filters: ledgerDevices$1
	                    })];
	                case 1:
	                    device = _a.sent();
	                    if (Array.isArray(device))
	                        return [2 , device];
	                    return [2 , [device]];
	            }
	        });
	    });
	}
	function getLedgerDevices$1() {
	    return __awaiter$2(this, void 0, void 0, function () {
	        var devices;
	        return __generator$2(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 , getHID().getDevices()];
	                case 1:
	                    devices = _a.sent();
	                    return [2 , devices.filter(function (d) { return d.vendorId === ledgerUSBVendorId; })];
	            }
	        });
	    });
	}
	function getFirstLedgerDevice$1() {
	    return __awaiter$2(this, void 0, void 0, function () {
	        var existingDevices, devices;
	        return __generator$2(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 , getLedgerDevices$1()];
	                case 1:
	                    existingDevices = _a.sent();
	                    if (existingDevices.length > 0)
	                        return [2 , existingDevices[0]];
	                    return [4 , requestLedgerDevices()];
	                case 2:
	                    devices = _a.sent();
	                    return [2 , devices[0]];
	            }
	        });
	    });
	}
	var TransportWebHID =  (function (_super) {
	    __extends$1(TransportWebHID, _super);
	    function TransportWebHID(device) {
	        var _this = _super.call(this) || this;
	        _this.channel = Math.floor(Math.random() * 0xffff);
	        _this.packetSize = 64;
	        _this.inputs = [];
	        _this.read = function () {
	            if (_this.inputs.length) {
	                return Promise.resolve(_this.inputs.shift());
	            }
	            return new Promise(function (success) {
	                _this.inputCallback = success;
	            });
	        };
	        _this.onInputReport = function (e) {
	            var buffer = Buffer.from(e.data.buffer);
	            if (_this.inputCallback) {
	                _this.inputCallback(buffer);
	                _this.inputCallback = null;
	            }
	            else {
	                _this.inputs.push(buffer);
	            }
	        };
	        _this._disconnectEmitted = false;
	        _this._emitDisconnect = function (e) {
	            if (_this._disconnectEmitted)
	                return;
	            _this._disconnectEmitted = true;
	            _this.emit("disconnect", e);
	        };
	        _this.exchange = function (apdu) { return __awaiter$2(_this, void 0, void 0, function () {
	            var b;
	            var _this = this;
	            return __generator$2(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , this.exchangeAtomicImpl(function () { return __awaiter$2(_this, void 0, void 0, function () {
	                            var _a, channel, packetSize, framing, blocks, i, result, acc, buffer;
	                            return __generator$2(this, function (_b) {
	                                switch (_b.label) {
	                                    case 0:
	                                        _a = this, channel = _a.channel, packetSize = _a.packetSize;
	                                        log("apdu", "=> " + apdu.toString("hex"));
	                                        framing = createHIDframing(channel, packetSize);
	                                        blocks = framing.makeBlocks(apdu);
	                                        i = 0;
	                                        _b.label = 1;
	                                    case 1:
	                                        if (!(i < blocks.length)) return [3 , 4];
	                                        return [4 , this.device.sendReport(0, blocks[i])];
	                                    case 2:
	                                        _b.sent();
	                                        _b.label = 3;
	                                    case 3:
	                                        i++;
	                                        return [3 , 1];
	                                    case 4:
	                                        if (!!(result = framing.getReducedResult(acc))) return [3 , 6];
	                                        return [4 , this.read()];
	                                    case 5:
	                                        buffer = _b.sent();
	                                        acc = framing.reduceResponse(acc, buffer);
	                                        return [3 , 4];
	                                    case 6:
	                                        log("apdu", "<= " + result.toString("hex"));
	                                        return [2 , result];
	                                }
	                            });
	                        }); })["catch"](function (e) {
	                            if (e && e.message && e.message.includes("write")) {
	                                _this._emitDisconnect(e);
	                                throw new DisconnectedDeviceDuringOperation(e.message);
	                            }
	                            throw e;
	                        })];
	                    case 1:
	                        b = _a.sent();
	                        return [2 , b];
	                }
	            });
	        }); };
	        _this.device = device;
	        _this.deviceModel =
	            typeof device.productId === "number"
	                ? identifyUSBProductId(device.productId)
	                : undefined;
	        device.addEventListener("inputreport", _this.onInputReport);
	        return _this;
	    }
	    TransportWebHID.request = function () {
	        return __awaiter$2(this, void 0, void 0, function () {
	            var _a, device;
	            return __generator$2(this, function (_b) {
	                switch (_b.label) {
	                    case 0: return [4 , requestLedgerDevices()];
	                    case 1:
	                        _a = __read.apply(void 0, [_b.sent(), 1]), device = _a[0];
	                        return [2 , TransportWebHID.open(device)];
	                }
	            });
	        });
	    };
	    TransportWebHID.openConnected = function () {
	        return __awaiter$2(this, void 0, void 0, function () {
	            var devices;
	            return __generator$2(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , getLedgerDevices$1()];
	                    case 1:
	                        devices = _a.sent();
	                        if (devices.length === 0)
	                            return [2 , null];
	                        return [2 , TransportWebHID.open(devices[0])];
	                }
	            });
	        });
	    };
	    TransportWebHID.open = function (device) {
	        return __awaiter$2(this, void 0, void 0, function () {
	            var transport, onDisconnect;
	            return __generator$2(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , device.open()];
	                    case 1:
	                        _a.sent();
	                        transport = new TransportWebHID(device);
	                        onDisconnect = function (e) {
	                            if (device === e.device) {
	                                getHID().removeEventListener("disconnect", onDisconnect);
	                                transport._emitDisconnect(new DisconnectedDevice());
	                            }
	                        };
	                        getHID().addEventListener("disconnect", onDisconnect);
	                        return [2 , transport];
	                }
	            });
	        });
	    };
	    TransportWebHID.prototype.close = function () {
	        return __awaiter$2(this, void 0, void 0, function () {
	            return __generator$2(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , this.exchangeBusyPromise];
	                    case 1:
	                        _a.sent();
	                        this.device.removeEventListener("inputreport", this.onInputReport);
	                        return [4 , this.device.close()];
	                    case 2:
	                        _a.sent();
	                        return [2 ];
	                }
	            });
	        });
	    };
	    TransportWebHID.prototype.setScrambleKey = function () { };
	    TransportWebHID.isSupported = isSupported$1;
	    TransportWebHID.list = getLedgerDevices$1;
	    TransportWebHID.listen = function (observer) {
	        var unsubscribed = false;
	        getFirstLedgerDevice$1().then(function (device) {
	            if (!device) {
	                observer.error(new TransportOpenUserCancelled("Access denied to use Ledger device"));
	            }
	            else if (!unsubscribed) {
	                var deviceModel = typeof device.productId === "number"
	                    ? identifyUSBProductId(device.productId)
	                    : undefined;
	                observer.next({
	                    type: "add",
	                    descriptor: device,
	                    deviceModel: deviceModel
	                });
	                observer.complete();
	            }
	        }, function (error) {
	            observer.error(new TransportOpenUserCancelled(error.message));
	        });
	        function unsubscribe() {
	            unsubscribed = true;
	        }
	        return {
	            unsubscribe: unsubscribe
	        };
	    };
	    return TransportWebHID;
	}(Transport));

	const TransportWebHID$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': TransportWebHID
	});

	const require$$1 = /*@__PURE__*/getAugmentedNamespace(TransportWebHID$1);

	var __awaiter$1 = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator$1 = (global && global.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var ledgerDevices = [
	    {
	        vendorId: ledgerUSBVendorId
	    },
	];
	function requestLedgerDevice() {
	    return __awaiter$1(this, void 0, void 0, function () {
	        var device;
	        return __generator$1(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 , navigator.usb.requestDevice({
	                        filters: ledgerDevices
	                    })];
	                case 1:
	                    device = _a.sent();
	                    return [2 , device];
	            }
	        });
	    });
	}
	function getLedgerDevices() {
	    return __awaiter$1(this, void 0, void 0, function () {
	        var devices;
	        return __generator$1(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 , navigator.usb.getDevices()];
	                case 1:
	                    devices = _a.sent();
	                    return [2 , devices.filter(function (d) { return d.vendorId === ledgerUSBVendorId; })];
	            }
	        });
	    });
	}
	function getFirstLedgerDevice() {
	    return __awaiter$1(this, void 0, void 0, function () {
	        var existingDevices;
	        return __generator$1(this, function (_a) {
	            switch (_a.label) {
	                case 0: return [4 , getLedgerDevices()];
	                case 1:
	                    existingDevices = _a.sent();
	                    if (existingDevices.length > 0)
	                        return [2 , existingDevices[0]];
	                    return [2 , requestLedgerDevice()];
	            }
	        });
	    });
	}
	var isSupported = function () {
	    return Promise.resolve(!!navigator &&
	        !!navigator.usb &&
	        typeof navigator.usb.getDevices === "function");
	};

	var __extends = (global && global.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __awaiter = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (global && global.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	var configurationValue = 1;
	var endpointNumber = 3;
	var TransportWebUSB =  (function (_super) {
	    __extends(TransportWebUSB, _super);
	    function TransportWebUSB(device, interfaceNumber) {
	        var _this = _super.call(this) || this;
	        _this.channel = Math.floor(Math.random() * 0xffff);
	        _this.packetSize = 64;
	        _this._disconnectEmitted = false;
	        _this._emitDisconnect = function (e) {
	            if (_this._disconnectEmitted)
	                return;
	            _this._disconnectEmitted = true;
	            _this.emit("disconnect", e);
	        };
	        _this.device = device;
	        _this.interfaceNumber = interfaceNumber;
	        _this.deviceModel = identifyUSBProductId(device.productId);
	        return _this;
	    }
	    TransportWebUSB.request = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var device;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , requestLedgerDevice()];
	                    case 1:
	                        device = _a.sent();
	                        return [2 , TransportWebUSB.open(device)];
	                }
	            });
	        });
	    };
	    TransportWebUSB.openConnected = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var devices;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , getLedgerDevices()];
	                    case 1:
	                        devices = _a.sent();
	                        if (devices.length === 0)
	                            return [2 , null];
	                        return [2 , TransportWebUSB.open(devices[0])];
	                }
	            });
	        });
	    };
	    TransportWebUSB.open = function (device) {
	        return __awaiter(this, void 0, void 0, function () {
	            var iface, interfaceNumber, e_1, transport, onDisconnect;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , device.open()];
	                    case 1:
	                        _a.sent();
	                        if (!(device.configuration === null)) return [3 , 3];
	                        return [4 , device.selectConfiguration(configurationValue)];
	                    case 2:
	                        _a.sent();
	                        _a.label = 3;
	                    case 3: return [4 , gracefullyResetDevice(device)];
	                    case 4:
	                        _a.sent();
	                        iface = device.configurations[0].interfaces.find(function (_a) {
	                            var alternates = _a.alternates;
	                            return alternates.some(function (a) { return a.interfaceClass === 255; });
	                        });
	                        if (!iface) {
	                            throw new TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
	                        }
	                        interfaceNumber = iface.interfaceNumber;
	                        _a.label = 5;
	                    case 5:
	                        _a.trys.push([5, 7, , 9]);
	                        return [4 , device.claimInterface(interfaceNumber)];
	                    case 6:
	                        _a.sent();
	                        return [3 , 9];
	                    case 7:
	                        e_1 = _a.sent();
	                        return [4 , device.close()];
	                    case 8:
	                        _a.sent();
	                        throw new TransportInterfaceNotAvailable(e_1.message);
	                    case 9:
	                        transport = new TransportWebUSB(device, interfaceNumber);
	                        onDisconnect = function (e) {
	                            if (device === e.device) {
	                                navigator.usb.removeEventListener("disconnect", onDisconnect);
	                                transport._emitDisconnect(new DisconnectedDevice());
	                            }
	                        };
	                        navigator.usb.addEventListener("disconnect", onDisconnect);
	                        return [2 , transport];
	                }
	            });
	        });
	    };
	    TransportWebUSB.prototype.close = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , this.exchangeBusyPromise];
	                    case 1:
	                        _a.sent();
	                        return [4 , this.device.releaseInterface(this.interfaceNumber)];
	                    case 2:
	                        _a.sent();
	                        return [4 , gracefullyResetDevice(this.device)];
	                    case 3:
	                        _a.sent();
	                        return [4 , this.device.close()];
	                    case 4:
	                        _a.sent();
	                        return [2 ];
	                }
	            });
	        });
	    };
	    TransportWebUSB.prototype.exchange = function (apdu) {
	        return __awaiter(this, void 0, void 0, function () {
	            var b;
	            var _this = this;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 , this.exchangeAtomicImpl(function () { return __awaiter(_this, void 0, void 0, function () {
	                            var _a, channel, packetSize, framing, blocks, i, result, acc, r, buffer;
	                            return __generator(this, function (_b) {
	                                switch (_b.label) {
	                                    case 0:
	                                        _a = this, channel = _a.channel, packetSize = _a.packetSize;
	                                        log("apdu", "=> " + apdu.toString("hex"));
	                                        framing = createHIDframing(channel, packetSize);
	                                        blocks = framing.makeBlocks(apdu);
	                                        i = 0;
	                                        _b.label = 1;
	                                    case 1:
	                                        if (!(i < blocks.length)) return [3 , 4];
	                                        return [4 , this.device.transferOut(endpointNumber, blocks[i])];
	                                    case 2:
	                                        _b.sent();
	                                        _b.label = 3;
	                                    case 3:
	                                        i++;
	                                        return [3 , 1];
	                                    case 4:
	                                        if (!!(result = framing.getReducedResult(acc))) return [3 , 6];
	                                        return [4 , this.device.transferIn(endpointNumber, packetSize)];
	                                    case 5:
	                                        r = _b.sent();
	                                        buffer = Buffer.from(r.data.buffer);
	                                        acc = framing.reduceResponse(acc, buffer);
	                                        return [3 , 4];
	                                    case 6:
	                                        log("apdu", "<= " + result.toString("hex"));
	                                        return [2 , result];
	                                }
	                            });
	                        }); })["catch"](function (e) {
	                            if (e && e.message && e.message.includes("disconnected")) {
	                                _this._emitDisconnect(e);
	                                throw new DisconnectedDeviceDuringOperation(e.message);
	                            }
	                            throw e;
	                        })];
	                    case 1:
	                        b = _a.sent();
	                        return [2 , b];
	                }
	            });
	        });
	    };
	    TransportWebUSB.prototype.setScrambleKey = function () { };
	    TransportWebUSB.isSupported = isSupported;
	    TransportWebUSB.list = getLedgerDevices;
	    TransportWebUSB.listen = function (observer) {
	        var unsubscribed = false;
	        getFirstLedgerDevice().then(function (device) {
	            if (!unsubscribed) {
	                var deviceModel = identifyUSBProductId(device.productId);
	                observer.next({
	                    type: "add",
	                    descriptor: device,
	                    deviceModel: deviceModel
	                });
	                observer.complete();
	            }
	        }, function (error) {
	            if (window.DOMException &&
	                error instanceof window.DOMException &&
	                error.code === 18) {
	                observer.error(new TransportWebUSBGestureRequired(error.message));
	            }
	            else {
	                observer.error(new TransportOpenUserCancelled(error.message));
	            }
	        });
	        function unsubscribe() {
	            unsubscribed = true;
	        }
	        return {
	            unsubscribe: unsubscribe
	        };
	    };
	    return TransportWebUSB;
	}(Transport));
	function gracefullyResetDevice(device) {
	    return __awaiter(this, void 0, void 0, function () {
	        var err_1;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    _a.trys.push([0, 2, , 3]);
	                    return [4 , device.reset()];
	                case 1:
	                    _a.sent();
	                    return [3 , 3];
	                case 2:
	                    err_1 = _a.sent();
	                    console.warn(err_1);
	                    return [3 , 3];
	                case 3: return [2 ];
	            }
	        });
	    });
	}

	const TransportWebUSB$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': TransportWebUSB
	});

	const require$$2 = /*@__PURE__*/getAugmentedNamespace(TransportWebUSB$1);

	var packageInfo$1 = {};

	var hasRequiredPackageInfo;
	function requirePackageInfo () {
		if (hasRequiredPackageInfo) return packageInfo$1;
		hasRequiredPackageInfo = 1;
		Object.defineProperty(packageInfo$1, "__esModule", {
		  value: true
		});
		packageInfo$1.packageInfo = void 0;
		const packageInfo = {
		  name: '@polkadot/hw-ledger-transports',
		  path: typeof __dirname === 'string' ? __dirname : 'auto',
		  type: 'cjs',
		  version: '10.1.5'
		};
		packageInfo$1.packageInfo = packageInfo;
		return packageInfo$1;
	}

	(function (exports) {
		var _interopRequireDefault = interopRequireDefault.exports;
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports, "packageInfo", {
		  enumerable: true,
		  get: function () {
		    return _packageInfo.packageInfo;
		  }
		});
		exports.transports = void 0;
		var _hwTransportWebhid = _interopRequireDefault(require$$1);
		var _hwTransportWebusb = _interopRequireDefault(require$$2);
		var _packageInfo = requirePackageInfo();
		const transports = [{
		  create: () => _hwTransportWebusb.default.create(),
		  type: 'webusb'
		}, {
		  create: () => _hwTransportWebhid.default.create(),
		  type: 'hid'
		}];
		exports.transports = transports;
	} (browser));
	getDefaultExportFromCjs(browser);

	const LEDGER_DEFAULT_ACCOUNT = 0x80000000;
	const LEDGER_DEFAULT_CHANGE = 0x80000000;
	const LEDGER_DEFAULT_INDEX = 0x80000000;
	const LEDGER_SUCCESS_CODE = 0x9000;

	const ledgerApps = {
	  acala: 'Acala',
	  'aleph-node': 'AlephZero',
	  astar: 'Astar',
	  bifrost: 'Bifrost',
	  'bifrost-kusama': 'BifrostKusama',
	  centrifuge: 'Centrifuge',
	  composable: 'Composable',
	  'dock-mainnet': 'Dock',
	  edgeware: 'Edgeware',
	  equilibrium: 'Equilibrium',
	  genshiro: 'Genshiro',
	  'interlay-parachain': 'Interlay',
	  karura: 'Karura',
	  kusama: 'Kusama',
	  'nodle-para': 'Nodle',
	  parallel: 'Parallel',
	  polkadex: 'Polkadex',
	  polkadot: 'Polkadot',
	  polymesh: 'Polymesh',
	  sora: 'Sora',
	  stafi: 'Stafi',
	  statemine: 'Statemine',
	  statemint: 'Statemint',
	  unique: 'Unique',
	  xxnetwork: 'XXNetwork'
	};

	const packageInfo = {
	  name: '@polkadot/hw-ledger',
	  path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto',
	  type: 'esm',
	  version: '10.1.5'
	};

	class Ledger {
	  #app = null;
	  #chain;
	  #transport;
	  constructor(transport, chain) {
	    if (!['hid', 'webusb'].includes(transport)) {
	      throw new Error(`Unsupported transport ${transport}`);
	    } else if (!Object.keys(ledgerApps).includes(chain)) {
	      throw new Error(`Unsupported chain ${chain}`);
	    }
	    this.#chain = chain;
	    this.#transport = transport;
	  }
	  async getAddress(confirm = false, accountOffset = 0, addressOffset = 0, {
	    account = LEDGER_DEFAULT_ACCOUNT,
	    addressIndex = LEDGER_DEFAULT_INDEX,
	    change = LEDGER_DEFAULT_CHANGE
	  } = {}) {
	    return this.#withApp(async app => {
	      const {
	        address,
	        pubKey
	      } = await this.#wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));
	      return {
	        address,
	        publicKey: `0x${pubKey}`
	      };
	    });
	  }
	  async getVersion() {
	    return this.#withApp(async app => {
	      const {
	        device_locked: isLocked,
	        major,
	        minor,
	        patch,
	        test_mode: isTestMode
	      } = await this.#wrapError(app.getVersion());
	      return {
	        isLocked,
	        isTestMode,
	        version: [major, minor, patch]
	      };
	    });
	  }
	  async sign(message, accountOffset = 0, addressOffset = 0, {
	    account = LEDGER_DEFAULT_ACCOUNT,
	    addressIndex = LEDGER_DEFAULT_INDEX,
	    change = LEDGER_DEFAULT_CHANGE
	  } = {}) {
	    return this.#withApp(async app => {
	      const buffer = util.u8aToBuffer(message);
	      const {
	        signature
	      } = await this.#wrapError(app.sign(account + accountOffset, change, addressIndex + addressOffset, buffer));
	      return {
	        signature: `0x${signature.toString('hex')}`
	      };
	    });
	  }
	  #getApp = async () => {
	    if (!this.#app) {
	      const def = browser.transports.find(({
	        type
	      }) => type === this.#transport);
	      if (!def) {
	        throw new Error(`Unable to find a transport for ${this.#transport}`);
	      }
	      const transport = await def.create();
	      this.#app = dist.newSubstrateApp(transport, ledgerApps[this.#chain]);
	    }
	    return this.#app;
	  };
	  #withApp = async fn => {
	    try {
	      const app = await this.#getApp();
	      return await fn(app);
	    } catch (error) {
	      this.#app = null;
	      throw error;
	    }
	  };
	  #wrapError = async promise => {
	    const result = await promise;
	    if (result.return_code !== LEDGER_SUCCESS_CODE) {
	      throw new Error(result.error_message);
	    }
	    return result;
	  };
	}

	exports.Ledger = Ledger;
	exports.packageInfo = packageInfo;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
