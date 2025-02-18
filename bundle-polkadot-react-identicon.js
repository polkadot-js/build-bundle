(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@polkadot/ui-settings'), require('@polkadot/util'), require('@polkadot/util-crypto')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', '@polkadot/ui-settings', '@polkadot/util', '@polkadot/util-crypto'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotReactIdenticon = {}, global.React, global.polkadotUiSettings, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, o$1, uiSettings, util, utilCrypto) { 'use strict';

	const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

	var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var jsxRuntime = {exports: {}};

	var reactJsxRuntime_production_min = {};

	/**
	 * @license React
	 * react-jsx-runtime.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var hasRequiredReactJsxRuntime_production_min;
	function requireReactJsxRuntime_production_min () {
		if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
		hasRequiredReactJsxRuntime_production_min = 1;
	var f=o$1,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
		function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
		return reactJsxRuntime_production_min;
	}

	var reactJsxRuntime_development = {};

	/**
	 * @license React
	 * react-jsx-runtime.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var hasRequiredReactJsxRuntime_development;
	function requireReactJsxRuntime_development () {
		if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
		hasRequiredReactJsxRuntime_development = 1;
		if (process.env.NODE_ENV !== "production") {
		  (function() {
		var React = o$1;
		var REACT_ELEMENT_TYPE = Symbol.for('react.element');
		var REACT_PORTAL_TYPE = Symbol.for('react.portal');
		var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
		var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
		var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
		var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
		var REACT_CONTEXT_TYPE = Symbol.for('react.context');
		var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
		var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
		var REACT_MEMO_TYPE = Symbol.for('react.memo');
		var REACT_LAZY_TYPE = Symbol.for('react.lazy');
		var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = '@@iterator';
		function getIteratorFn(maybeIterable) {
		  if (maybeIterable === null || typeof maybeIterable !== 'object') {
		    return null;
		  }
		  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
		  if (typeof maybeIterator === 'function') {
		    return maybeIterator;
		  }
		  return null;
		}
		var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		function error(format) {
		  {
		    {
		      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
		        args[_key2 - 1] = arguments[_key2];
		      }
		      printWarning('error', format, args);
		    }
		  }
		}
		function printWarning(level, format, args) {
		  {
		    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		    var stack = ReactDebugCurrentFrame.getStackAddendum();
		    if (stack !== '') {
		      format += '%s';
		      args = args.concat([stack]);
		    }
		    var argsWithFormat = args.map(function (item) {
		      return String(item);
		    });
		    argsWithFormat.unshift('Warning: ' + format);
		    Function.prototype.apply.call(console[level], console, argsWithFormat);
		  }
		}
		var enableScopeAPI = false;
		var enableCacheElement = false;
		var enableTransitionTracing = false;
		var enableLegacyHidden = false;
		var enableDebugTracing = false;
		var REACT_MODULE_REFERENCE;
		{
		  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
		}
		function isValidElementType(type) {
		  if (typeof type === 'string' || typeof type === 'function') {
		    return true;
		  }
		  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
		    return true;
		  }
		  if (typeof type === 'object' && type !== null) {
		    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE ||
		    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
		      return true;
		    }
		  }
		  return false;
		}
		function getWrappedName(outerType, innerType, wrapperName) {
		  var displayName = outerType.displayName;
		  if (displayName) {
		    return displayName;
		  }
		  var functionName = innerType.displayName || innerType.name || '';
		  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
		}
		function getContextName(type) {
		  return type.displayName || 'Context';
		}
		function getComponentNameFromType(type) {
		  if (type == null) {
		    return null;
		  }
		  {
		    if (typeof type.tag === 'number') {
		      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
		    }
		  }
		  if (typeof type === 'function') {
		    return type.displayName || type.name || null;
		  }
		  if (typeof type === 'string') {
		    return type;
		  }
		  switch (type) {
		    case REACT_FRAGMENT_TYPE:
		      return 'Fragment';
		    case REACT_PORTAL_TYPE:
		      return 'Portal';
		    case REACT_PROFILER_TYPE:
		      return 'Profiler';
		    case REACT_STRICT_MODE_TYPE:
		      return 'StrictMode';
		    case REACT_SUSPENSE_TYPE:
		      return 'Suspense';
		    case REACT_SUSPENSE_LIST_TYPE:
		      return 'SuspenseList';
		  }
		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_CONTEXT_TYPE:
		        var context = type;
		        return getContextName(context) + '.Consumer';
		      case REACT_PROVIDER_TYPE:
		        var provider = type;
		        return getContextName(provider._context) + '.Provider';
		      case REACT_FORWARD_REF_TYPE:
		        return getWrappedName(type, type.render, 'ForwardRef');
		      case REACT_MEMO_TYPE:
		        var outerName = type.displayName || null;
		        if (outerName !== null) {
		          return outerName;
		        }
		        return getComponentNameFromType(type.type) || 'Memo';
		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;
		          try {
		            return getComponentNameFromType(init(payload));
		          } catch (x) {
		            return null;
		          }
		        }
		    }
		  }
		  return null;
		}
		var assign = Object.assign;
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
		function disabledLog() {}
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
		  {
		    if (disabledDepth === 0) {
		      prevLog = console.log;
		      prevInfo = console.info;
		      prevWarn = console.warn;
		      prevError = console.error;
		      prevGroup = console.group;
		      prevGroupCollapsed = console.groupCollapsed;
		      prevGroupEnd = console.groupEnd;
		      var props = {
		        configurable: true,
		        enumerable: true,
		        value: disabledLog,
		        writable: true
		      };
		      Object.defineProperties(console, {
		        info: props,
		        log: props,
		        warn: props,
		        error: props,
		        group: props,
		        groupCollapsed: props,
		        groupEnd: props
		      });
		    }
		    disabledDepth++;
		  }
		}
		function reenableLogs() {
		  {
		    disabledDepth--;
		    if (disabledDepth === 0) {
		      var props = {
		        configurable: true,
		        enumerable: true,
		        writable: true
		      };
		      Object.defineProperties(console, {
		        log: assign({}, props, {
		          value: prevLog
		        }),
		        info: assign({}, props, {
		          value: prevInfo
		        }),
		        warn: assign({}, props, {
		          value: prevWarn
		        }),
		        error: assign({}, props, {
		          value: prevError
		        }),
		        group: assign({}, props, {
		          value: prevGroup
		        }),
		        groupCollapsed: assign({}, props, {
		          value: prevGroupCollapsed
		        }),
		        groupEnd: assign({}, props, {
		          value: prevGroupEnd
		        })
		      });
		    }
		    if (disabledDepth < 0) {
		      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
		    }
		  }
		}
		var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
		  {
		    if (prefix === undefined) {
		      try {
		        throw Error();
		      } catch (x) {
		        var match = x.stack.trim().match(/\n( *(at )?)/);
		        prefix = match && match[1] || '';
		      }
		    }
		    return '\n' + prefix + name;
		  }
		}
		var reentry = false;
		var componentFrameCache;
		{
		  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
		  componentFrameCache = new PossiblyWeakMap();
		}
		function describeNativeComponentFrame(fn, construct) {
		  if ( !fn || reentry) {
		    return '';
		  }
		  {
		    var frame = componentFrameCache.get(fn);
		    if (frame !== undefined) {
		      return frame;
		    }
		  }
		  var control;
		  reentry = true;
		  var previousPrepareStackTrace = Error.prepareStackTrace;
		  Error.prepareStackTrace = undefined;
		  var previousDispatcher;
		  {
		    previousDispatcher = ReactCurrentDispatcher.current;
		    ReactCurrentDispatcher.current = null;
		    disableLogs();
		  }
		  try {
		    if (construct) {
		      var Fake = function () {
		        throw Error();
		      };
		      Object.defineProperty(Fake.prototype, 'props', {
		        set: function () {
		          throw Error();
		        }
		      });
		      if (typeof Reflect === 'object' && Reflect.construct) {
		        try {
		          Reflect.construct(Fake, []);
		        } catch (x) {
		          control = x;
		        }
		        Reflect.construct(fn, [], Fake);
		      } else {
		        try {
		          Fake.call();
		        } catch (x) {
		          control = x;
		        }
		        fn.call(Fake.prototype);
		      }
		    } else {
		      try {
		        throw Error();
		      } catch (x) {
		        control = x;
		      }
		      fn();
		    }
		  } catch (sample) {
		    if (sample && control && typeof sample.stack === 'string') {
		      var sampleLines = sample.stack.split('\n');
		      var controlLines = control.stack.split('\n');
		      var s = sampleLines.length - 1;
		      var c = controlLines.length - 1;
		      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
		        c--;
		      }
		      for (; s >= 1 && c >= 0; s--, c--) {
		        if (sampleLines[s] !== controlLines[c]) {
		          if (s !== 1 || c !== 1) {
		            do {
		              s--;
		              c--;
		              if (c < 0 || sampleLines[s] !== controlLines[c]) {
		                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');
		                if (fn.displayName && _frame.includes('<anonymous>')) {
		                  _frame = _frame.replace('<anonymous>', fn.displayName);
		                }
		                {
		                  if (typeof fn === 'function') {
		                    componentFrameCache.set(fn, _frame);
		                  }
		                }
		                return _frame;
		              }
		            } while (s >= 1 && c >= 0);
		          }
		          break;
		        }
		      }
		    }
		  } finally {
		    reentry = false;
		    {
		      ReactCurrentDispatcher.current = previousDispatcher;
		      reenableLogs();
		    }
		    Error.prepareStackTrace = previousPrepareStackTrace;
		  }
		  var name = fn ? fn.displayName || fn.name : '';
		  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
		  {
		    if (typeof fn === 'function') {
		      componentFrameCache.set(fn, syntheticFrame);
		    }
		  }
		  return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
		  {
		    return describeNativeComponentFrame(fn, false);
		  }
		}
		function shouldConstruct(Component) {
		  var prototype = Component.prototype;
		  return !!(prototype && prototype.isReactComponent);
		}
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
		  if (type == null) {
		    return '';
		  }
		  if (typeof type === 'function') {
		    {
		      return describeNativeComponentFrame(type, shouldConstruct(type));
		    }
		  }
		  if (typeof type === 'string') {
		    return describeBuiltInComponentFrame(type);
		  }
		  switch (type) {
		    case REACT_SUSPENSE_TYPE:
		      return describeBuiltInComponentFrame('Suspense');
		    case REACT_SUSPENSE_LIST_TYPE:
		      return describeBuiltInComponentFrame('SuspenseList');
		  }
		  if (typeof type === 'object') {
		    switch (type.$$typeof) {
		      case REACT_FORWARD_REF_TYPE:
		        return describeFunctionComponentFrame(type.render);
		      case REACT_MEMO_TYPE:
		        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
		      case REACT_LAZY_TYPE:
		        {
		          var lazyComponent = type;
		          var payload = lazyComponent._payload;
		          var init = lazyComponent._init;
		          try {
		            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
		          } catch (x) {}
		        }
		    }
		  }
		  return '';
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame.setExtraStackFrame(null);
		    }
		  }
		}
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
		  {
		    var has = Function.call.bind(hasOwnProperty);
		    for (var typeSpecName in typeSpecs) {
		      if (has(typeSpecs, typeSpecName)) {
		        var error$1 = void 0;
		        try {
		          if (typeof typeSpecs[typeSpecName] !== 'function') {
		            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
		            err.name = 'Invariant Violation';
		            throw err;
		          }
		          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
		        } catch (ex) {
		          error$1 = ex;
		        }
		        if (error$1 && !(error$1 instanceof Error)) {
		          setCurrentlyValidatingElement(element);
		          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
		          setCurrentlyValidatingElement(null);
		        }
		        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
		          loggedTypeFailures[error$1.message] = true;
		          setCurrentlyValidatingElement(element);
		          error('Failed %s type: %s', location, error$1.message);
		          setCurrentlyValidatingElement(null);
		        }
		      }
		    }
		  }
		}
		var isArrayImpl = Array.isArray;
		function isArray(a) {
		  return isArrayImpl(a);
		}
		function typeName(value) {
		  {
		    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
		    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
		    return type;
		  }
		}
		function willCoercionThrow(value) {
		  {
		    try {
		      testStringCoercion(value);
		      return false;
		    } catch (e) {
		      return true;
		    }
		  }
		}
		function testStringCoercion(value) {
		  return '' + value;
		}
		function checkKeyStringCoercion(value) {
		  {
		    if (willCoercionThrow(value)) {
		      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));
		      return testStringCoercion(value);
		    }
		  }
		}
		var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
		var RESERVED_PROPS = {
		  key: true,
		  ref: true,
		  __self: true,
		  __source: true
		};
		var specialPropKeyWarningShown;
		var specialPropRefWarningShown;
		var didWarnAboutStringRefs;
		{
		  didWarnAboutStringRefs = {};
		}
		function hasValidRef(config) {
		  {
		    if (hasOwnProperty.call(config, 'ref')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }
		  return config.ref !== undefined;
		}
		function hasValidKey(config) {
		  {
		    if (hasOwnProperty.call(config, 'key')) {
		      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
		      if (getter && getter.isReactWarning) {
		        return false;
		      }
		    }
		  }
		  return config.key !== undefined;
		}
		function warnIfStringRefCannotBeAutoConverted(config, self) {
		  {
		    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
		      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
		      if (!didWarnAboutStringRefs[componentName]) {
		        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
		        didWarnAboutStringRefs[componentName] = true;
		      }
		    }
		  }
		}
		function defineKeyPropWarningGetter(props, displayName) {
		  {
		    var warnAboutAccessingKey = function () {
		      if (!specialPropKeyWarningShown) {
		        specialPropKeyWarningShown = true;
		        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    };
		    warnAboutAccessingKey.isReactWarning = true;
		    Object.defineProperty(props, 'key', {
		      get: warnAboutAccessingKey,
		      configurable: true
		    });
		  }
		}
		function defineRefPropWarningGetter(props, displayName) {
		  {
		    var warnAboutAccessingRef = function () {
		      if (!specialPropRefWarningShown) {
		        specialPropRefWarningShown = true;
		        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
		      }
		    };
		    warnAboutAccessingRef.isReactWarning = true;
		    Object.defineProperty(props, 'ref', {
		      get: warnAboutAccessingRef,
		      configurable: true
		    });
		  }
		}
		var ReactElement = function (type, key, ref, self, source, owner, props) {
		  var element = {
		    $$typeof: REACT_ELEMENT_TYPE,
		    type: type,
		    key: key,
		    ref: ref,
		    props: props,
		    _owner: owner
		  };
		  {
		    element._store = {};
		    Object.defineProperty(element._store, 'validated', {
		      configurable: false,
		      enumerable: false,
		      writable: true,
		      value: false
		    });
		    Object.defineProperty(element, '_self', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: self
		    });
		    Object.defineProperty(element, '_source', {
		      configurable: false,
		      enumerable: false,
		      writable: false,
		      value: source
		    });
		    if (Object.freeze) {
		      Object.freeze(element.props);
		      Object.freeze(element);
		    }
		  }
		  return element;
		};
		function jsxDEV(type, config, maybeKey, source, self) {
		  {
		    var propName;
		    var props = {};
		    var key = null;
		    var ref = null;
		    if (maybeKey !== undefined) {
		      {
		        checkKeyStringCoercion(maybeKey);
		      }
		      key = '' + maybeKey;
		    }
		    if (hasValidKey(config)) {
		      {
		        checkKeyStringCoercion(config.key);
		      }
		      key = '' + config.key;
		    }
		    if (hasValidRef(config)) {
		      ref = config.ref;
		      warnIfStringRefCannotBeAutoConverted(config, self);
		    }
		    for (propName in config) {
		      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
		        props[propName] = config[propName];
		      }
		    }
		    if (type && type.defaultProps) {
		      var defaultProps = type.defaultProps;
		      for (propName in defaultProps) {
		        if (props[propName] === undefined) {
		          props[propName] = defaultProps[propName];
		        }
		      }
		    }
		    if (key || ref) {
		      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
		      if (key) {
		        defineKeyPropWarningGetter(props, displayName);
		      }
		      if (ref) {
		        defineRefPropWarningGetter(props, displayName);
		      }
		    }
		    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		  }
		}
		var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement$1(element) {
		  {
		    if (element) {
		      var owner = element._owner;
		      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
		      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
		    } else {
		      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		    }
		  }
		}
		var propTypesMisspellWarningShown;
		{
		  propTypesMisspellWarningShown = false;
		}
		function isValidElement(object) {
		  {
		    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		  }
		}
		function getDeclarationErrorAddendum() {
		  {
		    if (ReactCurrentOwner$1.current) {
		      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
		      if (name) {
		        return '\n\nCheck the render method of `' + name + '`.';
		      }
		    }
		    return '';
		  }
		}
		function getSourceInfoErrorAddendum(source) {
		  {
		    return '';
		  }
		}
		var ownerHasKeyUseWarning = {};
		function getCurrentComponentErrorInfo(parentType) {
		  {
		    var info = getDeclarationErrorAddendum();
		    if (!info) {
		      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
		      if (parentName) {
		        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
		      }
		    }
		    return info;
		  }
		}
		function validateExplicitKey(element, parentType) {
		  {
		    if (!element._store || element._store.validated || element.key != null) {
		      return;
		    }
		    element._store.validated = true;
		    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
		    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
		      return;
		    }
		    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
		    var childOwner = '';
		    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
		      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
		    }
		    setCurrentlyValidatingElement$1(element);
		    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
		    setCurrentlyValidatingElement$1(null);
		  }
		}
		function validateChildKeys(node, parentType) {
		  {
		    if (typeof node !== 'object') {
		      return;
		    }
		    if (isArray(node)) {
		      for (var i = 0; i < node.length; i++) {
		        var child = node[i];
		        if (isValidElement(child)) {
		          validateExplicitKey(child, parentType);
		        }
		      }
		    } else if (isValidElement(node)) {
		      if (node._store) {
		        node._store.validated = true;
		      }
		    } else if (node) {
		      var iteratorFn = getIteratorFn(node);
		      if (typeof iteratorFn === 'function') {
		        if (iteratorFn !== node.entries) {
		          var iterator = iteratorFn.call(node);
		          var step;
		          while (!(step = iterator.next()).done) {
		            if (isValidElement(step.value)) {
		              validateExplicitKey(step.value, parentType);
		            }
		          }
		        }
		      }
		    }
		  }
		}
		function validatePropTypes(element) {
		  {
		    var type = element.type;
		    if (type === null || type === undefined || typeof type === 'string') {
		      return;
		    }
		    var propTypes;
		    if (typeof type === 'function') {
		      propTypes = type.propTypes;
		    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
		    type.$$typeof === REACT_MEMO_TYPE)) {
		      propTypes = type.propTypes;
		    } else {
		      return;
		    }
		    if (propTypes) {
		      var name = getComponentNameFromType(type);
		      checkPropTypes(propTypes, element.props, 'prop', name, element);
		    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
		      propTypesMisspellWarningShown = true;
		      var _name = getComponentNameFromType(type);
		      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
		    }
		    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
		      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
		    }
		  }
		}
		function validateFragmentProps(fragment) {
		  {
		    var keys = Object.keys(fragment.props);
		    for (var i = 0; i < keys.length; i++) {
		      var key = keys[i];
		      if (key !== 'children' && key !== 'key') {
		        setCurrentlyValidatingElement$1(fragment);
		        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
		        setCurrentlyValidatingElement$1(null);
		        break;
		      }
		    }
		    if (fragment.ref !== null) {
		      setCurrentlyValidatingElement$1(fragment);
		      error('Invalid attribute `ref` supplied to `React.Fragment`.');
		      setCurrentlyValidatingElement$1(null);
		    }
		  }
		}
		function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
		  {
		    var validType = isValidElementType(type);
		    if (!validType) {
		      var info = '';
		      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
		        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
		      }
		      var sourceInfo = getSourceInfoErrorAddendum();
		      if (sourceInfo) {
		        info += sourceInfo;
		      } else {
		        info += getDeclarationErrorAddendum();
		      }
		      var typeString;
		      if (type === null) {
		        typeString = 'null';
		      } else if (isArray(type)) {
		        typeString = 'array';
		      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
		        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
		        info = ' Did you accidentally export a JSX literal instead of a component?';
		      } else {
		        typeString = typeof type;
		      }
		      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
		    }
		    var element = jsxDEV(type, props, key, source, self);
		    if (element == null) {
		      return element;
		    }
		    if (validType) {
		      var children = props.children;
		      if (children !== undefined) {
		        if (isStaticChildren) {
		          if (isArray(children)) {
		            for (var i = 0; i < children.length; i++) {
		              validateChildKeys(children[i], type);
		            }
		            if (Object.freeze) {
		              Object.freeze(children);
		            }
		          } else {
		            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
		          }
		        } else {
		          validateChildKeys(children, type);
		        }
		      }
		    }
		    if (type === REACT_FRAGMENT_TYPE) {
		      validateFragmentProps(element);
		    } else {
		      validatePropTypes(element);
		    }
		    return element;
		  }
		}
		function jsxWithValidationStatic(type, props, key) {
		  {
		    return jsxWithValidation(type, props, key, true);
		  }
		}
		function jsxWithValidationDynamic(type, props, key) {
		  {
		    return jsxWithValidation(type, props, key, false);
		  }
		}
		var jsx =  jsxWithValidationDynamic ;
		var jsxs =  jsxWithValidationStatic ;
		reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
		reactJsxRuntime_development.jsx = jsx;
		reactJsxRuntime_development.jsxs = jsxs;
		  })();
		}
		return reactJsxRuntime_development;
	}

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production_min();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	var jsxRuntimeExports = jsxRuntime.exports;
	getDefaultExportFromCjs(jsxRuntimeExports);

	const COLORS = [
	    '#ffe119', '#4363d8', '#f58231', '#fabebe', '#e6beff', '#800000', '#000075', '#a9a9a9', '#ffffff', '#000000'
	];
	const SHAPE_COUNT = 5;

	const SVG_NS = 'http://www.w3.org/2000/svg';
	function svg(type) {
	    return document.createElementNS(SVG_NS, type);
	}

	function circle$1(r, cx, cy) {
	    const elem = svg('circle');
	    elem.setAttributeNS('', 'cx', `${cx}`);
	    elem.setAttributeNS('', 'cy', `${cy}`);
	    elem.setAttributeNS('', 'r', `${r}`);
	    return elem;
	}

	function circle(seeder, fill, diameter, count) {
	    const center = diameter / 2;
	    const angle = seeder() * 360;
	    const radius = (((SHAPE_COUNT - count) / SHAPE_COUNT) * (diameter / 2)) + ((diameter / 8) * seeder());
	    const offset = (diameter / 4) * (seeder() + ((count + 1) / SHAPE_COUNT));
	    const cx = (offset * Math.sin(angle)) + center;
	    const cy = (offset * Math.cos(angle)) + center;
	    const svg = circle$1(radius, cx, cy);
	    svg.setAttributeNS('', 'fill', fill);
	    return svg;
	}

	function element(size, type = 'svg', x = 0, y = 0) {
	    const elem = svg(type);
	    elem.setAttributeNS('', 'x', `${x}`);
	    elem.setAttributeNS('', 'y', `${y}`);
	    elem.setAttributeNS('', 'width', `${size}`);
	    elem.setAttributeNS('', 'height', `${size}`);
	    return elem;
	}

	var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return "string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return (r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return {r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return {r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return {h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b$1=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return {r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return {h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return {h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f$1=function(r){return b$1((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e;},c=function(r){return {h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u;},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v$1=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y$1={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v$1.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f$1(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f$1(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return {h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b$1(h)},"hsv"]]},N$1=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return [e,t[n][1]]}return [null,void 0]},x$1=function(r){return "string"==typeof r?N$1(r.trim(),y$1.string):"object"==typeof r&&null!==r?N$1(r,y$1.object):[null,void 0]},M$1=function(r,t){var n=c(r);return {h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H$1=function(r){return (299*r.r+587*r.g+114*r.b)/1e3/255},$$1=function(r,t){var n=c(r);return {h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j$1=function(){function r(r){this.parsed=x$1(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1};}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H$1(this.rgba),2)},r.prototype.isDark=function(){return H$1(this.rgba)<.5},r.prototype.isLight=function(){return H$1(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i;},r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u;},r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u;},r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};var r;},r.prototype.invert=function(){return w$1({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r;},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w$1(M$1(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w$1(M$1(this.rgba,-r))},r.prototype.grayscale=function(){return w$1(M$1(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w$1($$1(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w$1($$1(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return "number"==typeof r?w$1({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);var t;},r.prototype.hue=function(r){var t=c(this.rgba);return "number"==typeof r?w$1({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w$1(r).toHex()},r}(),w$1=function(r){return r instanceof j$1?r:new j$1(r)};

	const WOBBLE = 30;
	function colors(seeder) {
	    const amount = (seeder() * WOBBLE) - (WOBBLE / 2);
	    const all = COLORS.map((hex) => w$1(hex).rotate(amount));
	    return (alpha = 1) => {
	        const index = Math.floor(all.length * seeder());
	        return all.splice(index, 1)[0]
	            .alpha(alpha)
	            .toHslString();
	    };
	}

	function container(diameter, background = 'white', className = '', _style = {}) {
	    const element = document.createElement('div');
	    const style = Object.assign({
	        background,
	        borderRadius: `${diameter / 2}px`,
	        display: 'inline-block',
	        height: `${diameter}px`,
	        margin: '0px',
	        overflow: 'hidden',
	        padding: '0px',
	        width: `${diameter}px`
	    }, _style);
	    element.className = className;
	    element.style.background = background;
	    Object.keys(style).forEach((key) => {
	        element.style[key] = style[key];
	    });
	    return element;
	}

	const DIVISOR = 256 * 256;
	function seeder(_seed = new Uint8Array(32)) {
	    const seed = util.isU8a(_seed)
	        ? _seed
	        : util.stringToU8a(_seed);
	    let index = (seed[Math.floor(seed.length / 2)] % seed.length) - 1;
	    const next = () => {
	        index += 1;
	        if (index === seed.length) {
	            index = 0;
	        }
	        return seed[index];
	    };
	    return () => {
	        return ((next() * 256) + next()) / DIVISOR;
	    };
	}

	function beachballIcon(seed, { size = 256 }, className = '', style) {
	    const seeder$1 = seeder(seed);
	    const colorGen = colors(seeder$1);
	    const outer = container(size, 'white', className, style);
	    const container$1 = container(size, colorGen());
	    const svg = element(size);
	    outer.appendChild(container$1);
	    container$1.appendChild(svg);
	    for (let count = 0; count < SHAPE_COUNT; count++) {
	        const fill = colorGen();
	        const shape = circle(seeder$1, fill, size, count);
	        svg.appendChild(shape);
	    }
	    return outer;
	}

	const S$1 = 64;
	const C$1 = S$1 / 2;
	const Z$1 = S$1 / 64 * 5;
	const SCHEMES = [
	     { colors: [0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 1], freq: 1 },
	     { colors: [0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 5], freq: 20 },
	     { colors: [1, 2, 3, 1, 2, 4, 5, 5, 4, 1, 2, 3, 1, 2, 4, 5, 5, 4, 0], freq: 16 },
	     { colors: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3], freq: 32 },
	     { colors: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6], freq: 32 },
	     { colors: [0, 1, 2, 3, 4, 5, 3, 4, 2, 0, 1, 6, 7, 8, 9, 7, 8, 6, 10], freq: 128 },
	     { colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8, 6, 7, 5, 3, 4, 2, 11], freq: 128 }
	];
	const SCHEMES_TOTAL = SCHEMES
	    .map((s) => s.freq)
	    .reduce((a, b) => a + b);
	const OUTER_CIRCLE = {
	    cx: C$1,
	    cy: C$1,
	    fill: '#eee',
	    r: C$1
	};
	let zeroHash = new Uint8Array();
	function getRotation(isSixPoint) {
	    const r = isSixPoint
	        ? (C$1 / 8 * 5)
	        : (C$1 / 4 * 3);
	    const rroot3o2 = r * Math.sqrt(3) / 2;
	    const ro2 = r / 2;
	    const rroot3o4 = r * Math.sqrt(3) / 4;
	    const ro4 = r / 4;
	    const r3o4 = r * 3 / 4;
	    return { r, r3o4, ro2, ro4, rroot3o2, rroot3o4 };
	}
	function getCircleXY(isSixPoint = false) {
	    const { r, r3o4, ro2, ro4, rroot3o2, rroot3o4 } = getRotation(isSixPoint);
	    return [
	        [C$1, C$1 - r],
	        [C$1, C$1 - ro2],
	        [C$1 - rroot3o4, C$1 - r3o4],
	        [C$1 - rroot3o2, C$1 - ro2],
	        [C$1 - rroot3o4, C$1 - ro4],
	        [C$1 - rroot3o2, C$1],
	        [C$1 - rroot3o2, C$1 + ro2],
	        [C$1 - rroot3o4, C$1 + ro4],
	        [C$1 - rroot3o4, C$1 + r3o4],
	        [C$1, C$1 + r],
	        [C$1, C$1 + ro2],
	        [C$1 + rroot3o4, C$1 + r3o4],
	        [C$1 + rroot3o2, C$1 + ro2],
	        [C$1 + rroot3o4, C$1 + ro4],
	        [C$1 + rroot3o2, C$1],
	        [C$1 + rroot3o2, C$1 - ro2],
	        [C$1 + rroot3o4, C$1 - ro4],
	        [C$1 + rroot3o4, C$1 - r3o4],
	        [C$1, C$1]
	    ];
	}
	function findScheme(d) {
	    let cum = 0;
	    const schema = SCHEMES.find((schema) => {
	        cum += schema.freq;
	        return d < cum;
	    });
	    if (!schema) {
	        throw new Error('Unable to find schema');
	    }
	    return schema;
	}
	function addressToId(address) {
	    if (!zeroHash.length) {
	        zeroHash = utilCrypto.blake2AsU8a(new Uint8Array(32), 512);
	    }
	    return utilCrypto.blake2AsU8a(utilCrypto.decodeAddress(address), 512).map((x, i) => (x + 256 - zeroHash[i]) % 256);
	}
	function getColors(address) {
	    const id = addressToId(address);
	    const d = Math.floor((id[30] + id[31] * 256) % SCHEMES_TOTAL);
	    const rot = (id[28] % 6) * 3;
	    const sat = (Math.floor(id[29] * 70 / 256 + 26) % 80) + 30;
	    const scheme = findScheme(d);
	    const palette = Array.from(id).map((x, i) => {
	        const b = (x + i % 28 * 58) % 256;
	        if (b === 0) {
	            return '#444';
	        }
	        else if (b === 255) {
	            return 'transparent';
	        }
	        const h = Math.floor(b % 64 * 360 / 64);
	        const l = [53, 15, 35, 75][Math.floor(b / 64)];
	        return `hsl(${h}, ${sat}%, ${l}%)`;
	    });
	    return scheme.colors.map((_, i) => palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]]);
	}
	function polkadotIcon(address, { isAlternative }) {
	    const xy = getCircleXY(isAlternative);
	    let colors;
	    try {
	        colors = getColors(address);
	    }
	    catch {
	        colors = new Array(xy.length).fill('#ddd');
	    }
	    return [OUTER_CIRCLE].concat(xy.map(([cx, cy], index) => ({
	        cx, cy, fill: colors[index], r: Z$1
	    })));
	}

	function Identicon$5({ address, className = '', size, style = {} }) {
	    const updateElem = o$1.useCallback((node) => {
	        node?.appendChild(beachballIcon(address, { isAlternative: false, size }));
	    }, [address, size]);
	    return (jsxRuntimeExports.jsx("div", { className: className, ref: updateElem, style: style }));
	}
	const Beachball = o$1.memo(Identicon$5);

	function Identicon$4({ className = '', size, style = {} }) {
	    return (jsxRuntimeExports.jsx("svg", { className: className, height: size, style: style, viewBox: '0 0 64 64', width: size }));
	}
	const Empty = o$1.memo(Identicon$4);

	var main = {exports: {}};

	(function (module, exports) {
		(function webpackUniversalModuleDefinition(root, factory) {
			module.exports = factory();
		})(commonjsGlobal, function() {
		return  (function(modules) {
		 	var installedModules = {};
		 	function __webpack_require__(moduleId) {
		 		if(installedModules[moduleId])
		 			return installedModules[moduleId].exports;
		 		var module = installedModules[moduleId] = {
		 			exports: {},
		 			id: moduleId,
		 			loaded: false
		 		};
		 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		 		module.loaded = true;
		 		return module.exports;
		 	}
		 	__webpack_require__.m = modules;
		 	__webpack_require__.c = installedModules;
		 	__webpack_require__.p = "";
		 	return __webpack_require__(0);
		 })
		 ([
		 function(module, exports, __webpack_require__) {
			const pnglib = __webpack_require__(1);
			const hsl2rgb = __webpack_require__(2);
			const randseed = new Array(4);
			function seedrand(seed) {
			  for (let i = 0; i < randseed.length; i++) {
			    randseed[i] = 0;
			  }
			  for (let i = 0; i < seed.length; i++) {
			    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
			  }
			}
			function rand() {
			  const t = randseed[0] ^ (randseed[0] << 11);
			  randseed[0] = randseed[1];
			  randseed[1] = randseed[2];
			  randseed[2] = randseed[3];
			  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);
			  return (randseed[3] >>> 0) / (1 << 31 >>> 0);
			}
			function createColor() {
			  const h = Math.floor(rand() * 360);
			  const s = rand() * 60 + 40;
			  const l = (rand() + rand() + rand() + rand()) * 25 ;
			  return [h / 360, s / 100, l / 100];
			}
			function createImageData(size) {
			  const width = size;
			  const height = size;
			  const dataWidth = Math.ceil(width / 2);
			  const mirrorWidth = width - dataWidth;
			  const data = [];
			  for (let y = 0; y < height; y++) {
			    let row = [];
			    for (let x = 0; x < dataWidth; x++) {
			      row[x] = Math.floor(rand() * 2.3);
			    }
			    const r = row.slice(0, mirrorWidth).reverse();
			    row = row.concat(r);
			    for (let i = 0; i < row.length; i++) {
			      data.push(row[i]);
			    }
			  }
			  return data;
			}
			function fillRect(png, x, y, w, h, color) {
			  for(let i = 0; i < w; i++) {
			    for (let j = 0; j < h; j++) {
			      png.buffer[png.index(x + i, y + j)] = color;
			    }
			  }
			}
			function buildOpts(opts) {
			  if (!opts.seed) {
			    throw new Error('No seed provided');
			  }
			  seedrand(opts.seed);
			  return Object.assign({
			    size: 8,
			    scale: 16,
			    color: createColor(),
			    bgcolor: createColor(),
			    spotcolor: createColor(),
			  }, opts)
			}
			function makeBlockie(address) {
			  const opts = buildOpts({ seed: address.toLowerCase() });
			  const imageData = createImageData(opts.size);
			  const width = Math.sqrt(imageData.length);
			  const p = new pnglib(opts.size * opts.scale, opts.size * opts.scale, 3);
			  p.color(...hsl2rgb(...opts.bgcolor));
			  const color = p.color(...hsl2rgb(...opts.color));
			  const spotcolor = p.color(...hsl2rgb(...opts.spotcolor));
			  for (let i = 0; i < imageData.length; i++) {
			    const row = Math.floor(i / width);
			    const col = i % width;
			    if (imageData[i]) {
			      const pngColor = imageData[i] == 1 ? color : spotcolor;
			      fillRect(p, col * opts.scale, row * opts.scale, opts.scale, opts.scale, pngColor);
			    }
			  }
			  return `data:image/png;base64,${p.getBase64()}`;
			}
			module.exports = makeBlockie;
		 },
		 function(module, exports) {
			/**
			 * A handy class to calculate color values.
			 *
			 * @version 1.0
			 * @author Robert Eisele <robert@xarg.org>
			 * @copyright Copyright (c) 2010, Robert Eisele
			 * @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
			 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
			 *
			 */
			module.exports = function(width,height,depth) {
			    function write(buffer, offs) {
			        for (var i = 2; i < arguments.length; i++) {
			            for (var j = 0; j < arguments[i].length; j++) {
			                buffer[offs++] = arguments[i].charAt(j);
			            }
			        }
			    }
			    function byte2(w) {
			        return String.fromCharCode((w >> 8) & 255, w & 255);
			    }
			    function byte4(w) {
			        return String.fromCharCode((w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w & 255);
			    }
			    function byte2lsb(w) {
			        return String.fromCharCode(w & 255, (w >> 8) & 255);
			    }
			    this.width   = width;
			    this.height  = height;
			    this.depth   = depth;
			    this.pix_size = height * (width + 1);
			    this.data_size = 2 + this.pix_size + 5 * Math.floor((0xfffe + this.pix_size) / 0xffff) + 4;
			    this.ihdr_offs = 0;
			    this.ihdr_size = 4 + 4 + 13 + 4;
			    this.plte_offs = this.ihdr_offs + this.ihdr_size;
			    this.plte_size = 4 + 4 + 3 * depth + 4;
			    this.trns_offs = this.plte_offs + this.plte_size;
			    this.trns_size = 4 + 4 + depth + 4;
			    this.idat_offs = this.trns_offs + this.trns_size;
			    this.idat_size = 4 + 4 + this.data_size + 4;
			    this.iend_offs = this.idat_offs + this.idat_size;
			    this.iend_size = 4 + 4 + 4;
			    this.buffer_size  = this.iend_offs + this.iend_size;
			    this.buffer  = new Array();
			    this.palette = new Object();
			    this.pindex  = 0;
			    var _crc32 = new Array();
			    for (var i = 0; i < this.buffer_size; i++) {
			        this.buffer[i] = "\x00";
			    }
			    write(this.buffer, this.ihdr_offs, byte4(this.ihdr_size - 12), 'IHDR', byte4(width), byte4(height), "\x08\x03");
			    write(this.buffer, this.plte_offs, byte4(this.plte_size - 12), 'PLTE');
			    write(this.buffer, this.trns_offs, byte4(this.trns_size - 12), 'tRNS');
			    write(this.buffer, this.idat_offs, byte4(this.idat_size - 12), 'IDAT');
			    write(this.buffer, this.iend_offs, byte4(this.iend_size - 12), 'IEND');
			    var header = ((8 + (7 << 4)) << 8) | (3 << 6);
			    header+= 31 - (header % 31);
			    write(this.buffer, this.idat_offs + 8, byte2(header));
			    for (var i = 0; (i << 16) - 1 < this.pix_size; i++) {
			        var size, bits;
			        if (i + 0xffff < this.pix_size) {
			            size = 0xffff;
			            bits = "\x00";
			        } else {
			            size = this.pix_size - (i << 16) - i;
			            bits = "\x01";
			        }
			        write(this.buffer, this.idat_offs + 8 + 2 + (i << 16) + (i << 2), bits, byte2lsb(size), byte2lsb(~size));
			    }
			    for (var i = 0; i < 256; i++) {
			        var c = i;
			        for (var j = 0; j < 8; j++) {
			            if (c & 1) {
			                c = -306674912 ^ ((c >> 1) & 0x7fffffff);
			            } else {
			                c = (c >> 1) & 0x7fffffff;
			            }
			        }
			        _crc32[i] = c;
			    }
			    this.index = function(x,y) {
			        var i = y * (this.width + 1) + x + 1;
			        var j = this.idat_offs + 8 + 2 + 5 * Math.floor((i / 0xffff) + 1) + i;
			        return j;
			    };
			    this.color = function(red, green, blue, alpha) {
			        alpha = alpha >= 0 ? alpha : 255;
			        var color = (((((alpha << 8) | red) << 8) | green) << 8) | blue;
			        if (typeof this.palette[color] == "undefined") {
			            if (this.pindex == this.depth) return "\x00";
			            var ndx = this.plte_offs + 8 + 3 * this.pindex;
			            this.buffer[ndx + 0] = String.fromCharCode(red);
			            this.buffer[ndx + 1] = String.fromCharCode(green);
			            this.buffer[ndx + 2] = String.fromCharCode(blue);
			            this.buffer[this.trns_offs+8+this.pindex] = String.fromCharCode(alpha);
			            this.palette[color] = String.fromCharCode(this.pindex++);
			        }
			        return this.palette[color];
			    };
			    this.getBase64 = function() {
			        var s = this.getDump();
			        var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			        var c1, c2, c3, e1, e2, e3, e4;
			        var l = s.length;
			        var i = 0;
			        var r = "";
			        do {
			            c1 = s.charCodeAt(i);
			            e1 = c1 >> 2;
			            c2 = s.charCodeAt(i+1);
			            e2 = ((c1 & 3) << 4) | (c2 >> 4);
			            c3 = s.charCodeAt(i+2);
			            if (l < i+2) { e3 = 64; } else { e3 = ((c2 & 0xf) << 2) | (c3 >> 6); }
			            if (l < i+3) { e4 = 64; } else { e4 = c3 & 0x3f; }
			            r+= ch.charAt(e1) + ch.charAt(e2) + ch.charAt(e3) + ch.charAt(e4);
			        } while ((i+= 3) < l);
			        return r;
			    };
			    this.getDump = function() {
			        var BASE = 65521;
			        var NMAX = 5552;
			        var s1 = 1;
			        var s2 = 0;
			        var n = NMAX;
			        for (var y = 0; y < this.height; y++) {
			            for (var x = -1; x < this.width; x++) {
			                s1+= this.buffer[this.index(x, y)].charCodeAt(0);
			                s2+= s1;
			                if ((n-= 1) == 0) {
			                    s1%= BASE;
			                    s2%= BASE;
			                    n = NMAX;
			                }
			            }
			        }
			        s1%= BASE;
			        s2%= BASE;
			        write(this.buffer, this.idat_offs + this.idat_size - 8, byte4((s2 << 16) | s1));
			        function crc32(png, offs, size) {
			            var crc = -1;
			            for (var i = 4; i < size-4; i += 1) {
			                crc = _crc32[(crc ^ png[offs+i].charCodeAt(0)) & 0xff] ^ ((crc >> 8) & 0x00ffffff);
			            }
			            write(png, offs+size-4, byte4(crc ^ -1));
			        }
			        crc32(this.buffer, this.ihdr_offs, this.ihdr_size);
			        crc32(this.buffer, this.plte_offs, this.plte_size);
			        crc32(this.buffer, this.trns_offs, this.trns_size);
			        crc32(this.buffer, this.idat_offs, this.idat_size);
			        crc32(this.buffer, this.iend_offs, this.iend_size);
			        return "\x89PNG\r\n\x1a\n" + this.buffer.join('');
			    };
			};
		 },
		 function(module, exports) {
			 function hue2rgb(p, q, t) {
			   if(t < 0) t += 1;
			   if(t > 1) t -= 1;
			   if(t < 1/6) return p + (q - p) * 6 * t;
			   if(t < 1/2) return q;
			   if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			   return p;
			 }
			function hsl2rgb(h, s, l){
			  let r, g, b;
			  if (s == 0) {
			    r = g = b = l;
			  } else {
			    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			    const p = 2 * l - q;
			    r = hue2rgb(p, q, h + 1/3);
			    g = hue2rgb(p, q, h);
			    b = hue2rgb(p, q, h - 1/3);
			  }
			  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 255];
			}
			module.exports = hsl2rgb;
		 }
		 ])
		});
	} (main));
	var mainExports = main.exports;
	const makeBlockie = getDefaultExportFromCjs(mainExports);

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
	function __spreadArray(to, from, pack) {
	  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	      if (ar || !(i in from)) {
	          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	          ar[i] = from[i];
	      }
	  }
	  return to.concat(ar || Array.prototype.slice.call(from));
	}
	typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
	  var e = new Error(message);
	  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
	};

	function memoize(fn) {
	  var cache = Object.create(null);
	  return function (arg) {
	    if (cache[arg] === undefined) cache[arg] = fn(arg);
	    return cache[arg];
	  };
	}

	var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
	var isPropValid = memoize(function (prop) {
	  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
	  && prop.charCodeAt(1) === 110
	  && prop.charCodeAt(2) < 91;
	}
	);

	var shallowequal = function shallowEqual(objA, objB, compare, compareContext) {
	  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
	  if (ret !== void 0) {
	    return !!ret;
	  }
	  if (objA === objB) {
	    return true;
	  }
	  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
	    return false;
	  }
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var idx = 0; idx < keysA.length; idx++) {
	    var key = keysA[idx];
	    if (!bHasOwnProperty(key)) {
	      return false;
	    }
	    var valueA = objA[key];
	    var valueB = objB[key];
	    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
	    if (ret === false || (ret === void 0 && valueA !== valueB)) {
	      return false;
	    }
	  }
	  return true;
	};
	getDefaultExportFromCjs(shallowequal);

	var MS = '-ms-';
	var MOZ = '-moz-';
	var WEBKIT = '-webkit-';
	var COMMENT = 'comm';
	var RULESET = 'rule';
	var DECLARATION = 'decl';
	var IMPORT = '@import';
	var KEYFRAMES = '@keyframes';
	var LAYER = '@layer';

	var abs = Math.abs;
	var from = String.fromCharCode;
	var assign = Object.assign;
	function hash (value, length) {
		return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
	}
	function trim (value) {
		return value.trim()
	}
	function match (value, pattern) {
		return (value = pattern.exec(value)) ? value[0] : value
	}
	function replace (value, pattern, replacement) {
		return value.replace(pattern, replacement)
	}
	function indexof (value, search) {
		return value.indexOf(search)
	}
	function charat (value, index) {
		return value.charCodeAt(index) | 0
	}
	function substr (value, begin, end) {
		return value.slice(begin, end)
	}
	function strlen (value) {
		return value.length
	}
	function sizeof (value) {
		return value.length
	}
	function append (value, array) {
		return array.push(value), value
	}
	function combine (array, callback) {
		return array.map(callback).join('')
	}
	function filter (array, pattern) {
		return array.filter(function (value) { return !match(value, pattern) })
	}

	var line = 1;
	var column = 1;
	var length = 0;
	var position = 0;
	var character = 0;
	var characters = '';
	function node (value, root, parent, type, props, children, length, siblings) {
		return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: '', siblings: siblings}
	}
	function copy$1 (root, props) {
		return assign(node('', null, null, '', null, null, 0, root.siblings), root, {length: -root.length}, props)
	}
	function lift (root) {
		while (root.root)
			root = copy$1(root.root, {children: [root]});
		append(root, root.siblings);
	}
	function char () {
		return character
	}
	function prev () {
		character = position > 0 ? charat(characters, --position) : 0;
		if (column--, character === 10)
			column = 1, line--;
		return character
	}
	function next () {
		character = position < length ? charat(characters, position++) : 0;
		if (column++, character === 10)
			column = 1, line++;
		return character
	}
	function peek () {
		return charat(characters, position)
	}
	function caret () {
		return position
	}
	function slice (begin, end) {
		return substr(characters, begin, end)
	}
	function token (type) {
		switch (type) {
			case 0: case 9: case 10: case 13: case 32:
				return 5
			case 33: case 43: case 44: case 47: case 62: case 64: case 126:
			case 59: case 123: case 125:
				return 4
			case 58:
				return 3
			case 34: case 39: case 40: case 91:
				return 2
			case 41: case 93:
				return 1
		}
		return 0
	}
	function alloc (value) {
		return line = column = 1, length = strlen(characters = value), position = 0, []
	}
	function dealloc (value) {
		return characters = '', value
	}
	function delimit (type) {
		return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
	}
	function whitespace (type) {
		while (character = peek())
			if (character < 33)
				next();
			else
				break
		return token(type) > 2 || token(character) > 3 ? '' : ' '
	}
	function escaping (index, count) {
		while (--count && next())
			if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
				break
		return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
	}
	function delimiter (type) {
		while (next())
			switch (character) {
				case type:
					return position
				case 34: case 39:
					if (type !== 34 && type !== 39)
						delimiter(character);
					break
				case 40:
					if (type === 41)
						delimiter(type);
					break
				case 92:
					next();
					break
			}
		return position
	}
	function commenter (type, index) {
		while (next())
			if (type + character === 47 + 10)
				break
			else if (type + character === 42 + 42 && peek() === 47)
				break
		return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
	}
	function identifier (index) {
		while (!token(peek()))
			next();
		return slice(index, position)
	}

	function compile (value) {
		return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
	}
	function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
		var index = 0;
		var offset = 0;
		var length = pseudo;
		var atrule = 0;
		var property = 0;
		var previous = 0;
		var variable = 1;
		var scanning = 1;
		var ampersand = 1;
		var character = 0;
		var type = '';
		var props = rules;
		var children = rulesets;
		var reference = rule;
		var characters = type;
		while (scanning)
			switch (previous = character, character = next()) {
				case 40:
					if (previous != 108 && charat(characters, length - 1) == 58) {
						if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
							ampersand = -1;
						break
					}
				case 34: case 39: case 91:
					characters += delimit(character);
					break
				case 9: case 10: case 13: case 32:
					characters += whitespace(previous);
					break
				case 92:
					characters += escaping(caret() - 1, 7);
					continue
				case 47:
					switch (peek()) {
						case 42: case 47:
							append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
							break
						default:
							characters += '/';
					}
					break
				case 123 * variable:
					points[index++] = strlen(characters) * ampersand;
				case 125 * variable: case 59: case 0:
					switch (character) {
						case 0: case 125: scanning = 0;
						case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
							if (property > 0 && (strlen(characters) - length))
								append(property > 32 ? declaration(characters + ';', rule, parent, length - 1, declarations) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2, declarations), declarations);
							break
						case 59: characters += ';';
						default:
							append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);
							if (character === 123)
								if (offset === 0)
									parse(characters, root, reference, reference, props, rulesets, length, points, children);
								else
									switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
										case 100: case 108: case 109: case 115:
											parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
											break
										default:
											parse(characters, reference, reference, reference, [''], children, 0, points, children);
									}
					}
					index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
					break
				case 58:
					length = 1 + strlen(characters), property = previous;
				default:
					if (variable < 1)
						if (character == 123)
							--variable;
						else if (character == 125 && variable++ == 0 && prev() == 125)
							continue
					switch (characters += from(character), character * variable) {
						case 38:
							ampersand = offset > 0 ? 1 : (characters += '\f', -1);
							break
						case 44:
							points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
							break
						case 64:
							if (peek() === 45)
								characters += delimit(next());
							atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
							break
						case 45:
							if (previous === 45 && strlen(characters) == 2)
								variable = 0;
					}
			}
		return rulesets
	}
	function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
		var post = offset - 1;
		var rule = offset === 0 ? rules : [''];
		var size = sizeof(rule);
		for (var i = 0, j = 0, k = 0; i < index; ++i)
			for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
				if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
					props[k++] = z;
		return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings)
	}
	function comment (value, root, parent, siblings) {
		return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings)
	}
	function declaration (value, root, parent, length, siblings) {
		return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings)
	}

	function prefix (value, length, children) {
		switch (hash(value, length)) {
			case 5103:
				return WEBKIT + 'print-' + value + value
			case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
			case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
			case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
			case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
				return WEBKIT + value + value
			case 4789:
				return MOZ + value + value
			case 5349: case 4246: case 4810: case 6968: case 2756:
				return WEBKIT + value + MOZ + value + MS + value + value
			case 5936:
				switch (charat(value, length + 11)) {
					case 114:
						return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
					case 108:
						return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
					case 45:
						return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				}
			case 6828: case 4268: case 2903:
				return WEBKIT + value + MS + value + value
			case 6165:
				return WEBKIT + value + MS + 'flex-' + value + value
			case 5187:
				return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
			case 5443:
				return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/g, '') + (!match(value, /flex-|baseline/) ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '') : '') + value
			case 4675:
				return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/g, '') + value
			case 5548:
				return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
			case 5292:
				return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
			case 6060:
				return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
			case 4554:
				return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
			case 6187:
				return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
			case 5495: case 3959:
				return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
			case 4968:
				return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value
			case 4200:
				if (!match(value, /flex-|baseline/)) return MS + 'grid-column-align' + substr(value, length) + value
				break
			case 2592: case 3360:
				return MS + replace(value, 'template-', '') + value
			case 4384: case 3616:
				if (children && children.some(function (element, index) { return length = index, match(element.props, /grid-\w+-end/) })) {
					return ~indexof(value + (children = children[length].value), 'span') ? value : (MS + replace(value, '-start', '') + value + MS + 'grid-row-span:' + (~indexof(children, 'span') ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ';')
				}
				return MS + replace(value, '-start', '') + value
			case 4896: case 4128:
				return (children && children.some(function (element) { return match(element.props, /grid-\w+-start/) })) ? value : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value
			case 4095: case 3583: case 4068: case 2532:
				return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
			case 8116: case 7059: case 5753: case 5535:
			case 5445: case 5701: case 4933: case 4677:
			case 5533: case 5789: case 5021: case 4765:
				if (strlen(value) - 1 - length > 6)
					switch (charat(value, length + 1)) {
						case 109:
							if (charat(value, length + 4) !== 45)
								break
						case 102:
							return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
						case 115:
							return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length, children) + value : value
					}
				break
			case 5152: case 5920:
				return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (MS + a + ':' + b + f) + (c ? (MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
			case 4949:
				if (charat(value, length + 6) === 121)
					return replace(value, ':', ':' + WEBKIT) + value
				break
			case 6444:
				switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
					case 120:
						return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
					case 100:
						return replace(value, ':', ':' + MS) + value
				}
				break
			case 5719: case 2647: case 2135: case 3927: case 2391:
				return replace(value, 'scroll-', 'scroll-snap-') + value
		}
		return value
	}

	function serialize (children, callback) {
		var output = '';
		for (var i = 0; i < children.length; i++)
			output += callback(children[i], i, children, callback) || '';
		return output
	}
	function stringify (element, index, children, callback) {
		switch (element.type) {
			case LAYER: if (element.children.length) break
			case IMPORT: case DECLARATION: return element.return = element.return || element.value
			case COMMENT: return ''
			case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
			case RULESET: if (!strlen(element.value = element.props.join(','))) return ''
		}
		return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
	}

	function middleware (collection) {
		var length = sizeof(collection);
		return function (element, index, children, callback) {
			var output = '';
			for (var i = 0; i < length; i++)
				output += collection[i](element, index, children, callback) || '';
			return output
		}
	}
	function rulesheet (callback) {
		return function (element) {
			if (!element.root)
				if (element = element.return)
					callback(element);
		}
	}
	function prefixer (element, index, children, callback) {
		if (element.length > -1)
			if (!element.return)
				switch (element.type) {
					case DECLARATION: element.return = prefix(element.value, element.length, children);
						return
					case KEYFRAMES:
						return serialize([copy$1(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
					case RULESET:
						if (element.length)
							return combine(children = element.props, function (value) {
								switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
									case ':read-only': case ':read-write':
										lift(copy$1(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]}));
										lift(copy$1(element, {props: [value]}));
										assign(element, {props: filter(children, callback)});
										break
									case '::placeholder':
										lift(copy$1(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}));
										lift(copy$1(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}));
										lift(copy$1(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]}));
										lift(copy$1(element, {props: [value]}));
										assign(element, {props: filter(children, callback)});
										break
								}
								return ''
							})
				}
	}

	var unitlessKeys = {
	  animationIterationCount: 1,
	  aspectRatio: 1,
	  borderImageOutset: 1,
	  borderImageSlice: 1,
	  borderImageWidth: 1,
	  boxFlex: 1,
	  boxFlexGroup: 1,
	  boxOrdinalGroup: 1,
	  columnCount: 1,
	  columns: 1,
	  flex: 1,
	  flexGrow: 1,
	  flexPositive: 1,
	  flexShrink: 1,
	  flexNegative: 1,
	  flexOrder: 1,
	  gridRow: 1,
	  gridRowEnd: 1,
	  gridRowSpan: 1,
	  gridRowStart: 1,
	  gridColumn: 1,
	  gridColumnEnd: 1,
	  gridColumnSpan: 1,
	  gridColumnStart: 1,
	  msGridRow: 1,
	  msGridRowSpan: 1,
	  msGridColumn: 1,
	  msGridColumnSpan: 1,
	  fontWeight: 1,
	  lineHeight: 1,
	  opacity: 1,
	  order: 1,
	  orphans: 1,
	  tabSize: 1,
	  widows: 1,
	  zIndex: 1,
	  zoom: 1,
	  WebkitLineClamp: 1,
	  fillOpacity: 1,
	  floodOpacity: 1,
	  stopOpacity: 1,
	  strokeDasharray: 1,
	  strokeDashoffset: 1,
	  strokeMiterlimit: 1,
	  strokeOpacity: 1,
	  strokeWidth: 1
	};

	var f="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",y="undefined"!=typeof window&&"HTMLElement"in window,v=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!==process.env.NODE_ENV),S=/invalid hook call/i,w=new Set,b=function(t,n){if("production"!==process.env.NODE_ENV){var o=n?' with the id of "'.concat(n,'"'):"",s="The component ".concat(t).concat(o," has been created dynamically.\n")+"You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",i=console.error;try{var a=!0;console.error=function(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];S.test(t)?(a=!1,w.delete(s)):i.apply(void 0,__spreadArray([t],n,!1));},o$1.useRef(),a&&!w.has(s)&&(console.warn(s),w.add(s));}catch(e){S.test(e.message)&&w.delete(s);}finally{console.error=i;}}},E=Object.freeze([]),N=Object.freeze({});function P(e,t,n){return void 0===n&&(n=N),e.theme!==n.theme&&e.theme||t||n.theme}var _=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),C=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,I=/(^-|-$)/g;function A(e){return e.replace(C,"-").replace(I,"")}var O=/(a)(d)/gi,D=function(e){return String.fromCharCode(e+(e>25?39:97))};function R(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=D(t%52)+n;return (D(t%52)+n).replace(O,"$1-$2")}var T,k=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},j=function(e){return k(5381,e)};function x(e){return R(j(e)>>>0)}function V(e){return "production"!==process.env.NODE_ENV&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function F(e){return "string"==typeof e&&("production"===process.env.NODE_ENV||e.charAt(0)===e.charAt(0).toLowerCase())}var M="function"==typeof Symbol&&Symbol.for,$=M?Symbol.for("react.memo"):60115,z=M?Symbol.for("react.forward_ref"):60112,B={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},L={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},G={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Y=((T={})[z]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},T[$]=G,T);function W(e){return ("type"in(t=e)&&t.type.$$typeof)===$?G:"$$typeof"in e?Y[e.$$typeof]:B;var t;}var q=Object.defineProperty,H=Object.getOwnPropertyNames,U=Object.getOwnPropertySymbols,J=Object.getOwnPropertyDescriptor,X=Object.getPrototypeOf,Z=Object.prototype;function K(e,t,n){if("string"!=typeof t){if(Z){var o=X(t);o&&o!==Z&&K(e,o,n);}var r=H(t);U&&(r=r.concat(U(t)));for(var s=W(e),i=W(t),a=0;a<r.length;++a){var c=r[a];if(!(c in L||n&&n[c]||i&&c in i||s&&c in s)){var l=J(t,c);try{q(e,c,l);}catch(e){}}}}return e}function Q(e){return "function"==typeof e}function ee(e){return "object"==typeof e&&"styledComponentId"in e}function te(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ne(e,t){if(0===e.length)return "";for(var n=e[0],o=1;o<e.length;o++)n+=e[o];return n}function oe(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function re(e,t,n){if(void 0===n&&(n=!1),!n&&!oe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=re(e[o],t[o]);else if(oe(t))for(var o in t)e[o]=re(e[o],t[o]);return e}function se(e,t){Object.defineProperty(e,"toString",{value:t});}var ie="production"!==process.env.NODE_ENV?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",18:"ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`"}:{};function ae(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n=e[0],o=[],r=1,s=e.length;r<s;r+=1)o.push(e[r]);return o.forEach(function(e){n=n.replace(/%[a-z]/,e);}),n}function ce(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return "production"===process.env.NODE_ENV?new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(n.length>0?" Args: ".concat(n.join(", ")):"")):new Error(ae.apply(void 0,__spreadArray([ie[t]],n,!1)).trim())}var le=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,r=o;e>=r;)if((r<<=1)<0)throw ce(16,"".concat(e));this.groupSizes=new Uint32Array(r),this.groupSizes.set(n),this.length=r;for(var s=o;s<r;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++);},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),o=n+t;this.groupSizes[e]=0;for(var r=n;r<o;r++)this.tag.deleteRule(n);}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],o=this.indexOfGroup(e),r=o+n,s=o;s<r;s++)t+="".concat(this.tag.getRule(s)).concat("/*!sc*/\n");return t},e}(),ue=new Map,pe=new Map,de=1,he=function(e){if(ue.has(e))return ue.get(e);for(;pe.has(de);)de++;var t=de++;if("production"!==process.env.NODE_ENV&&((0|t)<0||t>1073741824))throw ce(16,"".concat(t));return ue.set(e,t),pe.set(t,e),t},fe=function(e,t){de=t+1,ue.set(e,t),pe.set(t,e);},me="style[".concat(f,"][").concat("data-styled-version",'="').concat("6.1.1",'"]'),ye=new RegExp("^".concat(f,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),ve=function(e,t,n){for(var o,r=n.split(","),s=0,i=r.length;s<i;s++)(o=r[s])&&e.registerName(t,o);},ge=function(e,t){for(var n,o=(null!==(n=t.textContent)&&void 0!==n?n:"").split("/*!sc*/\n"),r=[],s=0,i=o.length;s<i;s++){var a=o[s].trim();if(a){var c=a.match(ye);if(c){var l=0|parseInt(c[1],10),u=c[2];0!==l&&(fe(u,l),ve(e,u,c[3]),e.getTag().insertRules(l,r)),r.length=0;}else r.push(a);}}};function Se(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null}var we=function(e){var t=document.head,n=e||t,o=document.createElement("style"),r=function(e){var t=Array.from(e.querySelectorAll("style[".concat(f,"]")));return t[t.length-1]}(n),s=void 0!==r?r.nextSibling:null;o.setAttribute(f,"active"),o.setAttribute("data-styled-version","6.1.1");var i=Se();return i&&o.setAttribute("nonce",i),n.insertBefore(o,s),o},be=function(){function e(e){this.element=we(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,o=t.length;n<o;n++){var r=t[n];if(r.ownerNode===e)return r}throw ce(17)}(this.element),this.length=0;}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),Ee=function(){function e(e){this.element=we(e),this.nodes=this.element.childNodes,this.length=0;}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return !1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),Ne=function(){function e(e){this.rules=[],this.length=0;}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),Pe=y,_e={isServer:!y,useCSSOMInjection:!v},Ce=function(){function e(e,n,o){void 0===e&&(e=N),void 0===n&&(n={});var r=this;this.options=__assign(__assign({},_e),e),this.gs=n,this.names=new Map(o),this.server=!!e.isServer,!this.server&&y&&Pe&&(Pe=!1,function(e){for(var t=document.querySelectorAll(me),n=0,o=t.length;n<o;n++){var r=t[n];r&&"active"!==r.getAttribute(f)&&(ge(e,r),r.parentNode&&r.parentNode.removeChild(r));}}(this)),se(this,function(){return function(e){for(var t=e.getTag(),n=t.length,o="",r=function(n){var r=function(e){return pe.get(e)}(n);if(void 0===r)return "continue";var s=e.names.get(r),i=t.getGroup(n);if(void 0===s||0===i.length)return "continue";var a="".concat(f,".g").concat(n,'[id="').concat(r,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","));}),o+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat("/*!sc*/\n");},s=0;s<n;s++)r(s);return o}(r)});}return e.registerId=function(e){return he(e)},e.prototype.reconstructWithOptions=function(n,o){return void 0===o&&(o=!0),new e(__assign(__assign({},this.options),n),this.gs,o&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new Ne(n):t?new be(n):new Ee(n)}(this.options),new le(e)));var e;},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(he(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(he(e),n);},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},e.prototype.clearRules=function(e){this.getTag().clearGroup(he(e)),this.clearNames(e);},e.prototype.clearTag=function(){this.tag=void 0;},e}(),Ie=/&/g,Ae=/^\s*\/\/.*$/gm;function Oe(e,t){return e.map(function(e){return "rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return "".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=Oe(e.children,t)),e})}function De(e){var t,n,o,r=N,s=r.options,i=void 0===s?N:s,a=r.plugins,c=void 0===a?E:a,l=function(e,o,r){return r===n||r.startsWith(n)&&r.endsWith(n)&&r.replaceAll(n,"").length>0?".".concat(t):e},u=c.slice();u.push(function(e){e.type===RULESET&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Ie,n).replace(o,l));}),i.prefix&&u.push(prefixer),u.push(stringify);var p=function(e,r,s,a){void 0===r&&(r=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=r,o=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(Ae,""),l=compile(s||r?"".concat(s," ").concat(r," { ").concat(c," }"):c);i.namespace&&(l=Oe(l,i.namespace));var p=[];return serialize(l,middleware(u.concat(rulesheet(function(e){return p.push(e)})))),p};return p.hash=c.length?c.reduce(function(e,t){return t.name||ce(15),k(e,t.name)},5381).toString():"",p}var Re=new Ce,Te=De(),ke=o$1.createContext({shouldForwardProp:void 0,styleSheet:Re,stylis:Te});ke.Consumer;o$1.createContext(void 0);function Ve(){return o$1.useContext(ke)}var Me=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Te);var o=n.name+t.hash;e.hasNameForId(n.id,o)||e.insertRules(n.id,o,t(n.rules,o,"@keyframes"));},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t,se(this,function(){throw ce(12,String(n.name))});}return e.prototype.getName=function(e){return void 0===e&&(e=Te),this.name+e.hash},e}(),$e=function(e){return e>="A"&&e<="Z"};function ze(e){for(var t="",n=0;n<e.length;n++){var o=e[n];if(1===n&&"-"===o&&"-"===e[0])return e;$e(o)?t+="-"+o.toLowerCase():t+=o;}return t.startsWith("ms-")?"-"+t:t}var Be=function(e){return null==e||!1===e||""===e},Le=function(t){var n,o,r=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!Be(i)&&(Array.isArray(i)&&i.isCss||Q(i)?r.push("".concat(ze(s),":"),i,";"):oe(i)?r.push.apply(r,__spreadArray(__spreadArray(["".concat(s," {")],Le(i),!1),["}"],!1)):r.push("".concat(ze(s),": ").concat((n=s,null==(o=i)||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||n in unitlessKeys||n.startsWith("--")?String(o).trim():"".concat(o,"px")),";")));}return r};function Ge(e,t,n,o){if(Be(e))return [];if(ee(e))return [".".concat(e.styledComponentId)];if(Q(e)){if(!Q(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return [e];var r=e(t);return "production"===process.env.NODE_ENV||"object"!=typeof r||Array.isArray(r)||r instanceof Me||oe(r)||null===r||console.error("".concat(V(e)," is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")),Ge(r,t,n,o)}var s;return e instanceof Me?n?(e.inject(n,o),[e.getName(o)]):[e]:oe(e)?Le(e):Array.isArray(e)?Array.prototype.concat.apply(E,e.map(function(e){return Ge(e,t,n,o)})):[e.toString()]}function Ye(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Q(n)&&!ee(n))return !1}return !0}var We=j("6.1.1"),qe=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"===process.env.NODE_ENV&&(void 0===n||n.isStatic)&&Ye(e),this.componentId=t,this.baseHash=k(We,t),this.baseStyle=n,Ce.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))o=te(o,this.staticRulesId);else {var r=ne(Ge(this.rules,e,t,n)),s=R(k(this.baseHash,r)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(r,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i);}o=te(o,s),this.staticRulesId=s;}else {for(var a=k(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u,"production"!==process.env.NODE_ENV&&(a=k(a,u));else if(u){var p=ne(Ge(u,e,t,n));a=k(a,p+l),c+=p;}}if(c){var d=R(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),o=te(o,d);}}return o},e}(),He=o$1.createContext(void 0);He.Consumer;var Ze={},Ke=new Set;function Qe(e,r,s){var i=ee(e),a=e,c=!F(e),p=r.attrs,d=void 0===p?E:p,h=r.componentId,f=void 0===h?function(e,t){var n="string"!=typeof e?"sc":A(e);Ze[n]=(Ze[n]||0)+1;var o="".concat(n,"-").concat(x("6.1.1"+n+Ze[n]));return t?"".concat(t,"-").concat(o):o}(r.displayName,r.parentComponentId):h,m=r.displayName,y=void 0===m?function(e){return F(e)?"styled.".concat(e):"Styled(".concat(V(e),")")}(e):m,v=r.displayName&&r.componentId?"".concat(A(r.displayName),"-").concat(r.componentId):r.componentId||f,g=i&&a.attrs?a.attrs.concat(d).filter(Boolean):d,S=r.shouldForwardProp;if(i&&a.shouldForwardProp){var w=a.shouldForwardProp;if(r.shouldForwardProp){var C=r.shouldForwardProp;S=function(e,t){return w(e,t)&&C(e,t)};}else S=w;}var I=new qe(s,v,i?a.componentStyle:void 0);function O(e,r){return function(e,r,s){var i=e.attrs,a=e.componentStyle,c=e.defaultProps,p=e.foldedComponentIds,d=e.styledComponentId,h=e.target,f=o$1.useContext(He),m=Ve(),y=e.shouldForwardProp||m.shouldForwardProp;"production"!==process.env.NODE_ENV&&o$1.useDebugValue(d);var v=function(e,n,o){for(var r,s=__assign(__assign({},n),{className:void 0,theme:o}),i=0;i<e.length;i+=1){var a=Q(r=e[i])?r(s):r;for(var c in a)s[c]="className"===c?te(s[c],a[c]):"style"===c?__assign(__assign({},s[c]),a[c]):a[c];}return n.className&&(s.className=te(s.className,n.className)),s}(i,r,P(r,f,c)||N),g=v.as||h,S={};for(var w in v)void 0===v[w]||"$"===w[0]||"as"===w||"theme"===w||("forwardedAs"===w?S.as=v.forwardedAs:y&&!y(w,g)||(S[w]=v[w],y||"development"!==process.env.NODE_ENV||isPropValid(w)||Ke.has(w)||!_.has(g)||(Ke.add(w),console.warn('styled-components: it looks like an unknown prop "'.concat(w,'" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));var b=function(e,t){var n=Ve(),o=e.generateAndInjectStyles(t,n.styleSheet,n.stylis);return "production"!==process.env.NODE_ENV&&o$1.useDebugValue(o),o}(a,v);"production"!==process.env.NODE_ENV&&e.warnTooManyClasses&&e.warnTooManyClasses(b);var E=te(p,d);return b&&(E+=" "+b),v.className&&(E+=" "+v.className),S[F(g)&&!_.has(g)?"class":"className"]=E,S.ref=s,o$1.createElement(g,S)}(D,e,r)}O.displayName=y;var D=o$1.forwardRef(O);return D.attrs=g,D.componentStyle=I,D.displayName=y,D.shouldForwardProp=S,D.foldedComponentIds=i?te(a.foldedComponentIds,a.styledComponentId):"",D.styledComponentId=v,D.target=i?a.target:e,Object.defineProperty(D,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var o=0,r=t;o<r.length;o++)re(e,r[o],!0);return e}({},a.defaultProps,e):e;}}),"production"!==process.env.NODE_ENV&&(b(y,v),D.warnTooManyClasses=function(e,t){var n={},o=!1;return function(r){if(!o&&(n[r]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'.concat(t,'"'):"";console.warn("Over ".concat(200," classes were generated for component ").concat(e).concat(s,".\n")+"Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),o=!0,n={};}}}(y,v)),se(D,function(){return ".".concat(D.styledComponentId)}),c&&K(D,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),D}function et(e,t){for(var n=[e[0]],o=0,r=t.length;o<r;o+=1)n.push(t[o],e[o+1]);return n}var tt=function(e){return Object.assign(e,{isCss:!0})};function nt(t){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];if(Q(t)||oe(t)){var r=t;return tt(Ge(et(E,__spreadArray([r],n,!0))))}var s=t;return 0===n.length&&1===s.length&&"string"==typeof s[0]?Ge(s):tt(Ge(et(s,n)))}function ot(n,o,r){if(void 0===r&&(r=N),!o)throw ce(1,o);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(o,r,nt.apply(void 0,__spreadArray([t],s,!1)))};return s.attrs=function(e){return ot(n,o,__assign(__assign({},r),{attrs:Array.prototype.concat(r.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return ot(n,o,__assign(__assign({},r),e))},s}var rt=function(e){return ot(Qe,e)},st=rt;_.forEach(function(e){st[e]=rt(e);});"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native");var dt="__sc-".concat(f,"__");"production"!==process.env.NODE_ENV&&"test"!==process.env.NODE_ENV&&"undefined"!=typeof window&&(window[dt]||(window[dt]=0),1===window[dt]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window[dt]+=1);

	function Identicon$3({ address, className = '', size, style = {} }) {
	    const imgSrc = o$1.useMemo(() => makeBlockie(address), [address]);
	    return (jsxRuntimeExports.jsx(StyledImg, { className: className, size: size, src: imgSrc, style: style }));
	}
	const StyledImg = st.img(({ size }) => `
  display: block;
  height: ${size}px;
  width: ${size}px;
`);
	const Ethereum = o$1.memo(Identicon$3);

	function parseHex(hash, startPosition, octets) {
	    return parseInt(hash.substr(startPosition, octets), 16);
	}
	function decToHex(v) {
	    v |= 0;
	    return v < 0 ? "00" :
	        v < 16 ? "0" + v.toString(16) :
	        v < 256 ? v.toString(16) :
	        "ff";
	}
	function hueToRgb(m1, m2, h) {
	    h = h < 0 ? h + 6 : h > 6 ? h - 6 : h;
	    return decToHex(255 * (
	        h < 1 ? m1 + (m2 - m1) * h :
	        h < 3 ? m2 :
	        h < 4 ? m1 + (m2 - m1) * (4 - h) :
	        m1));
	}
	function parseColor(color) {
	    if (/^#[0-9a-f]{3,8}$/i.test(color)) {
	        let result;
	        const colorLength = color.length;
	        if (colorLength < 6) {
	            const r = color[1],
	                  g = color[2],
	                  b = color[3],
	                  a = color[4] || "";
	            result = "#" + r + r + g + g + b + b + a + a;
	        }
	        if (colorLength == 7 || colorLength > 8) {
	            result = color;
	        }
	        return result;
	    }
	}
	function hsl(hue, saturation, lightness) {
	    let result;
	    if (saturation == 0) {
	        const partialHex = decToHex(lightness * 255);
	        result = partialHex + partialHex + partialHex;
	    }
	    else {
	        const m2 = lightness <= 0.5 ? lightness * (saturation + 1) : lightness + saturation - lightness * saturation,
	              m1 = lightness * 2 - m2;
	        result =
	            hueToRgb(m1, m2, hue * 6 + 2) +
	            hueToRgb(m1, m2, hue * 6) +
	            hueToRgb(m1, m2, hue * 6 - 2);
	    }
	    return "#" + result;
	}
	function correctedHsl(hue, saturation, lightness) {
	    const correctors = [ 0.55, 0.5, 0.5, 0.46, 0.6, 0.55, 0.55 ],
	          corrector = correctors[(hue * 6 + 0.5) | 0];
	    lightness = lightness < 0.5 ? lightness * corrector * 2 : corrector + (lightness - 0.5) * (1 - corrector) * 2;
	    return hsl(hue, saturation, lightness);
	}
	const GLOBAL =
	    typeof window !== "undefined" ? window :
	    typeof self !== "undefined" ? self :
	    typeof global !== "undefined" ? global :
	    {};
	const CONFIG_PROPERTIES = {
	    V: "jdenticon_config",
	    n: "config",
	};
	var rootConfigurationHolder = {};
	function getConfiguration(paddingOrLocalConfig, defaultPadding) {
	    const configObject =
	            rootConfigurationHolder[CONFIG_PROPERTIES.n] ||
	            GLOBAL[CONFIG_PROPERTIES.V] ||
	            { },
	        lightnessConfig = configObject["lightness"] || { },
	        saturation = configObject["saturation"] || { },
	        colorSaturation = "color" in saturation ? saturation["color"] : saturation,
	        grayscaleSaturation = saturation["grayscale"],
	        backColor = configObject["backColor"],
	        padding = configObject["padding"];
	    function lightness(configName, defaultRange) {
	        let range = lightnessConfig[configName];
	        if (!(range && range.length > 1)) {
	            range = defaultRange;
	        }
	        return function (value) {
	            value = range[0] + value * (range[1] - range[0]);
	            return value < 0 ? 0 : value > 1 ? 1 : value;
	        };
	    }
	    function hueFunction(originalHue) {
	        const hueConfig = configObject["hues"];
	        let hue;
	        if (hueConfig && hueConfig.length > 0) {
	            hue = hueConfig[0 | (0.999 * originalHue * hueConfig.length)];
	        }
	        return typeof hue == "number" ?
	            ((((hue / 360) % 1) + 1) % 1) :
	            originalHue;
	    }
	    return {
	        W: hueFunction,
	        o: typeof colorSaturation == "number" ? colorSaturation : 0.5,
	        D: typeof grayscaleSaturation == "number" ? grayscaleSaturation : 0,
	        p: lightness("color", [0.4, 0.8]),
	        F: lightness("grayscale", [0.3, 0.9]),
	        G: parseColor(backColor),
	        X:
	            typeof padding == "number" ? padding :
	            defaultPadding
	    }
	}
	class Point {
	    constructor(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	}
	class Transform {
	    constructor(x, y, size, rotation) {
	        this.q = x;
	        this.t = y;
	        this.H = size;
	        this.Y = rotation;
	    }
	    I(x, y, w, h) {
	        const right = this.q + this.H,
	              bottom = this.t + this.H,
	              rotation = this.Y;
	        return rotation === 1 ? new Point(right - y - (h || 0), this.t + x) :
	               rotation === 2 ? new Point(right - x - (w || 0), bottom - y - (h || 0)) :
	               rotation === 3 ? new Point(this.q + y, bottom - x - (w || 0)) :
	               new Point(this.q + x, this.t + y);
	    }
	}
	const NO_TRANSFORM = new Transform(0, 0, 0, 0);
	class Graphics {
	    constructor(renderer) {
	        this.J = renderer;
	        this.u = NO_TRANSFORM;
	    }
	    g(points, invert) {
	        const di = invert ? -2 : 2,
	              transformedPoints = [];
	        for (let i = invert ? points.length - 2 : 0; i < points.length && i >= 0; i += di) {
	            transformedPoints.push(this.u.I(points[i], points[i + 1]));
	        }
	        this.J.g(transformedPoints);
	    }
	    h(x, y, size, invert) {
	        const p = this.u.I(x, y, size, size);
	        this.J.h(p, size, invert);
	    }
	    i(x, y, w, h, invert) {
	        this.g([
	            x, y,
	            x + w, y,
	            x + w, y + h,
	            x, y + h
	        ], invert);
	    }
	    j(x, y, w, h, r, invert) {
	        const points = [
	            x + w, y,
	            x + w, y + h,
	            x, y + h,
	            x, y
	        ];
	        points.splice(((r || 0) % 4) * 2, 2);
	        this.g(points, invert);
	    }
	    K(x, y, w, h, invert) {
	        this.g([
	            x + w / 2, y,
	            x + w, y + h / 2,
	            x + w / 2, y + h,
	            x, y + h / 2
	        ], invert);
	    }
	}
	function centerShape(index, g, cell, positionIndex) {
	    index = index % 14;
	    let k, m, w, h, inner, outer;
	    !index ? (
	        k = cell * 0.42,
	        g.g([
	            0, 0,
	            cell, 0,
	            cell, cell - k * 2,
	            cell - k, cell,
	            0, cell
	        ])) :
	    index == 1 ? (
	        w = 0 | (cell * 0.5),
	        h = 0 | (cell * 0.8),
	        g.j(cell - w, 0, w, h, 2)) :
	    index == 2 ? (
	        w = 0 | (cell / 3),
	        g.i(w, w, cell - w, cell - w)) :
	    index == 3 ? (
	        inner = cell * 0.1,
	        outer =
	            cell < 6 ? 1 :
	            cell < 8 ? 2 :
	            (0 | (cell * 0.25)),
	        inner =
	            inner > 1 ? (0 | inner) :
	            inner > 0.5 ? 1 :
	            inner,
	        g.i(outer, outer, cell - inner - outer, cell - inner - outer)) :
	    index == 4 ? (
	        m = 0 | (cell * 0.15),
	        w = 0 | (cell * 0.5),
	        g.h(cell - w - m, cell - w - m, w)) :
	    index == 5 ? (
	        inner = cell * 0.1,
	        outer = inner * 4,
	        outer > 3 && (outer = 0 | outer),
	        g.i(0, 0, cell, cell),
	        g.g([
	            outer, outer,
	            cell - inner, outer,
	            outer + (cell - outer - inner) / 2, cell - inner
	        ], true)) :
	    index == 6 ?
	        g.g([
	            0, 0,
	            cell, 0,
	            cell, cell * 0.7,
	            cell * 0.4, cell * 0.4,
	            cell * 0.7, cell,
	            0, cell
	        ]) :
	    index == 7 ?
	        g.j(cell / 2, cell / 2, cell / 2, cell / 2, 3) :
	    index == 8 ? (
	        g.i(0, 0, cell, cell / 2),
	        g.i(0, cell / 2, cell / 2, cell / 2),
	        g.j(cell / 2, cell / 2, cell / 2, cell / 2, 1)) :
	    index == 9 ? (
	        inner = cell * 0.14,
	        outer =
	            cell < 4 ? 1 :
	            cell < 6 ? 2 :
	            (0 | (cell * 0.35)),
	        inner =
	            cell < 8 ? inner :
	            (0 | inner),
	        g.i(0, 0, cell, cell),
	        g.i(outer, outer, cell - outer - inner, cell - outer - inner, true)) :
	    index == 10 ? (
	        inner = cell * 0.12,
	        outer = inner * 3,
	        g.i(0, 0, cell, cell),
	        g.h(outer, outer, cell - inner - outer, true)) :
	    index == 11 ?
	        g.j(cell / 2, cell / 2, cell / 2, cell / 2, 3) :
	    index == 12 ? (
	        m = cell * 0.25,
	        g.i(0, 0, cell, cell),
	        g.K(m, m, cell - m, cell - m, true)) :
	    (
	        !positionIndex && (
	            m = cell * 0.4, w = cell * 1.2,
	            g.h(m, m, w)
	        )
	    );
	}
	function outerShape(index, g, cell) {
	    index = index % 4;
	    let m;
	    !index ?
	        g.j(0, 0, cell, cell, 0) :
	    index == 1 ?
	        g.j(0, cell / 2, cell, cell / 2, 0) :
	    index == 2 ?
	        g.K(0, 0, cell, cell) :
	    (
	        m = cell / 6,
	        g.h(m, m, cell - 2 * m)
	    );
	}
	function colorTheme(hue, config) {
	    hue = config.W(hue);
	    return [
	        correctedHsl(hue, config.D, config.F(0)),
	        correctedHsl(hue, config.o, config.p(0.5)),
	        correctedHsl(hue, config.D, config.F(1)),
	        correctedHsl(hue, config.o, config.p(1)),
	        correctedHsl(hue, config.o, config.p(0))
	    ];
	}
	function iconGenerator(renderer, hash, config) {
	    const parsedConfig = getConfiguration(config, 0.08);
	    if (parsedConfig.G) {
	        renderer.m(parsedConfig.G);
	    }
	    let size = renderer.k;
	    const padding = (0.5 + size * parsedConfig.X) | 0;
	    size -= padding * 2;
	    const graphics = new Graphics(renderer);
	    const cell = 0 | (size / 4);
	    const x = 0 | (padding + size / 2 - cell * 2);
	    const y = 0 | (padding + size / 2 - cell * 2);
	    function renderShape(colorIndex, shapes, index, rotationIndex, positions) {
	        const shapeIndex = parseHex(hash, index, 1);
	        let r = rotationIndex ? parseHex(hash, rotationIndex, 1) : 0;
	        renderer.L(availableColors[selectedColorIndexes[colorIndex]]);
	        for (let i = 0; i < positions.length; i++) {
	            graphics.u = new Transform(x + positions[i][0] * cell, y + positions[i][1] * cell, cell, r++ % 4);
	            shapes(shapeIndex, graphics, cell, i);
	        }
	        renderer.M();
	    }
	    const hue = parseHex(hash, -7) / 0xfffffff,
	          availableColors = colorTheme(hue, parsedConfig),
	          selectedColorIndexes = [];
	    let index;
	    function isDuplicate(values) {
	        if (values.indexOf(index) >= 0) {
	            for (let i = 0; i < values.length; i++) {
	                if (selectedColorIndexes.indexOf(values[i]) >= 0) {
	                    return true;
	                }
	            }
	        }
	    }
	    for (let i = 0; i < 3; i++) {
	        index = parseHex(hash, 8 + i, 1) % availableColors.length;
	        if (isDuplicate([0, 4]) ||
	            isDuplicate([2, 3])) {
	            index = 1;
	        }
	        selectedColorIndexes.push(index);
	    }
	    renderShape(0, outerShape, 2, 3, [[1, 0], [2, 0], [2, 3], [1, 3], [0, 1], [3, 1], [3, 2], [0, 2]]);
	    renderShape(1, outerShape, 4, 5, [[0, 0], [3, 0], [3, 3], [0, 3]]);
	    renderShape(2, centerShape, 1, null, [[1, 1], [2, 1], [2, 2], [1, 2]]);
	    renderer.finish();
	}
	function sha1(message) {
	    const HASH_SIZE_HALF_BYTES = 40;
	    const BLOCK_SIZE_WORDS = 16;
	    var i = 0,
	        f = 0,
	        urlEncodedMessage = encodeURI(message) + "%80",
	        data = [],
	        dataSize,
	        hashBuffer = [],
	        a = 0x67452301,
	        b = 0xefcdab89,
	        c = ~a,
	        d = ~b,
	        e = 0xc3d2e1f0,
	        hash = [a, b, c, d, e],
	        blockStartIndex = 0,
	        hexHash = "";
	    function rotl(value, shift) {
	        return (value << shift) | (value >>> (32 - shift));
	    }
	    for ( ; i < urlEncodedMessage.length; f++) {
	        data[f >> 2] = data[f >> 2] |
	            (
	                (
	                    urlEncodedMessage[i] == "%"
	                        ? parseInt(urlEncodedMessage.substring(i + 1, i += 3), 16)
	                        : urlEncodedMessage.charCodeAt(i++)
	                )
	                << ((3 - (f & 3)) * 8)
	            );
	    }
	    dataSize = (((f + 7) >> 6) + 1) * BLOCK_SIZE_WORDS;
	    data[dataSize - 1] = f * 8 - 8;
	    for ( ; blockStartIndex < dataSize; blockStartIndex += BLOCK_SIZE_WORDS) {
	        for (i = 0; i < 80; i++) {
	            f = rotl(a, 5) + e + (
	                    i < 20 ? ((b & c) ^ ((~b) & d)) + 0x5a827999 :
	                    i < 40 ? (b ^ c ^ d) + 0x6ed9eba1 :
	                    i < 60 ? ((b & c) ^ (b & d) ^ (c & d)) + 0x8f1bbcdc :
	                    (b ^ c ^ d) + 0xca62c1d6
	                ) + (
	                    hashBuffer[i] = i < BLOCK_SIZE_WORDS
	                        ? (data[blockStartIndex + i] | 0)
	                        : rotl(hashBuffer[i - 3] ^ hashBuffer[i - 8] ^ hashBuffer[i - 14] ^ hashBuffer[i - 16], 1)
	                );
	            e = d;
	            d = c;
	            c = rotl(b, 30);
	            b = a;
	            a = f;
	        }
	        hash[0] = a = ((hash[0] + a) | 0);
	        hash[1] = b = ((hash[1] + b) | 0);
	        hash[2] = c = ((hash[2] + c) | 0);
	        hash[3] = d = ((hash[3] + d) | 0);
	        hash[4] = e = ((hash[4] + e) | 0);
	    }
	    for (i = 0; i < HASH_SIZE_HALF_BYTES; i++) {
	        hexHash += (
	            (
	                hash[i >> 3] >>>
	                ((7 - (i & 7)) * 4)
	            )
	            & 0xf
	        ).toString(16);
	    }
	    return hexHash;
	}
	function isValidHash(hashCandidate) {
	    return /^[0-9a-f]{11,}$/i.test(hashCandidate) && hashCandidate;
	}
	function computeHash(value) {
	    return sha1(value == null ? "" : "" + value);
	}
	function svgValue(value) {
	    return ((value * 10 + 0.5) | 0) / 10;
	}
	class SvgPath {
	    constructor() {
	        this.v = "";
	    }
	    g(points) {
	        let dataString = "";
	        for (let i = 0; i < points.length; i++) {
	            dataString += (i ? "L" : "M") + svgValue(points[i].x) + " " + svgValue(points[i].y);
	        }
	        this.v += dataString + "Z";
	    }
	    h(point, diameter, counterClockwise) {
	        const sweepFlag = counterClockwise ? 0 : 1,
	              svgRadius = svgValue(diameter / 2),
	              svgDiameter = svgValue(diameter),
	              svgArc = "a" + svgRadius + "," + svgRadius + " 0 1," + sweepFlag + " ";
	        this.v +=
	            "M" + svgValue(point.x) + " " + svgValue(point.y + diameter / 2) +
	            svgArc + svgDiameter + ",0" +
	            svgArc + (-svgDiameter) + ",0";
	    }
	}
	class SvgRenderer {
	    constructor(target) {
	        this.A;
	        this.B = { };
	        this.N = target;
	        this.k = target.k;
	    }
	    m(fillColor) {
	        const match = /^(#......)(..)?/.exec(fillColor),
	              opacity = match[2] ? parseHex(match[2], 0) / 255 : 1;
	        this.N.m(match[1], opacity);
	    }
	    L(color) {
	        this.A = this.B[color] || (this.B[color] = new SvgPath());
	    }
	    M() { }
	    g(points) {
	        this.A.g(points);
	    }
	    h(point, diameter, counterClockwise) {
	        this.A.h(point, diameter, counterClockwise);
	    }
	    finish() {
	        const pathsByColor = this.B;
	        for (let color in pathsByColor) {
	            if (pathsByColor.hasOwnProperty(color)) {
	                this.N.O(color, pathsByColor[color].v);
	            }
	        }
	    }
	}
	const SVG_CONSTANTS = {
	    P: "http://www.w3.org/2000/svg",
	    R: "width",
	    S: "height",
	};
	class SvgWriter {
	    constructor(iconSize) {
	        this.k = iconSize;
	        this.C =
	            '<svg xmlns="' + SVG_CONSTANTS.P + '" width="' +
	            iconSize + '" height="' + iconSize + '" viewBox="0 0 ' +
	            iconSize + ' ' + iconSize + '">';
	    }
	    m(fillColor, opacity) {
	        if (opacity) {
	            this.C += '<rect width="100%" height="100%" fill="' +
	                fillColor + '" opacity="' + opacity.toFixed(2) + '"/>';
	        }
	    }
	    O(color, dataString) {
	        this.C += '<path fill="' + color + '" d="' + dataString + '"/>';
	    }
	    toString() {
	        return this.C + "</svg>";
	    }
	}
	function toSvg(hashOrValue, size, config) {
	    const writer = new SvgWriter(size);
	    iconGenerator(new SvgRenderer(writer),
	        isValidHash(hashOrValue) || computeHash(hashOrValue),
	        config);
	    return writer.toString();
	}
	(
	    typeof document !== "undefined" && document.querySelectorAll.bind(document));

	function Identicon$2({ className = '', publicKey, size, style = {} }) {
	    const html = o$1.useMemo(() => ({ __html: toSvg(publicKey.substring(2), size) }), [publicKey, size]);
	    return (jsxRuntimeExports.jsx("div", { className: className, dangerouslySetInnerHTML: html, style: style }));
	}
	const Jdenticon = o$1.memo(Identicon$2);

	function renderCircle({ cx, cy, fill, r }, key) {
	    return (jsxRuntimeExports.jsx("circle", { cx: cx, cy: cy, fill: fill, r: r }, key));
	}
	function Identicon$1({ address, className = '', isAlternative = false, size, style = {} }) {
	    const circles = o$1.useMemo(() => polkadotIcon(address, { isAlternative }), [address, isAlternative]);
	    return (jsxRuntimeExports.jsx("svg", { className: className, height: size, id: address, name: address, style: style, viewBox: '0 0 64 64', width: size, children: circles.map(renderCircle) }));
	}
	const Polkadot = o$1.memo(Identicon$1);

	var Component = {};

	var toggleSelection = function () {
	  var selection = document.getSelection();
	  if (!selection.rangeCount) {
	    return function () {};
	  }
	  var active = document.activeElement;
	  var ranges = [];
	  for (var i = 0; i < selection.rangeCount; i++) {
	    ranges.push(selection.getRangeAt(i));
	  }
	  switch (active.tagName.toUpperCase()) {
	    case 'INPUT':
	    case 'TEXTAREA':
	      active.blur();
	      break;
	    default:
	      active = null;
	      break;
	  }
	  selection.removeAllRanges();
	  return function () {
	    selection.type === 'Caret' &&
	    selection.removeAllRanges();
	    if (!selection.rangeCount) {
	      ranges.forEach(function(range) {
	        selection.addRange(range);
	      });
	    }
	    active &&
	    active.focus();
	  };
	};
	getDefaultExportFromCjs(toggleSelection);

	var deselectCurrent = toggleSelection;
	var clipboardToIE11Formatting = {
	  "text/plain": "Text",
	  "text/html": "Url",
	  "default": "Text"
	};
	var defaultMessage = "Copy to clipboard: #{key}, Enter";
	function format(message) {
	  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
	  return message.replace(/#{\s*key\s*}/g, copyKey);
	}
	function copy(text, options) {
	  var debug,
	    message,
	    reselectPrevious,
	    range,
	    selection,
	    mark,
	    success = false;
	  if (!options) {
	    options = {};
	  }
	  debug = options.debug || false;
	  try {
	    reselectPrevious = deselectCurrent();
	    range = document.createRange();
	    selection = document.getSelection();
	    mark = document.createElement("span");
	    mark.textContent = text;
	    mark.style.all = "unset";
	    mark.style.position = "fixed";
	    mark.style.top = 0;
	    mark.style.clip = "rect(0, 0, 0, 0)";
	    mark.style.whiteSpace = "pre";
	    mark.style.webkitUserSelect = "text";
	    mark.style.MozUserSelect = "text";
	    mark.style.msUserSelect = "text";
	    mark.style.userSelect = "text";
	    mark.addEventListener("copy", function(e) {
	      e.stopPropagation();
	      if (options.format) {
	        e.preventDefault();
	        if (typeof e.clipboardData === "undefined") {
	          debug && console.warn("unable to use e.clipboardData");
	          debug && console.warn("trying IE specific stuff");
	          window.clipboardData.clearData();
	          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
	          window.clipboardData.setData(format, text);
	        } else {
	          e.clipboardData.clearData();
	          e.clipboardData.setData(options.format, text);
	        }
	      }
	      if (options.onCopy) {
	        e.preventDefault();
	        options.onCopy(e.clipboardData);
	      }
	    });
	    document.body.appendChild(mark);
	    range.selectNodeContents(mark);
	    selection.addRange(range);
	    var successful = document.execCommand("copy");
	    if (!successful) {
	      throw new Error("copy command was unsuccessful");
	    }
	    success = true;
	  } catch (err) {
	    debug && console.error("unable to copy using execCommand: ", err);
	    debug && console.warn("trying IE specific stuff");
	    try {
	      window.clipboardData.setData(options.format || "text", text);
	      options.onCopy && options.onCopy(window.clipboardData);
	      success = true;
	    } catch (err) {
	      debug && console.error("unable to copy using clipboardData: ", err);
	      debug && console.error("falling back to prompt");
	      message = format("message" in options ? options.message : defaultMessage);
	      window.prompt(message, text);
	    }
	  } finally {
	    if (selection) {
	      if (typeof selection.removeRange == "function") {
	        selection.removeRange(range);
	      } else {
	        selection.removeAllRanges();
	      }
	    }
	    if (mark) {
	      document.body.removeChild(mark);
	    }
	    reselectPrevious();
	  }
	  return success;
	}
	var copyToClipboard = copy;
	getDefaultExportFromCjs(copyToClipboard);

	function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
	Object.defineProperty(Component, "__esModule", {
	  value: true
	});
	Component.CopyToClipboard = void 0;
	var _react = _interopRequireDefault(o$1);
	var _copyToClipboard = _interopRequireDefault(copyToClipboard);
	var _excluded = ["text", "onCopy", "options", "children"];
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	var CopyToClipboard$2 = function (_React$PureComponent) {
	  _inherits(CopyToClipboard, _React$PureComponent);
	  var _super = _createSuper(CopyToClipboard);
	  function CopyToClipboard() {
	    var _this;
	    _classCallCheck(this, CopyToClipboard);
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	    _this = _super.call.apply(_super, [this].concat(args));
	    _defineProperty(_assertThisInitialized(_this), "onClick", function (event) {
	      var _this$props = _this.props,
	          text = _this$props.text,
	          onCopy = _this$props.onCopy,
	          children = _this$props.children,
	          options = _this$props.options;
	      var elem = _react["default"].Children.only(children);
	      var result = (0, _copyToClipboard["default"])(text, options);
	      if (onCopy) {
	        onCopy(text, result);
	      }
	      if (elem && elem.props && typeof elem.props.onClick === 'function') {
	        elem.props.onClick(event);
	      }
	    });
	    return _this;
	  }
	  _createClass(CopyToClipboard, [{
	    key: "render",
	    value: function render() {
	      var _this$props2 = this.props;
	          _this$props2.text;
	          _this$props2.onCopy;
	          _this$props2.options;
	          var children = _this$props2.children,
	          props = _objectWithoutProperties(_this$props2, _excluded);
	      var elem = _react["default"].Children.only(children);
	      return _react["default"].cloneElement(elem, _objectSpread(_objectSpread({}, props), {}, {
	        onClick: this.onClick
	      }));
	    }
	  }]);
	  return CopyToClipboard;
	}(_react["default"].PureComponent);
	Component.CopyToClipboard = CopyToClipboard$2;
	_defineProperty(CopyToClipboard$2, "defaultProps", {
	  onCopy: undefined,
	  options: undefined
	});

	var _require = Component,
	    CopyToClipboard = _require.CopyToClipboard;
	CopyToClipboard.CopyToClipboard = CopyToClipboard;
	var lib = CopyToClipboard;
	const CopyToClipboard$1 = getDefaultExportFromCjs(lib);

	const Fallback = Beachball;
	const DEFAULT_SIZE = 64;
	const Components = {
	    beachball: Beachball,
	    empty: Empty,
	    ethereum: Ethereum,
	    jdenticon: Jdenticon,
	    polkadot: Polkadot,
	    substrate: Jdenticon
	};
	class BaseIcon extends o$1.PureComponent {
	    state = {
	        address: '',
	        publicKey: '0x'
	    };
	    static prefix = undefined;
	    static setDefaultPrefix(prefix) {
	        BaseIcon.prefix = prefix;
	    }
	    static getDerivedStateFromProps({ prefix = BaseIcon.prefix, theme, value }, prevState) {
	        if (theme === 'ethereum') {
	            const address = util.isU8a(value)
	                ? utilCrypto.ethereumEncode(value)
	                : value || '';
	            return { address, publicKey: '' };
	        }
	        try {
	            const address = util.isU8a(value) || util.isHex(value)
	                ? utilCrypto.encodeAddress(value, prefix)
	                : (value || '');
	            const publicKey = util.u8aToHex(utilCrypto.decodeAddress(address, false, prefix));
	            return address === prevState.address
	                ? null
	                : {
	                    address,
	                    publicKey
	                };
	        }
	        catch {
	            return {
	                address: '',
	                publicKey: '0x'
	            };
	        }
	    }
	    render() {
	        const { address } = this.state;
	        const wrapped = this.getWrapped(this.state, this.props);
	        return !address
	            ? wrapped
	            : (jsxRuntimeExports.jsx(CopyToClipboard$1, { onCopy: this.onCopy, text: address, children: wrapped }));
	    }
	    getWrapped({ address, publicKey }, { Custom }) {
	        const { className = '', isAlternative, isHighlight, size = DEFAULT_SIZE, style = {}, theme = uiSettings.settings.icon } = this.props;
	        const Component = !address
	            ? Empty
	            : Custom || Components[theme === 'default' ? uiSettings.ICON_DEFAULT_HOST : theme] || Fallback;
	        return (jsxRuntimeExports.jsx(StyledDiv, { className: `ui--IdentityIcon  ${className}`, style: style, children: jsxRuntimeExports.jsx(Component, { address: address, className: isHighlight ? 'highlight' : '', isAlternative: isAlternative, publicKey: publicKey, size: size }) }, address));
	    }
	    onCopy = () => {
	        const { onCopy } = this.props;
	        const { address } = this.state;
	        if (address && onCopy) {
	            onCopy(address);
	        }
	    };
	}
	function Icon(props) {
	    return jsxRuntimeExports.jsx(BaseIcon, { ...props });
	}
	const StyledDiv = st.div `
  cursor: copy;
  display: inline-block;
  line-height: 0;

  > .container {
    position: relative;

    > div,
    > svg {
      position: relative;
    }

    &.highlight:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      box-shadow: 0 0 5px 2px #aaa;
      content: '';
    }
  }
`;
	const Identicon = o$1.memo(Icon);

	const packageInfo = { name: '@polkadot/react-identicon', path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto', type: 'esm', version: '3.12.2' };

	exports.Beachball = Beachball;
	exports.Empty = Empty;
	exports.Ethereum = Ethereum;
	exports.Identicon = Identicon;
	exports.Jdenticon = Jdenticon;
	exports.Polkadot = Polkadot;
	exports.packageInfo = packageInfo;

}));
