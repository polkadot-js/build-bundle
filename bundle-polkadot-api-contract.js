(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/types'), require('@polkadot/util'), require('@polkadot/api'), require('@polkadot/util-crypto')) :
  typeof define === 'function' && define.amd ? define(['exports', '@polkadot/types', '@polkadot/util', '@polkadot/api', '@polkadot/util-crypto'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotApiContract = {}, global.polkadotTypes, global.polkadotUtil, global.polkadotApi, global.polkadotUtilCrypto));
})(this, (function (exports, types, util, api, utilCrypto) { 'use strict';

  const global = window;

  let TypeDefInfo;
  (function (TypeDefInfo) {
    TypeDefInfo[TypeDefInfo["BTreeMap"] = 0] = "BTreeMap";
    TypeDefInfo[TypeDefInfo["BTreeSet"] = 1] = "BTreeSet";
    TypeDefInfo[TypeDefInfo["Compact"] = 2] = "Compact";
    TypeDefInfo[TypeDefInfo["DoNotConstruct"] = 3] = "DoNotConstruct";
    TypeDefInfo[TypeDefInfo["Enum"] = 4] = "Enum";
    TypeDefInfo[TypeDefInfo["HashMap"] = 5] = "HashMap";
    TypeDefInfo[TypeDefInfo["Int"] = 6] = "Int";
    TypeDefInfo[TypeDefInfo["Linkage"] = 7] = "Linkage";
    TypeDefInfo[TypeDefInfo["Null"] = 8] = "Null";
    TypeDefInfo[TypeDefInfo["Option"] = 9] = "Option";
    TypeDefInfo[TypeDefInfo["Plain"] = 10] = "Plain";
    TypeDefInfo[TypeDefInfo["Range"] = 11] = "Range";
    TypeDefInfo[TypeDefInfo["RangeInclusive"] = 12] = "RangeInclusive";
    TypeDefInfo[TypeDefInfo["Result"] = 13] = "Result";
    TypeDefInfo[TypeDefInfo["Set"] = 14] = "Set";
    TypeDefInfo[TypeDefInfo["Si"] = 15] = "Si";
    TypeDefInfo[TypeDefInfo["Struct"] = 16] = "Struct";
    TypeDefInfo[TypeDefInfo["Tuple"] = 17] = "Tuple";
    TypeDefInfo[TypeDefInfo["UInt"] = 18] = "UInt";
    TypeDefInfo[TypeDefInfo["Vec"] = 19] = "Vec";
    TypeDefInfo[TypeDefInfo["VecFixed"] = 20] = "VecFixed";
    TypeDefInfo[TypeDefInfo["WrapperKeepOpaque"] = 21] = "WrapperKeepOpaque";
    TypeDefInfo[TypeDefInfo["WrapperOpaque"] = 22] = "WrapperOpaque";
  })(TypeDefInfo || (TypeDefInfo = {}));

  function v0ToV1Names(all) {
    return all.map(e => util.objectSpread({}, e, {
      name: Array.isArray(e.name) ? e.name : [e.name]
    }));
  }
  function v0ToV1(registry, v0) {
    return registry.createType('ContractMetadataV1', util.objectSpread({}, v0, {
      spec: util.objectSpread({}, v0.spec, {
        constructors: v0ToV1Names(v0.spec.constructors),
        messages: v0ToV1Names(v0.spec.messages)
      }),
      types: types.convertSiV0toV1(registry, v0.types)
    }));
  }

  const ARG_TYPES = {
    ContractConstructorSpec: 'ContractMessageParamSpecV2',
    ContractEventSpec: 'ContractEventParamSpecV2',
    ContractMessageSpec: 'ContractMessageParamSpecV2'
  };
  function v1ToV2Label(entry) {
    return util.objectSpread({}, entry, {
      label: Array.isArray(entry.name) ? entry.name.join('::') : entry.name
    });
  }
  function v1ToV2Labels(registry, outType, all) {
    return all.map(e => registry.createType(`${outType}V2`, util.objectSpread(v1ToV2Label(e), {
      args: e.args.map(a => registry.createType(ARG_TYPES[outType], v1ToV2Label(a)))
    })));
  }
  function v1ToV2(registry, v1) {
    return registry.createType('ContractMetadataV2', util.objectSpread({}, v1, {
      spec: util.objectSpread({}, v1.spec, {
        constructors: v1ToV2Labels(registry, 'ContractConstructorSpec', v1.spec.constructors),
        events: v1ToV2Labels(registry, 'ContractEventSpec', v1.spec.events),
        messages: v1ToV2Labels(registry, 'ContractMessageSpec', v1.spec.messages)
      })
    }));
  }

  function v2ToV3(registry, v2) {
    return registry.createType('ContractMetadataV3', util.objectSpread({}, v2, {
      spec: util.objectSpread({}, v2.spec, {
        constructors: v2.spec.constructors.map(c =>
        registry.createType('ContractConstructorSpecV3', util.objectSpread({}, c, {
          payable: true
        })))
      })
    }));
  }

  const enumVersions = ['V3', 'V2', 'V1'];
  function createConverter(next, step) {
    return (registry, input) => next(registry, step(registry, input));
  }
  function v3ToLatest(registry, v3) {
    return v3;
  }
  const v2ToLatest = createConverter(v3ToLatest, v2ToV3);
  const v1ToLatest = createConverter(v2ToLatest, v1ToV2);
  const v0ToLatest = createConverter(v1ToLatest, v0ToV1);
  const convertVersions = [['V3', v3ToLatest], ['V2', v2ToLatest], ['V1', v1ToLatest], ['V0', v0ToLatest]];

  const l$1 = util.logger('Abi');
  const PRIMITIVE_ALWAYS = ['AccountId', 'AccountIndex', 'Address', 'Balance'];
  function findMessage(list, messageOrId) {
    const message = util.isNumber(messageOrId) ? list[messageOrId] : util.isString(messageOrId) ? list.find(({
      identifier
    }) => [identifier, util.stringCamelCase(identifier)].includes(messageOrId.toString())) : messageOrId;
    return util.assertReturn(message, () => `Attempted to call an invalid contract interface, ${util.stringify(messageOrId)}`);
  }
  function getLatestMeta(registry, json) {
    const vx = enumVersions.find(v => util.isObject(json[v]));
    const metadata = registry.createType('ContractMetadata', vx ? {
      [vx]: json[vx]
    } : {
      V0: json
    });
    const converter = convertVersions.find(([v]) => metadata[`is${v}`]);
    if (!converter) {
      throw new Error(`Unable to convert ABI with version ${metadata.type} to latest`);
    }
    return converter[1](registry, metadata[`as${converter[0]}`]);
  }
  function parseJson(json, chainProperties) {
    const registry = new types.TypeRegistry();
    const info = registry.createType('ContractProjectInfo', json);
    const latest = getLatestMeta(registry, json);
    const lookup = registry.createType('PortableRegistry', {
      types: latest.types
    }, true);
    registry.setLookup(lookup);
    if (chainProperties) {
      registry.setChainProperties(chainProperties);
    }
    lookup.types.forEach(({
      id
    }) => lookup.getTypeDef(id));
    return [json, registry, latest, info];
  }
  class Abi {
    constructor(abiJson, chainProperties) {
      [this.json, this.registry, this.metadata, this.info] = parseJson(util.isString(abiJson) ? JSON.parse(abiJson) : abiJson, chainProperties);
      this.constructors = this.metadata.spec.constructors.map((spec, index) => this.#createMessage(spec, index, {
        isConstructor: true,
        isPayable: spec.payable.isTrue
      }));
      this.events = this.metadata.spec.events.map((spec, index) => this.#createEvent(spec, index));
      this.messages = this.metadata.spec.messages.map((spec, index) => {
        const typeSpec = spec.returnType.unwrapOr(null);
        return this.#createMessage(spec, index, {
          isMutating: spec.mutates.isTrue,
          isPayable: spec.payable.isTrue,
          returnType: typeSpec ? this.registry.lookup.getTypeDef(typeSpec.type) : null
        });
      });
    }
    decodeEvent(data) {
      const index = data[0];
      const event = this.events[index];
      if (!event) {
        throw new Error(`Unable to find event with index ${index}`);
      }
      return event.fromU8a(data.subarray(1));
    }
    decodeConstructor(data) {
      return this.#decodeMessage('message', this.constructors, data);
    }
    decodeMessage(data) {
      return this.#decodeMessage('message', this.messages, data);
    }
    findConstructor(constructorOrId) {
      return findMessage(this.constructors, constructorOrId);
    }
    findMessage(messageOrId) {
      return findMessage(this.messages, messageOrId);
    }
    #createArgs = (args, spec) => {
      return args.map(({
        label,
        type
      }, index) => {
        try {
          if (!util.isObject(type)) {
            throw new Error('Invalid type definition found');
          }
          const displayName = type.displayName.length ? type.displayName[type.displayName.length - 1].toString() : undefined;
          const camelName = util.stringCamelCase(label);
          if (displayName && PRIMITIVE_ALWAYS.includes(displayName)) {
            return {
              name: camelName,
              type: {
                info: TypeDefInfo.Plain,
                type: displayName
              }
            };
          }
          const typeDef = this.registry.lookup.getTypeDef(type.type);
          return {
            name: camelName,
            type: displayName && !typeDef.type.startsWith(displayName) ? {
              displayName,
              ...typeDef
            } : typeDef
          };
        } catch (error) {
          l$1.error(`Error expanding argument ${index} in ${util.stringify(spec)}`);
          throw error;
        }
      });
    };
    #createEvent = (spec, index) => {
      const args = this.#createArgs(spec.args, spec);
      const event = {
        args,
        docs: spec.docs.map(d => d.toString()),
        fromU8a: data => ({
          args: this.#decodeArgs(args, data),
          event
        }),
        identifier: spec.label.toString(),
        index
      };
      return event;
    };
    #createMessage = (spec, index, add = {}) => {
      const args = this.#createArgs(spec.args, spec);
      const identifier = spec.label.toString();
      const message = { ...add,
        args,
        docs: spec.docs.map(d => d.toString()),
        fromU8a: data => ({
          args: this.#decodeArgs(args, data),
          message
        }),
        identifier,
        index,
        method: util.stringCamelCase(identifier),
        path: identifier.split('::').map(s => util.stringCamelCase(s)),
        selector: spec.selector,
        toU8a: params => this.#encodeArgs(spec, args, params)
      };
      return message;
    };
    #decodeArgs = (args, data) => {
      let offset = 0;
      return args.map(({
        type: {
          lookupName,
          type
        }
      }) => {
        const value = this.registry.createType(lookupName || type, data.subarray(offset));
        offset += value.encodedLength;
        return value;
      });
    };
    #decodeMessage = (type, list, data) => {
      const [, trimmed] = util.compactStripLength(data);
      const selector = trimmed.subarray(0, 4);
      const message = list.find(m => m.selector.eq(selector));
      if (!message) {
        throw new Error(`Unable to find ${type} with selector ${util.u8aToHex(selector)}`);
      }
      return message.fromU8a(trimmed.subarray(4));
    };
    #encodeArgs = ({
      label,
      selector
    }, args, data) => {
      if (data.length !== args.length) {
        throw new Error(`Expected ${args.length} arguments to contract message '${label.toString()}', found ${data.length}`);
      }
      return util.compactAddLength(util.u8aConcat(this.registry.createType('ContractSelector', selector).toU8a(), ...args.map(({
        type: {
          lookupName,
          type
        }
      }, index) => this.registry.createType(lookupName || type, data[index]).toU8a())));
    };
  }

  const packageInfo = {
    name: '@polkadot/api-contract',
    path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-api-contract.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-api-contract.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-api-contract.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-api-contract.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto',
    type: 'esm',
    version: '8.14.1'
  };

  function applyOnEvent(result, types, fn) {
    if (result.isInBlock || result.isFinalized) {
      const records = result.filterRecords('contracts', types);
      if (records.length) {
        return fn(records);
      }
    }
    return undefined;
  }
  function isOptions(options) {
    return !(util.isBn(options) || util.isBigInt(options) || util.isNumber(options) || util.isString(options));
  }
  function extractOptions(value, params) {
    const gasLimit = params.shift();
    return [{
      gasLimit,
      value
    }, params];
  }

  class Base {
    constructor(api, abi, decorateMethod) {
      this.abi = abi instanceof Abi ? abi : new Abi(abi, api.registry.getChainProperties());
      this.api = api;
      this._decorateMethod = decorateMethod;
      if (!api || !api.isConnected || !api.tx) {
        throw new Error('Your API has not been initialized correctly and is not connected to a chain');
      } else if (!api.tx.contracts || !Object.keys(api.tx.contracts).length) {
        throw new Error('You need to connect to a chain with a runtime that supports contracts');
      } else if (!util.isFunction(api.tx.contracts.instantiateWithCode)) {
        throw new Error('You need to connect to a chain with a runtime with a V3 contracts module. The runtime does not expose api.tx.contracts.instantiateWithCode');
      }
    }
    get registry() {
      return this.api.registry;
    }
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
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
  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
          }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
  }

  function isFunction(value) {
      return typeof value === 'function';
  }

  function createErrorClass(createImpl) {
      var _super = function (instance) {
          Error.call(instance);
          instance.stack = new Error().stack;
      };
      var ctorFunc = createImpl(_super);
      ctorFunc.prototype = Object.create(Error.prototype);
      ctorFunc.prototype.constructor = ctorFunc;
      return ctorFunc;
  }

  var UnsubscriptionError = createErrorClass(function (_super) {
      return function UnsubscriptionErrorImpl(errors) {
          _super(this);
          this.message = errors
              ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
              : '';
          this.name = 'UnsubscriptionError';
          this.errors = errors;
      };
  });

  function arrRemove(arr, item) {
      if (arr) {
          var index = arr.indexOf(item);
          0 <= index && arr.splice(index, 1);
      }
  }

  var Subscription = (function () {
      function Subscription(initialTeardown) {
          this.initialTeardown = initialTeardown;
          this.closed = false;
          this._parentage = null;
          this._finalizers = null;
      }
      Subscription.prototype.unsubscribe = function () {
          var e_1, _a, e_2, _b;
          var errors;
          if (!this.closed) {
              this.closed = true;
              var _parentage = this._parentage;
              if (_parentage) {
                  this._parentage = null;
                  if (Array.isArray(_parentage)) {
                      try {
                          for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                              var parent_1 = _parentage_1_1.value;
                              parent_1.remove(this);
                          }
                      }
                      catch (e_1_1) { e_1 = { error: e_1_1 }; }
                      finally {
                          try {
                              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                          }
                          finally { if (e_1) throw e_1.error; }
                      }
                  }
                  else {
                      _parentage.remove(this);
                  }
              }
              var initialFinalizer = this.initialTeardown;
              if (isFunction(initialFinalizer)) {
                  try {
                      initialFinalizer();
                  }
                  catch (e) {
                      errors = e instanceof UnsubscriptionError ? e.errors : [e];
                  }
              }
              var _finalizers = this._finalizers;
              if (_finalizers) {
                  this._finalizers = null;
                  try {
                      for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                          var finalizer = _finalizers_1_1.value;
                          try {
                              execFinalizer(finalizer);
                          }
                          catch (err) {
                              errors = errors !== null && errors !== void 0 ? errors : [];
                              if (err instanceof UnsubscriptionError) {
                                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                              }
                              else {
                                  errors.push(err);
                              }
                          }
                      }
                  }
                  catch (e_2_1) { e_2 = { error: e_2_1 }; }
                  finally {
                      try {
                          if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                      }
                      finally { if (e_2) throw e_2.error; }
                  }
              }
              if (errors) {
                  throw new UnsubscriptionError(errors);
              }
          }
      };
      Subscription.prototype.add = function (teardown) {
          var _a;
          if (teardown && teardown !== this) {
              if (this.closed) {
                  execFinalizer(teardown);
              }
              else {
                  if (teardown instanceof Subscription) {
                      if (teardown.closed || teardown._hasParent(this)) {
                          return;
                      }
                      teardown._addParent(this);
                  }
                  (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
              }
          }
      };
      Subscription.prototype._hasParent = function (parent) {
          var _parentage = this._parentage;
          return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
      };
      Subscription.prototype._addParent = function (parent) {
          var _parentage = this._parentage;
          this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
      };
      Subscription.prototype._removeParent = function (parent) {
          var _parentage = this._parentage;
          if (_parentage === parent) {
              this._parentage = null;
          }
          else if (Array.isArray(_parentage)) {
              arrRemove(_parentage, parent);
          }
      };
      Subscription.prototype.remove = function (teardown) {
          var _finalizers = this._finalizers;
          _finalizers && arrRemove(_finalizers, teardown);
          if (teardown instanceof Subscription) {
              teardown._removeParent(this);
          }
      };
      Subscription.EMPTY = (function () {
          var empty = new Subscription();
          empty.closed = true;
          return empty;
      })();
      return Subscription;
  }());
  var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
      return (value instanceof Subscription ||
          (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
  }
  function execFinalizer(finalizer) {
      if (isFunction(finalizer)) {
          finalizer();
      }
      else {
          finalizer.unsubscribe();
      }
  }

  var config = {
      onUnhandledError: null,
      onStoppedNotification: null,
      Promise: undefined,
      useDeprecatedSynchronousErrorHandling: false,
      useDeprecatedNextContext: false,
  };

  var timeoutProvider = {
      setTimeout: function (handler, timeout) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
              args[_i - 2] = arguments[_i];
          }
          return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
      },
      clearTimeout: function (handle) {
          return (clearTimeout)(handle);
      },
      delegate: undefined,
  };

  function reportUnhandledError(err) {
      timeoutProvider.setTimeout(function () {
          {
              throw err;
          }
      });
  }

  function noop() { }

  function errorContext(cb) {
      {
          cb();
      }
  }

  var Subscriber = (function (_super) {
      __extends(Subscriber, _super);
      function Subscriber(destination) {
          var _this = _super.call(this) || this;
          _this.isStopped = false;
          if (destination) {
              _this.destination = destination;
              if (isSubscription(destination)) {
                  destination.add(_this);
              }
          }
          else {
              _this.destination = EMPTY_OBSERVER;
          }
          return _this;
      }
      Subscriber.create = function (next, error, complete) {
          return new SafeSubscriber(next, error, complete);
      };
      Subscriber.prototype.next = function (value) {
          if (this.isStopped) ;
          else {
              this._next(value);
          }
      };
      Subscriber.prototype.error = function (err) {
          if (this.isStopped) ;
          else {
              this.isStopped = true;
              this._error(err);
          }
      };
      Subscriber.prototype.complete = function () {
          if (this.isStopped) ;
          else {
              this.isStopped = true;
              this._complete();
          }
      };
      Subscriber.prototype.unsubscribe = function () {
          if (!this.closed) {
              this.isStopped = true;
              _super.prototype.unsubscribe.call(this);
              this.destination = null;
          }
      };
      Subscriber.prototype._next = function (value) {
          this.destination.next(value);
      };
      Subscriber.prototype._error = function (err) {
          try {
              this.destination.error(err);
          }
          finally {
              this.unsubscribe();
          }
      };
      Subscriber.prototype._complete = function () {
          try {
              this.destination.complete();
          }
          finally {
              this.unsubscribe();
          }
      };
      return Subscriber;
  }(Subscription));
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
      return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = (function () {
      function ConsumerObserver(partialObserver) {
          this.partialObserver = partialObserver;
      }
      ConsumerObserver.prototype.next = function (value) {
          var partialObserver = this.partialObserver;
          if (partialObserver.next) {
              try {
                  partialObserver.next(value);
              }
              catch (error) {
                  handleUnhandledError(error);
              }
          }
      };
      ConsumerObserver.prototype.error = function (err) {
          var partialObserver = this.partialObserver;
          if (partialObserver.error) {
              try {
                  partialObserver.error(err);
              }
              catch (error) {
                  handleUnhandledError(error);
              }
          }
          else {
              handleUnhandledError(err);
          }
      };
      ConsumerObserver.prototype.complete = function () {
          var partialObserver = this.partialObserver;
          if (partialObserver.complete) {
              try {
                  partialObserver.complete();
              }
              catch (error) {
                  handleUnhandledError(error);
              }
          }
      };
      return ConsumerObserver;
  }());
  var SafeSubscriber = (function (_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          var partialObserver;
          if (isFunction(observerOrNext) || !observerOrNext) {
              partialObserver = {
                  next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                  error: error !== null && error !== void 0 ? error : undefined,
                  complete: complete !== null && complete !== void 0 ? complete : undefined,
              };
          }
          else {
              var context_1;
              if (_this && config.useDeprecatedNextContext) {
                  context_1 = Object.create(observerOrNext);
                  context_1.unsubscribe = function () { return _this.unsubscribe(); };
                  partialObserver = {
                      next: observerOrNext.next && bind(observerOrNext.next, context_1),
                      error: observerOrNext.error && bind(observerOrNext.error, context_1),
                      complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                  };
              }
              else {
                  partialObserver = observerOrNext;
              }
          }
          _this.destination = new ConsumerObserver(partialObserver);
          return _this;
      }
      return SafeSubscriber;
  }(Subscriber));
  function handleUnhandledError(error) {
      {
          reportUnhandledError(error);
      }
  }
  function defaultErrorHandler(err) {
      throw err;
  }
  var EMPTY_OBSERVER = {
      closed: true,
      next: noop,
      error: defaultErrorHandler,
      complete: noop,
  };

  var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

  function identity(x) {
      return x;
  }

  function pipeFromArray(fns) {
      if (fns.length === 0) {
          return identity;
      }
      if (fns.length === 1) {
          return fns[0];
      }
      return function piped(input) {
          return fns.reduce(function (prev, fn) { return fn(prev); }, input);
      };
  }

  var Observable = (function () {
      function Observable(subscribe) {
          if (subscribe) {
              this._subscribe = subscribe;
          }
      }
      Observable.prototype.lift = function (operator) {
          var observable = new Observable();
          observable.source = this;
          observable.operator = operator;
          return observable;
      };
      Observable.prototype.subscribe = function (observerOrNext, error, complete) {
          var _this = this;
          var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
          errorContext(function () {
              var _a = _this, operator = _a.operator, source = _a.source;
              subscriber.add(operator
                  ?
                      operator.call(subscriber, source)
                  : source
                      ?
                          _this._subscribe(subscriber)
                      :
                          _this._trySubscribe(subscriber));
          });
          return subscriber;
      };
      Observable.prototype._trySubscribe = function (sink) {
          try {
              return this._subscribe(sink);
          }
          catch (err) {
              sink.error(err);
          }
      };
      Observable.prototype.forEach = function (next, promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var subscriber = new SafeSubscriber({
                  next: function (value) {
                      try {
                          next(value);
                      }
                      catch (err) {
                          reject(err);
                          subscriber.unsubscribe();
                      }
                  },
                  error: reject,
                  complete: resolve,
              });
              _this.subscribe(subscriber);
          });
      };
      Observable.prototype._subscribe = function (subscriber) {
          var _a;
          return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
      };
      Observable.prototype[observable] = function () {
          return this;
      };
      Observable.prototype.pipe = function () {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
          }
          return pipeFromArray(operations)(this);
      };
      Observable.prototype.toPromise = function (promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
          });
      };
      Observable.create = function (subscribe) {
          return new Observable(subscribe);
      };
      return Observable;
  }());
  function getPromiseCtor(promiseCtor) {
      var _a;
      return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
      return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
      return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
  }

  function hasLift(source) {
      return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
      return function (source) {
          if (hasLift(source)) {
              return source.lift(function (liftedSource) {
                  try {
                      return init(liftedSource, this);
                  }
                  catch (err) {
                      this.error(err);
                  }
              });
          }
          throw new TypeError('Unable to lift unknown Observable type');
      };
  }

  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
      return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = (function (_super) {
      __extends(OperatorSubscriber, _super);
      function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
          var _this = _super.call(this, destination) || this;
          _this.onFinalize = onFinalize;
          _this.shouldUnsubscribe = shouldUnsubscribe;
          _this._next = onNext
              ? function (value) {
                  try {
                      onNext(value);
                  }
                  catch (err) {
                      destination.error(err);
                  }
              }
              : _super.prototype._next;
          _this._error = onError
              ? function (err) {
                  try {
                      onError(err);
                  }
                  catch (err) {
                      destination.error(err);
                  }
                  finally {
                      this.unsubscribe();
                  }
              }
              : _super.prototype._error;
          _this._complete = onComplete
              ? function () {
                  try {
                      onComplete();
                  }
                  catch (err) {
                      destination.error(err);
                  }
                  finally {
                      this.unsubscribe();
                  }
              }
              : _super.prototype._complete;
          return _this;
      }
      OperatorSubscriber.prototype.unsubscribe = function () {
          var _a;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
              var closed_1 = this.closed;
              _super.prototype.unsubscribe.call(this);
              !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
          }
      };
      return OperatorSubscriber;
  }(Subscriber));

  function refCount() {
      return operate(function (source, subscriber) {
          var connection = null;
          source._refCount++;
          var refCounter = createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
              if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                  connection = null;
                  return;
              }
              var sharedConnection = source._connection;
              var conn = connection;
              connection = null;
              if (sharedConnection && (!conn || sharedConnection === conn)) {
                  sharedConnection.unsubscribe();
              }
              subscriber.unsubscribe();
          });
          source.subscribe(refCounter);
          if (!refCounter.closed) {
              connection = source.connect();
          }
      });
  }

  ((function (_super) {
      __extends(ConnectableObservable, _super);
      function ConnectableObservable(source, subjectFactory) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subjectFactory = subjectFactory;
          _this._subject = null;
          _this._refCount = 0;
          _this._connection = null;
          if (hasLift(source)) {
              _this.lift = source.lift;
          }
          return _this;
      }
      ConnectableObservable.prototype._subscribe = function (subscriber) {
          return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable.prototype.getSubject = function () {
          var subject = this._subject;
          if (!subject || subject.isStopped) {
              this._subject = this.subjectFactory();
          }
          return this._subject;
      };
      ConnectableObservable.prototype._teardown = function () {
          this._refCount = 0;
          var _connection = this._connection;
          this._subject = this._connection = null;
          _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
      };
      ConnectableObservable.prototype.connect = function () {
          var _this = this;
          var connection = this._connection;
          if (!connection) {
              connection = this._connection = new Subscription();
              var subject_1 = this.getSubject();
              connection.add(this.source.subscribe(createOperatorSubscriber(subject_1, undefined, function () {
                  _this._teardown();
                  subject_1.complete();
              }, function (err) {
                  _this._teardown();
                  subject_1.error(err);
              }, function () { return _this._teardown(); })));
              if (connection.closed) {
                  this._connection = null;
                  connection = Subscription.EMPTY;
              }
          }
          return connection;
      };
      ConnectableObservable.prototype.refCount = function () {
          return refCount()(this);
      };
      return ConnectableObservable;
  })(Observable));

  var performanceTimestampProvider = {
      now: function () {
          return (performanceTimestampProvider.delegate || performance).now();
      },
      delegate: undefined,
  };

  var animationFrameProvider = {
      schedule: function (callback) {
          var request = requestAnimationFrame;
          var cancel = cancelAnimationFrame;
          var handle = request(function (timestamp) {
              cancel = undefined;
              callback(timestamp);
          });
          return new Subscription(function () { return cancel === null || cancel === void 0 ? void 0 : cancel(handle); });
      },
      requestAnimationFrame: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var delegate = animationFrameProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
      },
      cancelAnimationFrame: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return (cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
      },
      delegate: undefined,
  };

  function animationFramesFactory(timestampProvider) {
      var schedule = animationFrameProvider.schedule;
      return new Observable(function (subscriber) {
          var subscription = new Subscription();
          var provider = timestampProvider || performanceTimestampProvider;
          var start = provider.now();
          var run = function (timestamp) {
              var now = provider.now();
              subscriber.next({
                  timestamp: timestampProvider ? now : timestamp,
                  elapsed: now - start,
              });
              if (!subscriber.closed) {
                  subscription.add(schedule(run));
              }
          };
          subscription.add(schedule(run));
          return subscription;
      });
  }
  animationFramesFactory();

  var ObjectUnsubscribedError = createErrorClass(function (_super) {
      return function ObjectUnsubscribedErrorImpl() {
          _super(this);
          this.name = 'ObjectUnsubscribedError';
          this.message = 'object unsubscribed';
      };
  });

  var Subject = (function (_super) {
      __extends(Subject, _super);
      function Subject() {
          var _this = _super.call(this) || this;
          _this.closed = false;
          _this.currentObservers = null;
          _this.observers = [];
          _this.isStopped = false;
          _this.hasError = false;
          _this.thrownError = null;
          return _this;
      }
      Subject.prototype.lift = function (operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
      };
      Subject.prototype._throwIfClosed = function () {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
      };
      Subject.prototype.next = function (value) {
          var _this = this;
          errorContext(function () {
              var e_1, _a;
              _this._throwIfClosed();
              if (!_this.isStopped) {
                  if (!_this.currentObservers) {
                      _this.currentObservers = Array.from(_this.observers);
                  }
                  try {
                      for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                          var observer = _c.value;
                          observer.next(value);
                      }
                  }
                  catch (e_1_1) { e_1 = { error: e_1_1 }; }
                  finally {
                      try {
                          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                      }
                      finally { if (e_1) throw e_1.error; }
                  }
              }
          });
      };
      Subject.prototype.error = function (err) {
          var _this = this;
          errorContext(function () {
              _this._throwIfClosed();
              if (!_this.isStopped) {
                  _this.hasError = _this.isStopped = true;
                  _this.thrownError = err;
                  var observers = _this.observers;
                  while (observers.length) {
                      observers.shift().error(err);
                  }
              }
          });
      };
      Subject.prototype.complete = function () {
          var _this = this;
          errorContext(function () {
              _this._throwIfClosed();
              if (!_this.isStopped) {
                  _this.isStopped = true;
                  var observers = _this.observers;
                  while (observers.length) {
                      observers.shift().complete();
                  }
              }
          });
      };
      Subject.prototype.unsubscribe = function () {
          this.isStopped = this.closed = true;
          this.observers = this.currentObservers = null;
      };
      Object.defineProperty(Subject.prototype, "observed", {
          get: function () {
              var _a;
              return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
          },
          enumerable: false,
          configurable: true
      });
      Subject.prototype._trySubscribe = function (subscriber) {
          this._throwIfClosed();
          return _super.prototype._trySubscribe.call(this, subscriber);
      };
      Subject.prototype._subscribe = function (subscriber) {
          this._throwIfClosed();
          this._checkFinalizedStatuses(subscriber);
          return this._innerSubscribe(subscriber);
      };
      Subject.prototype._innerSubscribe = function (subscriber) {
          var _this = this;
          var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
          if (hasError || isStopped) {
              return EMPTY_SUBSCRIPTION;
          }
          this.currentObservers = null;
          observers.push(subscriber);
          return new Subscription(function () {
              _this.currentObservers = null;
              arrRemove(observers, subscriber);
          });
      };
      Subject.prototype._checkFinalizedStatuses = function (subscriber) {
          var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
          if (hasError) {
              subscriber.error(thrownError);
          }
          else if (isStopped) {
              subscriber.complete();
          }
      };
      Subject.prototype.asObservable = function () {
          var observable = new Observable();
          observable.source = this;
          return observable;
      };
      Subject.create = function (destination, source) {
          return new AnonymousSubject(destination, source);
      };
      return Subject;
  }(Observable));
  var AnonymousSubject = (function (_super) {
      __extends(AnonymousSubject, _super);
      function AnonymousSubject(destination, source) {
          var _this = _super.call(this) || this;
          _this.destination = destination;
          _this.source = source;
          return _this;
      }
      AnonymousSubject.prototype.next = function (value) {
          var _a, _b;
          (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
      };
      AnonymousSubject.prototype.error = function (err) {
          var _a, _b;
          (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
      };
      AnonymousSubject.prototype.complete = function () {
          var _a, _b;
          (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
      };
      AnonymousSubject.prototype._subscribe = function (subscriber) {
          var _a, _b;
          return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
      };
      return AnonymousSubject;
  }(Subject));

  ((function (_super) {
      __extends(BehaviorSubject, _super);
      function BehaviorSubject(_value) {
          var _this = _super.call(this) || this;
          _this._value = _value;
          return _this;
      }
      Object.defineProperty(BehaviorSubject.prototype, "value", {
          get: function () {
              return this.getValue();
          },
          enumerable: false,
          configurable: true
      });
      BehaviorSubject.prototype._subscribe = function (subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          !subscription.closed && subscriber.next(this._value);
          return subscription;
      };
      BehaviorSubject.prototype.getValue = function () {
          var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
          if (hasError) {
              throw thrownError;
          }
          this._throwIfClosed();
          return _value;
      };
      BehaviorSubject.prototype.next = function (value) {
          _super.prototype.next.call(this, (this._value = value));
      };
      return BehaviorSubject;
  })(Subject));

  var dateTimestampProvider = {
      now: function () {
          return (dateTimestampProvider.delegate || Date).now();
      },
      delegate: undefined,
  };

  ((function (_super) {
      __extends(ReplaySubject, _super);
      function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
          if (_bufferSize === void 0) { _bufferSize = Infinity; }
          if (_windowTime === void 0) { _windowTime = Infinity; }
          if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
          var _this = _super.call(this) || this;
          _this._bufferSize = _bufferSize;
          _this._windowTime = _windowTime;
          _this._timestampProvider = _timestampProvider;
          _this._buffer = [];
          _this._infiniteTimeWindow = true;
          _this._infiniteTimeWindow = _windowTime === Infinity;
          _this._bufferSize = Math.max(1, _bufferSize);
          _this._windowTime = Math.max(1, _windowTime);
          return _this;
      }
      ReplaySubject.prototype.next = function (value) {
          var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
          if (!isStopped) {
              _buffer.push(value);
              !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
          }
          this._trimBuffer();
          _super.prototype.next.call(this, value);
      };
      ReplaySubject.prototype._subscribe = function (subscriber) {
          this._throwIfClosed();
          this._trimBuffer();
          var subscription = this._innerSubscribe(subscriber);
          var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
          var copy = _buffer.slice();
          for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
              subscriber.next(copy[i]);
          }
          this._checkFinalizedStatuses(subscriber);
          return subscription;
      };
      ReplaySubject.prototype._trimBuffer = function () {
          var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
          var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
          _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
          if (!_infiniteTimeWindow) {
              var now = _timestampProvider.now();
              var last = 0;
              for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                  last = i;
              }
              last && _buffer.splice(0, last + 1);
          }
      };
      return ReplaySubject;
  })(Subject));

  ((function (_super) {
      __extends(AsyncSubject, _super);
      function AsyncSubject() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this._value = null;
          _this._hasValue = false;
          _this._isComplete = false;
          return _this;
      }
      AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
          var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
          if (hasError) {
              subscriber.error(thrownError);
          }
          else if (isStopped || _isComplete) {
              _hasValue && subscriber.next(_value);
              subscriber.complete();
          }
      };
      AsyncSubject.prototype.next = function (value) {
          if (!this.isStopped) {
              this._value = value;
              this._hasValue = true;
          }
      };
      AsyncSubject.prototype.complete = function () {
          var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
          if (!_isComplete) {
              this._isComplete = true;
              _hasValue && _super.prototype.next.call(this, _value);
              _super.prototype.complete.call(this);
          }
      };
      return AsyncSubject;
  })(Subject));

  var Action = (function (_super) {
      __extends(Action, _super);
      function Action(scheduler, work) {
          return _super.call(this) || this;
      }
      Action.prototype.schedule = function (state, delay) {
          return this;
      };
      return Action;
  }(Subscription));

  var intervalProvider = {
      setInterval: function (handler, timeout) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
              args[_i - 2] = arguments[_i];
          }
          return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
      },
      clearInterval: function (handle) {
          return (clearInterval)(handle);
      },
      delegate: undefined,
  };

  var AsyncAction = (function (_super) {
      __extends(AsyncAction, _super);
      function AsyncAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.pending = false;
          return _this;
      }
      AsyncAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          if (this.closed) {
              return this;
          }
          this.state = state;
          var id = this.id;
          var scheduler = this.scheduler;
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, delay);
          }
          this.pending = true;
          this.delay = delay;
          this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
          return this;
      };
      AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
          if (delay === void 0) { delay = 0; }
          return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          if (delay != null && this.delay === delay && this.pending === false) {
              return id;
          }
          intervalProvider.clearInterval(id);
          return undefined;
      };
      AsyncAction.prototype.execute = function (state, delay) {
          if (this.closed) {
              return new Error('executing a cancelled action');
          }
          this.pending = false;
          var error = this._execute(state, delay);
          if (error) {
              return error;
          }
          else if (this.pending === false && this.id != null) {
              this.id = this.recycleAsyncId(this.scheduler, this.id, null);
          }
      };
      AsyncAction.prototype._execute = function (state, _delay) {
          var errored = false;
          var errorValue;
          try {
              this.work(state);
          }
          catch (e) {
              errored = true;
              errorValue = e ? e : new Error('Scheduled action threw falsy error');
          }
          if (errored) {
              this.unsubscribe();
              return errorValue;
          }
      };
      AsyncAction.prototype.unsubscribe = function () {
          if (!this.closed) {
              var _a = this, id = _a.id, scheduler = _a.scheduler;
              var actions = scheduler.actions;
              this.work = this.state = this.scheduler = null;
              this.pending = false;
              arrRemove(actions, this);
              if (id != null) {
                  this.id = this.recycleAsyncId(scheduler, id, null);
              }
              this.delay = null;
              _super.prototype.unsubscribe.call(this);
          }
      };
      return AsyncAction;
  }(Action));

  var nextHandle = 1;
  var resolved;
  var activeHandles = {};
  function findAndClearHandle(handle) {
      if (handle in activeHandles) {
          delete activeHandles[handle];
          return true;
      }
      return false;
  }
  var Immediate = {
      setImmediate: function (cb) {
          var handle = nextHandle++;
          activeHandles[handle] = true;
          if (!resolved) {
              resolved = Promise.resolve();
          }
          resolved.then(function () { return findAndClearHandle(handle) && cb(); });
          return handle;
      },
      clearImmediate: function (handle) {
          findAndClearHandle(handle);
      },
  };

  var setImmediate = Immediate.setImmediate, clearImmediate = Immediate.clearImmediate;
  var immediateProvider = {
      setImmediate: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var delegate = immediateProvider.delegate;
          return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
      },
      clearImmediate: function (handle) {
          return (clearImmediate)(handle);
      },
      delegate: undefined,
  };

  var AsapAction = (function (_super) {
      __extends(AsapAction, _super);
      function AsapAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          if (delay !== null && delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler._scheduled || (scheduler._scheduled = immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
      };
      AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
              return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          if (!scheduler.actions.some(function (action) { return action.id === id; })) {
              immediateProvider.clearImmediate(id);
              scheduler._scheduled = undefined;
          }
          return undefined;
      };
      return AsapAction;
  }(AsyncAction));

  var Scheduler = (function () {
      function Scheduler(schedulerActionCtor, now) {
          if (now === void 0) { now = Scheduler.now; }
          this.schedulerActionCtor = schedulerActionCtor;
          this.now = now;
      }
      Scheduler.prototype.schedule = function (work, delay, state) {
          if (delay === void 0) { delay = 0; }
          return new this.schedulerActionCtor(this, work).schedule(state, delay);
      };
      Scheduler.now = dateTimestampProvider.now;
      return Scheduler;
  }());

  var AsyncScheduler = (function (_super) {
      __extends(AsyncScheduler, _super);
      function AsyncScheduler(SchedulerAction, now) {
          if (now === void 0) { now = Scheduler.now; }
          var _this = _super.call(this, SchedulerAction, now) || this;
          _this.actions = [];
          _this._active = false;
          _this._scheduled = undefined;
          return _this;
      }
      AsyncScheduler.prototype.flush = function (action) {
          var actions = this.actions;
          if (this._active) {
              actions.push(action);
              return;
          }
          var error;
          this._active = true;
          do {
              if ((error = action.execute(action.state, action.delay))) {
                  break;
              }
          } while ((action = actions.shift()));
          this._active = false;
          if (error) {
              while ((action = actions.shift())) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsyncScheduler;
  }(Scheduler));

  var AsapScheduler = (function (_super) {
      __extends(AsapScheduler, _super);
      function AsapScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      AsapScheduler.prototype.flush = function (action) {
          this._active = true;
          var flushId = this._scheduled;
          this._scheduled = undefined;
          var actions = this.actions;
          var error;
          action = action || actions.shift();
          do {
              if ((error = action.execute(action.state, action.delay))) {
                  break;
              }
          } while ((action = actions[0]) && action.id === flushId && actions.shift());
          this._active = false;
          if (error) {
              while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsapScheduler;
  }(AsyncScheduler));

  new AsapScheduler(AsapAction);

  new AsyncScheduler(AsyncAction);

  var QueueAction = (function (_super) {
      __extends(QueueAction, _super);
      function QueueAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      QueueAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          if (delay > 0) {
              return _super.prototype.schedule.call(this, state, delay);
          }
          this.delay = delay;
          this.state = state;
          this.scheduler.flush(this);
          return this;
      };
      QueueAction.prototype.execute = function (state, delay) {
          return (delay > 0 || this.closed) ?
              _super.prototype.execute.call(this, state, delay) :
              this._execute(state, delay);
      };
      QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          return scheduler.flush(this);
      };
      return QueueAction;
  }(AsyncAction));

  var QueueScheduler = (function (_super) {
      __extends(QueueScheduler, _super);
      function QueueScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      return QueueScheduler;
  }(AsyncScheduler));

  new QueueScheduler(QueueAction);

  var AnimationFrameAction = (function (_super) {
      __extends(AnimationFrameAction, _super);
      function AnimationFrameAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
      }
      AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          if (delay !== null && delay > 0) {
              return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider.requestAnimationFrame(function () { return scheduler.flush(undefined); }));
      };
      AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          if ((delay != null && delay > 0) || (delay == null && this.delay > 0)) {
              return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          if (!scheduler.actions.some(function (action) { return action.id === id; })) {
              animationFrameProvider.cancelAnimationFrame(id);
              scheduler._scheduled = undefined;
          }
          return undefined;
      };
      return AnimationFrameAction;
  }(AsyncAction));

  var AnimationFrameScheduler = (function (_super) {
      __extends(AnimationFrameScheduler, _super);
      function AnimationFrameScheduler() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      AnimationFrameScheduler.prototype.flush = function (action) {
          this._active = true;
          var flushId = this._scheduled;
          this._scheduled = undefined;
          var actions = this.actions;
          var error;
          action = action || actions.shift();
          do {
              if ((error = action.execute(action.state, action.delay))) {
                  break;
              }
          } while ((action = actions[0]) && action.id === flushId && actions.shift());
          this._active = false;
          if (error) {
              while ((action = actions[0]) && action.id === flushId && actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AnimationFrameScheduler;
  }(AsyncScheduler));

  new AnimationFrameScheduler(AnimationFrameAction);

  ((function (_super) {
      __extends(VirtualTimeScheduler, _super);
      function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
          if (schedulerActionCtor === void 0) { schedulerActionCtor = VirtualAction; }
          if (maxFrames === void 0) { maxFrames = Infinity; }
          var _this = _super.call(this, schedulerActionCtor, function () { return _this.frame; }) || this;
          _this.maxFrames = maxFrames;
          _this.frame = 0;
          _this.index = -1;
          return _this;
      }
      VirtualTimeScheduler.prototype.flush = function () {
          var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
          var error;
          var action;
          while ((action = actions[0]) && action.delay <= maxFrames) {
              actions.shift();
              this.frame = action.delay;
              if ((error = action.execute(action.state, action.delay))) {
                  break;
              }
          }
          if (error) {
              while ((action = actions.shift())) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      VirtualTimeScheduler.frameTimeFactor = 10;
      return VirtualTimeScheduler;
  })(AsyncScheduler));
  var VirtualAction = (function (_super) {
      __extends(VirtualAction, _super);
      function VirtualAction(scheduler, work, index) {
          if (index === void 0) { index = (scheduler.index += 1); }
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.index = index;
          _this.active = true;
          _this.index = scheduler.index = index;
          return _this;
      }
      VirtualAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) { delay = 0; }
          if (Number.isFinite(delay)) {
              if (!this.id) {
                  return _super.prototype.schedule.call(this, state, delay);
              }
              this.active = false;
              var action = new VirtualAction(this.scheduler, this.work);
              this.add(action);
              return action.schedule(state, delay);
          }
          else {
              return Subscription.EMPTY;
          }
      };
      VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) { delay = 0; }
          this.delay = scheduler.frame + delay;
          var actions = scheduler.actions;
          actions.push(this);
          actions.sort(VirtualAction.sortActions);
          return true;
      };
      VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          return undefined;
      };
      VirtualAction.prototype._execute = function (state, delay) {
          if (this.active === true) {
              return _super.prototype._execute.call(this, state, delay);
          }
      };
      VirtualAction.sortActions = function (a, b) {
          if (a.delay === b.delay) {
              if (a.index === b.index) {
                  return 0;
              }
              else if (a.index > b.index) {
                  return 1;
              }
              else {
                  return -1;
              }
          }
          else if (a.delay > b.delay) {
              return 1;
          }
          else {
              return -1;
          }
      };
      return VirtualAction;
  }(AsyncAction));

  new Observable(function (subscriber) { return subscriber.complete(); });

  var NotificationKind;
  (function (NotificationKind) {
      NotificationKind["NEXT"] = "N";
      NotificationKind["ERROR"] = "E";
      NotificationKind["COMPLETE"] = "C";
  })(NotificationKind || (NotificationKind = {}));

  createErrorClass(function (_super) { return function EmptyErrorImpl() {
      _super(this);
      this.name = 'EmptyError';
      this.message = 'no elements in sequence';
  }; });

  createErrorClass(function (_super) {
      return function ArgumentOutOfRangeErrorImpl() {
          _super(this);
          this.name = 'ArgumentOutOfRangeError';
          this.message = 'argument out of range';
      };
  });

  createErrorClass(function (_super) {
      return function NotFoundErrorImpl(message) {
          _super(this);
          this.name = 'NotFoundError';
          this.message = message;
      };
  });

  createErrorClass(function (_super) {
      return function SequenceErrorImpl(message) {
          _super(this);
          this.name = 'SequenceError';
          this.message = message;
      };
  });

  createErrorClass(function (_super) {
      return function TimeoutErrorImpl(info) {
          if (info === void 0) { info = null; }
          _super(this);
          this.message = 'Timeout has occurred';
          this.name = 'TimeoutError';
          this.info = info;
      };
  });

  function map(project, thisArg) {
      return operate(function (source, subscriber) {
          var index = 0;
          source.subscribe(createOperatorSubscriber(subscriber, function (value) {
              subscriber.next(project.call(thisArg, value, index++));
          }));
      });
  }

  new Observable(noop);

  const EMPTY_SALT = new Uint8Array();
  function withMeta(meta, creator) {
    creator.meta = meta;
    return creator;
  }
  function createBluePrintTx(meta, fn) {
    return withMeta(meta, (options, ...params) => isOptions(options) ? fn(options, params) : fn(...extractOptions(options, params)));
  }
  function encodeSalt(salt = utilCrypto.randomAsU8a()) {
    return salt instanceof types.Bytes ? salt : salt && salt.length ? util.compactAddLength(util.u8aToU8a(salt)) : EMPTY_SALT;
  }

  const MAX_CALL_GAS = new util.BN(5000000000000).isub(util.BN_ONE);
  const ERROR_NO_CALL = 'Your node does not expose the contracts.call RPC. This is most probably due to a runtime configuration.';
  const l = util.logger('Contract');
  function createQuery(meta, fn) {
    return withMeta(meta, (origin, options, ...params) => isOptions(options) ? fn(origin, options, params) : fn(origin, ...extractOptions(options, params)));
  }
  function createTx(meta, fn) {
    return withMeta(meta, (options, ...params) => isOptions(options) ? fn(options, params) : fn(...extractOptions(options, params)));
  }
  class ContractSubmittableResult extends api.SubmittableResult {
    constructor(result, contractEvents) {
      super(result);
      this.contractEvents = contractEvents;
    }
  }
  class Contract extends Base {
    #query = {};
    #tx = {};
    constructor(api, abi, address, decorateMethod) {
      super(api, abi, decorateMethod);
      this.address = this.registry.createType('AccountId', address);
      this.abi.messages.forEach(m => {
        if (util.isUndefined(this.#tx[m.method])) {
          this.#tx[m.method] = createTx(m, (o, p) => this.#exec(m, o, p));
        }
        if (util.isUndefined(this.#query[m.method])) {
          this.#query[m.method] = createQuery(m, (f, o, p) => this.#read(m, o, p).send(f));
        }
      });
    }
    get hasRpcContractsCall() {
      var _this$api$rx$rpc$cont;
      return util.isFunction((_this$api$rx$rpc$cont = this.api.rx.rpc.contracts) === null || _this$api$rx$rpc$cont === void 0 ? void 0 : _this$api$rx$rpc$cont.call);
    }
    get query() {
      if (!this.hasRpcContractsCall) {
        throw new Error(ERROR_NO_CALL);
      }
      return this.#query;
    }
    get tx() {
      return this.#tx;
    }
    #getGas = (_gasLimit, isCall = false) => {
      const gasLimit = util.bnToBn(_gasLimit);
      return gasLimit.lte(util.BN_ZERO) ? isCall ? MAX_CALL_GAS : (this.api.consts.system.blockWeights ? this.api.consts.system.blockWeights.maxBlock : this.api.consts.system.maximumBlockWeight).muln(64).div(util.BN_HUNDRED) : gasLimit;
    };
    #exec = (messageOrId, {
      gasLimit = util.BN_ZERO,
      storageDepositLimit = null,
      value = util.BN_ZERO
    }, params) => {
      const hasStorageDeposit = this.api.tx.contracts.call.meta.args.length === 5;
      const gas = this.#getGas(gasLimit);
      const encParams = this.abi.findMessage(messageOrId).toU8a(params);
      const tx = hasStorageDeposit ? this.api.tx.contracts.call(this.address, value, gas, storageDepositLimit, encParams)
      : this.api.tx.contracts.call(this.address, value, gas, encParams);
      return tx.withResultTransform(result =>
      new ContractSubmittableResult(result, applyOnEvent(result, ['ContractEmitted', 'ContractExecution'], records => records.map(({
        event: {
          data: [, data]
        }
      }) => {
        try {
          return this.abi.decodeEvent(data);
        } catch (error) {
          l.error(`Unable to decode contract event: ${error.message}`);
          return null;
        }
      }).filter(decoded => !!decoded))));
    };
    #read = (messageOrId, {
      gasLimit = util.BN_ZERO,
      storageDepositLimit = null,
      value = util.BN_ZERO
    }, params) => {
      if (!this.hasRpcContractsCall) {
        throw new Error(ERROR_NO_CALL);
      }
      const message = this.abi.findMessage(messageOrId);
      return {
        send: this._decorateMethod(origin => {
          const hasStorageDeposit = this.api.tx.contracts.call.meta.args.length === 5;
          const inputData = message.toU8a(params);
          const rpc = hasStorageDeposit ? this.api.rx.rpc.contracts.call({
            dest: this.address,
            gasLimit: this.#getGas(gasLimit, true),
            inputData,
            origin,
            storageDepositLimit,
            value
          }) : this.api.rx.rpc.contracts.call({
            dest: this.address,
            gasLimit: this.#getGas(gasLimit, true),
            inputData,
            origin,
            value
          });
          const mapFn = ({
            debugMessage,
            gasConsumed,
            gasRequired,
            result,
            storageDeposit
          }) => ({
            debugMessage,
            gasConsumed,
            gasRequired: gasRequired && !gasRequired.isZero() ? gasRequired : gasConsumed,
            output: result.isOk && message.returnType ? this.abi.registry.createTypeUnsafe(message.returnType.lookupName || message.returnType.type, [result.asOk.data.toU8a(true)], {
              isPedantic: true
            }) : null,
            result,
            storageDeposit
          });
          return rpc.pipe(map(mapFn));
        })
      };
    };
  }

  class BlueprintSubmittableResult extends api.SubmittableResult {
    constructor(result, contract) {
      super(result);
      this.contract = contract;
    }
  }
  class Blueprint extends Base {
    #tx = {};
    constructor(api, abi, codeHash, decorateMethod) {
      super(api, abi, decorateMethod);
      this.codeHash = this.registry.createType('Hash', codeHash);
      this.abi.constructors.forEach(c => {
        if (util.isUndefined(this.#tx[c.method])) {
          this.#tx[c.method] = createBluePrintTx(c, (o, p) => this.#deploy(c, o, p));
        }
      });
    }
    get tx() {
      return this.#tx;
    }
    #deploy = (constructorOrId, {
      gasLimit = util.BN_ZERO,
      salt,
      storageDepositLimit = null,
      value = util.BN_ZERO
    }, params) => {
      const hasStorageDeposit = this.api.tx.contracts.instantiate.meta.args.length === 6;
      const encParams = this.abi.findConstructor(constructorOrId).toU8a(params);
      const encSalt = encodeSalt(salt);
      const tx = hasStorageDeposit ? this.api.tx.contracts.instantiate(value, gasLimit, storageDepositLimit, this.codeHash, encParams, encSalt)
      : this.api.tx.contracts.instantiate(value, gasLimit, this.codeHash, encParams, encSalt);
      return tx.withResultTransform(result => new BlueprintSubmittableResult(result, applyOnEvent(result, ['Instantiated'], ([record]) => new Contract(this.api, this.abi, record.event.data[1], this._decorateMethod))));
    };
  }

  class CodeSubmittableResult extends api.SubmittableResult {
    constructor(result, blueprint, contract) {
      super(result);
      this.blueprint = blueprint;
      this.contract = contract;
    }
  }
  class Code extends Base {
    #tx = {};
    constructor(api, abi, wasm, decorateMethod) {
      super(api, abi, decorateMethod);
      this.code = util.isWasm(this.abi.info.source.wasm) ? this.abi.info.source.wasm : util.u8aToU8a(wasm);
      if (!util.isWasm(this.code)) {
        throw new Error('No WASM code provided');
      }
      this.abi.constructors.forEach(c => {
        if (util.isUndefined(this.#tx[c.method])) {
          this.#tx[c.method] = createBluePrintTx(c, (o, p) => this.#instantiate(c, o, p));
        }
      });
    }
    get tx() {
      return this.#tx;
    }
    #instantiate = (constructorOrId, {
      gasLimit = util.BN_ZERO,
      salt,
      storageDepositLimit = null,
      value = util.BN_ZERO
    }, params) => {
      const hasStorageDeposit = this.api.tx.contracts.instantiateWithCode.meta.args.length === 6;
      const encCode = util.compactAddLength(this.code);
      const encParams = this.abi.findConstructor(constructorOrId).toU8a(params);
      const encSalt = encodeSalt(salt);
      const tx = hasStorageDeposit ? this.api.tx.contracts.instantiateWithCode(value, gasLimit, storageDepositLimit, encCode, encParams, encSalt)
      : this.api.tx.contracts.instantiateWithCode(value, gasLimit, encCode, encParams, encSalt);
      return tx.withResultTransform(result => new CodeSubmittableResult(result, ...(applyOnEvent(result, ['CodeStored', 'Instantiated'], records => records.reduce(([blueprint, contract], {
        event
      }) => this.api.events.contracts.Instantiated.is(event) ? [blueprint, new Contract(this.api, this.abi, event.data[1], this._decorateMethod)] : this.api.events.contracts.CodeStored.is(event) ? [new Blueprint(this.api, this.abi, event.data[0], this._decorateMethod), contract] : [blueprint, contract], [])) || [])));
    };
  }

  class BlueprintPromise extends Blueprint {
    constructor(api$1, abi, codeHash) {
      super(api$1, abi, codeHash, api.toPromiseMethod);
    }
  }
  class CodePromise extends Code {
    constructor(api$1, abi, wasm) {
      super(api$1, abi, wasm, api.toPromiseMethod);
    }
  }
  class ContractPromise extends Contract {
    constructor(api$1, abi, address) {
      super(api$1, abi, address, api.toPromiseMethod);
    }
  }

  class BlueprintRx extends Blueprint {
    constructor(api$1, abi, codeHash) {
      super(api$1, abi, codeHash, api.toRxMethod);
    }
  }
  class CodeRx extends Code {
    constructor(api$1, abi, wasm) {
      super(api$1, abi, wasm, api.toRxMethod);
    }
  }
  class ContractRx extends Contract {
    constructor(api$1, abi, address) {
      super(api$1, abi, address, api.toRxMethod);
    }
  }

  exports.Abi = Abi;
  exports.BlueprintPromise = BlueprintPromise;
  exports.BlueprintRx = BlueprintRx;
  exports.CodePromise = CodePromise;
  exports.CodeRx = CodeRx;
  exports.ContractPromise = ContractPromise;
  exports.ContractRx = ContractRx;
  exports.packageInfo = packageInfo;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
