(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/util')) :
	typeof define === 'function' && define.amd ? define(['exports', '@polkadot/util'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotHwLedger = {}, global.polkadotUtil));
})(this, (function (exports, util$1) { 'use strict';

	const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

	var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
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

	var dist = {};

	var legacy_apps = {};

	var supported_apps = {};

	var substrate_app = {};

	var common = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.getVersion = exports.processErrorResponse = exports.errorCodeToString = exports.ERROR_DESCRIPTION = exports.CHUNK_SIZE = void 0;
		exports.CHUNK_SIZE = 250;
		exports.ERROR_DESCRIPTION = {
		    1: "U2F: Unknown",
		    2: "U2F: Bad request",
		    3: "U2F: Configuration unsupported",
		    4: "U2F: Device Ineligible",
		    5: "U2F: Timeout",
		    14: "Timeout",
		    0x9000: "No errors",
		    0x9001: "Device is busy",
		    0x6802: "Error deriving keys",
		    0x6400: "Execution Error",
		    0x6700: "Wrong Length",
		    0x6982: "Empty Buffer",
		    0x6983: "Output buffer too small",
		    0x6984: "Data is invalid",
		    0x6985: "Conditions not satisfied",
		    0x6986: "Transaction rejected",
		    0x6a80: "Bad key handle",
		    0x6b00: "Invalid P1/P2",
		    0x6d00: "Instruction not supported",
		    0x6e01: "App does not seem to be open",
		    0x6f00: "Unknown error",
		    0x6f01: "Sign/verify error",
		};
		function errorCodeToString(statusCode) {
		    if (statusCode in exports.ERROR_DESCRIPTION)
		        return exports.ERROR_DESCRIPTION[statusCode];
		    return `Unknown Status Code: ${statusCode}`;
		}
		exports.errorCodeToString = errorCodeToString;
		function isDict(v) {
		    return typeof v === "object" && v !== null && !(v instanceof Array) && !(v instanceof Date);
		}
		function processErrorResponse(response) {
		    if (response != null) {
		        if (isDict(response)) {
		            if (Object.prototype.hasOwnProperty.call(response, "statusCode")) {
		                return {
		                    return_code: response.statusCode,
		                    error_message: errorCodeToString(response.statusCode),
		                };
		            }
		            if (Object.prototype.hasOwnProperty.call(response, "return_code") &&
		                Object.prototype.hasOwnProperty.call(response, "error_message")) {
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
		exports.processErrorResponse = processErrorResponse;
		async function getVersion(transport, cla) {
		    return await transport.send(cla, 0 , 0, 0).then((response) => {
		        const errorCodeData = response.subarray(-2);
		        const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
		        if (response.length !== 14) {
		            return {
		                return_code: 0x6984,
		                error_message: errorCodeToString(0x6984),
		            };
		        }
		        const major = response[1] * 256 + response[2];
		        const minor = response[3] * 256 + response[4];
		        const patch = response[5] * 256 + response[6];
		        const deviceLocked = response[7] === 1;
		        const targetId = (response[8] << 24) + (response[9] << 16) + (response[10] << 8) + (response[11] << 0);
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
		    }, processErrorResponse);
		}
		exports.getVersion = getVersion;
	} (common));
	getDefaultExportFromCjs(common);

	Object.defineProperty(substrate_app, "__esModule", { value: true });
	substrate_app.SubstrateApp = void 0;
	const common_1 = common;
	class SubstrateApp {
	    constructor(transport, cla, slip0044) {
	        if (transport == null) {
	            throw new Error("Transport has not been defined");
	        }
	        this.transport = transport;
	        this.cla = cla;
	        this.slip0044 = slip0044;
	    }
	    static serializePath(slip0044, account, change, addressIndex) {
	        if (!Number.isInteger(account))
	            throw new Error("Input must be an integer");
	        if (!Number.isInteger(change))
	            throw new Error("Input must be an integer");
	        if (!Number.isInteger(addressIndex))
	            throw new Error("Input must be an integer");
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
	        for (let i = 0; i < buffer.length; i += common_1.CHUNK_SIZE) {
	            let end = i + common_1.CHUNK_SIZE;
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
	            return await (0, common_1.getVersion)(this.transport, this.cla);
	        }
	        catch (e) {
	            return (0, common_1.processErrorResponse)(e);
	        }
	    }
	    async appInfo() {
	        return await this.transport.send(0xb0, 0x01, 0, 0).then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            let appName = "";
	            let appVersion = "";
	            let flagLen = 0;
	            let flagsValue = 0;
	            if (response[0] !== 1) {
	                return {
	                    return_code: 0x9001,
	                    error_message: "response format ID not recognized",
	                };
	            }
	            else {
	                const appNameLen = response[1];
	                appName = response.subarray(2, 2 + appNameLen).toString("ascii");
	                let idx = 2 + appNameLen;
	                const appVersionLen = response[idx];
	                idx += 1;
	                appVersion = response.subarray(idx, idx + appVersionLen).toString("ascii");
	                idx += appVersionLen;
	                const appFlagsLen = response[idx];
	                idx += 1;
	                flagLen = appFlagsLen;
	                flagsValue = response[idx];
	            }
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1.errorCodeToString)(returnCode),
	                appName: appName === "" || "err",
	                appVersion: appVersion === "" || "err",
	                flagLen,
	                flagsValue,
	                flag_recovery: (flagsValue & 1) !== 0,
	                flag_signed_mcu_code: (flagsValue & 2) !== 0,
	                flag_onboarded: (flagsValue & 4) !== 0,
	                flag_pin_validated: (flagsValue & 128) !== 0,
	            };
	        }, common_1.processErrorResponse);
	    }
	    async getAddress(account, change, addressIndex, requireConfirmation = false, scheme = 0 ) {
	        const bip44Path = SubstrateApp.serializePath(this.slip0044, account, change, addressIndex);
	        let p1 = 0;
	        if (requireConfirmation)
	            p1 = 1;
	        let p2 = 0;
	        if (!isNaN(scheme))
	            p2 = scheme;
	        return await this.transport.send(this.cla, 1 , p1, p2, bip44Path).then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const errorCode = errorCodeData[0] * 256 + errorCodeData[1];
	            return {
	                pubKey: response.subarray(0, 32).toString("hex"),
	                address: response.subarray(32, response.length - 2).toString("ascii"),
	                return_code: errorCode,
	                error_message: (0, common_1.errorCodeToString)(errorCode),
	            };
	        }, common_1.processErrorResponse);
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
	        return await this.transport
	            .send(this.cla, ins, payloadType, p2, chunk, [36864 , 0x6984, 0x6a80])
	            .then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            let errorMessage = (0, common_1.errorCodeToString)(returnCode);
	            let signature = null;
	            if (returnCode === 0x6a80 || returnCode === 0x6984) {
	                errorMessage = response.subarray(0, response.length - 2).toString("ascii");
	            }
	            else if (response.length > 2) {
	                signature = response.subarray(0, response.length - 2);
	            }
	            return {
	                signature,
	                return_code: returnCode,
	                error_message: errorMessage,
	            };
	        }, common_1.processErrorResponse);
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
	        }, common_1.processErrorResponse);
	    }
	    async sign(account, change, addressIndex, message, scheme = 0 ) {
	        return await this.signImpl(account, change, addressIndex, message, 2 , scheme);
	    }
	    async signRaw(account, change, addressIndex, message, scheme = 0 ) {
	        return await this.signImpl(account, change, addressIndex, message, 3 , scheme);
	    }
	    async getAllowlistPubKey() {
	        return await this.transport.send(this.cla, 144 , 0, 0).then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            console.log(response);
	            const pubkey = response.subarray(0, 32);
	            if (response.length !== 34) {
	                return {
	                    return_code: 0x6984,
	                    error_message: (0, common_1.errorCodeToString)(0x6984),
	                };
	            }
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1.errorCodeToString)(returnCode),
	                pubkey,
	            };
	        }, common_1.processErrorResponse);
	    }
	    async setAllowlistPubKey(pk) {
	        return await this.transport.send(this.cla, 145 , 0, 0, pk).then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1.errorCodeToString)(returnCode),
	            };
	        }, common_1.processErrorResponse);
	    }
	    async getAllowlistHash() {
	        return await this.transport.send(this.cla, 146 , 0, 0).then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            console.log(response);
	            const hash = response.subarray(0, 32);
	            if (response.length !== 34) {
	                return {
	                    return_code: 0x6984,
	                    error_message: (0, common_1.errorCodeToString)(0x6984),
	                };
	            }
	            return {
	                return_code: returnCode,
	                error_message: (0, common_1.errorCodeToString)(returnCode),
	                hash,
	            };
	        }, common_1.processErrorResponse);
	    }
	    async uploadSendChunk(chunkIdx, chunkNum, chunk) {
	        let payloadType = 1 ;
	        if (chunkIdx === 1) {
	            payloadType = 0 ;
	        }
	        if (chunkIdx === chunkNum) {
	            payloadType = 2 ;
	        }
	        return await this.transport
	            .send(this.cla, 147 , payloadType, 0, chunk, [36864 ])
	            .then((response) => {
	            const errorCodeData = response.subarray(-2);
	            const returnCode = errorCodeData[0] * 256 + errorCodeData[1];
	            const errorMessage = (0, common_1.errorCodeToString)(returnCode);
	            return {
	                return_code: returnCode,
	                error_message: errorMessage,
	            };
	        }, common_1.processErrorResponse);
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
	        }, common_1.processErrorResponse);
	    }
	}
	substrate_app.SubstrateApp = SubstrateApp;

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.supportedApps = exports.getAppParams = exports.newSubstrateApp = void 0;
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
		exports.newSubstrateApp = newSubstrateApp;
		function getAppParams(chainName) {
		    const params = exports.supportedApps.find((app) => {
		        return app.name.toLowerCase() === chainName.toLowerCase();
		    });
		    return params;
		}
		exports.getAppParams = getAppParams;
		exports.supportedApps = [
		    {
		        name: "Polkadot",
		        cla: 0x90,
		        slip0044: 0x80000162,
		        ss58_addr_type: 0,
		    },
		    {
		        name: "Polymesh",
		        cla: 0x91,
		        slip0044: 0x80000253,
		        ss58_addr_type: 12,
		    },
		    {
		        name: "Dock",
		        cla: 0x92,
		        slip0044: 0x80000252,
		        ss58_addr_type: 22,
		    },
		    {
		        name: "Centrifuge",
		        cla: 0x93,
		        slip0044: 0x800002eb,
		        ss58_addr_type: 36,
		    },
		    {
		        name: "Edgeware",
		        cla: 0x94,
		        slip0044: 0x8000020b,
		        ss58_addr_type: 7,
		    },
		    {
		        name: "Equilibrium",
		        cla: 0x95,
		        slip0044: 0x85f5e0fd,
		        ss58_addr_type: 67,
		    },
		    {
		        name: "Statemint",
		        cla: 0x96,
		        slip0044: 0x80000162,
		        ss58_addr_type: 0,
		    },
		    {
		        name: "Statemine",
		        cla: 0x97,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 2,
		    },
		    {
		        name: "Nodle",
		        cla: 0x98,
		        slip0044: 0x800003eb,
		        ss58_addr_type: 37,
		    },
		    {
		        name: "Kusama",
		        cla: 0x99,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 2,
		    },
		    {
		        name: "Karura",
		        cla: 0x9a,
		        slip0044: 0x800002ae,
		        ss58_addr_type: 8,
		    },
		    {
		        name: "Acala",
		        cla: 0x9b,
		        slip0044: 0x80000313,
		        ss58_addr_type: 10,
		    },
		    {
		        name: "VTB",
		        cla: 0x9c,
		        slip0044: 0x800002b6,
		        ss58_addr_type: 42,
		    },
		    {
		        name: "Peer",
		        cla: 0x9d,
		        slip0044: 0x800002ce,
		        ss58_addr_type: 42,
		    },
		    {
		        name: "Genshiro",
		        cla: 0x9e,
		        slip0044: 0x85f5e0fc,
		        ss58_addr_type: 67,
		    },
		    {
		        name: "Sora",
		        cla: 0x9f,
		        slip0044: 0x80000269,
		        ss58_addr_type: 69,
		    },
		    {
		        name: "Polkadex",
		        cla: 0xa0,
		        slip0044: 0x8000031f,
		        ss58_addr_type: 88,
		    },
		    {
		        name: "Bifrost",
		        cla: 0xa1,
		        slip0044: 0x80000314,
		        ss58_addr_type: 6,
		    },
		    {
		        name: "Reef",
		        cla: 0xa2,
		        slip0044: 0x80000333,
		        ss58_addr_type: 42,
		    },
		    {
		        name: "XXNetwork",
		        cla: 0xa3,
		        slip0044: 0x800007a3,
		        ss58_addr_type: 55,
		    },
		    {
		        name: "AlephZero",
		        cla: 0xa4,
		        slip0044: 0x80000283,
		        ss58_addr_type: 42,
		    },
		    {
		        name: "Interlay",
		        cla: 0xa5,
		        slip0044: 0x80000162,
		        ss58_addr_type: 2032,
		    },
		    {
		        name: "Parallel",
		        cla: 0xa6,
		        slip0044: 0x80000162,
		        ss58_addr_type: 172,
		    },
		    {
		        name: "Picasso",
		        cla: 0xa7,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 49,
		    },
		    {
		        name: "Composable",
		        cla: 0xa8,
		        slip0044: 0x80000162,
		        ss58_addr_type: 49,
		    },
		    {
		        name: "Astar",
		        cla: 0xa9,
		        slip0044: 0x8000032a,
		        ss58_addr_type: 5,
		    },
		    {
		        name: "OriginTrail",
		        cla: 0xaa,
		        slip0044: 0x80000162,
		        ss58_addr_type: 101,
		    },
		    {
		        name: "HydraDX",
		        cla: 0xab,
		        slip0044: 0x80000162,
		        ss58_addr_type: 63,
		    },
		    {
		        name: "Stafi",
		        cla: 0xac,
		        slip0044: 0x8000038b,
		        ss58_addr_type: 20,
		    },
		    {
		        name: "Unique",
		        cla: 0xad,
		        slip0044: 0x80000162,
		        ss58_addr_type: 7391,
		    },
		    {
		        name: "BifrostKusama",
		        cla: 0xae,
		        slip0044: 0x80000314,
		        ss58_addr_type: 6,
		    },
		    {
		        name: "Phala",
		        cla: 0xaf,
		        slip0044: 0x80000162,
		        ss58_addr_type: 30,
		    },
		    {
		        name: "Khala",
		        cla: 0xb1,
		        slip0044: 0x800001b2,
		        ss58_addr_type: 30,
		    },
		    {
		        name: "Darwinia",
		        cla: 0xb2,
		        slip0044: 0x80000162,
		        ss58_addr_type: 18,
		    },
		    {
		        name: "Ajuna",
		        cla: 0xb3,
		        slip0044: 0x80000162,
		        ss58_addr_type: 1328,
		    },
		    {
		        name: "Bittensor",
		        cla: 0xb4,
		        slip0044: 0x800003ed,
		        ss58_addr_type: 42,
		    },
		    {
		        name: "Ternoa",
		        cla: 0xb5,
		        slip0044: 0x800003e3,
		        ss58_addr_type: 42,
		    },
		    {
		        name: "Pendulum",
		        cla: 0xb6,
		        slip0044: 0x80000162,
		        ss58_addr_type: 56,
		    },
		    {
		        name: "Zeitgeist",
		        cla: 0xb7,
		        slip0044: 0x80000162,
		        ss58_addr_type: 73,
		    },
		    {
		        name: "Joystream",
		        cla: 0xb8,
		        slip0044: 0x80000219,
		        ss58_addr_type: 126,
		    },
		    {
		        name: "Enjin",
		        cla: 0xb9,
		        slip0044: 0x80000483,
		        ss58_addr_type: 2135,
		    },
		    {
		        name: "Matrixchain",
		        cla: 0xba,
		        slip0044: 0x80000483,
		        ss58_addr_type: 1110,
		    }
		];
	} (supported_apps));
	getDefaultExportFromCjs(supported_apps);

	Object.defineProperty(legacy_apps, "__esModule", { value: true });
	legacy_apps.newBifrostKusamaApp = legacy_apps.newUniqueApp = legacy_apps.newInterlayApp = legacy_apps.newAlephZeroApp = legacy_apps.newStafiApp = legacy_apps.newComposableApp = legacy_apps.newAstarApp = legacy_apps.newParallelApp = legacy_apps.newXXNetworkApp = legacy_apps.newAcalaApp = legacy_apps.newReefApp = legacy_apps.newKaruraApp = legacy_apps.newBifrostApp = legacy_apps.newPolkadexApp = legacy_apps.newSoraApp = legacy_apps.newNodleApp = legacy_apps.newStatemineApp = legacy_apps.newStatemintApp = legacy_apps.newGenshiroApp = legacy_apps.newEquilibriumApp = legacy_apps.newEdgewareApp = legacy_apps.newCentrifugeApp = legacy_apps.newDockApp = legacy_apps.newPolymeshApp = legacy_apps.newPolkadotApp = legacy_apps.newKusamaApp = void 0;
	const supported_apps_1 = supported_apps;
	function newKusamaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Kusama");
	}
	legacy_apps.newKusamaApp = newKusamaApp;
	function newPolkadotApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Polkadot");
	}
	legacy_apps.newPolkadotApp = newPolkadotApp;
	function newPolymeshApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Polymesh");
	}
	legacy_apps.newPolymeshApp = newPolymeshApp;
	function newDockApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Dock");
	}
	legacy_apps.newDockApp = newDockApp;
	function newCentrifugeApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Centrifuge");
	}
	legacy_apps.newCentrifugeApp = newCentrifugeApp;
	function newEdgewareApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Edgeware");
	}
	legacy_apps.newEdgewareApp = newEdgewareApp;
	function newEquilibriumApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Equilibrium");
	}
	legacy_apps.newEquilibriumApp = newEquilibriumApp;
	function newGenshiroApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Genshiro");
	}
	legacy_apps.newGenshiroApp = newGenshiroApp;
	function newStatemintApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Statemint");
	}
	legacy_apps.newStatemintApp = newStatemintApp;
	function newStatemineApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Statemine");
	}
	legacy_apps.newStatemineApp = newStatemineApp;
	function newNodleApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Nodle");
	}
	legacy_apps.newNodleApp = newNodleApp;
	function newSoraApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Sora");
	}
	legacy_apps.newSoraApp = newSoraApp;
	function newPolkadexApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Polkadex");
	}
	legacy_apps.newPolkadexApp = newPolkadexApp;
	function newBifrostApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Bifrost");
	}
	legacy_apps.newBifrostApp = newBifrostApp;
	function newKaruraApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Karura");
	}
	legacy_apps.newKaruraApp = newKaruraApp;
	function newReefApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Reef");
	}
	legacy_apps.newReefApp = newReefApp;
	function newAcalaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Acala");
	}
	legacy_apps.newAcalaApp = newAcalaApp;
	function newXXNetworkApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "XXNetwork");
	}
	legacy_apps.newXXNetworkApp = newXXNetworkApp;
	function newParallelApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Parallel");
	}
	legacy_apps.newParallelApp = newParallelApp;
	function newAstarApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Astar");
	}
	legacy_apps.newAstarApp = newAstarApp;
	function newComposableApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Composable");
	}
	legacy_apps.newComposableApp = newComposableApp;
	function newStafiApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Stafi");
	}
	legacy_apps.newStafiApp = newStafiApp;
	function newAlephZeroApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "AlephZero");
	}
	legacy_apps.newAlephZeroApp = newAlephZeroApp;
	function newInterlayApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Interlay");
	}
	legacy_apps.newInterlayApp = newInterlayApp;
	function newUniqueApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "Unique");
	}
	legacy_apps.newUniqueApp = newUniqueApp;
	function newBifrostKusamaApp(transport) {
	    return (0, supported_apps_1.newSubstrateApp)(transport, "BifrostKusama");
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
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.supportedApps = exports.newSubstrateApp = exports.SubstrateApp = void 0;
		__exportStar(legacy_apps, exports);
		var substrate_app_1 = substrate_app;
		Object.defineProperty(exports, "SubstrateApp", { enumerable: true, get: function () { return substrate_app_1.SubstrateApp; } });
		var supported_apps_1 = supported_apps;
		Object.defineProperty(exports, "newSubstrateApp", { enumerable: true, get: function () { return supported_apps_1.newSubstrateApp; } });
		Object.defineProperty(exports, "supportedApps", { enumerable: true, get: function () { return supported_apps_1.supportedApps; } });
	} (dist));
	getDefaultExportFromCjs(dist);

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
	  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
	  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
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
	    var dispose;
	    if (async) {
	        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
	        dispose = value[Symbol.asyncDispose];
	    }
	    if (dispose === void 0) {
	        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
	        dispose = value[Symbol.dispose];
	    }
	    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
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
	  function next() {
	    while (env.stack.length) {
	      var rec = env.stack.pop();
	      try {
	        var result = rec.dispose && rec.dispose.call(rec.value);
	        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
	      }
	      catch (e) {
	          fail(e);
	      }
	    }
	    if (env.hasError) throw env.error;
	  }
	  return next();
	}
	const tslib_es6 = {
	  __extends,
	  __assign,
	  __rest,
	  __decorate,
	  __param,
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

	const LockedDeviceError = createCustomErrorClass("LockedDeviceError");
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
	    CUSTOM_IMAGE_BOOTLOADER: 0x662f,
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
	function TransportStatusError(statusCode) {
	    const statusText = Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
	    const smsg = getAltStatusMessage(statusCode) || statusText;
	    const statusCodeStr = statusCode.toString(16);
	    const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
	    if (statusCode === StatusCodes.LOCKED_DEVICE) {
	        throw new LockedDeviceError(message);
	    }
	    this.name = "TransportStatusError";
	    this.message = message;
	    this.stack = new Error(message).stack;
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
	class Transport {
	    constructor() {
	        this.exchangeTimeout = 30000;
	        this.unresponsiveTimeout = 15000;
	        this.deviceModel = null;
	        this._events = new EventEmitter();
	        this.send = (cla, ins, p1, p2, data = Buffer.alloc(0), statusList = [StatusCodes.OK]) => __awaiter$3(this, void 0, void 0, function* () {
	            if (data.length >= 256) {
	                throw new TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
	            }
	            const response = yield this.exchange(Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]));
	            const sw = response.readUInt16BE(response.length - 2);
	            if (!statusList.some(s => s === sw)) {
	                throw new TransportStatusError(sw);
	            }
	            return response;
	        });
	        this.exchangeAtomicImpl = (f) => __awaiter$3(this, void 0, void 0, function* () {
	            if (this.exchangeBusyPromise) {
	                throw new TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
	            }
	            let resolveBusy;
	            const busyPromise = new Promise(r => {
	                resolveBusy = r;
	            });
	            this.exchangeBusyPromise = busyPromise;
	            let unresponsiveReached = false;
	            const timeout = setTimeout(() => {
	                unresponsiveReached = true;
	                this.emit("unresponsive");
	            }, this.unresponsiveTimeout);
	            try {
	                const res = yield f();
	                if (unresponsiveReached) {
	                    this.emit("responsive");
	                }
	                return res;
	            }
	            finally {
	                clearTimeout(timeout);
	                if (resolveBusy)
	                    resolveBusy();
	                this.exchangeBusyPromise = null;
	            }
	        });
	        this._appAPIlock = null;
	    }
	    exchange(_apdu) {
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
	            data = Buffer.concat([
	                data,
	                Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0),
	            ]);
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
	    [DeviceModelId.nanoSP]: {
	        id: DeviceModelId.nanoSP,
	        productName: "Ledger Nano S Plus",
	        productIdMM: 0x50,
	        legacyUsbProductId: 0x0005,
	        usbOnly: true,
	        memorySize: 1536 * 1024,
	        masks: [0x33100000],
	        getBlockSize: (_firmwareVersion) => 32,
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
	    [DeviceModelId.stax]: {
	        id: DeviceModelId.stax,
	        productName: "Ledger Stax",
	        productIdMM: 0x60,
	        legacyUsbProductId: 0x0006,
	        usbOnly: false,
	        memorySize: 1536 * 1024,
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
	};
	({
	    Blue: DeviceModelId.blue,
	    "Nano S": DeviceModelId.nanoS,
	    "Nano S Plus": DeviceModelId.nanoSP,
	    "Nano X": DeviceModelId.nanoX,
	    Stax: DeviceModelId.stax,
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
		util.createDefs = void 0;
		function createDefs(...items) {
		    return items.map(([type, Clazz]) => ({
		        create: () => Clazz.create(),
		        type
		    }));
		}
		util.createDefs = createDefs;
		return util;
	}

	var packageInfo$1 = {};

	var hasRequiredPackageInfo;
	function requirePackageInfo () {
		if (hasRequiredPackageInfo) return packageInfo$1;
		hasRequiredPackageInfo = 1;
		Object.defineProperty(packageInfo$1, "__esModule", { value: true });
		packageInfo$1.packageInfo = void 0;
		packageInfo$1.packageInfo = { name: '@polkadot/hw-ledger-transports', path: typeof __dirname === 'string' ? __dirname : 'auto', type: 'cjs', version: '12.5.1' };
		return packageInfo$1;
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

	const ledgerApps = {
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
	    pendulum: 'Pendulum',
	    phala: 'Phala',
	    picasso: 'Picasso',
	    polkadex: 'Polkadex',
	    polkadot: 'Polkadot',
	    polymesh: 'Polymesh',
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

	const packageInfo = { name: '@polkadot/hw-ledger', path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-hw-ledger.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto', type: 'esm', version: '12.5.1' };

	async function wrapError(promise) {
	    const result = await promise;
	    if (result.return_code !== LEDGER_SUCCESS_CODE) {
	        throw new Error(result.error_message);
	    }
	    return result;
	}
	function sign(method, message, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE } = {}) {
	    return async (app) => {
	        const { signature } = await wrapError(app[method](account + accountOffset, change, addressIndex + addressOffset, util$1.u8aToBuffer(message)));
	        return {
	            signature: util$1.hexAddPrefix(signature.toString('hex'))
	        };
	    };
	}
	class Ledger {
	    constructor(transport, chain) {
	        this.__internal__app = null;
	        const ledgerName = ledgerApps[chain];
	        const transportDef = browser.transports.find(({ type }) => type === transport);
	        if (!ledgerName) {
	            throw new Error(`Unsupported Ledger chain ${chain}`);
	        }
	        else if (!transportDef) {
	            throw new Error(`Unsupported Ledger transport ${transport}`);
	        }
	        this.__internal__ledgerName = ledgerName;
	        this.__internal__transportDef = transportDef;
	    }
	    async getAddress(confirm = false, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE } = {}) {
	        return this.withApp(async (app) => {
	            const { address, pubKey } = await wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));
	            return {
	                address,
	                publicKey: util$1.hexAddPrefix(pubKey)
	            };
	        });
	    }
	    async getVersion() {
	        return this.withApp(async (app) => {
	            const { device_locked: isLocked, major, minor, patch, test_mode: isTestMode } = await wrapError(app.getVersion());
	            return {
	                isLocked,
	                isTestMode,
	                version: [major, minor, patch]
	            };
	        });
	    }
	    async sign(message, accountOffset, addressOffset, options) {
	        return this.withApp(sign('sign', message, accountOffset, addressOffset, options));
	    }
	    async signRaw(message, accountOffset, addressOffset, options) {
	        return this.withApp(sign('signRaw', util$1.u8aWrapBytes(message), accountOffset, addressOffset, options));
	    }
	    async withApp(fn) {
	        try {
	            if (!this.__internal__app) {
	                const transport = await this.__internal__transportDef.create();
	                this.__internal__app = dist.newSubstrateApp(transport, this.__internal__ledgerName);
	            }
	            return await fn(this.__internal__app);
	        }
	        catch (error) {
	            this.__internal__app = null;
	            throw error;
	        }
	    }
	}

	exports.Ledger = Ledger;
	exports.packageInfo = packageInfo;

}));
