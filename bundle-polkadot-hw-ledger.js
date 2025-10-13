(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/util')) :
	typeof define === 'function' && define.amd ? define(['exports', '@polkadot/util'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotHwLedger = {}, global.polkadotUtil));
})(this, (function (exports, util$1) { 'use strict';

	const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
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

	var dist$1 = {};

	var legacy_apps = {};

	var supported_apps = {};

	var substrate_app = {};

	var common$1 = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.ERROR_DESCRIPTION = exports.ECDSA_PUBKEY_LEN = exports.ED25519_PUBKEY_LEN = exports.CHUNK_SIZE = void 0;
		exports.errorCodeToString = errorCodeToString;
		exports.processErrorResponse = processErrorResponse;
		exports.getVersion = getVersion;
		exports.serializePath = serializePath;
		exports.CHUNK_SIZE = 250;
		exports.ED25519_PUBKEY_LEN = 32;
		exports.ECDSA_PUBKEY_LEN = 33;
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
		    0x6e01: 'App does not seem to be open',
		    0x6f00: 'Unknown error',
		    0x6f01: 'Sign/verify error',
		};
		function errorCodeToString(statusCode) {
		    if (statusCode in exports.ERROR_DESCRIPTION)
		        return exports.ERROR_DESCRIPTION[statusCode];
		    return `Unknown Status Code: ${statusCode}`;
		}
		function isDict(v) {
		    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
		}
		function processErrorResponse(response) {
		    if (response != null) {
		        if (isDict(response)) {
		            if (Object.prototype.hasOwnProperty.call(response, 'returnCode')) {
		                return {
		                    return_code: response.returnCode,
		                    error_message: errorCodeToString(response.returnCode),
		                };
		            }
		            if (Object.prototype.hasOwnProperty.call(response, 'statusCode')) {
		                return {
		                    return_code: response.statusCode,
		                    error_message: errorCodeToString(response.statusCode),
		                };
		            }
		            if (Object.prototype.hasOwnProperty.call(response, 'return_code') &&
		                Object.prototype.hasOwnProperty.call(response, 'error_message')) {
		                return response;
		            }
		        }
		        return {
		            return_code: 0xffff,
		            error_message: response.toString(),
		        };
		    }
		    return {
		        return_code: 0xffff,
		        error_message: response.toString(),
		    };
		}
		async function getVersion(transport, cla) {
		    try {
		        const response = await transport.send(cla, 0 , 0, 0);
		        const errorCodeData = response.subarray(-2);
		        const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
		        if (response.length !== 14 && response.length !== 20) {
		            return {
		                return_code: 27012 ,
		                error_message: errorCodeToString(27012 ),
		            };
		        }
		        let major, minor, patch, deviceLocked, targetId;
		        if (response.length === 14) {
		            major = response.readUInt16BE(1);
		            minor = response.readUInt16BE(3);
		            patch = response.readUInt16BE(5);
		            deviceLocked = response[7] === 1;
		            targetId = (response[8] << 24) + (response[9] << 16) + (response[10] << 8) + (response[11] << 0);
		        }
		        else {
		            major = response.readUInt32BE(1);
		            minor = response.readUInt32BE(5);
		            patch = response.readUInt32BE(9);
		            deviceLocked = response[13] === 1;
		            targetId = (response[14] << 24) + (response[15] << 16) + (response[16] << 8) + (response[17] << 0);
		        }
		        return {
		            return_code: returnCode,
		            error_message: errorCodeToString(returnCode),
		            test_mode: response[0] !== 0,
		            major,
		            minor,
		            patch,
		            deviceLocked,
		            target_id: targetId.toString(16),
		        };
		    }
		    catch (e) {
		        return processErrorResponse(e);
		    }
		}
		function serializePath(slip0044, account, change, addressIndex) {
		    if (!Number.isInteger(account))
		        throw new Error('Input must be an integer');
		    if (!Number.isInteger(change))
		        throw new Error('Input must be an integer');
		    if (!Number.isInteger(addressIndex))
		        throw new Error('Input must be an integer');
		    const buf = Buffer.alloc(20);
		    buf.writeUInt32LE(0x8000002c, 0);
		    buf.writeUInt32LE(slip0044, 4);
		    buf.writeUInt32LE(account, 8);
		    buf.writeUInt32LE(change, 12);
		    buf.writeUInt32LE(addressIndex, 16);
		    return buf;
		}
	} (common$1));
	getDefaultExportFromCjs(common$1);

	Object.defineProperty(substrate_app, "__esModule", { value: true });
	substrate_app.SubstrateApp = void 0;
	const common_1$2 = common$1;
	class SubstrateApp {
	    constructor(transport, cla, slip0044) {
	        if (transport == null) {
	            throw new Error('Transport has not been defined');
	        }
	        this.transport = transport;
	        this.cla = cla;
	        this.slip0044 = slip0044;
	    }
	    static serializePath(slip0044, account, change, addressIndex) {
	        if (!Number.isInteger(account))
	            throw new Error('Input must be an integer');
	        if (!Number.isInteger(change))
	            throw new Error('Input must be an integer');
	        if (!Number.isInteger(addressIndex))
	            throw new Error('Input must be an integer');
	        const buf = Buffer.alloc(20);
	        buf.writeUInt32LE(0x8000002c, 0);
	        buf.writeUInt32LE(slip0044, 4);
	        buf.writeUInt32LE(account, 8);
	        buf.writeUInt32LE(change, 12);
	        buf.writeUInt32LE(addressIndex, 16);
	        return buf;
	    }
	    static GetChunks(message) {
	        const chunks = [];
	        const buffer = Buffer.from(message);
	        for (let i = 0; i < buffer.length; i += common_1$2.CHUNK_SIZE) {
	            let end = i + common_1$2.CHUNK_SIZE;
	            if (i > buffer.length) {
	                end = buffer.length;
	            }
	            chunks.push(buffer.subarray(i, end));
	        }
	        return chunks;
	    }
	    static signGetChunks(slip0044, account, change, addressIndex, message) {
	        const chunks = [];
	        const bip44Path = SubstrateApp.serializePath(slip0044, account, change, addressIndex);
	        chunks.push(bip44Path);
	        chunks.push(...SubstrateApp.GetChunks(message));
	        return chunks;
	    }
	    async getVersion() {
	        try {
	            return await (0, common_1$2.getVersion)(this.transport, this.cla);
	        }
	        catch (e) {
	            return (0, common_1$2.processErrorResponse)(e);
	        }
	    }
	    async appInfo() {
	        return await this.transport.send(0xb0, 0x01, 0, 0).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            let appName = '';
	            let appVersion = '';
	            let flagLen = 0;
	            let flagsValue = 0;
	            if (response[0] !== 1) {
	                return {
	                    return_code: 0x9001,
	                    error_message: 'response format ID not recognized',
	                };
	            }
	            else {
	                const appNameLen = response[1];
	                appName = response.subarray(2, 2 + appNameLen).toString('ascii');
	                let idx = 2 + appNameLen;
	                const appVersionLen = response[idx];
	                idx += 1;
	                appVersion = response.subarray(idx, idx + appVersionLen).toString('ascii');
	                idx += appVersionLen;
	                const appFlagsLen = response[idx];
	                idx += 1;
	                flagLen = appFlagsLen;
	                flagsValue = response[idx];
	            }
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1$2.errorCodeToString)(returnCode),
	                appName: appName === '' || 'err',
	                appVersion: appVersion === '' || 'err',
	                flagLen,
	                flagsValue,
	                flag_recovery: (flagsValue & 1) !== 0,
	                flag_signed_mcu_code: (flagsValue & 2) !== 0,
	                flag_onboarded: (flagsValue & 4) !== 0,
	                flag_pin_validated: (flagsValue & 128) !== 0,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async getAddress(account, change, addressIndex, requireConfirmation = false, scheme = 0 ) {
	        const bip44Path = SubstrateApp.serializePath(this.slip0044, account, change, addressIndex);
	        let p1 = 0;
	        if (requireConfirmation)
	            p1 = 1;
	        let p2 = 0;
	        if (!isNaN(scheme))
	            p2 = scheme;
	        return await this.transport.send(this.cla, 1 , p1, p2, bip44Path).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const errorCode = errorCodeData[0] * 256 + errorCodeData[1];
	            let pubkeyLen = 32;
	            if (scheme == 2 ) {
	                pubkeyLen = 33;
	            }
	            return {
	                pubKey: response.subarray(0, pubkeyLen).toString('hex'),
	                address: response.subarray(pubkeyLen, response.length - 2).toString('ascii'),
	                return_code: errorCode,
	                error_message: (0, common_1$2.errorCodeToString)(errorCode),
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async signSendChunk(chunkIdx, chunkNum, chunk, scheme = 0 , ins = 2 ) {
	        let payloadType = 1 ;
	        if (chunkIdx === 1) {
	            payloadType = 0 ;
	        }
	        if (chunkIdx === chunkNum) {
	            payloadType = 2 ;
	        }
	        let p2 = 0;
	        if (!isNaN(scheme))
	            p2 = scheme;
	        return await this.transport.send(this.cla, ins, payloadType, p2, chunk, [36864 , 0x6984, 0x6a80]).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            let errorMessage = (0, common_1$2.errorCodeToString)(returnCode);
	            let signature = null;
	            if (returnCode === 0x6a80 || returnCode === 0x6984) {
	                errorMessage = response.subarray(0, response.length - 2).toString('ascii');
	            }
	            else if (response.length > 2) {
	                signature = response.subarray(0, response.length - 2);
	            }
	            return {
	                signature,
	                return_code: returnCode,
	                error_message: errorMessage,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async signImpl(account, change, addressIndex, message, ins, scheme = 0 ) {
	        const chunks = SubstrateApp.signGetChunks(this.slip0044, account, change, addressIndex, message);
	        return await this.signSendChunk(1, chunks.length, chunks[0], scheme, ins).then(async () => {
	            let result;
	            for (let i = 1; i < chunks.length; i += 1) {
	                result = await this.signSendChunk(1 + i, chunks.length, chunks[i], scheme, ins);
	                if (result.return_code !== 36864 ) {
	                    break;
	                }
	            }
	            return {
	                return_code: result.return_code,
	                error_message: result.error_message,
	                signature: result.signature,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async sign(account, change, addressIndex, message, scheme = 0 ) {
	        return await this.signImpl(account, change, addressIndex, message, 2 , scheme);
	    }
	    async signRaw(account, change, addressIndex, message, scheme = 0 ) {
	        return await this.signImpl(account, change, addressIndex, message, 3 , scheme);
	    }
	    async getAllowlistPubKey() {
	        return await this.transport.send(this.cla, 144 , 0, 0).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            console.log(response);
	            const pubkey = response.subarray(0, 32);
	            if (response.length !== 34) {
	                return {
	                    return_code: 0x6984,
	                    error_message: (0, common_1$2.errorCodeToString)(0x6984),
	                };
	            }
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1$2.errorCodeToString)(returnCode),
	                pubkey,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async setAllowlistPubKey(pk) {
	        return await this.transport.send(this.cla, 145 , 0, 0, pk).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1$2.errorCodeToString)(returnCode),
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async getAllowlistHash() {
	        return await this.transport.send(this.cla, 146 , 0, 0).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            console.log(response);
	            const hash = response.subarray(0, 32);
	            if (response.length !== 34) {
	                return {
	                    return_code: 0x6984,
	                    error_message: (0, common_1$2.errorCodeToString)(0x6984),
	                };
	            }
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1$2.errorCodeToString)(returnCode),
	                hash,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async uploadSendChunk(chunkIdx, chunkNum, chunk) {
	        let payloadType = 1 ;
	        if (chunkIdx === 1) {
	            payloadType = 0 ;
	        }
	        if (chunkIdx === chunkNum) {
	            payloadType = 2 ;
	        }
	        return await this.transport.send(this.cla, 147 , payloadType, 0, chunk, [36864 ]).then(response => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            const errorMessage = (0, common_1$2.errorCodeToString)(returnCode);
	            return {
	                return_code: returnCode,
	                error_message: errorMessage,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	    async uploadAllowlist(message) {
	        const chunks = [];
	        chunks.push(Buffer.from([0]));
	        chunks.push(...SubstrateApp.GetChunks(message));
	        return await this.uploadSendChunk(1, chunks.length, chunks[0]).then(async (result) => {
	            if (result.return_code !== 36864 ) {
	                return {
	                    return_code: result.return_code,
	                    error_message: result.error_message,
	                };
	            }
	            for (let i = 1; i < chunks.length; i += 1) {
	                result = await this.uploadSendChunk(1 + i, chunks.length, chunks[i]);
	                if (result.return_code !== 36864 ) {
	                    break;
	                }
	            }
	            return {
	                return_code: result.return_code,
	                error_message: result.error_message,
	            };
	        }, common_1$2.processErrorResponse);
	    }
	}
	substrate_app.SubstrateApp = SubstrateApp;

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.supportedApps = void 0;
		exports.newSubstrateApp = newSubstrateApp;
		exports.getAppParams = getAppParams;
		const substrate_app_1 = substrate_app;
		function newSubstrateApp(transport, chainName) {
		    const requestedApp = exports.supportedApps.find((app) => {
		        return app.name.toLowerCase() === chainName.toLowerCase();
		    });
		    if (requestedApp != null) {
		        return new substrate_app_1.SubstrateApp(transport, requestedApp.cla, requestedApp.slip0044);
		    }
		    throw new Error(`Error: ${chainName} not supported`);
		}
		function getAppParams(chainName) {
		    const params = exports.supportedApps.find((app) => {
		        return app.name.toLowerCase() === chainName.toLowerCase();
		    });
		    return params;
		}
		exports.supportedApps = [
		    {
		        name: 'Polkadot',
		        cla: 0x90,
		        slip0044: 0x80000162,
		        ss58_addr_type: 0,
		    },
		    {
		        name: 'Polymesh',
		        cla: 0x91,
		        slip0044: 0x80000253,
		        ss58_addr_type: 12,
		    },
		    {
		        name: 'Dock',
		        cla: 0x92,
		        slip0044: 0x80000252,
		        ss58_addr_type: 22,
		    },
		    {
		        name: 'Centrifuge',
		        cla: 0x93,
		        slip0044: 0x800002eb,
		        ss58_addr_type: 36,
		    },
		    {
		        name: 'Edgeware',
		        cla: 0x94,
		        slip0044: 0x8000020b,
		        ss58_addr_type: 7,
		    },
		    {
		        name: 'Equilibrium',
		        cla: 0x95,
		        slip0044: 0x85f5e0fd,
		        ss58_addr_type: 67,
		    },
		    {
		        name: 'Statemint',
		        cla: 0x96,
		        slip0044: 0x80000162,
		        ss58_addr_type: 0,
		    },
		    {
		        name: 'Statemine',
		        cla: 0x97,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 2,
		    },
		    {
		        name: 'Nodle',
		        cla: 0x98,
		        slip0044: 0x800003eb,
		        ss58_addr_type: 37,
		    },
		    {
		        name: 'Kusama',
		        cla: 0x99,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 2,
		    },
		    {
		        name: 'Karura',
		        cla: 0x9a,
		        slip0044: 0x800002ae,
		        ss58_addr_type: 8,
		    },
		    {
		        name: 'Acala',
		        cla: 0x9b,
		        slip0044: 0x80000313,
		        ss58_addr_type: 10,
		    },
		    {
		        name: 'VTB',
		        cla: 0x9c,
		        slip0044: 0x800002b6,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Peer',
		        cla: 0x9d,
		        slip0044: 0x800002ce,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Genshiro',
		        cla: 0x9e,
		        slip0044: 0x85f5e0fc,
		        ss58_addr_type: 67,
		    },
		    {
		        name: 'Sora',
		        cla: 0x9f,
		        slip0044: 0x80000269,
		        ss58_addr_type: 69,
		    },
		    {
		        name: 'Polkadex',
		        cla: 0xa0,
		        slip0044: 0x8000031f,
		        ss58_addr_type: 88,
		    },
		    {
		        name: 'Bifrost',
		        cla: 0xa1,
		        slip0044: 0x80000314,
		        ss58_addr_type: 6,
		    },
		    {
		        name: 'Reef',
		        cla: 0xa2,
		        slip0044: 0x80000333,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'XXNetwork',
		        cla: 0xa3,
		        slip0044: 0x800007a3,
		        ss58_addr_type: 55,
		    },
		    {
		        name: 'AlephZero',
		        cla: 0xa4,
		        slip0044: 0x80000283,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Interlay',
		        cla: 0xa5,
		        slip0044: 0x80000162,
		        ss58_addr_type: 2032,
		    },
		    {
		        name: 'Parallel',
		        cla: 0xa6,
		        slip0044: 0x80000162,
		        ss58_addr_type: 172,
		    },
		    {
		        name: 'Picasso',
		        cla: 0xa7,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 49,
		    },
		    {
		        name: 'Composable',
		        cla: 0xa8,
		        slip0044: 0x80000162,
		        ss58_addr_type: 49,
		    },
		    {
		        name: 'Astar',
		        cla: 0xa9,
		        slip0044: 0x8000032a,
		        ss58_addr_type: 5,
		    },
		    {
		        name: 'OriginTrail',
		        cla: 0xaa,
		        slip0044: 0x80000162,
		        ss58_addr_type: 101,
		    },
		    {
		        name: 'HydraDX',
		        cla: 0xab,
		        slip0044: 0x80000162,
		        ss58_addr_type: 63,
		    },
		    {
		        name: 'Stafi',
		        cla: 0xac,
		        slip0044: 0x8000038b,
		        ss58_addr_type: 20,
		    },
		    {
		        name: 'Unique',
		        cla: 0xad,
		        slip0044: 0x80000295,
		        ss58_addr_type: 7391,
		    },
		    {
		        name: 'BifrostKusama',
		        cla: 0xae,
		        slip0044: 0x80000314,
		        ss58_addr_type: 6,
		    },
		    {
		        name: 'Phala',
		        cla: 0xaf,
		        slip0044: 0x80000162,
		        ss58_addr_type: 30,
		    },
		    {
		        name: 'Khala',
		        cla: 0xb1,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 30,
		    },
		    {
		        name: 'Darwinia',
		        cla: 0xb2,
		        slip0044: 0x80000162,
		        ss58_addr_type: 18,
		    },
		    {
		        name: 'Ajuna',
		        cla: 0xb3,
		        slip0044: 0x80000162,
		        ss58_addr_type: 1328,
		    },
		    {
		        name: 'Bittensor',
		        cla: 0xb4,
		        slip0044: 0x800003ed,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Ternoa',
		        cla: 0xb5,
		        slip0044: 0x800003e3,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Pendulum',
		        cla: 0xb6,
		        slip0044: 0x80000162,
		        ss58_addr_type: 56,
		    },
		    {
		        name: 'Zeitgeist',
		        cla: 0xb7,
		        slip0044: 0x80000162,
		        ss58_addr_type: 73,
		    },
		    {
		        name: 'Joystream',
		        cla: 0xb8,
		        slip0044: 0x80000219,
		        ss58_addr_type: 126,
		    },
		    {
		        name: 'Enjin',
		        cla: 0xb9,
		        slip0044: 0x80000483,
		        ss58_addr_type: 2135,
		    },
		    {
		        name: 'Matrixchain',
		        cla: 0xba,
		        slip0044: 0x80000483,
		        ss58_addr_type: 1110,
		    },
		    {
		        name: 'Quartz',
		        cla: 0xbb,
		        slip0044: 0x80000277,
		        ss58_addr_type: 255,
		    },
		    {
		        name: 'Avail',
		        cla: 0xbc,
		        slip0044: 0x800002c5,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Entropy',
		        cla: 0xbd,
		        slip0044: 0x80000520,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'Peaq',
		        cla: 0x61,
		        slip0044: 0x8000003c,
		        ss58_addr_type: 42,
		    },
		    {
		        name: 'AvailRecovery',
		        cla: 0xbe,
		        slip0044: 0x80000162,
		        ss58_addr_type: 42,
		    },
		];
	} (supported_apps));
	getDefaultExportFromCjs(supported_apps);

	Object.defineProperty(legacy_apps, "__esModule", { value: true });
	legacy_apps.newKusamaApp = newKusamaApp;
	legacy_apps.newPolkadotApp = newPolkadotApp;
	legacy_apps.newPolymeshApp = newPolymeshApp;
	legacy_apps.newDockApp = newDockApp;
	legacy_apps.newCentrifugeApp = newCentrifugeApp;
	legacy_apps.newEdgewareApp = newEdgewareApp;
	legacy_apps.newEquilibriumApp = newEquilibriumApp;
	legacy_apps.newGenshiroApp = newGenshiroApp;
	legacy_apps.newStatemintApp = newStatemintApp;
	legacy_apps.newStatemineApp = newStatemineApp;
	legacy_apps.newNodleApp = newNodleApp;
	legacy_apps.newSoraApp = newSoraApp;
	legacy_apps.newPolkadexApp = newPolkadexApp;
	legacy_apps.newBifrostApp = newBifrostApp;
	legacy_apps.newKaruraApp = newKaruraApp;
	legacy_apps.newReefApp = newReefApp;
	legacy_apps.newAcalaApp = newAcalaApp;
	legacy_apps.newXXNetworkApp = newXXNetworkApp;
	legacy_apps.newParallelApp = newParallelApp;
	legacy_apps.newAstarApp = newAstarApp;
	legacy_apps.newComposableApp = newComposableApp;
	legacy_apps.newStafiApp = newStafiApp;
	legacy_apps.newAlephZeroApp = newAlephZeroApp;
	legacy_apps.newInterlayApp = newInterlayApp;
	legacy_apps.newUniqueApp = newUniqueApp;
	legacy_apps.newBifrostKusamaApp = newBifrostKusamaApp;
	const supported_apps_1 = supported_apps;
	function newKusamaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Kusama');
	}
	function newPolkadotApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Polkadot');
	}
	function newPolymeshApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Polymesh');
	}
	function newDockApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Dock');
	}
	function newCentrifugeApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Centrifuge');
	}
	function newEdgewareApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Edgeware');
	}
	function newEquilibriumApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Equilibrium');
	}
	function newGenshiroApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Genshiro');
	}
	function newStatemintApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Statemint');
	}
	function newStatemineApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Statemine');
	}
	function newNodleApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Nodle');
	}
	function newSoraApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Sora');
	}
	function newPolkadexApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Polkadex');
	}
	function newBifrostApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Bifrost');
	}
	function newKaruraApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Karura');
	}
	function newReefApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Reef');
	}
	function newAcalaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Acala');
	}
	function newXXNetworkApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'XXNetwork');
	}
	function newParallelApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Parallel');
	}
	function newAstarApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Astar');
	}
	function newComposableApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Composable');
	}
	function newStafiApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Stafi');
	}
	function newAlephZeroApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'AlephZero');
	}
	function newInterlayApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Interlay');
	}
	function newUniqueApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'Unique');
	}
	function newBifrostKusamaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, 'BifrostKusama');
	}

	var generic_app = {};

	/*! Axios v1.9.0 Copyright (c) 2025 Matt Zabriskie and contributors */

	function bind(fn, thisArg) {
	  return function wrap() {
	    return fn.apply(thisArg, arguments);
	  };
	}

	// utils is a library of generic helper functions non-specific to axios

	const {toString} = Object.prototype;
	const {getPrototypeOf} = Object;
	const {iterator: iterator$1, toStringTag} = Symbol;

	const kindOf = (cache => thing => {
	    const str = toString.call(thing);
	    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
	})(Object.create(null));

	const kindOfTest = (type) => {
	  type = type.toLowerCase();
	  return (thing) => kindOf(thing) === type
	};

	const typeOfTest = type => thing => typeof thing === type;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 *
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	const {isArray} = Array;

	/**
	 * Determine if a value is undefined
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	const isUndefined = typeOfTest('undefined');

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	const isArrayBuffer = kindOfTest('ArrayBuffer');


	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  let result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	const isString = typeOfTest('string');

	/**
	 * Determine if a value is a Function
	 *
	 * @param {*} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	const isFunction = typeOfTest('function');

	/**
	 * Determine if a value is a Number
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	const isNumber = typeOfTest('number');

	/**
	 * Determine if a value is an Object
	 *
	 * @param {*} thing The value to test
	 *
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	const isObject$1 = (thing) => thing !== null && typeof thing === 'object';

	/**
	 * Determine if a value is a Boolean
	 *
	 * @param {*} thing The value to test
	 * @returns {boolean} True if value is a Boolean, otherwise false
	 */
	const isBoolean = thing => thing === true || thing === false;

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a plain Object, otherwise false
	 */
	const isPlainObject = (val) => {
	  if (kindOf(val) !== 'object') {
	    return false;
	  }

	  const prototype = getPrototypeOf(val);
	  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator$1 in val);
	};

	/**
	 * Determine if a value is a Date
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	const isDate = kindOfTest('Date');

	/**
	 * Determine if a value is a File
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	const isFile = kindOfTest('File');

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	const isBlob = kindOfTest('Blob');

	/**
	 * Determine if a value is a FileList
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	const isFileList = kindOfTest('FileList');

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	const isStream = (val) => isObject$1(val) && isFunction(val.pipe);

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {*} thing The value to test
	 *
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	const isFormData = (thing) => {
	  let kind;
	  return thing && (
	    (typeof FormData === 'function' && thing instanceof FormData) || (
	      isFunction(thing.append) && (
	        (kind = kindOf(thing)) === 'formdata' ||
	        // detect form-data instance
	        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
	      )
	    )
	  )
	};

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	const isURLSearchParams = kindOfTest('URLSearchParams');

	const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 *
	 * @returns {String} The String freed of excess whitespace
	 */
	const trim = (str) => str.trim ?
	  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 *
	 * @param {Boolean} [allOwnKeys = false]
	 * @returns {any}
	 */
	function forEach(obj, fn, {allOwnKeys = false} = {}) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  let i;
	  let l;

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
	    const len = keys.length;
	    let key;

	    for (i = 0; i < len; i++) {
	      key = keys[i];
	      fn.call(null, obj[key], key, obj);
	    }
	  }
	}

	function findKey(obj, key) {
	  key = key.toLowerCase();
	  const keys = Object.keys(obj);
	  let i = keys.length;
	  let _key;
	  while (i-- > 0) {
	    _key = keys[i];
	    if (key === _key.toLowerCase()) {
	      return _key;
	    }
	  }
	  return null;
	}

	const _global = (() => {
	  /*eslint no-undef:0*/
	  if (typeof globalThis !== "undefined") return globalThis;
	  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : commonjsGlobal)
	})();

	const isContextDefined = (context) => !isUndefined(context) && context !== _global;

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 *
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  const {caseless} = isContextDefined(this) && this || {};
	  const result = {};
	  const assignValue = (val, key) => {
	    const targetKey = caseless && findKey(result, key) || key;
	    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
	      result[targetKey] = merge(result[targetKey], val);
	    } else if (isPlainObject(val)) {
	      result[targetKey] = merge({}, val);
	    } else if (isArray(val)) {
	      result[targetKey] = val.slice();
	    } else {
	      result[targetKey] = val;
	    }
	  };

	  for (let i = 0, l = arguments.length; i < l; i++) {
	    arguments[i] && forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 *
	 * @param {Boolean} [allOwnKeys]
	 * @returns {Object} The resulting value of object a
	 */
	const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
	  forEach(b, (val, key) => {
	    if (thisArg && isFunction(val)) {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  }, {allOwnKeys});
	  return a;
	};

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 *
	 * @returns {string} content value without BOM
	 */
	const stripBOM = (content) => {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	};

	/**
	 * Inherit the prototype methods from one constructor into another
	 * @param {function} constructor
	 * @param {function} superConstructor
	 * @param {object} [props]
	 * @param {object} [descriptors]
	 *
	 * @returns {void}
	 */
	const inherits = (constructor, superConstructor, props, descriptors) => {
	  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
	  constructor.prototype.constructor = constructor;
	  Object.defineProperty(constructor, 'super', {
	    value: superConstructor.prototype
	  });
	  props && Object.assign(constructor.prototype, props);
	};

	/**
	 * Resolve object with deep prototype chain to a flat object
	 * @param {Object} sourceObj source object
	 * @param {Object} [destObj]
	 * @param {Function|Boolean} [filter]
	 * @param {Function} [propFilter]
	 *
	 * @returns {Object}
	 */
	const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
	  let props;
	  let i;
	  let prop;
	  const merged = {};

	  destObj = destObj || {};
	  // eslint-disable-next-line no-eq-null,eqeqeq
	  if (sourceObj == null) return destObj;

	  do {
	    props = Object.getOwnPropertyNames(sourceObj);
	    i = props.length;
	    while (i-- > 0) {
	      prop = props[i];
	      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
	        destObj[prop] = sourceObj[prop];
	        merged[prop] = true;
	      }
	    }
	    sourceObj = filter !== false && getPrototypeOf(sourceObj);
	  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

	  return destObj;
	};

	/**
	 * Determines whether a string ends with the characters of a specified string
	 *
	 * @param {String} str
	 * @param {String} searchString
	 * @param {Number} [position= 0]
	 *
	 * @returns {boolean}
	 */
	const endsWith = (str, searchString, position) => {
	  str = String(str);
	  if (position === undefined || position > str.length) {
	    position = str.length;
	  }
	  position -= searchString.length;
	  const lastIndex = str.indexOf(searchString, position);
	  return lastIndex !== -1 && lastIndex === position;
	};


	/**
	 * Returns new array from array like object or null if failed
	 *
	 * @param {*} [thing]
	 *
	 * @returns {?Array}
	 */
	const toArray = (thing) => {
	  if (!thing) return null;
	  if (isArray(thing)) return thing;
	  let i = thing.length;
	  if (!isNumber(i)) return null;
	  const arr = new Array(i);
	  while (i-- > 0) {
	    arr[i] = thing[i];
	  }
	  return arr;
	};

	/**
	 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
	 * thing passed in is an instance of Uint8Array
	 *
	 * @param {TypedArray}
	 *
	 * @returns {Array}
	 */
	// eslint-disable-next-line func-names
	const isTypedArray = (TypedArray => {
	  // eslint-disable-next-line func-names
	  return thing => {
	    return TypedArray && thing instanceof TypedArray;
	  };
	})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

	/**
	 * For each entry in the object, call the function with the key and value.
	 *
	 * @param {Object<any, any>} obj - The object to iterate over.
	 * @param {Function} fn - The function to call for each entry.
	 *
	 * @returns {void}
	 */
	const forEachEntry = (obj, fn) => {
	  const generator = obj && obj[iterator$1];

	  const _iterator = generator.call(obj);

	  let result;

	  while ((result = _iterator.next()) && !result.done) {
	    const pair = result.value;
	    fn.call(obj, pair[0], pair[1]);
	  }
	};

	/**
	 * It takes a regular expression and a string, and returns an array of all the matches
	 *
	 * @param {string} regExp - The regular expression to match against.
	 * @param {string} str - The string to search.
	 *
	 * @returns {Array<boolean>}
	 */
	const matchAll = (regExp, str) => {
	  let matches;
	  const arr = [];

	  while ((matches = regExp.exec(str)) !== null) {
	    arr.push(matches);
	  }

	  return arr;
	};

	/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
	const isHTMLForm = kindOfTest('HTMLFormElement');

	const toCamelCase = str => {
	  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
	    function replacer(m, p1, p2) {
	      return p1.toUpperCase() + p2;
	    }
	  );
	};

	/* Creating a function that will check if an object has a property. */
	const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

	/**
	 * Determine if a value is a RegExp object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a RegExp object, otherwise false
	 */
	const isRegExp = kindOfTest('RegExp');

	const reduceDescriptors = (obj, reducer) => {
	  const descriptors = Object.getOwnPropertyDescriptors(obj);
	  const reducedDescriptors = {};

	  forEach(descriptors, (descriptor, name) => {
	    let ret;
	    if ((ret = reducer(descriptor, name, obj)) !== false) {
	      reducedDescriptors[name] = ret || descriptor;
	    }
	  });

	  Object.defineProperties(obj, reducedDescriptors);
	};

	/**
	 * Makes all methods read-only
	 * @param {Object} obj
	 */

	const freezeMethods = (obj) => {
	  reduceDescriptors(obj, (descriptor, name) => {
	    // skip restricted props in strict mode
	    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
	      return false;
	    }

	    const value = obj[name];

	    if (!isFunction(value)) return;

	    descriptor.enumerable = false;

	    if ('writable' in descriptor) {
	      descriptor.writable = false;
	      return;
	    }

	    if (!descriptor.set) {
	      descriptor.set = () => {
	        throw Error('Can not rewrite read-only method \'' + name + '\'');
	      };
	    }
	  });
	};

	const toObjectSet = (arrayOrString, delimiter) => {
	  const obj = {};

	  const define = (arr) => {
	    arr.forEach(value => {
	      obj[value] = true;
	    });
	  };

	  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

	  return obj;
	};

	const noop = () => {};

	const toFiniteNumber = (value, defaultValue) => {
	  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
	};

	/**
	 * If the thing is a FormData object, return true, otherwise return false.
	 *
	 * @param {unknown} thing - The thing to check.
	 *
	 * @returns {boolean}
	 */
	function isSpecCompliantForm(thing) {
	  return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator$1]);
	}

	const toJSONObject = (obj) => {
	  const stack = new Array(10);

	  const visit = (source, i) => {

	    if (isObject$1(source)) {
	      if (stack.indexOf(source) >= 0) {
	        return;
	      }

	      if(!('toJSON' in source)) {
	        stack[i] = source;
	        const target = isArray(source) ? [] : {};

	        forEach(source, (value, key) => {
	          const reducedValue = visit(value, i + 1);
	          !isUndefined(reducedValue) && (target[key] = reducedValue);
	        });

	        stack[i] = undefined;

	        return target;
	      }
	    }

	    return source;
	  };

	  return visit(obj, 0);
	};

	const isAsyncFn = kindOfTest('AsyncFunction');

	const isThenable = (thing) =>
	  thing && (isObject$1(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

	// original code
	// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

	const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
	  if (setImmediateSupported) {
	    return setImmediate;
	  }

	  return postMessageSupported ? ((token, callbacks) => {
	    _global.addEventListener("message", ({source, data}) => {
	      if (source === _global && data === token) {
	        callbacks.length && callbacks.shift()();
	      }
	    }, false);

	    return (cb) => {
	      callbacks.push(cb);
	      _global.postMessage(token, "*");
	    }
	  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
	})(
	  typeof setImmediate === 'function',
	  isFunction(_global.postMessage)
	);

	const asap = typeof queueMicrotask !== 'undefined' ?
	  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

	// *********************


	const isIterable = (thing) => thing != null && isFunction(thing[iterator$1]);


	var utils$1 = {
	  isArray,
	  isArrayBuffer,
	  isBuffer,
	  isFormData,
	  isArrayBufferView,
	  isString,
	  isNumber,
	  isBoolean,
	  isObject: isObject$1,
	  isPlainObject,
	  isReadableStream,
	  isRequest,
	  isResponse,
	  isHeaders,
	  isUndefined,
	  isDate,
	  isFile,
	  isBlob,
	  isRegExp,
	  isFunction,
	  isStream,
	  isURLSearchParams,
	  isTypedArray,
	  isFileList,
	  forEach,
	  merge,
	  extend,
	  trim,
	  stripBOM,
	  inherits,
	  toFlatObject,
	  kindOf,
	  kindOfTest,
	  endsWith,
	  toArray,
	  forEachEntry,
	  matchAll,
	  isHTMLForm,
	  hasOwnProperty,
	  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
	  reduceDescriptors,
	  freezeMethods,
	  toObjectSet,
	  toCamelCase,
	  noop,
	  toFiniteNumber,
	  findKey,
	  global: _global,
	  isContextDefined,
	  isSpecCompliantForm,
	  toJSONObject,
	  isAsyncFn,
	  isThenable,
	  setImmediate: _setImmediate,
	  asap,
	  isIterable
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [config] The config.
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 *
	 * @returns {Error} The created error.
	 */
	function AxiosError(message, code, config, request, response) {
	  Error.call(this);

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    this.stack = (new Error()).stack;
	  }

	  this.message = message;
	  this.name = 'AxiosError';
	  code && (this.code = code);
	  config && (this.config = config);
	  request && (this.request = request);
	  if (response) {
	    this.response = response;
	    this.status = response.status ? response.status : null;
	  }
	}

	utils$1.inherits(AxiosError, Error, {
	  toJSON: function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: utils$1.toJSONObject(this.config),
	      code: this.code,
	      status: this.status
	    };
	  }
	});

	const prototype$1 = AxiosError.prototype;
	const descriptors = {};

	[
	  'ERR_BAD_OPTION_VALUE',
	  'ERR_BAD_OPTION',
	  'ECONNABORTED',
	  'ETIMEDOUT',
	  'ERR_NETWORK',
	  'ERR_FR_TOO_MANY_REDIRECTS',
	  'ERR_DEPRECATED',
	  'ERR_BAD_RESPONSE',
	  'ERR_BAD_REQUEST',
	  'ERR_CANCELED',
	  'ERR_NOT_SUPPORT',
	  'ERR_INVALID_URL'
	// eslint-disable-next-line func-names
	].forEach(code => {
	  descriptors[code] = {value: code};
	});

	Object.defineProperties(AxiosError, descriptors);
	Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

	// eslint-disable-next-line func-names
	AxiosError.from = (error, code, config, request, response, customProps) => {
	  const axiosError = Object.create(prototype$1);

	  utils$1.toFlatObject(error, axiosError, function filter(obj) {
	    return obj !== Error.prototype;
	  }, prop => {
	    return prop !== 'isAxiosError';
	  });

	  AxiosError.call(axiosError, error.message, code, config, request, response);

	  axiosError.cause = error;

	  axiosError.name = error.name;

	  customProps && Object.assign(axiosError, customProps);

	  return axiosError;
	};

	// eslint-disable-next-line strict
	var httpAdapter = null;

	/**
	 * Determines if the given thing is a array or js object.
	 *
	 * @param {string} thing - The object or array to be visited.
	 *
	 * @returns {boolean}
	 */
	function isVisitable(thing) {
	  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
	}

	/**
	 * It removes the brackets from the end of a string
	 *
	 * @param {string} key - The key of the parameter.
	 *
	 * @returns {string} the key without the brackets.
	 */
	function removeBrackets(key) {
	  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
	}

	/**
	 * It takes a path, a key, and a boolean, and returns a string
	 *
	 * @param {string} path - The path to the current key.
	 * @param {string} key - The key of the current object being iterated over.
	 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
	 *
	 * @returns {string} The path to the current key.
	 */
	function renderKey(path, key, dots) {
	  if (!path) return key;
	  return path.concat(key).map(function each(token, i) {
	    // eslint-disable-next-line no-param-reassign
	    token = removeBrackets(token);
	    return !dots && i ? '[' + token + ']' : token;
	  }).join(dots ? '.' : '');
	}

	/**
	 * If the array is an array and none of its elements are visitable, then it's a flat array.
	 *
	 * @param {Array<any>} arr - The array to check
	 *
	 * @returns {boolean}
	 */
	function isFlatArray(arr) {
	  return utils$1.isArray(arr) && !arr.some(isVisitable);
	}

	const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
	  return /^is[A-Z]/.test(prop);
	});

	/**
	 * Convert a data object to FormData
	 *
	 * @param {Object} obj
	 * @param {?Object} [formData]
	 * @param {?Object} [options]
	 * @param {Function} [options.visitor]
	 * @param {Boolean} [options.metaTokens = true]
	 * @param {Boolean} [options.dots = false]
	 * @param {?Boolean} [options.indexes = false]
	 *
	 * @returns {Object}
	 **/

	/**
	 * It converts an object into a FormData object
	 *
	 * @param {Object<any, any>} obj - The object to convert to form data.
	 * @param {string} formData - The FormData object to append to.
	 * @param {Object<string, any>} options
	 *
	 * @returns
	 */
	function toFormData(obj, formData, options) {
	  if (!utils$1.isObject(obj)) {
	    throw new TypeError('target must be an object');
	  }

	  // eslint-disable-next-line no-param-reassign
	  formData = formData || new (FormData)();

	  // eslint-disable-next-line no-param-reassign
	  options = utils$1.toFlatObject(options, {
	    metaTokens: true,
	    dots: false,
	    indexes: false
	  }, false, function defined(option, source) {
	    // eslint-disable-next-line no-eq-null,eqeqeq
	    return !utils$1.isUndefined(source[option]);
	  });

	  const metaTokens = options.metaTokens;
	  // eslint-disable-next-line no-use-before-define
	  const visitor = options.visitor || defaultVisitor;
	  const dots = options.dots;
	  const indexes = options.indexes;
	  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
	  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

	  if (!utils$1.isFunction(visitor)) {
	    throw new TypeError('visitor must be a function');
	  }

	  function convertValue(value) {
	    if (value === null) return '';

	    if (utils$1.isDate(value)) {
	      return value.toISOString();
	    }

	    if (!useBlob && utils$1.isBlob(value)) {
	      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
	    }

	    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
	      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
	    }

	    return value;
	  }

	  /**
	   * Default visitor.
	   *
	   * @param {*} value
	   * @param {String|Number} key
	   * @param {Array<String|Number>} path
	   * @this {FormData}
	   *
	   * @returns {boolean} return true to visit the each prop of the value recursively
	   */
	  function defaultVisitor(value, key, path) {
	    let arr = value;

	    if (value && !path && typeof value === 'object') {
	      if (utils$1.endsWith(key, '{}')) {
	        // eslint-disable-next-line no-param-reassign
	        key = metaTokens ? key : key.slice(0, -2);
	        // eslint-disable-next-line no-param-reassign
	        value = JSON.stringify(value);
	      } else if (
	        (utils$1.isArray(value) && isFlatArray(value)) ||
	        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
	        )) {
	        // eslint-disable-next-line no-param-reassign
	        key = removeBrackets(key);

	        arr.forEach(function each(el, index) {
	          !(utils$1.isUndefined(el) || el === null) && formData.append(
	            // eslint-disable-next-line no-nested-ternary
	            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
	            convertValue(el)
	          );
	        });
	        return false;
	      }
	    }

	    if (isVisitable(value)) {
	      return true;
	    }

	    formData.append(renderKey(path, key, dots), convertValue(value));

	    return false;
	  }

	  const stack = [];

	  const exposedHelpers = Object.assign(predicates, {
	    defaultVisitor,
	    convertValue,
	    isVisitable
	  });

	  function build(value, path) {
	    if (utils$1.isUndefined(value)) return;

	    if (stack.indexOf(value) !== -1) {
	      throw Error('Circular reference detected in ' + path.join('.'));
	    }

	    stack.push(value);

	    utils$1.forEach(value, function each(el, key) {
	      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
	        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
	      );

	      if (result === true) {
	        build(el, path ? path.concat(key) : [key]);
	      }
	    });

	    stack.pop();
	  }

	  if (!utils$1.isObject(obj)) {
	    throw new TypeError('data must be an object');
	  }

	  build(obj);

	  return formData;
	}

	/**
	 * It encodes a string by replacing all characters that are not in the unreserved set with
	 * their percent-encoded equivalents
	 *
	 * @param {string} str - The string to encode.
	 *
	 * @returns {string} The encoded string.
	 */
	function encode$1(str) {
	  const charMap = {
	    '!': '%21',
	    "'": '%27',
	    '(': '%28',
	    ')': '%29',
	    '~': '%7E',
	    '%20': '+',
	    '%00': '\x00'
	  };
	  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
	    return charMap[match];
	  });
	}

	/**
	 * It takes a params object and converts it to a FormData object
	 *
	 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
	 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
	 *
	 * @returns {void}
	 */
	function AxiosURLSearchParams(params, options) {
	  this._pairs = [];

	  params && toFormData(params, this, options);
	}

	const prototype = AxiosURLSearchParams.prototype;

	prototype.append = function append(name, value) {
	  this._pairs.push([name, value]);
	};

	prototype.toString = function toString(encoder) {
	  const _encode = encoder ? function(value) {
	    return encoder.call(this, value, encode$1);
	  } : encode$1;

	  return this._pairs.map(function each(pair) {
	    return _encode(pair[0]) + '=' + _encode(pair[1]);
	  }, '').join('&');
	};

	/**
	 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
	 * URI encoded counterparts
	 *
	 * @param {string} val The value to be encoded.
	 *
	 * @returns {string} The encoded value.
	 */
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @param {?(object|Function)} options
	 *
	 * @returns {string} The formatted url
	 */
	function buildURL(url, params, options) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	  
	  const _encode = options && options.encode || encode;

	  if (utils$1.isFunction(options)) {
	    options = {
	      serialize: options
	    };
	  } 

	  const serializeFn = options && options.serialize;

	  let serializedParams;

	  if (serializeFn) {
	    serializedParams = serializeFn(params, options);
	  } else {
	    serializedParams = utils$1.isURLSearchParams(params) ?
	      params.toString() :
	      new AxiosURLSearchParams(params, options).toString(_encode);
	  }

	  if (serializedParams) {
	    const hashmarkIndex = url.indexOf("#");

	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	}

	class InterceptorManager {
	  constructor() {
	    this.handlers = [];
	  }

	  /**
	   * Add a new interceptor to the stack
	   *
	   * @param {Function} fulfilled The function to handle `then` for a `Promise`
	   * @param {Function} rejected The function to handle `reject` for a `Promise`
	   *
	   * @return {Number} An ID used to remove interceptor later
	   */
	  use(fulfilled, rejected, options) {
	    this.handlers.push({
	      fulfilled,
	      rejected,
	      synchronous: options ? options.synchronous : false,
	      runWhen: options ? options.runWhen : null
	    });
	    return this.handlers.length - 1;
	  }

	  /**
	   * Remove an interceptor from the stack
	   *
	   * @param {Number} id The ID that was returned by `use`
	   *
	   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
	   */
	  eject(id) {
	    if (this.handlers[id]) {
	      this.handlers[id] = null;
	    }
	  }

	  /**
	   * Clear all interceptors from the stack
	   *
	   * @returns {void}
	   */
	  clear() {
	    if (this.handlers) {
	      this.handlers = [];
	    }
	  }

	  /**
	   * Iterate over all the registered interceptors
	   *
	   * This method is particularly useful for skipping over any
	   * interceptors that may have become `null` calling `eject`.
	   *
	   * @param {Function} fn The function to call for each interceptor
	   *
	   * @returns {void}
	   */
	  forEach(fn) {
	    utils$1.forEach(this.handlers, function forEachHandler(h) {
	      if (h !== null) {
	        fn(h);
	      }
	    });
	  }
	}

	var InterceptorManager$1 = InterceptorManager;

	var transitionalDefaults = {
	  silentJSONParsing: true,
	  forcedJSONParsing: true,
	  clarifyTimeoutError: false
	};

	var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

	var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

	var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

	var platform$1 = {
	  isBrowser: true,
	  classes: {
	    URLSearchParams: URLSearchParams$1,
	    FormData: FormData$1,
	    Blob: Blob$1
	  },
	  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
	};

	const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

	const _navigator = typeof navigator === 'object' && navigator || undefined;

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 *
	 * @returns {boolean}
	 */
	const hasStandardBrowserEnv = hasBrowserEnv &&
	  (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

	/**
	 * Determine if we're running in a standard browser webWorker environment
	 *
	 * Although the `isStandardBrowserEnv` method indicates that
	 * `allows axios to run in a web worker`, the WebWorker will still be
	 * filtered out due to its judgment standard
	 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
	 * This leads to a problem when axios post `FormData` in webWorker
	 */
	const hasStandardBrowserWebWorkerEnv = (() => {
	  return (
	    typeof WorkerGlobalScope !== 'undefined' &&
	    // eslint-disable-next-line no-undef
	    self instanceof WorkerGlobalScope &&
	    typeof self.importScripts === 'function'
	  );
	})();

	const origin = hasBrowserEnv && window.location.href || 'http://localhost';

	var utils = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  hasBrowserEnv: hasBrowserEnv,
	  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
	  hasStandardBrowserEnv: hasStandardBrowserEnv,
	  navigator: _navigator,
	  origin: origin
	});

	var platform = {
	  ...utils,
	  ...platform$1
	};

	function toURLEncodedForm(data, options) {
	  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
	    visitor: function(value, key, path, helpers) {
	      if (platform.isNode && utils$1.isBuffer(value)) {
	        this.append(key, value.toString('base64'));
	        return false;
	      }

	      return helpers.defaultVisitor.apply(this, arguments);
	    }
	  }, options));
	}

	/**
	 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
	 *
	 * @param {string} name - The name of the property to get.
	 *
	 * @returns An array of strings.
	 */
	function parsePropPath(name) {
	  // foo[x][y][z]
	  // foo.x.y.z
	  // foo-x-y-z
	  // foo x y z
	  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
	    return match[0] === '[]' ? '' : match[1] || match[0];
	  });
	}

	/**
	 * Convert an array to an object.
	 *
	 * @param {Array<any>} arr - The array to convert to an object.
	 *
	 * @returns An object with the same keys and values as the array.
	 */
	function arrayToObject(arr) {
	  const obj = {};
	  const keys = Object.keys(arr);
	  let i;
	  const len = keys.length;
	  let key;
	  for (i = 0; i < len; i++) {
	    key = keys[i];
	    obj[key] = arr[key];
	  }
	  return obj;
	}

	/**
	 * It takes a FormData object and returns a JavaScript object
	 *
	 * @param {string} formData The FormData object to convert to JSON.
	 *
	 * @returns {Object<string, any> | null} The converted object.
	 */
	function formDataToJSON(formData) {
	  function buildPath(path, value, target, index) {
	    let name = path[index++];

	    if (name === '__proto__') return true;

	    const isNumericKey = Number.isFinite(+name);
	    const isLast = index >= path.length;
	    name = !name && utils$1.isArray(target) ? target.length : name;

	    if (isLast) {
	      if (utils$1.hasOwnProp(target, name)) {
	        target[name] = [target[name], value];
	      } else {
	        target[name] = value;
	      }

	      return !isNumericKey;
	    }

	    if (!target[name] || !utils$1.isObject(target[name])) {
	      target[name] = [];
	    }

	    const result = buildPath(path, value, target[name], index);

	    if (result && utils$1.isArray(target[name])) {
	      target[name] = arrayToObject(target[name]);
	    }

	    return !isNumericKey;
	  }

	  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
	    const obj = {};

	    utils$1.forEachEntry(formData, (name, value) => {
	      buildPath(parsePropPath(name), value, obj, 0);
	    });

	    return obj;
	  }

	  return null;
	}

	/**
	 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
	 * of the input
	 *
	 * @param {any} rawValue - The value to be stringified.
	 * @param {Function} parser - A function that parses a string into a JavaScript object.
	 * @param {Function} encoder - A function that takes a value and returns a string.
	 *
	 * @returns {string} A stringified version of the rawValue.
	 */
	function stringifySafely(rawValue, parser, encoder) {
	  if (utils$1.isString(rawValue)) {
	    try {
	      (parser || JSON.parse)(rawValue);
	      return utils$1.trim(rawValue);
	    } catch (e) {
	      if (e.name !== 'SyntaxError') {
	        throw e;
	      }
	    }
	  }

	  return (encoder || JSON.stringify)(rawValue);
	}

	const defaults = {

	  transitional: transitionalDefaults,

	  adapter: ['xhr', 'http', 'fetch'],

	  transformRequest: [function transformRequest(data, headers) {
	    const contentType = headers.getContentType() || '';
	    const hasJSONContentType = contentType.indexOf('application/json') > -1;
	    const isObjectPayload = utils$1.isObject(data);

	    if (isObjectPayload && utils$1.isHTMLForm(data)) {
	      data = new FormData(data);
	    }

	    const isFormData = utils$1.isFormData(data);

	    if (isFormData) {
	      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
	    }

	    if (utils$1.isArrayBuffer(data) ||
	      utils$1.isBuffer(data) ||
	      utils$1.isStream(data) ||
	      utils$1.isFile(data) ||
	      utils$1.isBlob(data) ||
	      utils$1.isReadableStream(data)
	    ) {
	      return data;
	    }
	    if (utils$1.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils$1.isURLSearchParams(data)) {
	      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
	      return data.toString();
	    }

	    let isFileList;

	    if (isObjectPayload) {
	      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
	        return toURLEncodedForm(data, this.formSerializer).toString();
	      }

	      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
	        const _FormData = this.env && this.env.FormData;

	        return toFormData(
	          isFileList ? {'files[]': data} : data,
	          _FormData && new _FormData(),
	          this.formSerializer
	        );
	      }
	    }

	    if (isObjectPayload || hasJSONContentType ) {
	      headers.setContentType('application/json', false);
	      return stringifySafely(data);
	    }

	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    const transitional = this.transitional || defaults.transitional;
	    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
	    const JSONRequested = this.responseType === 'json';

	    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
	      return data;
	    }

	    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
	      const silentJSONParsing = transitional && transitional.silentJSONParsing;
	      const strictJSONParsing = !silentJSONParsing && JSONRequested;

	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        if (strictJSONParsing) {
	          if (e.name === 'SyntaxError') {
	            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
	          }
	          throw e;
	        }
	      }
	    }

	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,
	  maxBodyLength: -1,

	  env: {
	    FormData: platform.classes.FormData,
	    Blob: platform.classes.Blob
	  },

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  },

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*',
	      'Content-Type': undefined
	    }
	  }
	};

	utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
	  defaults.headers[method] = {};
	});

	var defaults$1 = defaults;

	// RawAxiosHeaders whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	const ignoreDuplicateOf = utils$1.toObjectSet([
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	]);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} rawHeaders Headers needing to be parsed
	 *
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = rawHeaders => {
	  const parsed = {};
	  let key;
	  let val;
	  let i;

	  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
	    i = line.indexOf(':');
	    key = line.substring(0, i).trim().toLowerCase();
	    val = line.substring(i + 1).trim();

	    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
	      return;
	    }

	    if (key === 'set-cookie') {
	      if (parsed[key]) {
	        parsed[key].push(val);
	      } else {
	        parsed[key] = [val];
	      }
	    } else {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};

	const $internals = Symbol('internals');

	function normalizeHeader(header) {
	  return header && String(header).trim().toLowerCase();
	}

	function normalizeValue(value) {
	  if (value === false || value == null) {
	    return value;
	  }

	  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
	}

	function parseTokens(str) {
	  const tokens = Object.create(null);
	  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	  let match;

	  while ((match = tokensRE.exec(str))) {
	    tokens[match[1]] = match[2];
	  }

	  return tokens;
	}

	const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

	function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	  if (utils$1.isFunction(filter)) {
	    return filter.call(this, value, header);
	  }

	  if (isHeaderNameFilter) {
	    value = header;
	  }

	  if (!utils$1.isString(value)) return;

	  if (utils$1.isString(filter)) {
	    return value.indexOf(filter) !== -1;
	  }

	  if (utils$1.isRegExp(filter)) {
	    return filter.test(value);
	  }
	}

	function formatHeader(header) {
	  return header.trim()
	    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
	      return char.toUpperCase() + str;
	    });
	}

	function buildAccessors(obj, header) {
	  const accessorName = utils$1.toCamelCase(' ' + header);

	  ['get', 'set', 'has'].forEach(methodName => {
	    Object.defineProperty(obj, methodName + accessorName, {
	      value: function(arg1, arg2, arg3) {
	        return this[methodName].call(this, header, arg1, arg2, arg3);
	      },
	      configurable: true
	    });
	  });
	}

	class AxiosHeaders {
	  constructor(headers) {
	    headers && this.set(headers);
	  }

	  set(header, valueOrRewrite, rewrite) {
	    const self = this;

	    function setHeader(_value, _header, _rewrite) {
	      const lHeader = normalizeHeader(_header);

	      if (!lHeader) {
	        throw new Error('header name must be a non-empty string');
	      }

	      const key = utils$1.findKey(self, lHeader);

	      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
	        self[key || _header] = normalizeValue(_value);
	      }
	    }

	    const setHeaders = (headers, _rewrite) =>
	      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

	    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
	      setHeaders(header, valueOrRewrite);
	    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
	      setHeaders(parseHeaders(header), valueOrRewrite);
	    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
	      let obj = {}, dest, key;
	      for (const entry of header) {
	        if (!utils$1.isArray(entry)) {
	          throw TypeError('Object iterator must return a key-value pair');
	        }

	        obj[key = entry[0]] = (dest = obj[key]) ?
	          (utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]]) : entry[1];
	      }

	      setHeaders(obj, valueOrRewrite);
	    } else {
	      header != null && setHeader(valueOrRewrite, header, rewrite);
	    }

	    return this;
	  }

	  get(header, parser) {
	    header = normalizeHeader(header);

	    if (header) {
	      const key = utils$1.findKey(this, header);

	      if (key) {
	        const value = this[key];

	        if (!parser) {
	          return value;
	        }

	        if (parser === true) {
	          return parseTokens(value);
	        }

	        if (utils$1.isFunction(parser)) {
	          return parser.call(this, value, key);
	        }

	        if (utils$1.isRegExp(parser)) {
	          return parser.exec(value);
	        }

	        throw new TypeError('parser must be boolean|regexp|function');
	      }
	    }
	  }

	  has(header, matcher) {
	    header = normalizeHeader(header);

	    if (header) {
	      const key = utils$1.findKey(this, header);

	      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
	    }

	    return false;
	  }

	  delete(header, matcher) {
	    const self = this;
	    let deleted = false;

	    function deleteHeader(_header) {
	      _header = normalizeHeader(_header);

	      if (_header) {
	        const key = utils$1.findKey(self, _header);

	        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
	          delete self[key];

	          deleted = true;
	        }
	      }
	    }

	    if (utils$1.isArray(header)) {
	      header.forEach(deleteHeader);
	    } else {
	      deleteHeader(header);
	    }

	    return deleted;
	  }

	  clear(matcher) {
	    const keys = Object.keys(this);
	    let i = keys.length;
	    let deleted = false;

	    while (i--) {
	      const key = keys[i];
	      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
	        delete this[key];
	        deleted = true;
	      }
	    }

	    return deleted;
	  }

	  normalize(format) {
	    const self = this;
	    const headers = {};

	    utils$1.forEach(this, (value, header) => {
	      const key = utils$1.findKey(headers, header);

	      if (key) {
	        self[key] = normalizeValue(value);
	        delete self[header];
	        return;
	      }

	      const normalized = format ? formatHeader(header) : String(header).trim();

	      if (normalized !== header) {
	        delete self[header];
	      }

	      self[normalized] = normalizeValue(value);

	      headers[normalized] = true;
	    });

	    return this;
	  }

	  concat(...targets) {
	    return this.constructor.concat(this, ...targets);
	  }

	  toJSON(asStrings) {
	    const obj = Object.create(null);

	    utils$1.forEach(this, (value, header) => {
	      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
	    });

	    return obj;
	  }

	  [Symbol.iterator]() {
	    return Object.entries(this.toJSON())[Symbol.iterator]();
	  }

	  toString() {
	    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
	  }

	  getSetCookie() {
	    return this.get("set-cookie") || [];
	  }

	  get [Symbol.toStringTag]() {
	    return 'AxiosHeaders';
	  }

	  static from(thing) {
	    return thing instanceof this ? thing : new this(thing);
	  }

	  static concat(first, ...targets) {
	    const computed = new this(first);

	    targets.forEach((target) => computed.set(target));

	    return computed;
	  }

	  static accessor(header) {
	    const internals = this[$internals] = (this[$internals] = {
	      accessors: {}
	    });

	    const accessors = internals.accessors;
	    const prototype = this.prototype;

	    function defineAccessor(_header) {
	      const lHeader = normalizeHeader(_header);

	      if (!accessors[lHeader]) {
	        buildAccessors(prototype, _header);
	        accessors[lHeader] = true;
	      }
	    }

	    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

	    return this;
	  }
	}

	AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

	// reserved names hotfix
	utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
	  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
	  return {
	    get: () => value,
	    set(headerValue) {
	      this[mapped] = headerValue;
	    }
	  }
	});

	utils$1.freezeMethods(AxiosHeaders);

	var AxiosHeaders$1 = AxiosHeaders;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Array|Function} fns A single function or Array of functions
	 * @param {?Object} response The response object
	 *
	 * @returns {*} The resulting transformed data
	 */
	function transformData(fns, response) {
	  const config = this || defaults$1;
	  const context = response || config;
	  const headers = AxiosHeaders$1.from(context.headers);
	  let data = context.data;

	  utils$1.forEach(fns, function transform(fn) {
	    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
	  });

	  headers.normalize();

	  return data;
	}

	function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	}

	/**
	 * A `CanceledError` is an object that is thrown when an operation is canceled.
	 *
	 * @param {string=} message The message.
	 * @param {Object=} config The config.
	 * @param {Object=} request The request.
	 *
	 * @returns {CanceledError} The created error.
	 */
	function CanceledError(message, config, request) {
	  // eslint-disable-next-line no-eq-null,eqeqeq
	  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
	  this.name = 'CanceledError';
	}

	utils$1.inherits(CanceledError, AxiosError, {
	  __CANCEL__: true
	});

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 *
	 * @returns {object} The response.
	 */
	function settle(resolve, reject, response) {
	  const validateStatus = response.config.validateStatus;
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(new AxiosError(
	      'Request failed with status code ' + response.status,
	      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
	      response.config,
	      response.request,
	      response
	    ));
	  }
	}

	function parseProtocol(url) {
	  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
	  return match && match[1] || '';
	}

	/**
	 * Calculate data maxRate
	 * @param {Number} [samplesCount= 10]
	 * @param {Number} [min= 1000]
	 * @returns {Function}
	 */
	function speedometer(samplesCount, min) {
	  samplesCount = samplesCount || 10;
	  const bytes = new Array(samplesCount);
	  const timestamps = new Array(samplesCount);
	  let head = 0;
	  let tail = 0;
	  let firstSampleTS;

	  min = min !== undefined ? min : 1000;

	  return function push(chunkLength) {
	    const now = Date.now();

	    const startedAt = timestamps[tail];

	    if (!firstSampleTS) {
	      firstSampleTS = now;
	    }

	    bytes[head] = chunkLength;
	    timestamps[head] = now;

	    let i = tail;
	    let bytesCount = 0;

	    while (i !== head) {
	      bytesCount += bytes[i++];
	      i = i % samplesCount;
	    }

	    head = (head + 1) % samplesCount;

	    if (head === tail) {
	      tail = (tail + 1) % samplesCount;
	    }

	    if (now - firstSampleTS < min) {
	      return;
	    }

	    const passed = startedAt && now - startedAt;

	    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
	  };
	}

	/**
	 * Throttle decorator
	 * @param {Function} fn
	 * @param {Number} freq
	 * @return {Function}
	 */
	function throttle(fn, freq) {
	  let timestamp = 0;
	  let threshold = 1000 / freq;
	  let lastArgs;
	  let timer;

	  const invoke = (args, now = Date.now()) => {
	    timestamp = now;
	    lastArgs = null;
	    if (timer) {
	      clearTimeout(timer);
	      timer = null;
	    }
	    fn.apply(null, args);
	  };

	  const throttled = (...args) => {
	    const now = Date.now();
	    const passed = now - timestamp;
	    if ( passed >= threshold) {
	      invoke(args, now);
	    } else {
	      lastArgs = args;
	      if (!timer) {
	        timer = setTimeout(() => {
	          timer = null;
	          invoke(lastArgs);
	        }, threshold - passed);
	      }
	    }
	  };

	  const flush = () => lastArgs && invoke(lastArgs);

	  return [throttled, flush];
	}

	const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
	  let bytesNotified = 0;
	  const _speedometer = speedometer(50, 250);

	  return throttle(e => {
	    const loaded = e.loaded;
	    const total = e.lengthComputable ? e.total : undefined;
	    const progressBytes = loaded - bytesNotified;
	    const rate = _speedometer(progressBytes);
	    const inRange = loaded <= total;

	    bytesNotified = loaded;

	    const data = {
	      loaded,
	      total,
	      progress: total ? (loaded / total) : undefined,
	      bytes: progressBytes,
	      rate: rate ? rate : undefined,
	      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
	      event: e,
	      lengthComputable: total != null,
	      [isDownloadStream ? 'download' : 'upload']: true
	    };

	    listener(data);
	  }, freq);
	};

	const progressEventDecorator = (total, throttled) => {
	  const lengthComputable = total != null;

	  return [(loaded) => throttled[0]({
	    lengthComputable,
	    total,
	    loaded
	  }), throttled[1]];
	};

	const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

	var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
	  url = new URL(url, platform.origin);

	  return (
	    origin.protocol === url.protocol &&
	    origin.host === url.host &&
	    (isMSIE || origin.port === url.port)
	  );
	})(
	  new URL(platform.origin),
	  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
	) : () => true;

	var cookies = platform.hasStandardBrowserEnv ?

	  // Standard browser envs support document.cookie
	  {
	    write(name, value, expires, path, domain, secure) {
	      const cookie = [name + '=' + encodeURIComponent(value)];

	      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

	      utils$1.isString(path) && cookie.push('path=' + path);

	      utils$1.isString(domain) && cookie.push('domain=' + domain);

	      secure === true && cookie.push('secure');

	      document.cookie = cookie.join('; ');
	    },

	    read(name) {
	      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	      return (match ? decodeURIComponent(match[3]) : null);
	    },

	    remove(name) {
	      this.write(name, '', Date.now() - 86400000);
	    }
	  }

	  :

	  // Non-standard browser env (web workers, react-native) lack needed support.
	  {
	    write() {},
	    read() {
	      return null;
	    },
	    remove() {}
	  };

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 *
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
	}

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 *
	 * @returns {string} The combined URL
	 */
	function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	}

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 *
	 * @returns {string} The combined full path
	 */
	function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
	  let isRelativeUrl = !isAbsoluteURL(requestedURL);
	  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
	    return combineURLs(baseURL, requestedURL);
	  }
	  return requestedURL;
	}

	const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 *
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  const config = {};

	  function getMergedValue(target, source, prop, caseless) {
	    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
	      return utils$1.merge.call({caseless}, target, source);
	    } else if (utils$1.isPlainObject(source)) {
	      return utils$1.merge({}, source);
	    } else if (utils$1.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDeepProperties(a, b, prop , caseless) {
	    if (!utils$1.isUndefined(b)) {
	      return getMergedValue(a, b, prop , caseless);
	    } else if (!utils$1.isUndefined(a)) {
	      return getMergedValue(undefined, a, prop , caseless);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function valueFromConfig2(a, b) {
	    if (!utils$1.isUndefined(b)) {
	      return getMergedValue(undefined, b);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function defaultToConfig2(a, b) {
	    if (!utils$1.isUndefined(b)) {
	      return getMergedValue(undefined, b);
	    } else if (!utils$1.isUndefined(a)) {
	      return getMergedValue(undefined, a);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDirectKeys(a, b, prop) {
	    if (prop in config2) {
	      return getMergedValue(a, b);
	    } else if (prop in config1) {
	      return getMergedValue(undefined, a);
	    }
	  }

	  const mergeMap = {
	    url: valueFromConfig2,
	    method: valueFromConfig2,
	    data: valueFromConfig2,
	    baseURL: defaultToConfig2,
	    transformRequest: defaultToConfig2,
	    transformResponse: defaultToConfig2,
	    paramsSerializer: defaultToConfig2,
	    timeout: defaultToConfig2,
	    timeoutMessage: defaultToConfig2,
	    withCredentials: defaultToConfig2,
	    withXSRFToken: defaultToConfig2,
	    adapter: defaultToConfig2,
	    responseType: defaultToConfig2,
	    xsrfCookieName: defaultToConfig2,
	    xsrfHeaderName: defaultToConfig2,
	    onUploadProgress: defaultToConfig2,
	    onDownloadProgress: defaultToConfig2,
	    decompress: defaultToConfig2,
	    maxContentLength: defaultToConfig2,
	    maxBodyLength: defaultToConfig2,
	    beforeRedirect: defaultToConfig2,
	    transport: defaultToConfig2,
	    httpAgent: defaultToConfig2,
	    httpsAgent: defaultToConfig2,
	    cancelToken: defaultToConfig2,
	    socketPath: defaultToConfig2,
	    responseEncoding: defaultToConfig2,
	    validateStatus: mergeDirectKeys,
	    headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
	  };

	  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
	    const merge = mergeMap[prop] || mergeDeepProperties;
	    const configValue = merge(config1[prop], config2[prop], prop);
	    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
	  });

	  return config;
	}

	var resolveConfig = (config) => {
	  const newConfig = mergeConfig({}, config);

	  let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

	  newConfig.headers = headers = AxiosHeaders$1.from(headers);

	  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

	  // HTTP basic authentication
	  if (auth) {
	    headers.set('Authorization', 'Basic ' +
	      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
	    );
	  }

	  let contentType;

	  if (utils$1.isFormData(data)) {
	    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
	      headers.setContentType(undefined); // Let the browser set it
	    } else if ((contentType = headers.getContentType()) !== false) {
	      // fix semicolon duplication issue for ReactNative FormData implementation
	      const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
	      headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
	    }
	  }

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.

	  if (platform.hasStandardBrowserEnv) {
	    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

	    if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
	      // Add xsrf header
	      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

	      if (xsrfValue) {
	        headers.set(xsrfHeaderName, xsrfValue);
	      }
	    }
	  }

	  return newConfig;
	};

	const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

	var xhrAdapter = isXHRAdapterSupported && function (config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    const _config = resolveConfig(config);
	    let requestData = _config.data;
	    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
	    let {responseType, onUploadProgress, onDownloadProgress} = _config;
	    let onCanceled;
	    let uploadThrottled, downloadThrottled;
	    let flushUpload, flushDownload;

	    function done() {
	      flushUpload && flushUpload(); // flush events
	      flushDownload && flushDownload(); // flush events

	      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

	      _config.signal && _config.signal.removeEventListener('abort', onCanceled);
	    }

	    let request = new XMLHttpRequest();

	    request.open(_config.method.toUpperCase(), _config.url, true);

	    // Set the request timeout in MS
	    request.timeout = _config.timeout;

	    function onloadend() {
	      if (!request) {
	        return;
	      }
	      // Prepare the response
	      const responseHeaders = AxiosHeaders$1.from(
	        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
	      );
	      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
	        request.responseText : request.response;
	      const response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config,
	        request
	      };

	      settle(function _resolve(value) {
	        resolve(value);
	        done();
	      }, function _reject(err) {
	        reject(err);
	        done();
	      }, response);

	      // Clean up request
	      request = null;
	    }

	    if ('onloadend' in request) {
	      // Use onloadend if available
	      request.onloadend = onloadend;
	    } else {
	      // Listen for ready state to emulate onloadend
	      request.onreadystatechange = function handleLoad() {
	        if (!request || request.readyState !== 4) {
	          return;
	        }

	        // The request errored out and we didn't get a response, this will be
	        // handled by onerror instead
	        // With one exception: request that using file: protocol, most browsers
	        // will return status as 0 even though it's a successful request
	        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	          return;
	        }
	        // readystate handler is calling before onerror or ontimeout handlers,
	        // so we should call onloadend on the next 'tick'
	        setTimeout(onloadend);
	      };
	    }

	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }

	      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
	      const transitional = _config.transitional || transitionalDefaults;
	      if (_config.timeoutErrorMessage) {
	        timeoutErrorMessage = _config.timeoutErrorMessage;
	      }
	      reject(new AxiosError(
	        timeoutErrorMessage,
	        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
	        config,
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Remove Content-Type if data is undefined
	    requestData === undefined && requestHeaders.setContentType(null);

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
	        request.setRequestHeader(key, val);
	      });
	    }

	    // Add withCredentials to request if needed
	    if (!utils$1.isUndefined(_config.withCredentials)) {
	      request.withCredentials = !!_config.withCredentials;
	    }

	    // Add responseType to request if needed
	    if (responseType && responseType !== 'json') {
	      request.responseType = _config.responseType;
	    }

	    // Handle progress if needed
	    if (onDownloadProgress) {
	      ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
	      request.addEventListener('progress', downloadThrottled);
	    }

	    // Not all browsers support upload events
	    if (onUploadProgress && request.upload) {
	      ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

	      request.upload.addEventListener('progress', uploadThrottled);

	      request.upload.addEventListener('loadend', flushUpload);
	    }

	    if (_config.cancelToken || _config.signal) {
	      // Handle cancellation
	      // eslint-disable-next-line func-names
	      onCanceled = cancel => {
	        if (!request) {
	          return;
	        }
	        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
	        request.abort();
	        request = null;
	      };

	      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
	      if (_config.signal) {
	        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
	      }
	    }

	    const protocol = parseProtocol(_config.url);

	    if (protocol && platform.protocols.indexOf(protocol) === -1) {
	      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
	      return;
	    }


	    // Send the request
	    request.send(requestData || null);
	  });
	};

	const composeSignals = (signals, timeout) => {
	  const {length} = (signals = signals ? signals.filter(Boolean) : []);

	  if (timeout || length) {
	    let controller = new AbortController();

	    let aborted;

	    const onabort = function (reason) {
	      if (!aborted) {
	        aborted = true;
	        unsubscribe();
	        const err = reason instanceof Error ? reason : this.reason;
	        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
	      }
	    };

	    let timer = timeout && setTimeout(() => {
	      timer = null;
	      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
	    }, timeout);

	    const unsubscribe = () => {
	      if (signals) {
	        timer && clearTimeout(timer);
	        timer = null;
	        signals.forEach(signal => {
	          signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
	        });
	        signals = null;
	      }
	    };

	    signals.forEach((signal) => signal.addEventListener('abort', onabort));

	    const {signal} = controller;

	    signal.unsubscribe = () => utils$1.asap(unsubscribe);

	    return signal;
	  }
	};

	var composeSignals$1 = composeSignals;

	const streamChunk = function* (chunk, chunkSize) {
	  let len = chunk.byteLength;

	  if (!chunkSize || len < chunkSize) {
	    yield chunk;
	    return;
	  }

	  let pos = 0;
	  let end;

	  while (pos < len) {
	    end = pos + chunkSize;
	    yield chunk.slice(pos, end);
	    pos = end;
	  }
	};

	const readBytes = async function* (iterable, chunkSize) {
	  for await (const chunk of readStream(iterable)) {
	    yield* streamChunk(chunk, chunkSize);
	  }
	};

	const readStream = async function* (stream) {
	  if (stream[Symbol.asyncIterator]) {
	    yield* stream;
	    return;
	  }

	  const reader = stream.getReader();
	  try {
	    for (;;) {
	      const {done, value} = await reader.read();
	      if (done) {
	        break;
	      }
	      yield value;
	    }
	  } finally {
	    await reader.cancel();
	  }
	};

	const trackStream = (stream, chunkSize, onProgress, onFinish) => {
	  const iterator = readBytes(stream, chunkSize);

	  let bytes = 0;
	  let done;
	  let _onFinish = (e) => {
	    if (!done) {
	      done = true;
	      onFinish && onFinish(e);
	    }
	  };

	  return new ReadableStream({
	    async pull(controller) {
	      try {
	        const {done, value} = await iterator.next();

	        if (done) {
	         _onFinish();
	          controller.close();
	          return;
	        }

	        let len = value.byteLength;
	        if (onProgress) {
	          let loadedBytes = bytes += len;
	          onProgress(loadedBytes);
	        }
	        controller.enqueue(new Uint8Array(value));
	      } catch (err) {
	        _onFinish(err);
	        throw err;
	      }
	    },
	    cancel(reason) {
	      _onFinish(reason);
	      return iterator.return();
	    }
	  }, {
	    highWaterMark: 2
	  })
	};

	const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
	const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

	// used only inside the fetch adapter
	const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
	    ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
	    async (str) => new Uint8Array(await new Response(str).arrayBuffer())
	);

	const test = (fn, ...args) => {
	  try {
	    return !!fn(...args);
	  } catch (e) {
	    return false
	  }
	};

	const supportsRequestStream = isReadableStreamSupported && test(() => {
	  let duplexAccessed = false;

	  const hasContentType = new Request(platform.origin, {
	    body: new ReadableStream(),
	    method: 'POST',
	    get duplex() {
	      duplexAccessed = true;
	      return 'half';
	    },
	  }).headers.has('Content-Type');

	  return duplexAccessed && !hasContentType;
	});

	const DEFAULT_CHUNK_SIZE = 64 * 1024;

	const supportsResponseStream = isReadableStreamSupported &&
	  test(() => utils$1.isReadableStream(new Response('').body));


	const resolvers = {
	  stream: supportsResponseStream && ((res) => res.body)
	};

	isFetchSupported && (((res) => {
	  ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
	    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
	      (_, config) => {
	        throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
	      });
	  });
	})(new Response));

	const getBodyLength = async (body) => {
	  if (body == null) {
	    return 0;
	  }

	  if(utils$1.isBlob(body)) {
	    return body.size;
	  }

	  if(utils$1.isSpecCompliantForm(body)) {
	    const _request = new Request(platform.origin, {
	      method: 'POST',
	      body,
	    });
	    return (await _request.arrayBuffer()).byteLength;
	  }

	  if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
	    return body.byteLength;
	  }

	  if(utils$1.isURLSearchParams(body)) {
	    body = body + '';
	  }

	  if(utils$1.isString(body)) {
	    return (await encodeText(body)).byteLength;
	  }
	};

	const resolveBodyLength = async (headers, body) => {
	  const length = utils$1.toFiniteNumber(headers.getContentLength());

	  return length == null ? getBodyLength(body) : length;
	};

	var fetchAdapter = isFetchSupported && (async (config) => {
	  let {
	    url,
	    method,
	    data,
	    signal,
	    cancelToken,
	    timeout,
	    onDownloadProgress,
	    onUploadProgress,
	    responseType,
	    headers,
	    withCredentials = 'same-origin',
	    fetchOptions
	  } = resolveConfig(config);

	  responseType = responseType ? (responseType + '').toLowerCase() : 'text';

	  let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

	  let request;

	  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
	      composedSignal.unsubscribe();
	  });

	  let requestContentLength;

	  try {
	    if (
	      onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
	      (requestContentLength = await resolveBodyLength(headers, data)) !== 0
	    ) {
	      let _request = new Request(url, {
	        method: 'POST',
	        body: data,
	        duplex: "half"
	      });

	      let contentTypeHeader;

	      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
	        headers.setContentType(contentTypeHeader);
	      }

	      if (_request.body) {
	        const [onProgress, flush] = progressEventDecorator(
	          requestContentLength,
	          progressEventReducer(asyncDecorator(onUploadProgress))
	        );

	        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
	      }
	    }

	    if (!utils$1.isString(withCredentials)) {
	      withCredentials = withCredentials ? 'include' : 'omit';
	    }

	    // Cloudflare Workers throws when credentials are defined
	    // see https://github.com/cloudflare/workerd/issues/902
	    const isCredentialsSupported = "credentials" in Request.prototype;
	    request = new Request(url, {
	      ...fetchOptions,
	      signal: composedSignal,
	      method: method.toUpperCase(),
	      headers: headers.normalize().toJSON(),
	      body: data,
	      duplex: "half",
	      credentials: isCredentialsSupported ? withCredentials : undefined
	    });

	    let response = await fetch(request);

	    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

	    if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
	      const options = {};

	      ['status', 'statusText', 'headers'].forEach(prop => {
	        options[prop] = response[prop];
	      });

	      const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

	      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
	        responseContentLength,
	        progressEventReducer(asyncDecorator(onDownloadProgress), true)
	      ) || [];

	      response = new Response(
	        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
	          flush && flush();
	          unsubscribe && unsubscribe();
	        }),
	        options
	      );
	    }

	    responseType = responseType || 'text';

	    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

	    !isStreamResponse && unsubscribe && unsubscribe();

	    return await new Promise((resolve, reject) => {
	      settle(resolve, reject, {
	        data: responseData,
	        headers: AxiosHeaders$1.from(response.headers),
	        status: response.status,
	        statusText: response.statusText,
	        config,
	        request
	      });
	    })
	  } catch (err) {
	    unsubscribe && unsubscribe();

	    if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
	      throw Object.assign(
	        new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request),
	        {
	          cause: err.cause || err
	        }
	      )
	    }

	    throw AxiosError.from(err, err && err.code, config, request);
	  }
	});

	const knownAdapters = {
	  http: httpAdapter,
	  xhr: xhrAdapter,
	  fetch: fetchAdapter
	};

	utils$1.forEach(knownAdapters, (fn, value) => {
	  if (fn) {
	    try {
	      Object.defineProperty(fn, 'name', {value});
	    } catch (e) {
	      // eslint-disable-next-line no-empty
	    }
	    Object.defineProperty(fn, 'adapterName', {value});
	  }
	});

	const renderReason = (reason) => `- ${reason}`;

	const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

	var adapters = {
	  getAdapter: (adapters) => {
	    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

	    const {length} = adapters;
	    let nameOrAdapter;
	    let adapter;

	    const rejectedReasons = {};

	    for (let i = 0; i < length; i++) {
	      nameOrAdapter = adapters[i];
	      let id;

	      adapter = nameOrAdapter;

	      if (!isResolvedHandle(nameOrAdapter)) {
	        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

	        if (adapter === undefined) {
	          throw new AxiosError(`Unknown adapter '${id}'`);
	        }
	      }

	      if (adapter) {
	        break;
	      }

	      rejectedReasons[id || '#' + i] = adapter;
	    }

	    if (!adapter) {

	      const reasons = Object.entries(rejectedReasons)
	        .map(([id, state]) => `adapter ${id} ` +
	          (state === false ? 'is not supported by the environment' : 'is not available in the build')
	        );

	      let s = length ?
	        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
	        'as no adapter specified';

	      throw new AxiosError(
	        `There is no suitable adapter to dispatch the request ` + s,
	        'ERR_NOT_SUPPORT'
	      );
	    }

	    return adapter;
	  },
	  adapters: knownAdapters
	};

	/**
	 * Throws a `CanceledError` if cancellation has been requested.
	 *
	 * @param {Object} config The config that is to be used for the request
	 *
	 * @returns {void}
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }

	  if (config.signal && config.signal.aborted) {
	    throw new CanceledError(null, config);
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 *
	 * @returns {Promise} The Promise to be fulfilled
	 */
	function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  config.headers = AxiosHeaders$1.from(config.headers);

	  // Transform request data
	  config.data = transformData.call(
	    config,
	    config.transformRequest
	  );

	  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
	    config.headers.setContentType('application/x-www-form-urlencoded', false);
	  }

	  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData.call(
	      config,
	      config.transformResponse,
	      response
	    );

	    response.headers = AxiosHeaders$1.from(response.headers);

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData.call(
	          config,
	          config.transformResponse,
	          reason.response
	        );
	        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
	      }
	    }

	    return Promise.reject(reason);
	  });
	}

	const VERSION = "1.9.0";

	const validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
	  validators$1[type] = function validator(thing) {
	    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
	  };
	});

	const deprecatedWarnings = {};

	/**
	 * Transitional option validator
	 *
	 * @param {function|boolean?} validator - set to false if the transitional option has been removed
	 * @param {string?} version - deprecated version / removed since version
	 * @param {string?} message - some message with additional info
	 *
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
	  function formatMessage(opt, desc) {
	    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
	  }

	  // eslint-disable-next-line func-names
	  return (value, opt, opts) => {
	    if (validator === false) {
	      throw new AxiosError(
	        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
	        AxiosError.ERR_DEPRECATED
	      );
	    }

	    if (version && !deprecatedWarnings[opt]) {
	      deprecatedWarnings[opt] = true;
	      // eslint-disable-next-line no-console
	      console.warn(
	        formatMessage(
	          opt,
	          ' has been deprecated since v' + version + ' and will be removed in the near future'
	        )
	      );
	    }

	    return validator ? validator(value, opt, opts) : true;
	  };
	};

	validators$1.spelling = function spelling(correctSpelling) {
	  return (value, opt) => {
	    // eslint-disable-next-line no-console
	    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
	    return true;
	  }
	};

	/**
	 * Assert object's properties type
	 *
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 *
	 * @returns {object}
	 */

	function assertOptions(options, schema, allowUnknown) {
	  if (typeof options !== 'object') {
	    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
	  }
	  const keys = Object.keys(options);
	  let i = keys.length;
	  while (i-- > 0) {
	    const opt = keys[i];
	    const validator = schema[opt];
	    if (validator) {
	      const value = options[opt];
	      const result = value === undefined || validator(value, opt, options);
	      if (result !== true) {
	        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
	      }
	      continue;
	    }
	    if (allowUnknown !== true) {
	      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
	    }
	  }
	}

	var validator = {
	  assertOptions,
	  validators: validators$1
	};

	const validators = validator.validators;

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 *
	 * @return {Axios} A new instance of Axios
	 */
	class Axios {
	  constructor(instanceConfig) {
	    this.defaults = instanceConfig || {};
	    this.interceptors = {
	      request: new InterceptorManager$1(),
	      response: new InterceptorManager$1()
	    };
	  }

	  /**
	   * Dispatch a request
	   *
	   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
	   * @param {?Object} config
	   *
	   * @returns {Promise} The Promise to be fulfilled
	   */
	  async request(configOrUrl, config) {
	    try {
	      return await this._request(configOrUrl, config);
	    } catch (err) {
	      if (err instanceof Error) {
	        let dummy = {};

	        Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

	        // slice off the Error: ... line
	        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
	        try {
	          if (!err.stack) {
	            err.stack = stack;
	            // match without the 2 top stack lines
	          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
	            err.stack += '\n' + stack;
	          }
	        } catch (e) {
	          // ignore the case where "stack" is an un-writable property
	        }
	      }

	      throw err;
	    }
	  }

	  _request(configOrUrl, config) {
	    /*eslint no-param-reassign:0*/
	    // Allow for axios('example/url'[, config]) a la fetch API
	    if (typeof configOrUrl === 'string') {
	      config = config || {};
	      config.url = configOrUrl;
	    } else {
	      config = configOrUrl || {};
	    }

	    config = mergeConfig(this.defaults, config);

	    const {transitional, paramsSerializer, headers} = config;

	    if (transitional !== undefined) {
	      validator.assertOptions(transitional, {
	        silentJSONParsing: validators.transitional(validators.boolean),
	        forcedJSONParsing: validators.transitional(validators.boolean),
	        clarifyTimeoutError: validators.transitional(validators.boolean)
	      }, false);
	    }

	    if (paramsSerializer != null) {
	      if (utils$1.isFunction(paramsSerializer)) {
	        config.paramsSerializer = {
	          serialize: paramsSerializer
	        };
	      } else {
	        validator.assertOptions(paramsSerializer, {
	          encode: validators.function,
	          serialize: validators.function
	        }, true);
	      }
	    }

	    // Set config.allowAbsoluteUrls
	    if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
	      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
	    } else {
	      config.allowAbsoluteUrls = true;
	    }

	    validator.assertOptions(config, {
	      baseUrl: validators.spelling('baseURL'),
	      withXsrfToken: validators.spelling('withXSRFToken')
	    }, true);

	    // Set config.method
	    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

	    // Flatten headers
	    let contextHeaders = headers && utils$1.merge(
	      headers.common,
	      headers[config.method]
	    );

	    headers && utils$1.forEach(
	      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	      (method) => {
	        delete headers[method];
	      }
	    );

	    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

	    // filter out skipped interceptors
	    const requestInterceptorChain = [];
	    let synchronousRequestInterceptors = true;
	    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
	        return;
	      }

	      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

	      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
	    });

	    const responseInterceptorChain = [];
	    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
	    });

	    let promise;
	    let i = 0;
	    let len;

	    if (!synchronousRequestInterceptors) {
	      const chain = [dispatchRequest.bind(this), undefined];
	      chain.unshift.apply(chain, requestInterceptorChain);
	      chain.push.apply(chain, responseInterceptorChain);
	      len = chain.length;

	      promise = Promise.resolve(config);

	      while (i < len) {
	        promise = promise.then(chain[i++], chain[i++]);
	      }

	      return promise;
	    }

	    len = requestInterceptorChain.length;

	    let newConfig = config;

	    i = 0;

	    while (i < len) {
	      const onFulfilled = requestInterceptorChain[i++];
	      const onRejected = requestInterceptorChain[i++];
	      try {
	        newConfig = onFulfilled(newConfig);
	      } catch (error) {
	        onRejected.call(this, error);
	        break;
	      }
	    }

	    try {
	      promise = dispatchRequest.call(this, newConfig);
	    } catch (error) {
	      return Promise.reject(error);
	    }

	    i = 0;
	    len = responseInterceptorChain.length;

	    while (i < len) {
	      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
	    }

	    return promise;
	  }

	  getUri(config) {
	    config = mergeConfig(this.defaults, config);
	    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
	    return buildURL(fullPath, config.params, config.paramsSerializer);
	  }
	}

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(mergeConfig(config || {}, {
	      method,
	      url,
	      data: (config || {}).data
	    }));
	  };
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/

	  function generateHTTPMethod(isForm) {
	    return function httpMethod(url, data, config) {
	      return this.request(mergeConfig(config || {}, {
	        method,
	        headers: isForm ? {
	          'Content-Type': 'multipart/form-data'
	        } : {},
	        url,
	        data
	      }));
	    };
	  }

	  Axios.prototype[method] = generateHTTPMethod();

	  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
	});

	var Axios$1 = Axios;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @param {Function} executor The executor function.
	 *
	 * @returns {CancelToken}
	 */
	class CancelToken {
	  constructor(executor) {
	    if (typeof executor !== 'function') {
	      throw new TypeError('executor must be a function.');
	    }

	    let resolvePromise;

	    this.promise = new Promise(function promiseExecutor(resolve) {
	      resolvePromise = resolve;
	    });

	    const token = this;

	    // eslint-disable-next-line func-names
	    this.promise.then(cancel => {
	      if (!token._listeners) return;

	      let i = token._listeners.length;

	      while (i-- > 0) {
	        token._listeners[i](cancel);
	      }
	      token._listeners = null;
	    });

	    // eslint-disable-next-line func-names
	    this.promise.then = onfulfilled => {
	      let _resolve;
	      // eslint-disable-next-line func-names
	      const promise = new Promise(resolve => {
	        token.subscribe(resolve);
	        _resolve = resolve;
	      }).then(onfulfilled);

	      promise.cancel = function reject() {
	        token.unsubscribe(_resolve);
	      };

	      return promise;
	    };

	    executor(function cancel(message, config, request) {
	      if (token.reason) {
	        // Cancellation has already been requested
	        return;
	      }

	      token.reason = new CanceledError(message, config, request);
	      resolvePromise(token.reason);
	    });
	  }

	  /**
	   * Throws a `CanceledError` if cancellation has been requested.
	   */
	  throwIfRequested() {
	    if (this.reason) {
	      throw this.reason;
	    }
	  }

	  /**
	   * Subscribe to the cancel signal
	   */

	  subscribe(listener) {
	    if (this.reason) {
	      listener(this.reason);
	      return;
	    }

	    if (this._listeners) {
	      this._listeners.push(listener);
	    } else {
	      this._listeners = [listener];
	    }
	  }

	  /**
	   * Unsubscribe from the cancel signal
	   */

	  unsubscribe(listener) {
	    if (!this._listeners) {
	      return;
	    }
	    const index = this._listeners.indexOf(listener);
	    if (index !== -1) {
	      this._listeners.splice(index, 1);
	    }
	  }

	  toAbortSignal() {
	    const controller = new AbortController();

	    const abort = (err) => {
	      controller.abort(err);
	    };

	    this.subscribe(abort);

	    controller.signal.unsubscribe = () => this.unsubscribe(abort);

	    return controller.signal;
	  }

	  /**
	   * Returns an object that contains a new `CancelToken` and a function that, when called,
	   * cancels the `CancelToken`.
	   */
	  static source() {
	    let cancel;
	    const token = new CancelToken(function executor(c) {
	      cancel = c;
	    });
	    return {
	      token,
	      cancel
	    };
	  }
	}

	var CancelToken$1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 *
	 * @returns {Function}
	 */
	function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	}

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 *
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	function isAxiosError(payload) {
	  return utils$1.isObject(payload) && (payload.isAxiosError === true);
	}

	const HttpStatusCode = {
	  Continue: 100,
	  SwitchingProtocols: 101,
	  Processing: 102,
	  EarlyHints: 103,
	  Ok: 200,
	  Created: 201,
	  Accepted: 202,
	  NonAuthoritativeInformation: 203,
	  NoContent: 204,
	  ResetContent: 205,
	  PartialContent: 206,
	  MultiStatus: 207,
	  AlreadyReported: 208,
	  ImUsed: 226,
	  MultipleChoices: 300,
	  MovedPermanently: 301,
	  Found: 302,
	  SeeOther: 303,
	  NotModified: 304,
	  UseProxy: 305,
	  Unused: 306,
	  TemporaryRedirect: 307,
	  PermanentRedirect: 308,
	  BadRequest: 400,
	  Unauthorized: 401,
	  PaymentRequired: 402,
	  Forbidden: 403,
	  NotFound: 404,
	  MethodNotAllowed: 405,
	  NotAcceptable: 406,
	  ProxyAuthenticationRequired: 407,
	  RequestTimeout: 408,
	  Conflict: 409,
	  Gone: 410,
	  LengthRequired: 411,
	  PreconditionFailed: 412,
	  PayloadTooLarge: 413,
	  UriTooLong: 414,
	  UnsupportedMediaType: 415,
	  RangeNotSatisfiable: 416,
	  ExpectationFailed: 417,
	  ImATeapot: 418,
	  MisdirectedRequest: 421,
	  UnprocessableEntity: 422,
	  Locked: 423,
	  FailedDependency: 424,
	  TooEarly: 425,
	  UpgradeRequired: 426,
	  PreconditionRequired: 428,
	  TooManyRequests: 429,
	  RequestHeaderFieldsTooLarge: 431,
	  UnavailableForLegalReasons: 451,
	  InternalServerError: 500,
	  NotImplemented: 501,
	  BadGateway: 502,
	  ServiceUnavailable: 503,
	  GatewayTimeout: 504,
	  HttpVersionNotSupported: 505,
	  VariantAlsoNegotiates: 506,
	  InsufficientStorage: 507,
	  LoopDetected: 508,
	  NotExtended: 510,
	  NetworkAuthenticationRequired: 511,
	};

	Object.entries(HttpStatusCode).forEach(([key, value]) => {
	  HttpStatusCode[value] = key;
	});

	var HttpStatusCode$1 = HttpStatusCode;

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 *
	 * @returns {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  const context = new Axios$1(defaultConfig);
	  const instance = bind(Axios$1.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

	  // Copy context to instance
	  utils$1.extend(instance, context, null, {allOwnKeys: true});

	  // Factory for creating new instances
	  instance.create = function create(instanceConfig) {
	    return createInstance(mergeConfig(defaultConfig, instanceConfig));
	  };

	  return instance;
	}

	// Create the default instance to be exported
	const axios = createInstance(defaults$1);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios$1;

	// Expose Cancel & CancelToken
	axios.CanceledError = CanceledError;
	axios.CancelToken = CancelToken$1;
	axios.isCancel = isCancel;
	axios.VERSION = VERSION;
	axios.toFormData = toFormData;

	// Expose AxiosError class
	axios.AxiosError = AxiosError;

	// alias for CanceledError for backward compatibility
	axios.Cancel = axios.CanceledError;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};

	axios.spread = spread;

	// Expose isAxiosError
	axios.isAxiosError = isAxiosError;

	// Expose mergeConfig
	axios.mergeConfig = mergeConfig;

	axios.AxiosHeaders = AxiosHeaders$1;

	axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

	axios.getAdapter = adapters.getAdapter;

	axios.HttpStatusCode = HttpStatusCode$1;

	axios.default = axios;

	var axios_1$1 = axios;

	var dist = {};

	var app = {};

	var bip32 = {};

	var consts = {};

	Object.defineProperty(consts, "__esModule", { value: true });
	consts.ERROR_DESCRIPTION_OVERRIDE = consts.LedgerError = consts.PAYLOAD_TYPE = consts.LEDGER_DASHBOARD_CLA = consts.HARDENED = void 0;
	consts.HARDENED = 0x80000000;
	consts.LEDGER_DASHBOARD_CLA = 0xb0;
	consts.PAYLOAD_TYPE = {
	    INIT: 0x00,
	    ADD: 0x01,
	    LAST: 0x02,
	};
	var LedgerError;
	(function (LedgerError) {
	    LedgerError[LedgerError["U2FUnknown"] = 1] = "U2FUnknown";
	    LedgerError[LedgerError["U2FBadRequest"] = 2] = "U2FBadRequest";
	    LedgerError[LedgerError["U2FConfigurationUnsupported"] = 3] = "U2FConfigurationUnsupported";
	    LedgerError[LedgerError["U2FDeviceIneligible"] = 4] = "U2FDeviceIneligible";
	    LedgerError[LedgerError["U2FTimeout"] = 5] = "U2FTimeout";
	    LedgerError[LedgerError["Timeout"] = 14] = "Timeout";
	    LedgerError[LedgerError["GpAuthFailed"] = 25344] = "GpAuthFailed";
	    LedgerError[LedgerError["PinRemainingAttempts"] = 25536] = "PinRemainingAttempts";
	    LedgerError[LedgerError["ExecutionError"] = 25600] = "ExecutionError";
	    LedgerError[LedgerError["WrongLength"] = 26368] = "WrongLength";
	    LedgerError[LedgerError["IncorrectLength"] = 26368] = "IncorrectLength";
	    LedgerError[LedgerError["MissingCriticalParameter"] = 26624] = "MissingCriticalParameter";
	    LedgerError[LedgerError["ErrorDerivingKeys"] = 26626] = "ErrorDerivingKeys";
	    LedgerError[LedgerError["EmptyBuffer"] = 27010] = "EmptyBuffer";
	    LedgerError[LedgerError["SecurityStatusNotSatisfied"] = 27010] = "SecurityStatusNotSatisfied";
	    LedgerError[LedgerError["OutputBufferTooSmall"] = 27011] = "OutputBufferTooSmall";
	    LedgerError[LedgerError["DataIsInvalid"] = 27012] = "DataIsInvalid";
	    LedgerError[LedgerError["ConditionsOfUseNotSatisfied"] = 27013] = "ConditionsOfUseNotSatisfied";
	    LedgerError[LedgerError["CommandIncompatibleFileStructure"] = 27009] = "CommandIncompatibleFileStructure";
	    LedgerError[LedgerError["TransactionRejected"] = 27014] = "TransactionRejected";
	    LedgerError[LedgerError["BadKeyHandle"] = 27264] = "BadKeyHandle";
	    LedgerError[LedgerError["IncorrectData"] = 27264] = "IncorrectData";
	    LedgerError[LedgerError["ReferencedDataNotFound"] = 27272] = "ReferencedDataNotFound";
	    LedgerError[LedgerError["NotEnoughMemorySpace"] = 27268] = "NotEnoughMemorySpace";
	    LedgerError[LedgerError["FileAlreadyExists"] = 27273] = "FileAlreadyExists";
	    LedgerError[LedgerError["InvalidP1P2"] = 27392] = "InvalidP1P2";
	    LedgerError[LedgerError["IncorrectP1P2"] = 27392] = "IncorrectP1P2";
	    LedgerError[LedgerError["InstructionNotSupported"] = 27904] = "InstructionNotSupported";
	    LedgerError[LedgerError["InsNotSupported"] = 27904] = "InsNotSupported";
	    LedgerError[LedgerError["UnknownApdu"] = 27906] = "UnknownApdu";
	    LedgerError[LedgerError["DeviceNotOnboarded"] = 27911] = "DeviceNotOnboarded";
	    LedgerError[LedgerError["DeviceNotOnboarded2"] = 26129] = "DeviceNotOnboarded2";
	    LedgerError[LedgerError["CustomImageBootloader"] = 26159] = "CustomImageBootloader";
	    LedgerError[LedgerError["CustomImageEmpty"] = 26158] = "CustomImageEmpty";
	    LedgerError[LedgerError["AppDoesNotSeemToBeOpen"] = 28161] = "AppDoesNotSeemToBeOpen";
	    LedgerError[LedgerError["ClaNotSupported"] = 28160] = "ClaNotSupported";
	    LedgerError[LedgerError["Licensing"] = 28482] = "Licensing";
	    LedgerError[LedgerError["UnknownError"] = 28416] = "UnknownError";
	    LedgerError[LedgerError["TechnicalProblem"] = 28416] = "TechnicalProblem";
	    LedgerError[LedgerError["SignVerifyError"] = 28417] = "SignVerifyError";
	    LedgerError[LedgerError["Halted"] = 28586] = "Halted";
	    LedgerError[LedgerError["NoErrors"] = 36864] = "NoErrors";
	    LedgerError[LedgerError["DeviceIsBusy"] = 36865] = "DeviceIsBusy";
	    LedgerError[LedgerError["UnknownTransportError"] = 65535] = "UnknownTransportError";
	    LedgerError[LedgerError["AccessConditionNotFulfilled"] = 38916] = "AccessConditionNotFulfilled";
	    LedgerError[LedgerError["AlgorithmNotSupported"] = 38020] = "AlgorithmNotSupported";
	    LedgerError[LedgerError["CodeBlocked"] = 38976] = "CodeBlocked";
	    LedgerError[LedgerError["CodeNotInitialized"] = 38914] = "CodeNotInitialized";
	    LedgerError[LedgerError["ContradictionInvalidation"] = 38928] = "ContradictionInvalidation";
	    LedgerError[LedgerError["ContradictionSecretCodeStatus"] = 38920] = "ContradictionSecretCodeStatus";
	    LedgerError[LedgerError["InvalidKcv"] = 38021] = "InvalidKcv";
	    LedgerError[LedgerError["InvalidOffset"] = 37890] = "InvalidOffset";
	    LedgerError[LedgerError["LockedDevice"] = 21781] = "LockedDevice";
	    LedgerError[LedgerError["MaxValueReached"] = 38992] = "MaxValueReached";
	    LedgerError[LedgerError["MemoryProblem"] = 37440] = "MemoryProblem";
	    LedgerError[LedgerError["NoEfSelected"] = 37888] = "NoEfSelected";
	    LedgerError[LedgerError["InconsistentFile"] = 37896] = "InconsistentFile";
	    LedgerError[LedgerError["FileNotFound"] = 37892] = "FileNotFound";
	    LedgerError[LedgerError["UserRefusedOnDevice"] = 21761] = "UserRefusedOnDevice";
	    LedgerError[LedgerError["NotEnoughSpace"] = 20738] = "NotEnoughSpace";
	    LedgerError[LedgerError["GenericError"] = 4294967295] = "GenericError";
	})(LedgerError || (consts.LedgerError = LedgerError = {}));
	consts.ERROR_DESCRIPTION_OVERRIDE = {
	    [LedgerError.U2FUnknown]: 'U2F: Unknown',
	    [LedgerError.U2FBadRequest]: 'U2F: Bad request',
	    [LedgerError.U2FConfigurationUnsupported]: 'U2F: Configuration unsupported',
	    [LedgerError.U2FDeviceIneligible]: 'U2F: Device Ineligible',
	    [LedgerError.U2FTimeout]: 'U2F: Timeout',
	    [LedgerError.Timeout]: 'Timeout',
	    [LedgerError.NoErrors]: 'No errors',
	    [LedgerError.DeviceIsBusy]: 'Device is busy',
	    [LedgerError.ErrorDerivingKeys]: 'Error deriving keys',
	    [LedgerError.ExecutionError]: 'Execution Error',
	    [LedgerError.WrongLength]: 'Wrong Length',
	    [LedgerError.EmptyBuffer]: 'Empty Buffer',
	    [LedgerError.OutputBufferTooSmall]: 'Output buffer too small',
	    [LedgerError.DataIsInvalid]: 'Data is invalid',
	    [LedgerError.TransactionRejected]: 'Transaction rejected',
	    [LedgerError.BadKeyHandle]: 'Bad key handle',
	    [LedgerError.InvalidP1P2]: 'Invalid P1/P2',
	    [LedgerError.InstructionNotSupported]: 'Instruction not supported',
	    [LedgerError.AppDoesNotSeemToBeOpen]: 'App does not seem to be open',
	    [LedgerError.UnknownError]: 'Unknown error',
	    [LedgerError.SignVerifyError]: 'Sign/verify error',
	    [LedgerError.UnknownTransportError]: 'Unknown transport error',
	    [LedgerError.GpAuthFailed]: 'GP Authentication Failed',
	    [LedgerError.PinRemainingAttempts]: 'PIN Remaining Attempts',
	    [LedgerError.MissingCriticalParameter]: 'Missing Critical Parameter',
	    [LedgerError.ConditionsOfUseNotSatisfied]: 'Conditions of Use Not Satisfied',
	    [LedgerError.CommandIncompatibleFileStructure]: 'Command Incompatible with File Structure',
	    [LedgerError.ReferencedDataNotFound]: 'Referenced Data Not Found',
	    [LedgerError.NotEnoughMemorySpace]: 'Not Enough Memory Space',
	    [LedgerError.FileAlreadyExists]: 'File Already Exists',
	    [LedgerError.UnknownApdu]: 'Unknown APDU',
	    [LedgerError.DeviceNotOnboarded]: 'Device Not Onboarded',
	    [LedgerError.DeviceNotOnboarded2]: 'Device Not Onboarded (Secondary)',
	    [LedgerError.CustomImageBootloader]: 'Custom Image Bootloader Error',
	    [LedgerError.CustomImageEmpty]: 'Custom Image Empty',
	    [LedgerError.ClaNotSupported]: 'CLA Not Supported',
	    [LedgerError.Licensing]: 'Licensing Error',
	    [LedgerError.Halted]: 'Device Halted',
	    [LedgerError.AccessConditionNotFulfilled]: 'Access Condition Not Fulfilled',
	    [LedgerError.AlgorithmNotSupported]: 'Algorithm Not Supported',
	    [LedgerError.CodeBlocked]: 'Code Blocked',
	    [LedgerError.CodeNotInitialized]: 'Code Not Initialized',
	    [LedgerError.ContradictionInvalidation]: 'Contradiction Invalidation',
	    [LedgerError.ContradictionSecretCodeStatus]: 'Contradiction with Secret Code Status',
	    [LedgerError.InvalidKcv]: 'Invalid KCV',
	    [LedgerError.InvalidOffset]: 'Invalid Offset',
	    [LedgerError.LockedDevice]: 'Device Locked',
	    [LedgerError.MaxValueReached]: 'Maximum Value Reached',
	    [LedgerError.MemoryProblem]: 'Memory Problem',
	    [LedgerError.NoEfSelected]: 'No EF Selected',
	    [LedgerError.InconsistentFile]: 'Inconsistent File',
	    [LedgerError.FileNotFound]: 'File Not Found',
	    [LedgerError.UserRefusedOnDevice]: 'User Refused on Device',
	    [LedgerError.NotEnoughSpace]: 'Not Enough Space',
	    [LedgerError.GenericError]: 'Generic Error',
	};

	var responseError = {};

	var errors = {};

	Object.defineProperty(errors, "__esModule", { value: true });
	errors.errorCodeToString = void 0;
	const consts_1$4 = consts;
	function errorCodeToString(returnCode, customErrorList) {
	    const returnCodeStr = returnCode.toString(16).toUpperCase();
	    let errDescription = `Unknown Return Code: 0x${returnCodeStr}`;
	    if (returnCode in consts_1$4.ERROR_DESCRIPTION_OVERRIDE) {
	        return consts_1$4.ERROR_DESCRIPTION_OVERRIDE[returnCode];
	    }
	    if (customErrorList && returnCode in customErrorList) {
	        return customErrorList[returnCode];
	    }
	    return errDescription;
	}
	errors.errorCodeToString = errorCodeToString;

	Object.defineProperty(responseError, "__esModule", { value: true });
	responseError.ResponseError = void 0;
	const errors_1$1 = errors;
	class ResponseError extends Error {
	    constructor(returnCode, errorMessage) {
	        super(errorMessage);
	        this.errorMessage = errorMessage;
	        this.returnCode = returnCode;
	    }
	    static fromReturnCode(returnCode, customErrorList) {
	        return new ResponseError(returnCode, (0, errors_1$1.errorCodeToString)(returnCode, customErrorList));
	    }
	}
	responseError.ResponseError = ResponseError;

	Object.defineProperty(bip32, "__esModule", { value: true });
	bip32.bufferToBip32Path = bip32.numbersToBip32Path = bip32.serializePath = void 0;
	const consts_1$3 = consts;
	const responseError_1$3 = responseError;
	function serializePath(path, requiredPathLengths) {
	    if (typeof path !== 'string') {
	        throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, "Path should be a string (e.g \"m/44'/461'/5'/0/3\")");
	    }
	    if (!path.startsWith('m/')) {
	        throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, 'Path should start with "m/" (e.g "m/44\'/461\'/5\'/0/3")');
	    }
	    const pathArray = path.split('/');
	    pathArray.shift();
	    if (requiredPathLengths && requiredPathLengths.length > 0 && !requiredPathLengths.includes(pathArray.length)) {
	        throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, "Invalid path length. (e.g \"m/44'/5757'/5'/0/3\")");
	    }
	    const buf = Buffer.alloc(4 * pathArray.length);
	    pathArray.forEach((child, i) => {
	        let value = 0;
	        if (child.endsWith("'")) {
	            value += consts_1$3.HARDENED;
	            child = child.slice(0, -1);
	        }
	        const numChild = Number(child);
	        if (Number.isNaN(numChild)) {
	            throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, `Invalid path : ${child} is not a number. (e.g "m/44'/461'/5'/0/3")`);
	        }
	        if (numChild >= consts_1$3.HARDENED) {
	            throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, 'Incorrect child value (bigger or equal to 0x80000000)');
	        }
	        value += numChild;
	        buf.writeUInt32LE(value, 4 * i);
	    });
	    return buf;
	}
	bip32.serializePath = serializePath;
	function numbersToBip32Path(items) {
	    if (items.length === 0) {
	        throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, 'The items array cannot be empty.');
	    }
	    const pathArray = [];
	    for (let i = 0; i < items.length; i++) {
	        let value = items[i];
	        if (!Number.isInteger(value) || value < 0) {
	            throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, 'Each item must be a positive integer.');
	        }
	        let child = value & ~consts_1$3.HARDENED;
	        if (value >= consts_1$3.HARDENED) {
	            pathArray.push(`${child}'`);
	        }
	        else {
	            pathArray.push(`${child}`);
	        }
	    }
	    return 'm/' + pathArray.join('/');
	}
	bip32.numbersToBip32Path = numbersToBip32Path;
	function bufferToBip32Path(buffer) {
	    if (buffer.length % 4 !== 0) {
	        throw new responseError_1$3.ResponseError(consts_1$3.LedgerError.GenericError, 'The buffer length must be a multiple of 4.');
	    }
	    const items = [];
	    for (let i = 0; i < buffer.length; i += 4) {
	        items.push(buffer.readUInt32LE(i));
	    }
	    return numbersToBip32Path(items);
	}
	bip32.bufferToBip32Path = bufferToBip32Path;

	var common = {};

	var payload = {};

	var byteStream = {};

	Object.defineProperty(byteStream, "__esModule", { value: true });
	byteStream.ByteStream = void 0;
	const consts_1$2 = consts;
	const responseError_1$2 = responseError;
	class ByteStream {
	    constructor(buffer) {
	        this.readOffset = 0;
	        this.writeOffset = 0;
	        this.internalBuffer = buffer ? Buffer.from(buffer) : Buffer.alloc(0);
	        this.readOffset = 0;
	        this.writeOffset = this.internalBuffer.length;
	    }
	    appendUint8(value) {
	        const byteBuffer = Buffer.from([value]);
	        this.appendBytes(byteBuffer);
	    }
	    appendUint16(value) {
	        const byteBuffer = Buffer.alloc(2);
	        byteBuffer.writeUInt16LE(value, 0);
	        this.appendBytes(byteBuffer);
	    }
	    appendUint32(value) {
	        const byteBuffer = Buffer.alloc(4);
	        byteBuffer.writeUInt32LE(value, 0);
	        this.appendBytes(byteBuffer);
	    }
	    appendUint64(value) {
	        const byteBuffer = Buffer.alloc(8);
	        byteBuffer.writeBigUInt64LE(value, 0);
	        this.appendBytes(byteBuffer);
	    }
	    readBytes(length) {
	        if (this.readOffset + length > this.internalBuffer.length) {
	            throw new responseError_1$2.ResponseError(consts_1$2.LedgerError.UnknownError, 'Attempt to read beyond buffer length');
	        }
	        const response = this.internalBuffer.subarray(this.readOffset, this.readOffset + length);
	        this.readOffset += length;
	        return response;
	    }
	    readBytesAt(length, offset) {
	        if (offset + length > this.internalBuffer.length) {
	            throw new responseError_1$2.ResponseError(consts_1$2.LedgerError.UnknownError, 'Attempt to read beyond buffer length');
	        }
	        return this.internalBuffer.subarray(offset, offset + length);
	    }
	    appendBytes(data) {
	        if (this.writeOffset + data.length > this.internalBuffer.length) {
	            const newBuffer = Buffer.alloc(this.writeOffset + data.length);
	            this.internalBuffer.copy(newBuffer, 0, 0, this.writeOffset);
	            this.internalBuffer = newBuffer;
	        }
	        data.copy(this.internalBuffer, this.writeOffset);
	        this.writeOffset += data.length;
	    }
	    insertBytesAt(data, offset) {
	        if (offset > this.internalBuffer.length) {
	            const padding = Buffer.alloc(offset - this.internalBuffer.length, 0);
	            this.internalBuffer = Buffer.concat([this.internalBuffer, padding, data]);
	        }
	        else {
	            const before = this.internalBuffer.subarray(0, offset);
	            const after = this.internalBuffer.subarray(offset);
	            this.internalBuffer = Buffer.concat([before, data, after]);
	        }
	    }
	    writeBytesAt(data, offset) {
	        if (offset + data.length > this.internalBuffer.length) {
	            const newBuffer = Buffer.alloc(offset + data.length);
	            this.internalBuffer.copy(newBuffer, 0, 0, offset);
	            this.internalBuffer = newBuffer;
	        }
	        data.copy(this.internalBuffer, offset);
	        this.writeOffset = offset + data.length;
	    }
	    skipBytes(length) {
	        if (this.readOffset + length > this.internalBuffer.length) {
	            throw new responseError_1$2.ResponseError(consts_1$2.LedgerError.UnknownError, 'Attempt to skip beyond buffer length');
	        }
	        this.readOffset += length;
	    }
	    clear() {
	        this.internalBuffer = Buffer.alloc(0);
	        this.readOffset = 0;
	        this.writeOffset = 0;
	    }
	    resetOffset() {
	        this.readOffset = 0;
	        this.writeOffset = 0;
	    }
	    getCompleteBuffer() {
	        return Buffer.from(this.internalBuffer);
	    }
	    getAvailableBuffer() {
	        return Buffer.from(this.internalBuffer.subarray(this.readOffset));
	    }
	    length() {
	        return this.internalBuffer.length - this.readOffset;
	    }
	    capacity() {
	        return this.internalBuffer.length;
	    }
	    getReadOffset() {
	        return this.readOffset;
	    }
	    getWriteOffset() {
	        return this.writeOffset;
	    }
	    setReadOffset(offset) {
	        if (offset < 0 || offset > this.internalBuffer.length) {
	            throw new responseError_1$2.ResponseError(consts_1$2.LedgerError.UnknownError, 'Invalid read offset');
	        }
	        this.readOffset = offset;
	    }
	    setWriteOffset(offset) {
	        if (offset < 0 || offset > this.internalBuffer.length) {
	            throw new responseError_1$2.ResponseError(consts_1$2.LedgerError.UnknownError, 'Invalid write offset');
	        }
	        this.writeOffset = offset;
	    }
	}
	byteStream.ByteStream = ByteStream;

	Object.defineProperty(payload, "__esModule", { value: true });
	payload.ResponsePayload = void 0;
	const byteStream_1 = byteStream;
	class ResponsePayload extends byteStream_1.ByteStream {
	    constructor(payload) {
	        super(payload);
	    }
	}
	payload.ResponsePayload = ResponsePayload;

	Object.defineProperty(common, "__esModule", { value: true });
	common.processErrorResponse = common.processResponse = void 0;
	const consts_1$1 = consts;
	const errors_1 = errors;
	const payload_1 = payload;
	const responseError_1$1 = responseError;
	function isDict(v) {
	    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
	}
	function processResponse(responseRaw, customErrorList) {
	    if (responseRaw.length < 2) {
	        throw responseError_1$1.ResponseError.fromReturnCode(consts_1$1.LedgerError.EmptyBuffer);
	    }
	    const returnCode = responseRaw.readUInt16BE(responseRaw.length - 2);
	    let errorMessage = (0, errors_1.errorCodeToString)(returnCode, customErrorList);
	    const payload = responseRaw.subarray(0, responseRaw.length - 2);
	    if (returnCode === consts_1$1.LedgerError.NoErrors) {
	        return new payload_1.ResponsePayload(payload);
	    }
	    if (payload.length > 0) {
	        errorMessage += ` : ${payload.toString('ascii')}`;
	    }
	    throw new responseError_1$1.ResponseError(returnCode, errorMessage);
	}
	common.processResponse = processResponse;
	function processErrorResponse(response, customErrorList) {
	    if (isDict(response)) {
	        if (Object.prototype.hasOwnProperty.call(response, 'statusCode')) {
	            return responseError_1$1.ResponseError.fromReturnCode(response.statusCode, customErrorList);
	        }
	        if (Object.prototype.hasOwnProperty.call(response, 'returnCode') && Object.prototype.hasOwnProperty.call(response, 'errorMessage')) {
	            return response;
	        }
	    }
	    return responseError_1$1.ResponseError.fromReturnCode(consts_1$1.LedgerError.UnknownTransportError);
	}
	common.processErrorResponse = processErrorResponse;

	Object.defineProperty(app, "__esModule", { value: true });
	const bip32_1 = bip32;
	const common_1$1 = common;
	const consts_1 = consts;
	const responseError_1 = responseError;
	class BaseApp {
	    constructor(transport, params) {
	        if (transport == null) {
	            throw new Error('Transport has not been defined');
	        }
	        this.transport = transport;
	        this.CLA = params.cla;
	        this.INS = params.ins;
	        this.P1_VALUES = params.p1Values;
	        this.CHUNK_SIZE = params.chunkSize;
	        this.REQUIRED_PATH_LENGTHS = params.acceptedPathLengths;
	        this.CUSTOM_APP_ERROR_DESCRIPTION = params.customAppErrorDescription;
	    }
	    serializePath(path) {
	        return (0, bip32_1.serializePath)(path, this.REQUIRED_PATH_LENGTHS);
	    }
	    prepareChunks(path, message) {
	        const serializedPathBuffer = this.serializePath(path);
	        const chunks = this.messageToChunks(message);
	        chunks.unshift(serializedPathBuffer);
	        return chunks;
	    }
	    messageToChunks(message) {
	        const chunks = [];
	        const messageBuffer = Buffer.from(message);
	        for (let i = 0; i < messageBuffer.length; i += this.CHUNK_SIZE) {
	            const end = Math.min(i + this.CHUNK_SIZE, messageBuffer.length);
	            chunks.push(messageBuffer.subarray(i, end));
	        }
	        return chunks;
	    }
	    async sendGenericChunk(ins, p2, chunkIdx, chunkNum, chunk) {
	        let payloadType = consts_1.PAYLOAD_TYPE.ADD;
	        if (chunkIdx === 1) {
	            payloadType = consts_1.PAYLOAD_TYPE.INIT;
	        }
	        if (chunkIdx === chunkNum) {
	            payloadType = consts_1.PAYLOAD_TYPE.LAST;
	        }
	        const statusList = [consts_1.LedgerError.NoErrors, consts_1.LedgerError.DataIsInvalid, consts_1.LedgerError.BadKeyHandle];
	        const responseBuffer = await this.transport.send(this.CLA, ins, payloadType, p2, chunk, statusList);
	        const response = (0, common_1$1.processResponse)(responseBuffer, this.CUSTOM_APP_ERROR_DESCRIPTION);
	        return response;
	    }
	    async signSendChunk(ins, chunkIdx, chunkNum, chunk) {
	        return this.sendGenericChunk(ins, 0, chunkIdx, chunkNum, chunk);
	    }
	    async getVersion() {
	        try {
	            const responseBuffer = await this.transport.send(this.CLA, this.INS.GET_VERSION, 0, 0);
	            const response = (0, common_1$1.processResponse)(responseBuffer, this.CUSTOM_APP_ERROR_DESCRIPTION);
	            let testMode;
	            let major, minor, patch;
	            if (response.length() === 5 || response.length() === 9) {
	                testMode = response.readBytes(1).readUInt8() !== 0;
	                major = response.readBytes(1).readUInt8();
	                minor = response.readBytes(1).readUInt8();
	                patch = response.readBytes(1).readUInt8();
	            }
	            else if (response.length() === 8 || response.length() === 12) {
	                testMode = response.readBytes(1).readUInt8() !== 0;
	                major = response.readBytes(2).readUInt16BE();
	                minor = response.readBytes(2).readUInt16BE();
	                patch = response.readBytes(2).readUInt16BE();
	            }
	            else if (response.length() === 14 || response.length() === 18) {
	                testMode = response.readBytes(1).readUInt8() !== 0;
	                major = response.readBytes(4).readUInt32BE();
	                minor = response.readBytes(4).readUInt32BE();
	                patch = response.readBytes(4).readUInt32BE();
	            }
	            else {
	                throw new responseError_1.ResponseError(consts_1.LedgerError.TechnicalProblem, 'Invalid response length');
	            }
	            const deviceLocked = response.readBytes(1).readUInt8() === 1;
	            let targetId = '';
	            if (response.length() >= 4) {
	                targetId = response.readBytes(4).readUInt32BE().toString(16).padStart(8, '0');
	            }
	            return {
	                testMode,
	                major,
	                minor,
	                patch,
	                deviceLocked,
	                targetId,
	            };
	        }
	        catch (error) {
	            throw (0, common_1$1.processErrorResponse)(error);
	        }
	    }
	    async appInfo() {
	        try {
	            const responseBuffer = await this.transport.send(consts_1.LEDGER_DASHBOARD_CLA, 0x01, 0, 0);
	            const response = (0, common_1$1.processResponse)(responseBuffer, this.CUSTOM_APP_ERROR_DESCRIPTION);
	            const formatId = response.readBytes(1).readUInt8();
	            if (formatId !== 1) {
	                throw new responseError_1.ResponseError(consts_1.LedgerError.TechnicalProblem, 'Format ID not recognized');
	            }
	            const appNameLen = response.readBytes(1).readUInt8();
	            const appName = response.readBytes(appNameLen).toString('ascii');
	            const appVersionLen = response.readBytes(1).readUInt8();
	            const appVersion = response.readBytes(appVersionLen).toString('ascii');
	            const flagLen = response.readBytes(1).readUInt8();
	            const flagsValue = response.readBytes(flagLen).readUInt8();
	            return {
	                appName,
	                appVersion,
	                flagLen,
	                flagsValue,
	                flagRecovery: (flagsValue & 1) !== 0,
	                flagSignedMcuCode: (flagsValue & 2) !== 0,
	                flagOnboarded: (flagsValue & 4) !== 0,
	                flagPINValidated: (flagsValue & 128) !== 0,
	            };
	        }
	        catch (error) {
	            throw (0, common_1$1.processErrorResponse)(error);
	        }
	    }
	    async deviceInfo() {
	        try {
	            const responseBuffer = await this.transport.send(0xe0, 0x01, 0, 0, Buffer.from([]), [consts_1.LedgerError.NoErrors, 0x6e00]);
	            const response = (0, common_1$1.processResponse)(responseBuffer, this.CUSTOM_APP_ERROR_DESCRIPTION);
	            const targetId = response.readBytes(4).toString('hex');
	            const secureElementVersionLen = response.readBytes(1).readUInt8();
	            const seVersion = response.readBytes(secureElementVersionLen).toString();
	            const flagsLen = response.readBytes(1).readUInt8();
	            const flag = response.readBytes(flagsLen).toString('hex');
	            const mcuVersionLen = response.readBytes(1).readUInt8();
	            let tmp = response.readBytes(mcuVersionLen);
	            const firstZeroIndex = tmp.indexOf(0);
	            if (firstZeroIndex !== -1) {
	                tmp = tmp.subarray(0, firstZeroIndex);
	            }
	            const mcuVersion = tmp.toString();
	            return {
	                targetId,
	                seVersion,
	                flag,
	                mcuVersion,
	            };
	        }
	        catch (error) {
	            throw (0, common_1$1.processErrorResponse)(error);
	        }
	    }
	}
	app.default = BaseApp;

	var types = {};

	Object.defineProperty(types, "__esModule", { value: true });

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
		var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		const app_1 = __importDefault(app);
		exports.default = app_1.default;
		__exportStar(common, exports);
		__exportStar(consts, exports);
		__exportStar(types, exports);
		__exportStar(bip32, exports);
		__exportStar(responseError, exports);
		__exportStar(payload, exports);
	} (dist));
	getDefaultExportFromCjs(dist);

	var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || (function () {
	    var ownKeys = function(o) {
	        ownKeys = Object.getOwnPropertyNames || function (o) {
	            var ar = [];
	            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
	            return ar;
	        };
	        return ownKeys(o);
	    };
	    return function (mod) {
	        if (mod && mod.__esModule) return mod;
	        var result = {};
	        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding$1(result, mod, k[i]);
	        __setModuleDefault$1(result, mod);
	        return result;
	    };
	})();
	var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(generic_app, "__esModule", { value: true });
	generic_app.PolkadotGenericApp = void 0;
	const axios_1 = __importDefault$1(axios_1$1);
	const ledger_js_1$1 = __importStar$1(dist);
	const common_1 = common$1;
	class PolkadotGenericApp extends ledger_js_1$1.default {
	    constructor(transport, txMetadataChainId, txMetadataSrvUrl) {
	        super(transport, PolkadotGenericApp._params);
	        this.txMetadataSrvUrl = txMetadataSrvUrl;
	        this.txMetadataChainId = txMetadataChainId;
	        if (!this.transport) {
	            throw new Error('Transport has not been defined');
	        }
	    }
	    async getTxMetadata(txBlob, txMetadataChainId, txMetadataSrvUrl) {
	        const txMetadataChainIdVal = txMetadataChainId ?? this.txMetadataChainId;
	        const txMetadataSrvUrlVal = txMetadataSrvUrl ?? this.txMetadataSrvUrl;
	        if (!txMetadataChainIdVal) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataSrvUrl is not defined or is empty. The use of the method requires access to a metadata shortening service.');
	        }
	        if (!txMetadataSrvUrlVal) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataChainId is not defined or is empty. These values are configured in the metadata shortening service. Check the corresponding configuration in the service.');
	        }
	        const resp = await axios_1.default.post(txMetadataSrvUrlVal, {
	            txBlob: txBlob.toString('hex'),
	            chain: { id: txMetadataChainIdVal },
	        });
	        let txMetadata = resp.data.txMetadata;
	        if (txMetadata.slice(0, 2) === '0x') {
	            txMetadata = txMetadata.slice(2);
	        }
	        return Buffer.from(txMetadata, 'hex');
	    }
	    async getAddress(bip44Path, ss58prefix, showAddrInDevice = false, scheme = 0 ) {
	        if (!Number.isInteger(ss58prefix) || ss58prefix < 0 || ss58prefix >> 16 !== 0) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.ConditionsOfUseNotSatisfied, `Unexpected ss58prefix ${ss58prefix}. Needs to be a non-negative integer up to 2^16`);
	        }
	        if (scheme != 2  && scheme != 0 ) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.ConditionsOfUseNotSatisfied, `Unexpected scheme ${scheme}. Needs to be ECDSA (2) or ED25519 (0)`);
	        }
	        const bip44PathBuffer = this.serializePath(bip44Path);
	        const prefixBuffer = Buffer.alloc(2);
	        prefixBuffer.writeUInt16LE(ss58prefix);
	        let payload = bip44PathBuffer;
	        if (scheme === 0 ) {
	            payload = Buffer.concat([payload, prefixBuffer]);
	        }
	        const p1 = showAddrInDevice ? 1  : 0 ;
	        try {
	            const responseBuffer = await this.transport.send(this.CLA, this.INS.GET_ADDR, p1, scheme ?? 0 , payload);
	            const response = (0, ledger_js_1$1.processResponse)(responseBuffer);
	            const currentScheme = (scheme ?? 0 );
	            const pubKeyLen = currentScheme === 2  ? common_1.ECDSA_PUBKEY_LEN : common_1.ED25519_PUBKEY_LEN;
	            const pubKey = response.readBytes(pubKeyLen).toString('hex');
	            let address = '';
	            if (currentScheme === 2 ) {
	                address = response.readBytes(response.length()).toString('hex');
	            }
	            else {
	                address = response.readBytes(response.length()).toString('ascii');
	            }
	            return {
	                pubKey,
	                address,
	            };
	        }
	        catch (e) {
	            throw (0, ledger_js_1$1.processErrorResponse)(e);
	        }
	    }
	    async getAddressEcdsa(bip44Path, showAddrInDevice = false) {
	        return this.getAddress(bip44Path, 0, showAddrInDevice, 2 );
	    }
	    async getAddressEd25519(bip44Path, ss58prefix, showAddrInDevice = false) {
	        return this.getAddress(bip44Path, ss58prefix, showAddrInDevice);
	    }
	    splitBufferToChunks(message, chunkSize) {
	        const chunks = [];
	        const buffer = Buffer.from(message);
	        for (let i = 0; i < buffer.length; i += chunkSize) {
	            let end = i + chunkSize;
	            if (i > buffer.length) {
	                end = buffer.length;
	            }
	            chunks.push(buffer.subarray(i, end));
	        }
	        return chunks;
	    }
	    getSignReqChunks(path, txBlob, metadata) {
	        const chunks = [];
	        const bip44Path = this.serializePath(path);
	        const blobLen = Buffer.alloc(2);
	        blobLen.writeUInt16LE(txBlob.length);
	        chunks.push(Buffer.concat([bip44Path, blobLen]));
	        if (metadata == null) {
	            chunks.push(...this.splitBufferToChunks(txBlob, this.CHUNK_SIZE));
	        }
	        else {
	            chunks.push(...this.splitBufferToChunks(Buffer.concat([txBlob, metadata]), this.CHUNK_SIZE));
	        }
	        return chunks;
	    }
	    async signImplEd25519(path, ins, blob, metadata) {
	        const chunks = this.getSignReqChunks(path, blob, metadata);
	        try {
	            let result = await this.sendGenericChunk(ins, 0 , 1, chunks.length, chunks[0]);
	            for (let i = 1; i < chunks.length; i += 1) {
	                result = await this.sendGenericChunk(ins, 0 , 1 + i, chunks.length, chunks[i]);
	            }
	            return {
	                signature: result.readBytes(result.length()),
	            };
	        }
	        catch (e) {
	            throw (0, ledger_js_1$1.processErrorResponse)(e);
	        }
	    }
	    async signImplEcdsa(path, ins, blob, metadata) {
	        const chunks = this.getSignReqChunks(path, blob, metadata);
	        try {
	            let result = await this.sendGenericChunk(ins, 2 , 1, chunks.length, chunks[0]);
	            for (let i = 1; i < chunks.length; i += 1) {
	                result = await this.sendGenericChunk(ins, 2 , 1 + i, chunks.length, chunks[i]);
	            }
	            return {
	                r: result.readBytes(32),
	                s: result.readBytes(32),
	                v: result.readBytes(1),
	            };
	        }
	        catch (e) {
	            throw (0, ledger_js_1$1.processErrorResponse)(e);
	        }
	    }
	    async sign(path, txBlob, scheme = 0 ) {
	        if (scheme != 2  && scheme != 0 ) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.ConditionsOfUseNotSatisfied, `Unexpected scheme ${scheme}. Needs to be ECDSA (2) or ED25519 (0)`);
	        }
	        if (scheme === 2 ) {
	            return await this.signEcdsa(path, txBlob);
	        }
	        return await this.signEd25519(path, txBlob);
	    }
	    async signEd25519(path, txBlob) {
	        if (!this.txMetadataSrvUrl) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataSrvUrl is not defined or is empty. The use of the method requires access to a metadata shortening service.');
	        }
	        if (!this.txMetadataChainId) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataChainId is not defined or is empty. These values are configured in the metadata shortening service. Check the corresponding configuration in the service.');
	        }
	        const txMetadata = await this.getTxMetadata(txBlob);
	        return await this.signImplEd25519(path, this.INS.SIGN, txBlob, txMetadata);
	    }
	    async signEcdsa(path, txBlob) {
	        if (!this.txMetadataSrvUrl) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataSrvUrl is not defined or is empty. The use of the method requires access to a metadata shortening service.');
	        }
	        if (!this.txMetadataChainId) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataChainId is not defined or is empty. These values are configured in the metadata shortening service. Check the corresponding configuration in the service.');
	        }
	        const txMetadata = await this.getTxMetadata(txBlob);
	        return await this.signImplEcdsa(path, this.INS.SIGN, txBlob, txMetadata);
	    }
	    async signMigration(path, txBlob, txMetadataChainId, txMetadataSrvUrl) {
	        if (!this.txMetadataSrvUrl) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataSrvUrl is not defined or is empty. The use of the method requires access to a metadata shortening service.');
	        }
	        if (!this.txMetadataChainId) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.GenericError, 'txMetadataChainId is not defined or is empty. These values are configured in the metadata shortening service. Check the corresponding configuration in the service.');
	        }
	        const txMetadata = await this.getTxMetadata(txBlob, txMetadataChainId, txMetadataSrvUrl);
	        return await this.signImplEd25519(path, this.INS.SIGN, txBlob, txMetadata);
	    }
	    async signRaw(path, txBlob, scheme = 0 ) {
	        if (scheme != 2  && scheme != 0 ) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.ConditionsOfUseNotSatisfied, `Unexpected scheme ${scheme}. Needs to be ECDSA (2) or ED25519 (0)`);
	        }
	        if (scheme === 2 ) {
	            return await this.signRawEcdsa(path, txBlob);
	        }
	        return await this.signRawEd25519(path, txBlob);
	    }
	    async signRawEd25519(path, txBlob) {
	        return await this.signImplEd25519(path, this.INS.SIGN_RAW, txBlob);
	    }
	    async signRawEcdsa(path, txBlob) {
	        return await this.signImplEcdsa(path, this.INS.SIGN_RAW, txBlob);
	    }
	    async signWithMetadata(path, txBlob, txMetadata, scheme) {
	        if (scheme != 2  && scheme != 0 ) {
	            throw new ledger_js_1$1.ResponseError(ledger_js_1$1.LedgerError.ConditionsOfUseNotSatisfied, `Unexpected scheme ${scheme}. Needs to be ECDSA (2) or ED25519 (0)`);
	        }
	        if (scheme === 2 ) {
	            return await this.signWithMetadataEcdsa(path, txBlob, txMetadata);
	        }
	        return await this.signWithMetadataEd25519(path, txBlob, txMetadata);
	    }
	    async signWithMetadataEcdsa(path, txBlob, txMetadata) {
	        return await this.signImplEcdsa(path, this.INS.SIGN, txBlob, txMetadata);
	    }
	    async signWithMetadataEd25519(path, txBlob, txMetadata) {
	        return await this.signImplEd25519(path, this.INS.SIGN, txBlob, txMetadata);
	    }
	}
	generic_app.PolkadotGenericApp = PolkadotGenericApp;
	PolkadotGenericApp._INS = {
	    GET_VERSION: 0x00,
	    GET_ADDR: 0x01,
	    SIGN: 0x02,
	    SIGN_RAW: 0x03,
	};
	PolkadotGenericApp._params = {
	    cla: 0xf9,
	    ins: { ...PolkadotGenericApp._INS },
	    p1Values: { ONLY_RETRIEVE: 0x00, SHOW_ADDRESS_IN_DEVICE: 0x01 },
	    chunkSize: 250,
	    requiredPathLengths: [5],
	};

	var generic_legacy = {};

	Object.defineProperty(generic_legacy, "__esModule", { value: true });
	generic_legacy.PolkadotGenericAppLegacy = void 0;
	const ledger_js_1 = dist;
	const generic_app_1 = generic_app;
	class PolkadotGenericAppLegacy {
	    constructor(transport, ss58prefix, txMetadataChainId, txMetadataSrvUrl) {
	        this.genericApp = new generic_app_1.PolkadotGenericApp(transport, txMetadataChainId, txMetadataSrvUrl);
	        this.ss58prefix = ss58prefix;
	    }
	    convertToLegacyError(e) {
	        return {
	            error_message: e.errorMessage,
	            return_code: e.returnCode,
	        };
	    }
	    convertLegacyPath(account, change, addressIndex) {
	        return (0, ledger_js_1.numbersToBip32Path)([0x8000002c, 0x80000162, account, change, addressIndex]);
	    }
	    async getVersion() {
	        try {
	            const version = await this.genericApp.getVersion();
	            const legacyError = this.convertToLegacyError(ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.NoErrors));
	            return {
	                ...legacyError,
	                major: version.major ?? 0,
	                minor: version.minor ?? 0,
	                patch: version.patch ?? 0,
	                device_locked: version.deviceLocked ?? false,
	                test_mode: version.testMode ?? false,
	            };
	        }
	        catch (e) {
	            const legacyError = this.convertToLegacyError(e);
	            return {
	                device_locked: false,
	                major: 0,
	                minor: 0,
	                patch: 0,
	                test_mode: false,
	                ...legacyError,
	            };
	        }
	    }
	    async appInfo() {
	        try {
	            const info = await this.genericApp.appInfo();
	            const legacyError = this.convertToLegacyError(ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.NoErrors));
	            return {
	                ...legacyError,
	                ...info,
	            };
	        }
	        catch (e) {
	            const legacyError = this.convertToLegacyError(e);
	            return {
	                ...legacyError,
	            };
	        }
	    }
	    async getAddress(account, change, addressIndex, requireConfirmation, scheme) {
	        if (scheme !== 0 ) {
	            throw ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.AlgorithmNotSupported);
	        }
	        try {
	            const bip44Path = this.convertLegacyPath(account, change, addressIndex);
	            const address = await this.genericApp.getAddress(bip44Path, this.ss58prefix, requireConfirmation);
	            const legacyError = this.convertToLegacyError(ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.NoErrors));
	            return {
	                ...legacyError,
	                ...address,
	            };
	        }
	        catch (e) {
	            const legacyError = this.convertToLegacyError(e);
	            return {
	                address: 'ERROR',
	                pubKey: 'ERROR',
	                ...legacyError,
	            };
	        }
	    }
	    async sign(account, change, addressIndex, message, scheme) {
	        try {
	            if (scheme !== 0 ) {
	                throw ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.AlgorithmNotSupported);
	            }
	            const bip44Path = this.convertLegacyPath(account, change, addressIndex);
	            const signature = await this.genericApp.signEd25519(bip44Path, message);
	            const legacyError = this.convertToLegacyError(ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.NoErrors));
	            return {
	                ...legacyError,
	                ...signature,
	            };
	        }
	        catch (e) {
	            const legacyError = this.convertToLegacyError(e);
	            return {
	                signature: Buffer.alloc(0),
	                ...legacyError,
	            };
	        }
	    }
	    async signRaw(account, change, addressIndex, message, scheme) {
	        try {
	            if (scheme !== 0 ) {
	                throw ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.AlgorithmNotSupported);
	            }
	            const bip44Path = this.convertLegacyPath(account, change, addressIndex);
	            const signature = await this.genericApp.signRawEd25519(bip44Path, message);
	            const legacyError = this.convertToLegacyError(ledger_js_1.ResponseError.fromReturnCode(ledger_js_1.LedgerError.NoErrors));
	            return {
	                ...legacyError,
	                ...signature,
	            };
	        }
	        catch (e) {
	            const legacyError = this.convertToLegacyError(e);
	            return {
	                signature: Buffer.alloc(0),
	                ...legacyError,
	            };
	        }
	    }
	}
	generic_legacy.PolkadotGenericAppLegacy = PolkadotGenericAppLegacy;

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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.supportedApps = exports.newSubstrateApp = exports.SubstrateApp = void 0;
		__exportStar(legacy_apps, exports);
		__exportStar(generic_app, exports);
		__exportStar(generic_legacy, exports);
		var substrate_app_1 = substrate_app;
		Object.defineProperty(exports, "SubstrateApp", { enumerable: true, get: function () { return substrate_app_1.SubstrateApp; } });
		var supported_apps_1 = supported_apps;
		Object.defineProperty(exports, "newSubstrateApp", { enumerable: true, get: function () { return supported_apps_1.newSubstrateApp; } });
		Object.defineProperty(exports, "supportedApps", { enumerable: true, get: function () { return supported_apps_1.supportedApps; } });
	} (dist$1));
	getDefaultExportFromCjs(dist$1);

	var browser = {};

	var extendStatics = function(d, b) {
	  extendStatics = Object.setPrototypeOf ||
	      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	  return extendStatics(d, b);
	};
	function __extends(d, b) {
	  if (typeof b !== "function" && b !== null)
	      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	  extendStatics(d, b);
	  function __() { this.constructor = d; }
	  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	var __assign = function() {
	  __assign = Object.assign || function __assign(t) {
	      for (var s, i = 1, n = arguments.length; i < n; i++) {
	          s = arguments[i];
	          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	      return t;
	  };
	  return __assign.apply(this, arguments);
	};
	function __rest(s, e) {
	  var t = {};
	  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	      t[p] = s[p];
	  if (s != null && typeof Object.getOwnPropertySymbols === "function")
	      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	              t[p[i]] = s[p[i]];
	      }
	  return t;
	}
	function __decorate(decorators, target, key, desc) {
	  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	  return c > 3 && r && Object.defineProperty(target, key, r), r;
	}
	function __param(paramIndex, decorator) {
	  return function (target, key) { decorator(target, key, paramIndex); }
	}
	function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
	  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	  var _, done = false;
	  for (var i = decorators.length - 1; i >= 0; i--) {
	      var context = {};
	      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
	      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
	      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
	      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
	      if (kind === "accessor") {
	          if (result === void 0) continue;
	          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
	          if (_ = accept(result.get)) descriptor.get = _;
	          if (_ = accept(result.set)) descriptor.set = _;
	          if (_ = accept(result.init)) initializers.unshift(_);
	      }
	      else if (_ = accept(result)) {
	          if (kind === "field") initializers.unshift(_);
	          else descriptor[key] = _;
	      }
	  }
	  if (target) Object.defineProperty(target, contextIn.name, descriptor);
	  done = true;
	}function __runInitializers(thisArg, initializers, value) {
	  var useValue = arguments.length > 2;
	  for (var i = 0; i < initializers.length; i++) {
	      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	  }
	  return useValue ? value : void 0;
	}function __propKey(x) {
	  return typeof x === "symbol" ? x : "".concat(x);
	}function __setFunctionName(f, name, prefix) {
	  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
	  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
	}function __metadata(metadataKey, metadataValue) {
	  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}
	function __awaiter$4(thisArg, _arguments, P, generator) {
	  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	  return new (P || (P = Promise))(function (resolve, reject) {
	      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	      step((generator = generator.apply(thisArg, _arguments || [])).next());
	  });
	}
	function __generator(thisArg, body) {
	  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
	  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	  function verb(n) { return function (v) { return step([n, v]); }; }
	  function step(op) {
	      if (f) throw new TypeError("Generator is already executing.");
	      while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
	}
	var __createBinding = Object.create ? (function(o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  var desc = Object.getOwnPropertyDescriptor(m, k);
	  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	  }
	  Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});
	function __exportStar(m, o) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
	}
	function __values(o) {
	  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	  if (m) return m.call(o);
	  if (o && typeof o.length === "number") return {
	      next: function () {
	          if (o && i >= o.length) o = void 0;
	          return { value: o && o[i++], done: !o };
	      }
	  };
	  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}
	function __read(o, n) {
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
	}
	function __spread() {
	  for (var ar = [], i = 0; i < arguments.length; i++)
	      ar = ar.concat(__read(arguments[i]));
	  return ar;
	}
	function __spreadArrays() {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	  for (var r = Array(s), k = 0, i = 0; i < il; i++)
	      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	          r[k] = a[j];
	  return r;
	}
	function __spreadArray(to, from, pack) {
	  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	      if (ar || !(i in from)) {
	          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	          ar[i] = from[i];
	      }
	  }
	  return to.concat(ar || Array.prototype.slice.call(from));
	}
	function __await(v) {
	  return this instanceof __await ? (this.v = v, this) : new __await(v);
	}
	function __asyncGenerator(thisArg, _arguments, generator) {
	  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	  var g = generator.apply(thisArg, _arguments || []), i, q = [];
	  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
	  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
	  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
	  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	  function fulfill(value) { resume("next", value); }
	  function reject(value) { resume("throw", value); }
	  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}
	function __asyncDelegator(o) {
	  var i, p;
	  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
	}
	function __asyncValues(o) {
	  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	  var m = o[Symbol.asyncIterator], i;
	  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}
	function __makeTemplateObject(cooked, raw) {
	  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	  return cooked;
	}var __setModuleDefault = Object.create ? (function(o, v) {
	  Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	  o["default"] = v;
	};
	function __importStar(mod) {
	  if (mod && mod.__esModule) return mod;
	  var result = {};
	  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	  __setModuleDefault(result, mod);
	  return result;
	}
	function __importDefault(mod) {
	  return (mod && mod.__esModule) ? mod : { default: mod };
	}
	function __classPrivateFieldGet(receiver, state, kind, f) {
	  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	}
	function __classPrivateFieldSet(receiver, state, value, kind, f) {
	  if (kind === "m") throw new TypeError("Private method is not writable");
	  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
	}
	function __classPrivateFieldIn(state, receiver) {
	  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
	  return typeof state === "function" ? receiver === state : state.has(receiver);
	}
	function __addDisposableResource(env, value, async) {
	  if (value !== null && value !== void 0) {
	    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
	    var dispose, inner;
	    if (async) {
	      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
	      dispose = value[Symbol.asyncDispose];
	    }
	    if (dispose === void 0) {
	      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
	      dispose = value[Symbol.dispose];
	      if (async) inner = dispose;
	    }
	    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
	    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
	    env.stack.push({ value: value, dispose: dispose, async: async });
	  }
	  else if (async) {
	    env.stack.push({ async: true });
	  }
	  return value;
	}
	var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
	  var e = new Error(message);
	  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
	};
	function __disposeResources(env) {
	  function fail(e) {
	    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
	    env.hasError = true;
	  }
	  var r, s = 0;
	  function next() {
	    while (r = env.stack.pop()) {
	      try {
	        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
	        if (r.dispose) {
	          var result = r.dispose.call(r.value);
	          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
	        }
	        else s |= 1;
	      }
	      catch (e) {
	        fail(e);
	      }
	    }
	    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
	    if (env.hasError) throw env.error;
	  }
	  return next();
	}
	function __rewriteRelativeImportExtension(path, preserveJsx) {
	  if (typeof path === "string" && /^\.\.?\//.test(path)) {
	      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
	          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
	      });
	  }
	  return path;
	}
	const tslib_es6 = {
	  __extends,
	  __assign,
	  __rest,
	  __decorate,
	  __param,
	  __esDecorate,
	  __runInitializers,
	  __propKey,
	  __setFunctionName,
	  __metadata,
	  __awaiter: __awaiter$4,
	  __generator,
	  __createBinding,
	  __exportStar,
	  __values,
	  __read,
	  __spread,
	  __spreadArrays,
	  __spreadArray,
	  __await,
	  __asyncGenerator,
	  __asyncDelegator,
	  __asyncValues,
	  __makeTemplateObject,
	  __importStar,
	  __importDefault,
	  __classPrivateFieldGet,
	  __classPrivateFieldSet,
	  __classPrivateFieldIn,
	  __addDisposableResource,
	  __disposeResources,
	  __rewriteRelativeImportExtension,
	};

	const tslib_es6$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		__addDisposableResource: __addDisposableResource,
		get __assign () { return __assign; },
		__asyncDelegator: __asyncDelegator,
		__asyncGenerator: __asyncGenerator,
		__asyncValues: __asyncValues,
		__await: __await,
		__awaiter: __awaiter$4,
		__classPrivateFieldGet: __classPrivateFieldGet,
		__classPrivateFieldIn: __classPrivateFieldIn,
		__classPrivateFieldSet: __classPrivateFieldSet,
		__createBinding: __createBinding,
		__decorate: __decorate,
		__disposeResources: __disposeResources,
		__esDecorate: __esDecorate,
		__exportStar: __exportStar,
		__extends: __extends,
		__generator: __generator,
		__importDefault: __importDefault,
		__importStar: __importStar,
		__makeTemplateObject: __makeTemplateObject,
		__metadata: __metadata,
		__param: __param,
		__propKey: __propKey,
		__read: __read,
		__rest: __rest,
		__rewriteRelativeImportExtension: __rewriteRelativeImportExtension,
		__runInitializers: __runInitializers,
		__setFunctionName: __setFunctionName,
		__spread: __spread,
		__spreadArray: __spreadArray,
		__spreadArrays: __spreadArrays,
		__values: __values,
		default: tslib_es6
	});

	const require$$0 = /*@__PURE__*/getAugmentedNamespace(tslib_es6$1);

	const EventEmitter = {};

	const createCustomErrorClass = (name) => {
	    class CustomErrorClass extends Error {
	        constructor(message, fields, options) {
	            super(message || name, options);
	            Object.setPrototypeOf(this, CustomErrorClass.prototype);
	            this.name = name;
	            if (fields) {
	                for (const k in fields) {
	                    this[k] = fields[k];
	                }
	            }
	            if (options && isObject(options) && "cause" in options && !("cause" in this)) {
	                const cause = options.cause;
	                this.cause = cause;
	                if ("stack" in cause) {
	                    this.stack = this.stack + "\nCAUSE: " + cause.stack;
	                }
	            }
	        }
	    }
	    return CustomErrorClass;
	};
	function isObject(value) {
	    return typeof value === "object";
	}

	const DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
	const DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
	const TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
	const TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
	const TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
	const TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
	var HwTransportErrorType;
	(function (HwTransportErrorType) {
	    HwTransportErrorType["Unknown"] = "Unknown";
	    HwTransportErrorType["LocationServicesDisabled"] = "LocationServicesDisabled";
	    HwTransportErrorType["LocationServicesUnauthorized"] = "LocationServicesUnauthorized";
	    HwTransportErrorType["BluetoothScanStartFailed"] = "BluetoothScanStartFailed";
	})(HwTransportErrorType || (HwTransportErrorType = {}));
	class TransportError extends Error {
	    constructor(message, id) {
	        const name = "TransportError";
	        super(message || name);
	        this.name = name;
	        this.message = message;
	        this.stack = new Error(message).stack;
	        this.id = id;
	    }
	}
	const StatusCodes = {
	    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
	    ALGORITHM_NOT_SUPPORTED: 0x9484,
	    CLA_NOT_SUPPORTED: 0x6e00,
	    CODE_BLOCKED: 0x9840,
	    CODE_NOT_INITIALIZED: 0x9802,
	    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
	    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
	    CONTRADICTION_INVALIDATION: 0x9810,
	    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
	    DEVICE_IN_RECOVERY_MODE: 0x662f,
	    CUSTOM_IMAGE_EMPTY: 0x662e,
	    FILE_ALREADY_EXISTS: 0x6a89,
	    FILE_NOT_FOUND: 0x9404,
	    GP_AUTH_FAILED: 0x6300,
	    HALTED: 0x6faa,
	    INCONSISTENT_FILE: 0x9408,
	    INCORRECT_DATA: 0x6a80,
	    INCORRECT_LENGTH: 0x6700,
	    INCORRECT_P1_P2: 0x6b00,
	    INS_NOT_SUPPORTED: 0x6d00,
	    DEVICE_NOT_ONBOARDED: 0x6d07,
	    DEVICE_NOT_ONBOARDED_2: 0x6611,
	    INVALID_KCV: 0x9485,
	    INVALID_OFFSET: 0x9402,
	    LICENSING: 0x6f42,
	    LOCKED_DEVICE: 0x5515,
	    MAX_VALUE_REACHED: 0x9850,
	    MEMORY_PROBLEM: 0x9240,
	    MISSING_CRITICAL_PARAMETER: 0x6800,
	    NO_EF_SELECTED: 0x9400,
	    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
	    OK: 0x9000,
	    PIN_REMAINING_ATTEMPTS: 0x63c0,
	    REFERENCED_DATA_NOT_FOUND: 0x6a88,
	    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
	    TECHNICAL_PROBLEM: 0x6f00,
	    UNKNOWN_APDU: 0x6d02,
	    USER_REFUSED_ON_DEVICE: 0x5501,
	    NOT_ENOUGH_SPACE: 0x5102,
	    APP_NOT_FOUND_OR_INVALID_CONTEXT: 0x5123,
	    INVALID_APP_NAME_LENGTH: 0x670a,
	    GEN_AES_KEY_FAILED: 0x5419,
	    INTERNAL_CRYPTO_OPERATION_FAILED: 0x541a,
	    INTERNAL_COMPUTE_AES_CMAC_FAILED: 0x541b,
	    ENCRYPT_APP_STORAGE_FAILED: 0x541c,
	    INVALID_BACKUP_STATE: 0x6642,
	    PIN_NOT_SET: 0x5502,
	    INVALID_BACKUP_LENGTH: 0x6733,
	    INVALID_RESTORE_STATE: 0x6643,
	    INVALID_CHUNK_LENGTH: 0x6734,
	    INVALID_BACKUP_HEADER: 0x684a,
	    TRUSTCHAIN_WRONG_SEED: 0xb007,
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
	        case 0x5515:
	            return "Locked device";
	    }
	    if (0x6f00 <= code && code <= 0x6fff) {
	        return "Internal error, please report";
	    }
	}
	class TransportStatusError extends Error {
	    constructor(statusCode, { canBeMappedToChildError = true } = {}) {
	        const statusText = Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
	        const smsg = getAltStatusMessage(statusCode) || statusText;
	        const statusCodeStr = statusCode.toString(16);
	        const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
	        super(message);
	        this.name = "TransportStatusError";
	        this.statusCode = statusCode;
	        this.statusText = statusText;
	        Object.setPrototypeOf(this, TransportStatusError.prototype);
	        if (canBeMappedToChildError && statusCode === StatusCodes.LOCKED_DEVICE) {
	            return new LockedDeviceError(message);
	        }
	    }
	}
	class LockedDeviceError extends TransportStatusError {
	    constructor(message) {
	        super(StatusCodes.LOCKED_DEVICE, { canBeMappedToChildError: false });
	        if (message) {
	            this.message = message;
	        }
	        this.name = "LockedDeviceError";
	        Object.setPrototypeOf(this, LockedDeviceError.prototype);
	    }
	}

	let id = 0;
	const subscribers = [];
	const log = (type, message, data) => {
	    const obj = {
	        type,
	        id: String(++id),
	        date: new Date(),
	    };
	    if (message)
	        obj.message = message;
	    if (data)
	        obj.data = data;
	    dispatch(obj);
	};
	const trace = ({ type, message, data, context, }) => {
	    const obj = {
	        type,
	        id: String(++id),
	        date: new Date(),
	    };
	    if (message)
	        obj.message = message;
	    if (data)
	        obj.data = data;
	    if (context)
	        obj.context = context;
	    dispatch(obj);
	};
	class LocalTracer {
	    constructor(type, context) {
	        this.type = type;
	        this.context = context;
	    }
	    trace(message, data) {
	        trace({
	            type: this.type,
	            message,
	            data,
	            context: this.context,
	        });
	    }
	    getContext() {
	        return this.context;
	    }
	    setContext(context) {
	        this.context = context;
	    }
	    updateContext(contextToAdd) {
	        this.context = Object.assign(Object.assign({}, this.context), contextToAdd);
	    }
	    getType() {
	        return this.type;
	    }
	    setType(type) {
	        this.type = type;
	    }
	    withType(type) {
	        return new LocalTracer(type, this.context);
	    }
	    withContext(context) {
	        return new LocalTracer(this.type, context);
	    }
	    withUpdatedContext(contextToAdd) {
	        return new LocalTracer(this.type, Object.assign(Object.assign({}, this.context), contextToAdd));
	    }
	}
	const listen = (cb) => {
	    subscribers.push(cb);
	    return () => {
	        const i = subscribers.indexOf(cb);
	        if (i !== -1) {
	            subscribers[i] = subscribers[subscribers.length - 1];
	            subscribers.pop();
	        }
	    };
	};
	function dispatch(log) {
	    for (let i = 0; i < subscribers.length; i++) {
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

	var __awaiter$3 = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const DEFAULT_LOG_TYPE = "transport";
	class Transport {
	    constructor({ context, logType } = {}) {
	        this.exchangeTimeout = 30000;
	        this.unresponsiveTimeout = 15000;
	        this.deviceModel = null;
	        this._events = new EventEmitter();
	        this.send = (cla_1, ins_1, p1_1, p2_1, ...args_1) => __awaiter$3(this, [cla_1, ins_1, p1_1, p2_1, ...args_1], void 0, function* (cla, ins, p1, p2, data = Buffer.alloc(0), statusList = [StatusCodes.OK], { abortTimeoutMs } = {}) {
	            const tracer = this.tracer.withUpdatedContext({ function: "send" });
	            if (data.length >= 256) {
	                tracer.trace("data.length exceeded 256 bytes limit", { dataLength: data.length });
	                throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
	            }
	            tracer.trace("Starting an exchange", { abortTimeoutMs });
	            const response = yield this.exchange(
	            Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]), { abortTimeoutMs });
	            tracer.trace("Received response from exchange");
	            const sw = response.readUInt16BE(response.length - 2);
	            if (!statusList.some(s => s === sw)) {
	                throw new TransportStatusError(sw);
	            }
	            return response;
	        });
	        this._appAPIlock = null;
	        this.tracer = new LocalTracer(logType !== null && logType !== void 0 ? logType : DEFAULT_LOG_TYPE, context);
	    }
	    exchange(_apdu, { abortTimeoutMs: _abortTimeoutMs } = {}) {
	        throw new Error("exchange not implemented");
	    }
	    exchangeBulk(apdus, observer) {
	        let unsubscribed = false;
	        const unsubscribe = () => {
	            unsubscribed = true;
	        };
	        const main = () => __awaiter$3(this, void 0, void 0, function* () {
	            if (unsubscribed)
	                return;
	            for (const apdu of apdus) {
	                const r = yield this.exchange(apdu);
	                if (unsubscribed)
	                    return;
	                const status = r.readUInt16BE(r.length - 2);
	                if (status !== StatusCodes.OK) {
	                    throw new TransportStatusError(status);
	                }
	                observer.next(r);
	            }
	        });
	        main().then(() => !unsubscribed && observer.complete(), e => !unsubscribed && observer.error(e));
	        return { unsubscribe };
	    }
	    setScrambleKey(_key) { }
	    close() {
	        return Promise.resolve();
	    }
	    on(eventName, cb) {
	        this._events.on(eventName, cb);
	    }
	    off(eventName, cb) {
	        this._events.removeListener(eventName, cb);
	    }
	    emit(event, ...args) {
	        this._events.emit(event, ...args);
	    }
	    setDebugMode() {
	        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
	    }
	    setExchangeTimeout(exchangeTimeout) {
	        this.exchangeTimeout = exchangeTimeout;
	    }
	    setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
	        this.unresponsiveTimeout = unresponsiveTimeout;
	    }
	    static create(openTimeout = 3000, listenTimeout) {
	        return new Promise((resolve, reject) => {
	            let found = false;
	            const sub = this.listen({
	                next: e => {
	                    found = true;
	                    if (sub)
	                        sub.unsubscribe();
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    this.open(e.descriptor, openTimeout).then(resolve, reject);
	                },
	                error: e => {
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    reject(e);
	                },
	                complete: () => {
	                    if (listenTimeoutId)
	                        clearTimeout(listenTimeoutId);
	                    if (!found) {
	                        reject(new TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
	                    }
	                },
	            });
	            const listenTimeoutId = listenTimeout
	                ? setTimeout(() => {
	                    sub.unsubscribe();
	                    reject(new TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"));
	                }, listenTimeout)
	                : null;
	        });
	    }
	    exchangeAtomicImpl(f) {
	        return __awaiter$3(this, void 0, void 0, function* () {
	            const tracer = this.tracer.withUpdatedContext({
	                function: "exchangeAtomicImpl",
	                unresponsiveTimeout: this.unresponsiveTimeout,
	            });
	            if (this.exchangeBusyPromise) {
	                tracer.trace("Atomic exchange is already busy");
	                throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
	            }
	            let resolveBusy;
	            const busyPromise = new Promise(r => {
	                resolveBusy = r;
	            });
	            this.exchangeBusyPromise = busyPromise;
	            let unresponsiveReached = false;
	            const timeout = setTimeout(() => {
	                tracer.trace(`Timeout reached, emitting Transport event "unresponsive"`, {
	                    unresponsiveTimeout: this.unresponsiveTimeout,
	                });
	                unresponsiveReached = true;
	                this.emit("unresponsive");
	            }, this.unresponsiveTimeout);
	            try {
	                const res = yield f();
	                if (unresponsiveReached) {
	                    tracer.trace("Device was unresponsive, emitting responsive");
	                    this.emit("responsive");
	                }
	                return res;
	            }
	            finally {
	                tracer.trace("Finalize, clearing busy guard");
	                clearTimeout(timeout);
	                if (resolveBusy)
	                    resolveBusy();
	                this.exchangeBusyPromise = null;
	            }
	        });
	    }
	    decorateAppAPIMethods(self, methods, scrambleKey) {
	        for (const methodName of methods) {
	            self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
	        }
	    }
	    decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
	        return (...args) => __awaiter$3(this, void 0, void 0, function* () {
	            const { _appAPIlock } = this;
	            if (_appAPIlock) {
	                return Promise.reject(new TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"));
	            }
	            try {
	                this._appAPIlock = methodName;
	                this.setScrambleKey(scrambleKey);
	                return yield f.apply(ctx, args);
	            }
	            finally {
	                this._appAPIlock = null;
	            }
	        });
	    }
	    setTraceContext(context) {
	        this.tracer = this.tracer.withContext(context);
	    }
	    updateTraceContext(contextToAdd) {
	        this.tracer.updateContext(contextToAdd);
	    }
	    getTraceContext() {
	        return this.tracer.getContext();
	    }
	}
	Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
	Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";

	const Tag = 0x05;
	function asUInt16BE(value) {
	    const b = Buffer.alloc(2);
	    b.writeUInt16BE(value, 0);
	    return b;
	}
	const initialAcc = {
	    data: Buffer.alloc(0),
	    dataLength: 0,
	    sequence: 0,
	};
	const createHIDframing = (channel, packetSize) => {
	    return {
	        makeBlocks(apdu) {
	            let data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
	            const blockSize = packetSize - 5;
	            const nbBlocks = Math.ceil(data.length / blockSize);
	            data = Buffer.concat([data, Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0)]);
	            const blocks = [];
	            for (let i = 0; i < nbBlocks; i++) {
	                const head = Buffer.alloc(5);
	                head.writeUInt16BE(channel, 0);
	                head.writeUInt8(Tag, 2);
	                head.writeUInt16BE(i, 3);
	                const chunk = data.slice(i * blockSize, (i + 1) * blockSize);
	                blocks.push(Buffer.concat([head, chunk]));
	            }
	            return blocks;
	        },
	        reduceResponse(acc, chunk) {
	            let { data, dataLength, sequence } = acc || initialAcc;
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
	            const chunkData = chunk.slice(acc ? 5 : 7);
	            data = Buffer.concat([data, chunkData]);
	            if (data.length > dataLength) {
	                data = data.slice(0, dataLength);
	            }
	            return {
	                data,
	                dataLength,
	                sequence,
	            };
	        },
	        getReducedResult(acc) {
	            if (acc && acc.dataLength === acc.data.length) {
	                return acc.data;
	            }
	        },
	    };
	};

	var re$2 = {exports: {}};

	const SEMVER_SPEC_VERSION = '2.0.0';
	const MAX_LENGTH$1 = 256;
	const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
	 9007199254740991;
	const MAX_SAFE_COMPONENT_LENGTH = 16;
	const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
	const RELEASE_TYPES = [
	  'major',
	  'premajor',
	  'minor',
	  'preminor',
	  'patch',
	  'prepatch',
	  'prerelease',
	];
	var constants$1 = {
	  MAX_LENGTH: MAX_LENGTH$1,
	  MAX_SAFE_COMPONENT_LENGTH,
	  MAX_SAFE_BUILD_LENGTH,
	  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
	  RELEASE_TYPES,
	  SEMVER_SPEC_VERSION,
	  FLAG_INCLUDE_PRERELEASE: 0b001,
	  FLAG_LOOSE: 0b010,
	};
	getDefaultExportFromCjs(constants$1);

	const debug$1 = (
	  typeof process === 'object' &&
	  process.env &&
	  process.env.NODE_DEBUG &&
	  /\bsemver\b/i.test(process.env.NODE_DEBUG)
	) ? (...args) => console.error('SEMVER', ...args)
	  : () => {};
	var debug_1 = debug$1;
	getDefaultExportFromCjs(debug_1);

	(function (module, exports) {
		const {
		  MAX_SAFE_COMPONENT_LENGTH,
		  MAX_SAFE_BUILD_LENGTH,
		  MAX_LENGTH,
		} = constants$1;
		const debug = debug_1;
		exports = module.exports = {};
		const re = exports.re = [];
		const safeRe = exports.safeRe = [];
		const src = exports.src = [];
		const t = exports.t = {};
		let R = 0;
		const LETTERDASHNUMBER = '[a-zA-Z0-9-]';
		const safeRegexReplacements = [
		  ['\\s', 1],
		  ['\\d', MAX_LENGTH],
		  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
		];
		const makeSafeRegex = (value) => {
		  for (const [token, max] of safeRegexReplacements) {
		    value = value
		      .split(`${token}*`).join(`${token}{0,${max}}`)
		      .split(`${token}+`).join(`${token}{1,${max}}`);
		  }
		  return value
		};
		const createToken = (name, value, isGlobal) => {
		  const safe = makeSafeRegex(value);
		  const index = R++;
		  debug(name, index, value);
		  t[name] = index;
		  src[index] = value;
		  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
		  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
		};
		createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
		createToken('NUMERICIDENTIFIERLOOSE', '\\d+');
		createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
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
		createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);
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
	} (re$2, re$2.exports));
	var reExports = re$2.exports;
	getDefaultExportFromCjs(reExports);

	const looseOption = Object.freeze({ loose: true });
	const emptyOpts = Object.freeze({ });
	const parseOptions$1 = options => {
	  if (!options) {
	    return emptyOpts
	  }
	  if (typeof options !== 'object') {
	    return looseOption
	  }
	  return options
	};
	var parseOptions_1 = parseOptions$1;
	getDefaultExportFromCjs(parseOptions_1);

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
	var identifiers$1 = {
	  compareIdentifiers: compareIdentifiers$1,
	  rcompareIdentifiers,
	};
	getDefaultExportFromCjs(identifiers$1);

	const debug = debug_1;
	const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants$1;
	const { safeRe: re$1, t: t$1 } = reExports;
	const parseOptions = parseOptions_1;
	const { compareIdentifiers } = identifiers$1;
	let SemVer$d = class SemVer {
	  constructor (version, options) {
	    options = parseOptions(options);
	    if (version instanceof SemVer) {
	      if (version.loose === !!options.loose &&
	          version.includePrerelease === !!options.includePrerelease) {
	        return version
	      } else {
	        version = version.version;
	      }
	    } else if (typeof version !== 'string') {
	      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
	    }
	    if (version.length > MAX_LENGTH) {
	      throw new TypeError(
	        `version is longer than ${MAX_LENGTH} characters`
	      )
	    }
	    debug('SemVer', version, options);
	    this.options = options;
	    this.loose = !!options.loose;
	    this.includePrerelease = !!options.includePrerelease;
	    const m = version.trim().match(options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]);
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
	    if (!(other instanceof SemVer)) {
	      if (typeof other === 'string' && other === this.version) {
	        return 0
	      }
	      other = new SemVer(other, this.options);
	    }
	    if (other.version === this.version) {
	      return 0
	    }
	    return this.compareMain(other) || this.comparePre(other)
	  }
	  compareMain (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
	    }
	    return (
	      compareIdentifiers(this.major, other.major) ||
	      compareIdentifiers(this.minor, other.minor) ||
	      compareIdentifiers(this.patch, other.patch)
	    )
	  }
	  comparePre (other) {
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
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
	    if (!(other instanceof SemVer)) {
	      other = new SemVer(other, this.options);
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
	  inc (release, identifier, identifierBase) {
	    switch (release) {
	      case 'premajor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor = 0;
	        this.major++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'preminor':
	        this.prerelease.length = 0;
	        this.patch = 0;
	        this.minor++;
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'prepatch':
	        this.prerelease.length = 0;
	        this.inc('patch', identifier, identifierBase);
	        this.inc('pre', identifier, identifierBase);
	        break
	      case 'prerelease':
	        if (this.prerelease.length === 0) {
	          this.inc('patch', identifier, identifierBase);
	        }
	        this.inc('pre', identifier, identifierBase);
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
	      case 'pre': {
	        const base = Number(identifierBase) ? 1 : 0;
	        if (!identifier && identifierBase === false) {
	          throw new Error('invalid increment argument: identifier is empty')
	        }
	        if (this.prerelease.length === 0) {
	          this.prerelease = [base];
	        } else {
	          let i = this.prerelease.length;
	          while (--i >= 0) {
	            if (typeof this.prerelease[i] === 'number') {
	              this.prerelease[i]++;
	              i = -2;
	            }
	          }
	          if (i === -1) {
	            if (identifier === this.prerelease.join('.') && identifierBase === false) {
	              throw new Error('invalid increment argument: identifier already exists')
	            }
	            this.prerelease.push(base);
	          }
	        }
	        if (identifier) {
	          let prerelease = [identifier, base];
	          if (identifierBase === false) {
	            prerelease = [identifier];
	          }
	          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
	            if (isNaN(this.prerelease[1])) {
	              this.prerelease = prerelease;
	            }
	          } else {
	            this.prerelease = prerelease;
	          }
	        }
	        break
	      }
	      default:
	        throw new Error(`invalid increment argument: ${release}`)
	    }
	    this.raw = this.format();
	    if (this.build.length) {
	      this.raw += `+${this.build.join('.')}`;
	    }
	    return this
	  }
	};
	var semver$2 = SemVer$d;
	getDefaultExportFromCjs(semver$2);

	const SemVer$c = semver$2;
	const parse$6 = (version, options, throwErrors = false) => {
	  if (version instanceof SemVer$c) {
	    return version
	  }
	  try {
	    return new SemVer$c(version, options)
	  } catch (er) {
	    if (!throwErrors) {
	      return null
	    }
	    throw er
	  }
	};
	var parse_1 = parse$6;
	getDefaultExportFromCjs(parse_1);

	const parse$5 = parse_1;
	const valid$2 = (version, options) => {
	  const v = parse$5(version, options);
	  return v ? v.version : null
	};
	var valid_1 = valid$2;
	getDefaultExportFromCjs(valid_1);

	const parse$4 = parse_1;
	const clean$1 = (version, options) => {
	  const s = parse$4(version.trim().replace(/^[=v]+/, ''), options);
	  return s ? s.version : null
	};
	var clean_1 = clean$1;
	getDefaultExportFromCjs(clean_1);

	const SemVer$b = semver$2;
	const inc$1 = (version, release, options, identifier, identifierBase) => {
	  if (typeof (options) === 'string') {
	    identifierBase = identifier;
	    identifier = options;
	    options = undefined;
	  }
	  try {
	    return new SemVer$b(
	      version instanceof SemVer$b ? version.version : version,
	      options
	    ).inc(release, identifier, identifierBase).version
	  } catch (er) {
	    return null
	  }
	};
	var inc_1 = inc$1;
	getDefaultExportFromCjs(inc_1);

	const parse$3 = parse_1;
	const diff$1 = (version1, version2) => {
	  const v1 = parse$3(version1, null, true);
	  const v2 = parse$3(version2, null, true);
	  const comparison = v1.compare(v2);
	  if (comparison === 0) {
	    return null
	  }
	  const v1Higher = comparison > 0;
	  const highVersion = v1Higher ? v1 : v2;
	  const lowVersion = v1Higher ? v2 : v1;
	  const highHasPre = !!highVersion.prerelease.length;
	  const lowHasPre = !!lowVersion.prerelease.length;
	  if (lowHasPre && !highHasPre) {
	    if (!lowVersion.patch && !lowVersion.minor) {
	      return 'major'
	    }
	    if (highVersion.patch) {
	      return 'patch'
	    }
	    if (highVersion.minor) {
	      return 'minor'
	    }
	    return 'major'
	  }
	  const prefix = highHasPre ? 'pre' : '';
	  if (v1.major !== v2.major) {
	    return prefix + 'major'
	  }
	  if (v1.minor !== v2.minor) {
	    return prefix + 'minor'
	  }
	  if (v1.patch !== v2.patch) {
	    return prefix + 'patch'
	  }
	  return 'prerelease'
	};
	var diff_1 = diff$1;
	getDefaultExportFromCjs(diff_1);

	const SemVer$a = semver$2;
	const major$1 = (a, loose) => new SemVer$a(a, loose).major;
	var major_1 = major$1;
	getDefaultExportFromCjs(major_1);

	const SemVer$9 = semver$2;
	const minor$1 = (a, loose) => new SemVer$9(a, loose).minor;
	var minor_1 = minor$1;
	getDefaultExportFromCjs(minor_1);

	const SemVer$8 = semver$2;
	const patch$1 = (a, loose) => new SemVer$8(a, loose).patch;
	var patch_1 = patch$1;
	getDefaultExportFromCjs(patch_1);

	const parse$2 = parse_1;
	const prerelease$1 = (version, options) => {
	  const parsed = parse$2(version, options);
	  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
	};
	var prerelease_1 = prerelease$1;
	getDefaultExportFromCjs(prerelease_1);

	const SemVer$7 = semver$2;
	const compare$b = (a, b, loose) =>
	  new SemVer$7(a, loose).compare(new SemVer$7(b, loose));
	var compare_1 = compare$b;
	getDefaultExportFromCjs(compare_1);

	const compare$a = compare_1;
	const rcompare$1 = (a, b, loose) => compare$a(b, a, loose);
	var rcompare_1 = rcompare$1;
	getDefaultExportFromCjs(rcompare_1);

	const compare$9 = compare_1;
	const compareLoose$1 = (a, b) => compare$9(a, b, true);
	var compareLoose_1 = compareLoose$1;
	getDefaultExportFromCjs(compareLoose_1);

	const SemVer$6 = semver$2;
	const compareBuild$3 = (a, b, loose) => {
	  const versionA = new SemVer$6(a, loose);
	  const versionB = new SemVer$6(b, loose);
	  return versionA.compare(versionB) || versionA.compareBuild(versionB)
	};
	var compareBuild_1 = compareBuild$3;
	getDefaultExportFromCjs(compareBuild_1);

	const compareBuild$2 = compareBuild_1;
	const sort$1 = (list, loose) => list.sort((a, b) => compareBuild$2(a, b, loose));
	var sort_1 = sort$1;
	getDefaultExportFromCjs(sort_1);

	const compareBuild$1 = compareBuild_1;
	const rsort$1 = (list, loose) => list.sort((a, b) => compareBuild$1(b, a, loose));
	var rsort_1 = rsort$1;
	getDefaultExportFromCjs(rsort_1);

	const compare$8 = compare_1;
	const gt$4 = (a, b, loose) => compare$8(a, b, loose) > 0;
	var gt_1 = gt$4;
	getDefaultExportFromCjs(gt_1);

	const compare$7 = compare_1;
	const lt$3 = (a, b, loose) => compare$7(a, b, loose) < 0;
	var lt_1 = lt$3;
	getDefaultExportFromCjs(lt_1);

	const compare$6 = compare_1;
	const eq$2 = (a, b, loose) => compare$6(a, b, loose) === 0;
	var eq_1 = eq$2;
	getDefaultExportFromCjs(eq_1);

	const compare$5 = compare_1;
	const neq$2 = (a, b, loose) => compare$5(a, b, loose) !== 0;
	var neq_1 = neq$2;
	getDefaultExportFromCjs(neq_1);

	const compare$4 = compare_1;
	const gte$3 = (a, b, loose) => compare$4(a, b, loose) >= 0;
	var gte_1 = gte$3;
	getDefaultExportFromCjs(gte_1);

	const compare$3 = compare_1;
	const lte$3 = (a, b, loose) => compare$3(a, b, loose) <= 0;
	var lte_1 = lte$3;
	getDefaultExportFromCjs(lte_1);

	const eq$1 = eq_1;
	const neq$1 = neq_1;
	const gt$3 = gt_1;
	const gte$2 = gte_1;
	const lt$2 = lt_1;
	const lte$2 = lte_1;
	const cmp$1 = (a, op, b, loose) => {
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
	      return eq$1(a, b, loose)
	    case '!=':
	      return neq$1(a, b, loose)
	    case '>':
	      return gt$3(a, b, loose)
	    case '>=':
	      return gte$2(a, b, loose)
	    case '<':
	      return lt$2(a, b, loose)
	    case '<=':
	      return lte$2(a, b, loose)
	    default:
	      throw new TypeError(`Invalid operator: ${op}`)
	  }
	};
	var cmp_1 = cmp$1;
	getDefaultExportFromCjs(cmp_1);

	const SemVer$5 = semver$2;
	const parse$1 = parse_1;
	const { safeRe: re, t } = reExports;
	const coerce$1 = (version, options) => {
	  if (version instanceof SemVer$5) {
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
	  return parse$1(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
	};
	var coerce_1 = coerce$1;
	getDefaultExportFromCjs(coerce_1);

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
		    this.raw = range
		      .trim()
		      .split(/\s+/)
		      .join(' ');
		    this.set = this.raw
		      .split('||')
		      .map(r => this.parseRange(r.trim()))
		      .filter(c => c.length);
		    if (!this.set.length) {
		      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
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
		      .map((comps) => comps.join(' ').trim())
		      .join('||')
		      .trim();
		    return this.range
		  }
		  toString () {
		    return this.range
		  }
		  parseRange (range) {
		    const memoOpts =
		      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
		      (this.options.loose && FLAG_LOOSE);
		    const memoKey = memoOpts + ':' + range;
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
		    debug('tilde trim', range);
		    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
		    debug('caret trim', range);
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
		const SemVer = semver$2;
		const {
		  safeRe: re,
		  t,
		  comparatorTrimReplace,
		  tildeTrimReplace,
		  caretTrimReplace,
		} = reExports;
		const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = constants$1;
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
		const replaceTildes = (comp, options) => {
		  return comp
		    .trim()
		    .split(/\s+/)
		    .map((c) => replaceTilde(c, options))
		    .join(' ')
		};
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
		const replaceCarets = (comp, options) => {
		  return comp
		    .trim()
		    .split(/\s+/)
		    .map((c) => replaceCaret(c, options))
		    .join(' ')
		};
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
		  return comp
		    .split(/\s+/)
		    .map((c) => replaceXRange(c, options))
		    .join(' ')
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
		  return comp
		    .trim()
		    .replace(re[t.STAR], '')
		};
		const replaceGTE0 = (comp, options) => {
		  debug('replaceGTE0', comp, options);
		  return comp
		    .trim()
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
		  return `${from} ${to}`.trim()
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
		    comp = comp.trim().split(/\s+/).join(' ');
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
		    options = parseOptions(options);
		    if (options.includePrerelease &&
		      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
		      return false
		    }
		    if (!options.includePrerelease &&
		      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
		      return false
		    }
		    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
		      return true
		    }
		    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
		      return true
		    }
		    if (
		      (this.semver.version === comp.semver.version) &&
		      this.operator.includes('=') && comp.operator.includes('=')) {
		      return true
		    }
		    if (cmp(this.semver, '<', comp.semver, options) &&
		      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
		      return true
		    }
		    if (cmp(this.semver, '>', comp.semver, options) &&
		      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
		      return true
		    }
		    return false
		  }
		}
		comparator = Comparator;
		const parseOptions = parseOptions_1;
		const { safeRe: re, t } = reExports;
		const cmp = cmp_1;
		const debug = debug_1;
		const SemVer = semver$2;
		const Range = requireRange();
		return comparator;
	}

	const Range$9 = requireRange();
	const satisfies$4 = (version, range, options) => {
	  try {
	    range = new Range$9(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	var satisfies_1 = satisfies$4;
	getDefaultExportFromCjs(satisfies_1);

	const Range$8 = requireRange();
	const toComparators$1 = (range, options) =>
	  new Range$8(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));
	var toComparators_1 = toComparators$1;
	getDefaultExportFromCjs(toComparators_1);

	const SemVer$4 = semver$2;
	const Range$7 = requireRange();
	const maxSatisfying$1 = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range$7(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      if (!max || maxSV.compare(v) === -1) {
	        max = v;
	        maxSV = new SemVer$4(max, options);
	      }
	    }
	  });
	  return max
	};
	var maxSatisfying_1 = maxSatisfying$1;
	getDefaultExportFromCjs(maxSatisfying_1);

	const SemVer$3 = semver$2;
	const Range$6 = requireRange();
	const minSatisfying$1 = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range$6(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      if (!min || minSV.compare(v) === 1) {
	        min = v;
	        minSV = new SemVer$3(min, options);
	      }
	    }
	  });
	  return min
	};
	var minSatisfying_1 = minSatisfying$1;
	getDefaultExportFromCjs(minSatisfying_1);

	const SemVer$2 = semver$2;
	const Range$5 = requireRange();
	const gt$2 = gt_1;
	const minVersion$1 = (range, loose) => {
	  range = new Range$5(range, loose);
	  let minver = new SemVer$2('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }
	  minver = new SemVer$2('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }
	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];
	    let setMin = null;
	    comparators.forEach((comparator) => {
	      const compver = new SemVer$2(comparator.semver.version);
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
	          if (!setMin || gt$2(compver, setMin)) {
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
	    if (setMin && (!minver || gt$2(minver, setMin))) {
	      minver = setMin;
	    }
	  }
	  if (minver && range.test(minver)) {
	    return minver
	  }
	  return null
	};
	var minVersion_1 = minVersion$1;
	getDefaultExportFromCjs(minVersion_1);

	const Range$4 = requireRange();
	const validRange$1 = (range, options) => {
	  try {
	    return new Range$4(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	var valid$1 = validRange$1;
	getDefaultExportFromCjs(valid$1);

	const SemVer$1 = semver$2;
	const Comparator$2 = requireComparator();
	const { ANY: ANY$1 } = Comparator$2;
	const Range$3 = requireRange();
	const satisfies$3 = satisfies_1;
	const gt$1 = gt_1;
	const lt$1 = lt_1;
	const lte$1 = lte_1;
	const gte$1 = gte_1;
	const outside$3 = (version, range, hilo, options) => {
	  version = new SemVer$1(version, options);
	  range = new Range$3(range, options);
	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt$1;
	      ltefn = lte$1;
	      ltfn = lt$1;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt$1;
	      ltefn = gte$1;
	      ltfn = gt$1;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }
	  if (satisfies$3(version, range, options)) {
	    return false
	  }
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];
	    let high = null;
	    let low = null;
	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY$1) {
	        comparator = new Comparator$2('>=0.0.0');
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
	var outside_1 = outside$3;
	getDefaultExportFromCjs(outside_1);

	const outside$2 = outside_1;
	const gtr$1 = (version, range, options) => outside$2(version, range, '>', options);
	var gtr_1 = gtr$1;
	getDefaultExportFromCjs(gtr_1);

	const outside$1 = outside_1;
	const ltr$1 = (version, range, options) => outside$1(version, range, '<', options);
	var ltr_1 = ltr$1;
	getDefaultExportFromCjs(ltr_1);

	const Range$2 = requireRange();
	const intersects$1 = (r1, r2, options) => {
	  r1 = new Range$2(r1, options);
	  r2 = new Range$2(r2, options);
	  return r1.intersects(r2, options)
	};
	var intersects_1 = intersects$1;
	getDefaultExportFromCjs(intersects_1);

	const satisfies$2 = satisfies_1;
	const compare$2 = compare_1;
	var simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare$2(a, b, options));
	  for (const version of v) {
	    const included = satisfies$2(version, range, options);
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
	getDefaultExportFromCjs(simplify);

	const Range$1 = requireRange();
	const Comparator$1 = requireComparator();
	const { ANY } = Comparator$1;
	const satisfies$1 = satisfies_1;
	const compare$1 = compare_1;
	const subset$1 = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }
	  sub = new Range$1(sub, options);
	  dom = new Range$1(dom, options);
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
	const minimumVersionWithPreRelease = [new Comparator$1('>=0.0.0-0')];
	const minimumVersion = [new Comparator$1('>=0.0.0')];
	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }
	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = minimumVersionWithPreRelease;
	    } else {
	      sub = minimumVersion;
	    }
	  }
	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = minimumVersion;
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
	    gtltComp = compare$1(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }
	  for (const eq of eqSet) {
	    if (gt && !satisfies$1(eq, String(gt), options)) {
	      return null
	    }
	    if (lt && !satisfies$1(eq, String(lt), options)) {
	      return null
	    }
	    for (const c of dom) {
	      if (!satisfies$1(eq, String(c), options)) {
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
	      } else if (gt.operator === '>=' && !satisfies$1(gt.semver, String(c), options)) {
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
	      } else if (lt.operator === '<=' && !satisfies$1(lt.semver, String(c), options)) {
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
	  const comp = compare$1(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare$1(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};
	var subset_1 = subset$1;
	getDefaultExportFromCjs(subset_1);

	const internalRe = reExports;
	const constants = constants$1;
	const SemVer = semver$2;
	const identifiers = identifiers$1;
	const parse = parse_1;
	const valid = valid_1;
	const clean = clean_1;
	const inc = inc_1;
	const diff = diff_1;
	const major = major_1;
	const minor = minor_1;
	const patch = patch_1;
	const prerelease = prerelease_1;
	const compare = compare_1;
	const rcompare = rcompare_1;
	const compareLoose = compareLoose_1;
	const compareBuild = compareBuild_1;
	const sort = sort_1;
	const rsort = rsort_1;
	const gt = gt_1;
	const lt = lt_1;
	const eq = eq_1;
	const neq = neq_1;
	const gte = gte_1;
	const lte = lte_1;
	const cmp = cmp_1;
	const coerce = coerce_1;
	const Comparator = requireComparator();
	const Range = requireRange();
	const satisfies = satisfies_1;
	const toComparators = toComparators_1;
	const maxSatisfying = maxSatisfying_1;
	const minSatisfying = minSatisfying_1;
	const minVersion = minVersion_1;
	const validRange = valid$1;
	const outside = outside_1;
	const gtr = gtr_1;
	const ltr = ltr_1;
	const intersects = intersects_1;
	const simplifyRange = simplify;
	const subset = subset_1;
	var semver = {
	  parse,
	  valid,
	  clean,
	  inc,
	  diff,
	  major,
	  minor,
	  patch,
	  prerelease,
	  compare,
	  rcompare,
	  compareLoose,
	  compareBuild,
	  sort,
	  rsort,
	  gt,
	  lt,
	  eq,
	  neq,
	  gte,
	  lte,
	  cmp,
	  coerce,
	  Comparator,
	  Range,
	  satisfies,
	  toComparators,
	  maxSatisfying,
	  minSatisfying,
	  minVersion,
	  validRange,
	  outside,
	  gtr,
	  ltr,
	  intersects,
	  simplifyRange,
	  subset,
	  SemVer,
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  RELEASE_TYPES: constants.RELEASE_TYPES,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	};
	const semver$1 = getDefaultExportFromCjs(semver);

	var DeviceModelId;
	(function (DeviceModelId) {
	    DeviceModelId["blue"] = "blue";
	    DeviceModelId["nanoS"] = "nanoS";
	    DeviceModelId["nanoSP"] = "nanoSP";
	    DeviceModelId["nanoX"] = "nanoX";
	    DeviceModelId["stax"] = "stax";
	    DeviceModelId["europa"] = "europa";
	})(DeviceModelId || (DeviceModelId = {}));
	const devices = {
	    [DeviceModelId.blue]: {
	        id: DeviceModelId.blue,
	        productName: "Ledger Blue",
	        productIdMM: 0x00,
	        legacyUsbProductId: 0x0000,
	        usbOnly: true,
	        memorySize: 480 * 1024,
	        masks: [0x31000000, 0x31010000],
	        getBlockSize: (_firwareVersion) => 4 * 1024,
	    },
	    [DeviceModelId.nanoS]: {
	        id: DeviceModelId.nanoS,
	        productName: "Ledger Nano S",
	        productIdMM: 0x10,
	        legacyUsbProductId: 0x0001,
	        usbOnly: true,
	        memorySize: 320 * 1024,
	        masks: [0x31100000],
	        getBlockSize: (firmwareVersion) => { var _a; return semver$1.lt((_a = semver$1.coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0") ? 4 * 1024 : 2 * 1024; },
	    },
	    [DeviceModelId.nanoX]: {
	        id: DeviceModelId.nanoX,
	        productName: "Ledger Nano X",
	        productIdMM: 0x40,
	        legacyUsbProductId: 0x0004,
	        usbOnly: false,
	        memorySize: 2 * 1024 * 1024,
	        masks: [0x33000000],
	        getBlockSize: (_firwareVersion) => 4 * 1024,
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572",
	            },
	        ],
	    },
	    [DeviceModelId.nanoSP]: {
	        id: DeviceModelId.nanoSP,
	        productName: "Ledger Nano S Plus",
	        productIdMM: 0x50,
	        legacyUsbProductId: 0x0005,
	        usbOnly: true,
	        memorySize: 1533 * 1024,
	        masks: [0x33100000],
	        getBlockSize: (_firmwareVersion) => 32,
	    },
	    [DeviceModelId.stax]: {
	        id: DeviceModelId.stax,
	        productName: "Ledger Stax",
	        productIdMM: 0x60,
	        legacyUsbProductId: 0x0006,
	        usbOnly: false,
	        memorySize: 1533 * 1024,
	        masks: [0x33200000],
	        getBlockSize: (_firmwareVersion) => 32,
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572",
	            },
	        ],
	    },
	    [DeviceModelId.europa]: {
	        id: DeviceModelId.europa,
	        productName: "Ledger Flex",
	        productIdMM: 0x70,
	        legacyUsbProductId: 0x0007,
	        usbOnly: false,
	        memorySize: 1533 * 1024,
	        masks: [0x33300000],
	        getBlockSize: (_firmwareVersion) => 32,
	        bluetoothSpec: [
	            {
	                serviceUuid: "13d63400-2c97-3004-0000-4c6564676572",
	                notifyUuid: "13d63400-2c97-3004-0001-4c6564676572",
	                writeUuid: "13d63400-2c97-3004-0002-4c6564676572",
	                writeCmdUuid: "13d63400-2c97-3004-0003-4c6564676572",
	            },
	        ],
	    },
	};
	({
	    Blue: DeviceModelId.blue,
	    "Nano S": DeviceModelId.nanoS,
	    "Nano S Plus": DeviceModelId.nanoSP,
	    "Nano X": DeviceModelId.nanoX,
	    Stax: DeviceModelId.stax,
	    Europa: DeviceModelId.europa,
	});
	const devicesList = Object.values(devices);
	const ledgerUSBVendorId = 0x2c97;
	const identifyUSBProductId = (usbProductId) => {
	    const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId);
	    if (legacy)
	        return legacy;
	    const mm = usbProductId >> 8;
	    const deviceModel = devicesList.find(d => d.productIdMM === mm);
	    return deviceModel;
	};
	const bluetoothServices = [];
	const serviceUuidToInfos = {};
	for (const id in devices) {
	    const deviceModel = devices[id];
	    const { bluetoothSpec } = deviceModel;
	    if (bluetoothSpec) {
	        for (let i = 0; i < bluetoothSpec.length; i++) {
	            const spec = bluetoothSpec[i];
	            bluetoothServices.push(spec.serviceUuid);
	            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = Object.assign({ deviceModel }, spec);
	        }
	    }
	}

	var __awaiter$2 = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const ledgerDevices$1 = [
	    {
	        vendorId: ledgerUSBVendorId,
	    },
	];
	const isSupported$1 = () => Promise.resolve(!!(window.navigator && window.navigator.hid));
	const getHID = () => {
	    const { hid } = navigator;
	    if (!hid)
	        throw new TransportError("navigator.hid is not supported", "HIDNotSupported");
	    return hid;
	};
	function requestLedgerDevices() {
	    return __awaiter$2(this, void 0, void 0, function* () {
	        const device = yield getHID().requestDevice({
	            filters: ledgerDevices$1,
	        });
	        if (Array.isArray(device))
	            return device;
	        return [device];
	    });
	}
	function getLedgerDevices$1() {
	    return __awaiter$2(this, void 0, void 0, function* () {
	        const devices = yield getHID().getDevices();
	        return devices.filter(d => d.vendorId === ledgerUSBVendorId);
	    });
	}
	function getFirstLedgerDevice$1() {
	    return __awaiter$2(this, void 0, void 0, function* () {
	        const existingDevices = yield getLedgerDevices$1();
	        if (existingDevices.length > 0)
	            return existingDevices[0];
	        const devices = yield requestLedgerDevices();
	        return devices[0];
	    });
	}
	class TransportWebHID extends Transport {
	    constructor(device) {
	        super();
	        this.channel = Math.floor(Math.random() * 0xffff);
	        this.packetSize = 64;
	        this.inputs = [];
	        this.read = () => {
	            if (this.inputs.length) {
	                return Promise.resolve(this.inputs.shift());
	            }
	            return new Promise(success => {
	                this.inputCallback = success;
	            });
	        };
	        this.onInputReport = (e) => {
	            const buffer = Buffer.from(e.data.buffer);
	            if (this.inputCallback) {
	                this.inputCallback(buffer);
	                this.inputCallback = null;
	            }
	            else {
	                this.inputs.push(buffer);
	            }
	        };
	        this._disconnectEmitted = false;
	        this._emitDisconnect = (e) => {
	            if (this._disconnectEmitted)
	                return;
	            this._disconnectEmitted = true;
	            this.emit("disconnect", e);
	        };
	        this.exchange = (apdu) => __awaiter$2(this, void 0, void 0, function* () {
	            const b = yield this.exchangeAtomicImpl(() => __awaiter$2(this, void 0, void 0, function* () {
	                const { channel, packetSize } = this;
	                log("apdu", "=> " + apdu.toString("hex"));
	                const framing = createHIDframing(channel, packetSize);
	                const blocks = framing.makeBlocks(apdu);
	                for (let i = 0; i < blocks.length; i++) {
	                    yield this.device.sendReport(0, blocks[i]);
	                }
	                let result;
	                let acc;
	                while (!(result = framing.getReducedResult(acc))) {
	                    const buffer = yield this.read();
	                    acc = framing.reduceResponse(acc, buffer);
	                }
	                log("apdu", "<= " + result.toString("hex"));
	                return result;
	            })).catch(e => {
	                if (e && e.message && e.message.includes("write")) {
	                    this._emitDisconnect(e);
	                    throw new DisconnectedDeviceDuringOperation(e.message);
	                }
	                throw e;
	            });
	            return b;
	        });
	        this.device = device;
	        this.deviceModel =
	            typeof device.productId === "number" ? identifyUSBProductId(device.productId) : undefined;
	        device.addEventListener("inputreport", this.onInputReport);
	    }
	    static request() {
	        return __awaiter$2(this, void 0, void 0, function* () {
	            const [device] = yield requestLedgerDevices();
	            return TransportWebHID.open(device);
	        });
	    }
	    static openConnected() {
	        return __awaiter$2(this, void 0, void 0, function* () {
	            const devices = yield getLedgerDevices$1();
	            if (devices.length === 0)
	                return null;
	            return TransportWebHID.open(devices[0]);
	        });
	    }
	    static open(device) {
	        return __awaiter$2(this, void 0, void 0, function* () {
	            yield device.open();
	            const transport = new TransportWebHID(device);
	            const onDisconnect = e => {
	                if (device === e.device) {
	                    getHID().removeEventListener("disconnect", onDisconnect);
	                    transport._emitDisconnect(new DisconnectedDevice());
	                }
	            };
	            getHID().addEventListener("disconnect", onDisconnect);
	            return transport;
	        });
	    }
	    close() {
	        return __awaiter$2(this, void 0, void 0, function* () {
	            yield this.exchangeBusyPromise;
	            this.device.removeEventListener("inputreport", this.onInputReport);
	            yield this.device.close();
	        });
	    }
	    setScrambleKey() { }
	}
	TransportWebHID.isSupported = isSupported$1;
	TransportWebHID.list = getLedgerDevices$1;
	TransportWebHID.listen = (observer) => {
	    let unsubscribed = false;
	    getFirstLedgerDevice$1().then(device => {
	        if (!device) {
	            observer.error(new TransportOpenUserCancelled("Access denied to use Ledger device"));
	        }
	        else if (!unsubscribed) {
	            const deviceModel = typeof device.productId === "number"
	                ? identifyUSBProductId(device.productId)
	                : undefined;
	            observer.next({
	                type: "add",
	                descriptor: device,
	                deviceModel,
	            });
	            observer.complete();
	        }
	    }, error => {
	        observer.error(new TransportOpenUserCancelled(error.message));
	    });
	    function unsubscribe() {
	        unsubscribed = true;
	    }
	    return {
	        unsubscribe,
	    };
	};

	const TransportWebHID$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: TransportWebHID
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
	const ledgerDevices = [
	    {
	        vendorId: ledgerUSBVendorId,
	    },
	];
	function requestLedgerDevice() {
	    return __awaiter$1(this, void 0, void 0, function* () {
	        const device = yield navigator.usb.requestDevice({
	            filters: ledgerDevices,
	        });
	        return device;
	    });
	}
	function getLedgerDevices() {
	    return __awaiter$1(this, void 0, void 0, function* () {
	        const devices = yield navigator.usb.getDevices();
	        return devices.filter(d => d.vendorId === ledgerUSBVendorId);
	    });
	}
	function getFirstLedgerDevice() {
	    return __awaiter$1(this, void 0, void 0, function* () {
	        const existingDevices = yield getLedgerDevices();
	        if (existingDevices.length > 0)
	            return existingDevices[0];
	        return requestLedgerDevice();
	    });
	}
	const isSupported = () => Promise.resolve(!!navigator && !!navigator.usb && typeof navigator.usb.getDevices === "function");

	var __awaiter = (global && global.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const configurationValue = 1;
	const endpointNumber = 3;
	class TransportWebUSB extends Transport {
	    constructor(device, interfaceNumber) {
	        super();
	        this.channel = Math.floor(Math.random() * 0xffff);
	        this.packetSize = 64;
	        this._disconnectEmitted = false;
	        this._emitDisconnect = (e) => {
	            if (this._disconnectEmitted)
	                return;
	            this._disconnectEmitted = true;
	            this.emit("disconnect", e);
	        };
	        this.device = device;
	        this.interfaceNumber = interfaceNumber;
	        this.deviceModel = identifyUSBProductId(device.productId);
	    }
	    static request() {
	        return __awaiter(this, void 0, void 0, function* () {
	            const device = yield requestLedgerDevice();
	            return TransportWebUSB.open(device);
	        });
	    }
	    static openConnected() {
	        return __awaiter(this, void 0, void 0, function* () {
	            const devices = yield getLedgerDevices();
	            if (devices.length === 0)
	                return null;
	            return TransportWebUSB.open(devices[0]);
	        });
	    }
	    static open(device) {
	        return __awaiter(this, void 0, void 0, function* () {
	            yield device.open();
	            if (device.configuration === null) {
	                yield device.selectConfiguration(configurationValue);
	            }
	            yield gracefullyResetDevice(device);
	            const iface = device.configurations[0].interfaces.find(({ alternates }) => alternates.some(a => a.interfaceClass === 255));
	            if (!iface) {
	                throw new TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
	            }
	            const interfaceNumber = iface.interfaceNumber;
	            try {
	                yield device.claimInterface(interfaceNumber);
	            }
	            catch (e) {
	                yield device.close();
	                throw new TransportInterfaceNotAvailable(e.message);
	            }
	            const transport = new TransportWebUSB(device, interfaceNumber);
	            const onDisconnect = e => {
	                if (device === e.device) {
	                    navigator.usb.removeEventListener("disconnect", onDisconnect);
	                    transport._emitDisconnect(new DisconnectedDevice());
	                }
	            };
	            navigator.usb.addEventListener("disconnect", onDisconnect);
	            return transport;
	        });
	    }
	    close() {
	        return __awaiter(this, void 0, void 0, function* () {
	            yield this.exchangeBusyPromise;
	            yield this.device.releaseInterface(this.interfaceNumber);
	            yield gracefullyResetDevice(this.device);
	            yield this.device.close();
	        });
	    }
	    exchange(apdu) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const b = yield this.exchangeAtomicImpl(() => __awaiter(this, void 0, void 0, function* () {
	                const { channel, packetSize } = this;
	                log("apdu", "=> " + apdu.toString("hex"));
	                const framing = createHIDframing(channel, packetSize);
	                const blocks = framing.makeBlocks(apdu);
	                for (let i = 0; i < blocks.length; i++) {
	                    yield this.device.transferOut(endpointNumber, blocks[i]);
	                }
	                let result;
	                let acc;
	                while (!(result = framing.getReducedResult(acc))) {
	                    const r = yield this.device.transferIn(endpointNumber, packetSize);
	                    const buffer = Buffer.from(r.data.buffer);
	                    acc = framing.reduceResponse(acc, buffer);
	                }
	                log("apdu", "<= " + result.toString("hex"));
	                return result;
	            })).catch(e => {
	                if (e && e.message && e.message.includes("disconnected")) {
	                    this._emitDisconnect(e);
	                    throw new DisconnectedDeviceDuringOperation(e.message);
	                }
	                throw e;
	            });
	            return b;
	        });
	    }
	    setScrambleKey() { }
	}
	TransportWebUSB.isSupported = isSupported;
	TransportWebUSB.list = getLedgerDevices;
	TransportWebUSB.listen = (observer) => {
	    let unsubscribed = false;
	    getFirstLedgerDevice().then(device => {
	        if (!unsubscribed) {
	            const deviceModel = identifyUSBProductId(device.productId);
	            observer.next({
	                type: "add",
	                descriptor: device,
	                deviceModel,
	            });
	            observer.complete();
	        }
	    }, error => {
	        if (window.DOMException && error instanceof window.DOMException && error.code === 18) {
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
	        unsubscribe,
	    };
	};
	function gracefullyResetDevice(device) {
	    return __awaiter(this, void 0, void 0, function* () {
	        try {
	            yield device.reset();
	        }
	        catch (err) {
	            console.warn(err);
	        }
	    });
	}

	const TransportWebUSB$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: TransportWebUSB
	});

	const require$$2 = /*@__PURE__*/getAugmentedNamespace(TransportWebUSB$1);

	var util = {};

	var hasRequiredUtil;
	function requireUtil () {
		if (hasRequiredUtil) return util;
		hasRequiredUtil = 1;
		Object.defineProperty(util, "__esModule", { value: true });
		util.createDefs = createDefs;
		function createDefs(...items) {
		    return items.map(([type, Clazz]) => ({
		        create: () => Clazz.create(),
		        type
		    }));
		}
		return util;
	}

	var packageInfo = {};

	var hasRequiredPackageInfo;
	function requirePackageInfo () {
		if (hasRequiredPackageInfo) return packageInfo;
		hasRequiredPackageInfo = 1;
		Object.defineProperty(packageInfo, "__esModule", { value: true });
		packageInfo.packageInfo = void 0;
		packageInfo.packageInfo = { name: '@polkadot/hw-ledger-transports', path: typeof __dirname === 'string' ? __dirname : 'auto', type: 'cjs', version: '13.5.7' };
		return packageInfo;
	}

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.transports = exports.packageInfo = void 0;
		const tslib_1 = require$$0;
		const hw_transport_webhid_1 = tslib_1.__importDefault(require$$1);
		const hw_transport_webusb_1 = tslib_1.__importDefault(require$$2);
		const util_js_1 = requireUtil();
		var packageInfo_js_1 = requirePackageInfo();
		Object.defineProperty(exports, "packageInfo", { enumerable: true, get: function () { return packageInfo_js_1.packageInfo; } });
		exports.transports = (0, util_js_1.createDefs)(['webusb', hw_transport_webusb_1.default], ['hid', hw_transport_webhid_1.default]);
	} (browser));
	getDefaultExportFromCjs(browser);

	const LEDGER_DEFAULT_ACCOUNT = 0x80000000;
	const LEDGER_DEFAULT_CHANGE = 0x80000000;
	const LEDGER_DEFAULT_INDEX = 0x80000000;
	const LEDGER_SUCCESS_CODE = 0x9000;

	const prevLedgerRecord = {
	    acala: 'Acala',
	    ajuna: 'Ajuna',
	    'aleph-node': 'AlephZero',
	    astar: 'Astar',
	    bifrost: 'Bifrost',
	    'bifrost-kusama': 'BifrostKusama',
	    centrifuge: 'Centrifuge',
	    composable: 'Composable',
	    darwinia: 'Darwinia',
	    'dock-mainnet': 'Dock',
	    edgeware: 'Edgeware',
	    enjin: 'Enjin',
	    equilibrium: 'Equilibrium',
	    genshiro: 'Genshiro',
	    hydradx: 'HydraDX',
	    'interlay-parachain': 'Interlay',
	    karura: 'Karura',
	    khala: 'Khala',
	    kusama: 'Kusama',
	    matrixchain: 'Matrixchain',
	    nodle: 'Nodle',
	    origintrail: 'OriginTrail',
	    parallel: 'Parallel',
	    peaq: 'Peaq',
	    pendulum: 'Pendulum',
	    phala: 'Phala',
	    picasso: 'Picasso',
	    polkadex: 'Polkadex',
	    polkadot: 'Polkadot',
	    polymesh: 'Polymesh',
	    quartz: 'Quartz',
	    sora: 'Sora',
	    stafi: 'Stafi',
	    statemine: 'Statemine',
	    statemint: 'Statemint',
	    ternoa: 'Ternoa',
	    unique: 'Unique',
	    vtb: 'VTB',
	    xxnetwork: 'XXNetwork',
	    zeitgeist: 'Zeitgeist'
	};
	const genericLedgerApps = {
	    bittensor: 'Bittensor',
	    creditcoin3: 'Creditcoin3',
	    dentnet: 'DENTNet',
	    encointer: 'Encointer',
	    frequency: 'Frequency',
	    integritee: 'Integritee',
	    liberland: 'Liberland',
	    mythos: 'Mythos',
	    polimec: 'Polimec',
	    vara: 'Vara'
	};
	const ledgerApps = {
	    ...prevLedgerRecord,
	    ...genericLedgerApps
	};

	async function wrapError$1(promise) {
	    const result = await promise;
	    if (result.return_code !== LEDGER_SUCCESS_CODE) {
	        throw new Error(result.error_message);
	    }
	    return result;
	}
	function sign$1(method, message, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE } = {}) {
	    return async (app) => {
	        const { signature } = await wrapError$1(app[method](account + accountOffset, change, addressIndex + addressOffset, util$1.u8aToBuffer(message)));
	        return {
	            signature: util$1.hexAddPrefix(signature.toString('hex'))
	        };
	    };
	}
	class Ledger {
	    #ledgerName;
	    #transportDef;
	    #app = null;
	    constructor(transport, chain) {
	        const ledgerName = ledgerApps[chain];
	        const transportDef = browser.transports.find(({ type }) => type === transport);
	        if (!ledgerName) {
	            throw new Error(`Unsupported Ledger chain ${chain}`);
	        }
	        else if (!transportDef) {
	            throw new Error(`Unsupported Ledger transport ${transport}`);
	        }
	        this.#ledgerName = ledgerName;
	        this.#transportDef = transportDef;
	    }
	    async getAddress(confirm = false, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE } = {}) {
	        return this.withApp(async (app) => {
	            const { address, pubKey } = await wrapError$1(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));
	            return {
	                address,
	                publicKey: util$1.hexAddPrefix(pubKey)
	            };
	        });
	    }
	    async getVersion() {
	        return this.withApp(async (app) => {
	            const { device_locked: isLocked, major, minor, patch, test_mode: isTestMode } = await wrapError$1(app.getVersion());
	            return {
	                isLocked,
	                isTestMode,
	                version: [major, minor, patch]
	            };
	        });
	    }
	    async sign(message, accountOffset, addressOffset, options) {
	        return this.withApp(sign$1('sign', message, accountOffset, addressOffset, options));
	    }
	    async signRaw(message, accountOffset, addressOffset, options) {
	        return this.withApp(sign$1('signRaw', util$1.u8aWrapBytes(message), accountOffset, addressOffset, options));
	    }
	    async withApp(fn) {
	        try {
	            if (!this.#app) {
	                const transport = await this.#transportDef.create();
	                this.#app = dist$1.newSubstrateApp(transport, this.#ledgerName);
	            }
	            return await fn(this.#app);
	        }
	        catch (error) {
	            this.#app = null;
	            throw error;
	        }
	    }
	}

	async function wrapError(promise) {
	    let result;
	    try {
	        result = await promise;
	    }
	    catch (e) {
	        if (e.returnCode) {
	            throw new Error(`${e.returnCode}: ${e.errorMessage}`);
	        }
	        throw new Error(e.message);
	    }
	    return result;
	}
	function sign(method, message, slip44, accountIndex = 0, addressOffset = 0) {
	    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
	    return async (app) => {
	        const { signature } = await wrapError(app[method](bip42Path, util$1.u8aToBuffer(message)));
	        return {
	            signature: util$1.hexAddPrefix(signature.toString('hex'))
	        };
	    };
	}
	function signEcdsa(method, message, slip44, accountIndex = 0, addressOffset = 0) {
	    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
	    return async (app) => {
	        const { r, s, v } = await wrapError(app[method](bip42Path, util$1.u8aToBuffer(message)));
	        const signature = Buffer.concat([r, s, v]);
	        return {
	            signature: util$1.hexAddPrefix(signature.toString('hex'))
	        };
	    };
	}
	function signWithMetadata(message, slip44, accountIndex = 0, addressOffset = 0, { metadata } = {}) {
	    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
	    return async (app) => {
	        if (!metadata) {
	            throw new Error('The metadata option must be present when using signWithMetadata');
	        }
	        const bufferMsg = Buffer.from(message);
	        const { signature } = await wrapError(app.signWithMetadataEd25519(bip42Path, bufferMsg, metadata));
	        return {
	            signature: util$1.hexAddPrefix(signature.toString('hex'))
	        };
	    };
	}
	function signWithMetadataEcdsa(message, slip44, accountIndex = 0, addressOffset = 0, { metadata } = {}) {
	    const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
	    return async (app) => {
	        if (!metadata) {
	            throw new Error('The metadata option must be present when using signWithMetadata');
	        }
	        const bufferMsg = Buffer.from(message);
	        const { r, s, v } = await wrapError(app.signWithMetadataEcdsa(bip42Path, bufferMsg, metadata));
	        const signature = Buffer.concat([r, s, v]);
	        return {
	            signature: util$1.hexAddPrefix(signature.toString('hex'))
	        };
	    };
	}
	class LedgerGeneric {
	    #transportDef;
	    #slip44;
	    #chainId;
	    #metaUrl;
	    #app = null;
	    constructor(transport, chain, slip44, chainId, metaUrl) {
	        const ledgerName = ledgerApps[chain];
	        const transportDef = browser.transports.find(({ type }) => type === transport);
	        if (!ledgerName) {
	            throw new Error(`Unsupported Ledger chain ${chain}`);
	        }
	        else if (!transportDef) {
	            throw new Error(`Unsupported Ledger transport ${transport}`);
	        }
	        this.#metaUrl = metaUrl;
	        this.#chainId = chainId;
	        this.#slip44 = slip44;
	        this.#transportDef = transportDef;
	    }
	    async getAddress(ss58Prefix, confirm = false, accountIndex = 0, addressOffset = 0) {
	        const bip42Path = `m/44'/${this.#slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
	        return this.withApp(async (app) => {
	            const { address, pubKey } = await wrapError(app.getAddressEd25519(bip42Path, ss58Prefix, confirm));
	            return {
	                address,
	                publicKey: util$1.hexAddPrefix(pubKey)
	            };
	        });
	    }
	    async getAddressEcdsa(confirm = false, accountIndex = 0, addressOffset = 0) {
	        const bip42Path = `m/44'/${this.#slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;
	        return this.withApp(async (app) => {
	            const { address, pubKey } = await wrapError(app.getAddressEcdsa(bip42Path, confirm));
	            return {
	                address,
	                publicKey: util$1.hexAddPrefix(pubKey)
	            };
	        });
	    }
	    async getVersion() {
	        return this.withApp(async (app) => {
	            const { deviceLocked: isLocked, major, minor, patch, testMode: isTestMode } = await wrapError(app.getVersion());
	            return {
	                isLocked: !!isLocked,
	                isTestMode: !!isTestMode,
	                version: [major || 0, minor || 0, patch || 0]
	            };
	        });
	    }
	    async sign(message, accountIndex, addressOffset) {
	        return this.withApp(sign('signEd25519', message, this.#slip44, accountIndex, addressOffset));
	    }
	    async signRaw(message, accountIndex, addressOffset) {
	        return this.withApp(sign('signRawEd25519', util$1.u8aWrapBytes(message), this.#slip44, accountIndex, addressOffset));
	    }
	    async signEcdsa(message, accountIndex, addressOffset) {
	        return this.withApp(signEcdsa('signEcdsa', util$1.u8aWrapBytes(message), this.#slip44, accountIndex, addressOffset));
	    }
	    async signRawEcdsa(message, accountIndex, addressOffset) {
	        return this.withApp(signEcdsa('signRawEcdsa', util$1.u8aWrapBytes(message), this.#slip44, accountIndex, addressOffset));
	    }
	    async signWithMetadata(message, accountIndex, addressOffset, options) {
	        return this.withApp(signWithMetadata(message, this.#slip44, accountIndex, addressOffset, options));
	    }
	    async signWithMetadataEcdsa(message, accountIndex, addressOffset, options) {
	        return this.withApp(signWithMetadataEcdsa(message, this.#slip44, accountIndex, addressOffset, options));
	    }
	    async withApp(fn) {
	        try {
	            if (!this.#app) {
	                const transport = await this.#transportDef.create();
	                this.#app = new dist$1.PolkadotGenericApp(transport, this.#chainId, this.#metaUrl);
	            }
	            return await fn(this.#app);
	        }
	        catch (error) {
	            this.#app = null;
	            throw error;
	        }
	    }
	}

	exports.Ledger = Ledger;
	exports.LedgerGeneric = LedgerGeneric;

}));
