(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@polkadot/ui-settings'), require('@polkadot/util'), require('@polkadot/util-crypto')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', '@polkadot/ui-settings', '@polkadot/util', '@polkadot/util-crypto'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotReactIdenticon = {}, global.React, global.polkadotUiSettings, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, r$1, uiSettings, util, utilCrypto) { 'use strict';

	const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

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
	var f=r$1,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
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
		var React = r$1;
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
		    if (source !== undefined) {
		      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
		      var lineNumber = source.lineNumber;
		      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
		    }
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
		      var sourceInfo = getSourceInfoErrorAddendum(source);
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

	var r={grad:.9,turn:360,rad:360/(2*Math.PI)},t=function(r){return "string"==typeof r?r.length>0:"number"==typeof r},n=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u=function(r){return (r=isFinite(r)?r%360:0)>0?r:r+360},a=function(r){return {r:e(r.r,0,255),g:e(r.g,0,255),b:e(r.b,0,255),a:e(r.a)}},o=function(r){return {r:n(r.r),g:n(r.g),b:n(r.b),a:n(r.a,3)}},i=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return {h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b$1=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return {r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g$1=function(r){return {h:u(r.h),s:e(r.s,0,100),l:e(r.l,0,100),a:e(r.a)}},d=function(r){return {h:n(r.h),s:n(r.s),l:n(r.l),a:n(r.a,3)}},f=function(r){return b$1((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e;},c=function(r){return {h:(t=h(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u;},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v$1=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m$1=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y$1={string:[[function(r){var t=i.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v$1.exec(r)||m$1.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p.exec(t);if(!n)return null;var e,u,a=g$1({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t(n)&&t(e)&&t(u)?a({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t(n)||!t(e)||!t(u))return null;var i=g$1({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t(n)||!t(a)||!t(o))return null;var h=function(r){return {h:u(r.h),s:e(r.s,0,100),v:e(r.v,0,100),a:e(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b$1(h)},"hsv"]]},N$1=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return [e,t[n][1]]}return [null,void 0]},x$1=function(r){return "string"==typeof r?N$1(r.trim(),y$1.string):"object"==typeof r&&null!==r?N$1(r,y$1.object):[null,void 0]},M$1=function(r,t){var n=c(r);return {h:n.h,s:e(n.s+100*t,0,100),l:n.l,a:n.a}},H$1=function(r){return (299*r.r+587*r.g+114*r.b)/1e3/255},$$1=function(r,t){var n=c(r);return {h:n.h,s:n.s,l:e(n.l+100*t,0,100),a:n.a}},j$1=function(){function r(r){this.parsed=x$1(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1};}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n(H$1(this.rgba),2)},r.prototype.isDark=function(){return H$1(this.rgba)<.5},r.prototype.isLight=function(){return H$1(this.rgba)>=.5},r.prototype.toHex=function(){return r=o(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i;},r.prototype.toRgb=function(){return o(this.rgba)},r.prototype.toRgbString=function(){return r=o(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u;},r.prototype.toHsl=function(){return d(c(this.rgba))},r.prototype.toHslString=function(){return r=d(c(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u;},r.prototype.toHsv=function(){return r=h(this.rgba),{h:n(r.h),s:n(r.s),v:n(r.v),a:n(r.a,3)};var r;},r.prototype.invert=function(){return w$1({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r;},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w$1(M$1(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w$1(M$1(this.rgba,-r))},r.prototype.grayscale=function(){return w$1(M$1(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w$1($$1(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w$1($$1(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return "number"==typeof r?w$1({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n(this.rgba.a,3);var t;},r.prototype.hue=function(r){var t=c(this.rgba);return "number"==typeof r?w$1({h:r,s:t.s,l:t.l,a:t.a}):n(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w$1(r).toHex()},r}(),w$1=function(r){return r instanceof j$1?r:new j$1(r)};

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
	    const updateElem = r$1.useCallback((node) => {
	        node && node.appendChild(beachballIcon(address, { isAlternative: false, size }));
	    }, [address, size]);
	    return (jsxRuntimeExports.jsx("div", { className: className, ref: updateElem, style: style }));
	}
	const Beachball = r$1.memo(Identicon$5);

	function Identicon$4({ className = '', size, style = {} }) {
	    return (jsxRuntimeExports.jsx("svg", { className: className, height: size, style: style, viewBox: '0 0 64 64', width: size }));
	}
	const Empty = r$1.memo(Identicon$4);

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

	var reactIs$2 = {exports: {}};

	var reactIs_production_min$1 = {};

	/**
	 * @license React
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var hasRequiredReactIs_production_min$1;
	function requireReactIs_production_min$1 () {
		if (hasRequiredReactIs_production_min$1) return reactIs_production_min$1;
		hasRequiredReactIs_production_min$1 = 1;
	var b=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
		function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k:case h:case l:case q:case p:case g:return a;default:return r}}case c:return r}}}reactIs_production_min$1.ContextConsumer=h;reactIs_production_min$1.ContextProvider=g;reactIs_production_min$1.Element=b;reactIs_production_min$1.ForwardRef=l;reactIs_production_min$1.Fragment=d;reactIs_production_min$1.Lazy=q;reactIs_production_min$1.Memo=p;reactIs_production_min$1.Portal=c;reactIs_production_min$1.Profiler=f;reactIs_production_min$1.StrictMode=e;reactIs_production_min$1.Suspense=m;
		reactIs_production_min$1.SuspenseList=n;reactIs_production_min$1.isAsyncMode=function(){return !1};reactIs_production_min$1.isConcurrentMode=function(){return !1};reactIs_production_min$1.isContextConsumer=function(a){return v(a)===h};reactIs_production_min$1.isContextProvider=function(a){return v(a)===g};reactIs_production_min$1.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min$1.isForwardRef=function(a){return v(a)===l};reactIs_production_min$1.isFragment=function(a){return v(a)===d};reactIs_production_min$1.isLazy=function(a){return v(a)===q};reactIs_production_min$1.isMemo=function(a){return v(a)===p};
		reactIs_production_min$1.isPortal=function(a){return v(a)===c};reactIs_production_min$1.isProfiler=function(a){return v(a)===f};reactIs_production_min$1.isStrictMode=function(a){return v(a)===e};reactIs_production_min$1.isSuspense=function(a){return v(a)===m};reactIs_production_min$1.isSuspenseList=function(a){return v(a)===n};
		reactIs_production_min$1.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?!0:!1};reactIs_production_min$1.typeOf=v;
		return reactIs_production_min$1;
	}

	var reactIs_development$1 = {};

	/**
	 * @license React
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var hasRequiredReactIs_development$1;
	function requireReactIs_development$1 () {
		if (hasRequiredReactIs_development$1) return reactIs_development$1;
		hasRequiredReactIs_development$1 = 1;
		if (process.env.NODE_ENV !== "production") {
		  (function() {
		var REACT_ELEMENT_TYPE = Symbol.for('react.element');
		var REACT_PORTAL_TYPE = Symbol.for('react.portal');
		var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
		var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
		var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
		var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
		var REACT_CONTEXT_TYPE = Symbol.for('react.context');
		var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
		var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
		var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
		var REACT_MEMO_TYPE = Symbol.for('react.memo');
		var REACT_LAZY_TYPE = Symbol.for('react.lazy');
		var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
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
		function typeOf(object) {
		  if (typeof object === 'object' && object !== null) {
		    var $$typeof = object.$$typeof;
		    switch ($$typeof) {
		      case REACT_ELEMENT_TYPE:
		        var type = object.type;
		        switch (type) {
		          case REACT_FRAGMENT_TYPE:
		          case REACT_PROFILER_TYPE:
		          case REACT_STRICT_MODE_TYPE:
		          case REACT_SUSPENSE_TYPE:
		          case REACT_SUSPENSE_LIST_TYPE:
		            return type;
		          default:
		            var $$typeofType = type && type.$$typeof;
		            switch ($$typeofType) {
		              case REACT_SERVER_CONTEXT_TYPE:
		              case REACT_CONTEXT_TYPE:
		              case REACT_FORWARD_REF_TYPE:
		              case REACT_LAZY_TYPE:
		              case REACT_MEMO_TYPE:
		              case REACT_PROVIDER_TYPE:
		                return $$typeofType;
		              default:
		                return $$typeof;
		            }
		        }
		      case REACT_PORTAL_TYPE:
		        return $$typeof;
		    }
		  }
		  return undefined;
		}
		var ContextConsumer = REACT_CONTEXT_TYPE;
		var ContextProvider = REACT_PROVIDER_TYPE;
		var Element = REACT_ELEMENT_TYPE;
		var ForwardRef = REACT_FORWARD_REF_TYPE;
		var Fragment = REACT_FRAGMENT_TYPE;
		var Lazy = REACT_LAZY_TYPE;
		var Memo = REACT_MEMO_TYPE;
		var Portal = REACT_PORTAL_TYPE;
		var Profiler = REACT_PROFILER_TYPE;
		var StrictMode = REACT_STRICT_MODE_TYPE;
		var Suspense = REACT_SUSPENSE_TYPE;
		var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
		var hasWarnedAboutDeprecatedIsAsyncMode = false;
		var hasWarnedAboutDeprecatedIsConcurrentMode = false;
		function isAsyncMode(object) {
		  {
		    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
		      hasWarnedAboutDeprecatedIsAsyncMode = true;
		      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
		    }
		  }
		  return false;
		}
		function isConcurrentMode(object) {
		  {
		    if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
		      hasWarnedAboutDeprecatedIsConcurrentMode = true;
		      console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
		    }
		  }
		  return false;
		}
		function isContextConsumer(object) {
		  return typeOf(object) === REACT_CONTEXT_TYPE;
		}
		function isContextProvider(object) {
		  return typeOf(object) === REACT_PROVIDER_TYPE;
		}
		function isElement(object) {
		  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function isForwardRef(object) {
		  return typeOf(object) === REACT_FORWARD_REF_TYPE;
		}
		function isFragment(object) {
		  return typeOf(object) === REACT_FRAGMENT_TYPE;
		}
		function isLazy(object) {
		  return typeOf(object) === REACT_LAZY_TYPE;
		}
		function isMemo(object) {
		  return typeOf(object) === REACT_MEMO_TYPE;
		}
		function isPortal(object) {
		  return typeOf(object) === REACT_PORTAL_TYPE;
		}
		function isProfiler(object) {
		  return typeOf(object) === REACT_PROFILER_TYPE;
		}
		function isStrictMode(object) {
		  return typeOf(object) === REACT_STRICT_MODE_TYPE;
		}
		function isSuspense(object) {
		  return typeOf(object) === REACT_SUSPENSE_TYPE;
		}
		function isSuspenseList(object) {
		  return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
		}
		reactIs_development$1.ContextConsumer = ContextConsumer;
		reactIs_development$1.ContextProvider = ContextProvider;
		reactIs_development$1.Element = Element;
		reactIs_development$1.ForwardRef = ForwardRef;
		reactIs_development$1.Fragment = Fragment;
		reactIs_development$1.Lazy = Lazy;
		reactIs_development$1.Memo = Memo;
		reactIs_development$1.Portal = Portal;
		reactIs_development$1.Profiler = Profiler;
		reactIs_development$1.StrictMode = StrictMode;
		reactIs_development$1.Suspense = Suspense;
		reactIs_development$1.SuspenseList = SuspenseList;
		reactIs_development$1.isAsyncMode = isAsyncMode;
		reactIs_development$1.isConcurrentMode = isConcurrentMode;
		reactIs_development$1.isContextConsumer = isContextConsumer;
		reactIs_development$1.isContextProvider = isContextProvider;
		reactIs_development$1.isElement = isElement;
		reactIs_development$1.isForwardRef = isForwardRef;
		reactIs_development$1.isFragment = isFragment;
		reactIs_development$1.isLazy = isLazy;
		reactIs_development$1.isMemo = isMemo;
		reactIs_development$1.isPortal = isPortal;
		reactIs_development$1.isProfiler = isProfiler;
		reactIs_development$1.isStrictMode = isStrictMode;
		reactIs_development$1.isSuspense = isSuspense;
		reactIs_development$1.isSuspenseList = isSuspenseList;
		reactIs_development$1.isValidElementType = isValidElementType;
		reactIs_development$1.typeOf = typeOf;
		  })();
		}
		return reactIs_development$1;
	}

	if (process.env.NODE_ENV === 'production') {
	  reactIs$2.exports = requireReactIs_production_min$1();
	} else {
	  reactIs$2.exports = requireReactIs_development$1();
	}
	var reactIsExports$1 = reactIs$2.exports;
	getDefaultExportFromCjs(reactIsExports$1);

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

	function stylis_min (W) {
	  function M(d, c, e, h, a) {
	    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
	      g = e.charCodeAt(l);
	      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);
	      if (0 === b + n + v + m) {
	        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
	          switch (g) {
	            case 32:
	            case 9:
	            case 59:
	            case 13:
	            case 10:
	              break;
	            default:
	              f += e.charAt(l);
	          }
	          g = 59;
	        }
	        switch (g) {
	          case 123:
	            f = f.trim();
	            q = f.charCodeAt(0);
	            k = 1;
	            for (t = ++l; l < B;) {
	              switch (g = e.charCodeAt(l)) {
	                case 123:
	                  k++;
	                  break;
	                case 125:
	                  k--;
	                  break;
	                case 47:
	                  switch (g = e.charCodeAt(l + 1)) {
	                    case 42:
	                    case 47:
	                      a: {
	                        for (u = l + 1; u < J; ++u) {
	                          switch (e.charCodeAt(u)) {
	                            case 47:
	                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
	                                l = u + 1;
	                                break a;
	                              }
	                              break;
	                            case 10:
	                              if (47 === g) {
	                                l = u + 1;
	                                break a;
	                              }
	                          }
	                        }
	                        l = u;
	                      }
	                  }
	                  break;
	                case 91:
	                  g++;
	                case 40:
	                  g++;
	                case 34:
	                case 39:
	                  for (; l++ < J && e.charCodeAt(l) !== g;) {
	                  }
	              }
	              if (0 === k) break;
	              l++;
	            }
	            k = e.substring(t, l);
	            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));
	            switch (q) {
	              case 64:
	                0 < r && (f = f.replace(N, ''));
	                g = f.charCodeAt(1);
	                switch (g) {
	                  case 100:
	                  case 109:
	                  case 115:
	                  case 45:
	                    r = c;
	                    break;
	                  default:
	                    r = O;
	                }
	                k = M(c, r, k, g, a + 1);
	                t = k.length;
	                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
	                if (0 < t) switch (g) {
	                  case 115:
	                    f = f.replace(da, ea);
	                  case 100:
	                  case 109:
	                  case 45:
	                    k = f + '{' + k + '}';
	                    break;
	                  case 107:
	                    f = f.replace(fa, '$1 $2');
	                    k = f + '{' + k + '}';
	                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
	                    break;
	                  default:
	                    k = f + k, 112 === h && (k = (p += k, ''));
	                } else k = '';
	                break;
	              default:
	                k = M(c, X(c, f, I), k, h, a + 1);
	            }
	            F += k;
	            k = I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	            break;
	          case 125:
	          case 59:
	            f = (0 < r ? f.replace(N, '') : f).trim();
	            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
	              case 0:
	                break;
	              case 64:
	                if (105 === g || 99 === g) {
	                  G += f + e.charAt(l);
	                  break;
	                }
	              default:
	                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
	            }
	            I = r = u = q = 0;
	            f = '';
	            g = e.charCodeAt(++l);
	        }
	      }
	      switch (g) {
	        case 13:
	        case 10:
	          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
	          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
	          z = 1;
	          D++;
	          break;
	        case 59:
	        case 125:
	          if (0 === b + n + v + m) {
	            z++;
	            break;
	          }
	        default:
	          z++;
	          y = e.charAt(l);
	          switch (g) {
	            case 9:
	            case 32:
	              if (0 === n + m + b) switch (x) {
	                case 44:
	                case 58:
	                case 9:
	                case 32:
	                  y = '';
	                  break;
	                default:
	                  32 !== g && (y = ' ');
	              }
	              break;
	            case 0:
	              y = '\\0';
	              break;
	            case 12:
	              y = '\\f';
	              break;
	            case 11:
	              y = '\\v';
	              break;
	            case 38:
	              0 === n + b + m && (r = I = 1, y = '\f' + y);
	              break;
	            case 108:
	              if (0 === n + b + m + E && 0 < u) switch (l - u) {
	                case 2:
	                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);
	                case 8:
	                  111 === K && (E = K);
	              }
	              break;
	            case 58:
	              0 === n + b + m && (u = l);
	              break;
	            case 44:
	              0 === b + v + n + m && (r = 1, y += '\r');
	              break;
	            case 34:
	            case 39:
	              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
	              break;
	            case 91:
	              0 === n + b + v && m++;
	              break;
	            case 93:
	              0 === n + b + v && m--;
	              break;
	            case 41:
	              0 === n + b + m && v--;
	              break;
	            case 40:
	              if (0 === n + b + m) {
	                if (0 === q) switch (2 * x + 3 * K) {
	                  case 533:
	                    break;
	                  default:
	                    q = 1;
	                }
	                v++;
	              }
	              break;
	            case 64:
	              0 === b + v + n + m + u + k && (k = 1);
	              break;
	            case 42:
	            case 47:
	              if (!(0 < n + m + v)) switch (b) {
	                case 0:
	                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
	                    case 235:
	                      b = 47;
	                      break;
	                    case 220:
	                      t = l, b = 42;
	                  }
	                  break;
	                case 42:
	                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
	              }
	          }
	          0 === b && (f += y);
	      }
	      K = x;
	      x = g;
	      l++;
	    }
	    t = p.length;
	    if (0 < t) {
	      r = c;
	      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
	      p = r.join(',') + '{' + p + '}';
	      if (0 !== w * E) {
	        2 !== w || L(p, 2) || (E = 0);
	        switch (E) {
	          case 111:
	            p = p.replace(ha, ':-moz-$1') + p;
	            break;
	          case 112:
	            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
	        }
	        E = 0;
	      }
	    }
	    return G + p + F;
	  }
	  function X(d, c, e) {
	    var h = c.trim().split(ia);
	    c = h;
	    var a = h.length,
	        m = d.length;
	    switch (m) {
	      case 0:
	      case 1:
	        var b = 0;
	        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
	          c[b] = Z(d, c[b], e).trim();
	        }
	        break;
	      default:
	        var v = b = 0;
	        for (c = []; b < a; ++b) {
	          for (var n = 0; n < m; ++n) {
	            c[v++] = Z(d[n] + ' ', h[b], e).trim();
	          }
	        }
	    }
	    return c;
	  }
	  function Z(d, c, e) {
	    var h = c.charCodeAt(0);
	    33 > h && (h = (c = c.trim()).charCodeAt(0));
	    switch (h) {
	      case 38:
	        return c.replace(F, '$1' + d.trim());
	      case 58:
	        return d.trim() + c.replace(F, '$1' + d.trim());
	      default:
	        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
	    }
	    return d + c;
	  }
	  function P(d, c, e, h) {
	    var a = d + ';',
	        m = 2 * c + 3 * e + 4 * h;
	    if (944 === m) {
	      d = a.indexOf(':', 9) + 1;
	      var b = a.substring(d, a.length - 1).trim();
	      b = a.substring(0, d).trim() + b + ';';
	      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
	    }
	    if (0 === w || 2 === w && !L(a, 1)) return a;
	    switch (m) {
	      case 1015:
	        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;
	      case 951:
	        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;
	      case 963:
	        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;
	      case 1009:
	        if (100 !== a.charCodeAt(4)) break;
	      case 969:
	      case 942:
	        return '-webkit-' + a + a;
	      case 978:
	        return '-webkit-' + a + '-moz-' + a + a;
	      case 1019:
	      case 983:
	        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;
	      case 883:
	        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
	        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
	        break;
	      case 932:
	        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
	          case 103:
	            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;
	          case 115:
	            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;
	          case 98:
	            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
	        }
	        return '-webkit-' + a + '-ms-' + a + a;
	      case 964:
	        return '-webkit-' + a + '-ms-flex-' + a + a;
	      case 1023:
	        if (99 !== a.charCodeAt(8)) break;
	        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
	        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;
	      case 1005:
	        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;
	      case 1e3:
	        b = a.substring(13).trim();
	        c = b.indexOf('-') + 1;
	        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
	          case 226:
	            b = a.replace(G, 'tb');
	            break;
	          case 232:
	            b = a.replace(G, 'tb-rl');
	            break;
	          case 220:
	            b = a.replace(G, 'lr');
	            break;
	          default:
	            return a;
	        }
	        return '-webkit-' + a + '-ms-' + b + a;
	      case 1017:
	        if (-1 === a.indexOf('sticky', 9)) break;
	      case 975:
	        c = (a = d).length - 10;
	        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();
	        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
	          case 203:
	            if (111 > b.charCodeAt(8)) break;
	          case 115:
	            a = a.replace(b, '-webkit-' + b) + ';' + a;
	            break;
	          case 207:
	          case 102:
	            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
	        }
	        return a + ';';
	      case 938:
	        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
	          case 105:
	            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;
	          case 115:
	            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;
	          default:
	            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
	        }
	        break;
	      case 973:
	      case 989:
	        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;
	      case 931:
	      case 953:
	        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
	        break;
	      case 962:
	        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
	    }
	    return a;
	  }
	  function L(d, c) {
	    var e = d.indexOf(1 === c ? ':' : '{'),
	        h = d.substring(0, 3 !== c ? e : 10);
	    e = d.substring(e + 1, d.length - 1);
	    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
	  }
	  function ea(d, c) {
	    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
	    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
	  }
	  function H(d, c, e, h, a, m, b, v, n, q) {
	    for (var g = 0, x = c, w; g < A; ++g) {
	      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
	        case void 0:
	        case !1:
	        case !0:
	        case null:
	          break;
	        default:
	          x = w;
	      }
	    }
	    if (x !== c) return x;
	  }
	  function T(d) {
	    switch (d) {
	      case void 0:
	      case null:
	        A = S.length = 0;
	        break;
	      default:
	        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
	          T(d[c]);
	        } else Y = !!d | 0;
	    }
	    return T;
	  }
	  function U(d) {
	    d = d.prefix;
	    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
	    return U;
	  }
	  function B(d, c) {
	    var e = d;
	    33 > e.charCodeAt(0) && (e = e.trim());
	    V = e;
	    e = [V];
	    if (0 < A) {
	      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
	      void 0 !== h && 'string' === typeof h && (c = h);
	    }
	    var a = M(O, e, c, 0, 0);
	    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
	    V = '';
	    E = 0;
	    z = D = 1;
	    return a;
	  }
	  var ca = /^\0+/g,
	      N = /[\0\r\f]/g,
	      aa = /: */g,
	      ka = /zoo|gra/,
	      ma = /([,: ])(transform)/g,
	      ia = /,\r+?/g,
	      F = /([\t\r\n ])*\f?&/g,
	      fa = /@(k\w+)\s*(\S*)\s*/,
	      Q = /::(place)/g,
	      ha = /:(read-only)/g,
	      G = /[svh]\w+-[tblr]{2}/,
	      da = /\(\s*(.*)\s*\)/g,
	      oa = /([\s\S]*?);/g,
	      ba = /-self|flex-/g,
	      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
	      la = /stretch|:\s*\w+\-(?:conte|avail)/,
	      ja = /([^-])(image-set\()/,
	      z = 1,
	      D = 1,
	      E = 0,
	      w = 1,
	      O = [],
	      S = [],
	      A = 0,
	      R = null,
	      Y = 0,
	      V = '';
	  B.use = T;
	  B.set = U;
	  void 0 !== W && U(W);
	  return B;
	}

	var unitlessKeys = {
	  animationIterationCount: 1,
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

	var reactIs$1 = {exports: {}};

	var reactIs_production_min = {};

	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var hasRequiredReactIs_production_min;
	function requireReactIs_production_min () {
		if (hasRequiredReactIs_production_min) return reactIs_production_min;
		hasRequiredReactIs_production_min = 1;
	var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
		Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
		function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
		reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
		reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
		reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;
		return reactIs_production_min;
	}

	var reactIs_development = {};

	/** @license React v16.13.1
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	var hasRequiredReactIs_development;
	function requireReactIs_development () {
		if (hasRequiredReactIs_development) return reactIs_development;
		hasRequiredReactIs_development = 1;
		if (process.env.NODE_ENV !== "production") {
		  (function() {
		var hasSymbol = typeof Symbol === 'function' && Symbol.for;
		var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
		var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
		var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
		var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
		var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
		var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
		var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
		var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
		var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
		var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
		var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
		var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
		var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
		var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
		var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
		var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
		var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
		var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
		function isValidElementType(type) {
		  return typeof type === 'string' || typeof type === 'function' ||
		  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
		}
		function typeOf(object) {
		  if (typeof object === 'object' && object !== null) {
		    var $$typeof = object.$$typeof;
		    switch ($$typeof) {
		      case REACT_ELEMENT_TYPE:
		        var type = object.type;
		        switch (type) {
		          case REACT_ASYNC_MODE_TYPE:
		          case REACT_CONCURRENT_MODE_TYPE:
		          case REACT_FRAGMENT_TYPE:
		          case REACT_PROFILER_TYPE:
		          case REACT_STRICT_MODE_TYPE:
		          case REACT_SUSPENSE_TYPE:
		            return type;
		          default:
		            var $$typeofType = type && type.$$typeof;
		            switch ($$typeofType) {
		              case REACT_CONTEXT_TYPE:
		              case REACT_FORWARD_REF_TYPE:
		              case REACT_LAZY_TYPE:
		              case REACT_MEMO_TYPE:
		              case REACT_PROVIDER_TYPE:
		                return $$typeofType;
		              default:
		                return $$typeof;
		            }
		        }
		      case REACT_PORTAL_TYPE:
		        return $$typeof;
		    }
		  }
		  return undefined;
		}
		var AsyncMode = REACT_ASYNC_MODE_TYPE;
		var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
		var ContextConsumer = REACT_CONTEXT_TYPE;
		var ContextProvider = REACT_PROVIDER_TYPE;
		var Element = REACT_ELEMENT_TYPE;
		var ForwardRef = REACT_FORWARD_REF_TYPE;
		var Fragment = REACT_FRAGMENT_TYPE;
		var Lazy = REACT_LAZY_TYPE;
		var Memo = REACT_MEMO_TYPE;
		var Portal = REACT_PORTAL_TYPE;
		var Profiler = REACT_PROFILER_TYPE;
		var StrictMode = REACT_STRICT_MODE_TYPE;
		var Suspense = REACT_SUSPENSE_TYPE;
		var hasWarnedAboutDeprecatedIsAsyncMode = false;
		function isAsyncMode(object) {
		  {
		    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
		      hasWarnedAboutDeprecatedIsAsyncMode = true;
		      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
		    }
		  }
		  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
		}
		function isConcurrentMode(object) {
		  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
		}
		function isContextConsumer(object) {
		  return typeOf(object) === REACT_CONTEXT_TYPE;
		}
		function isContextProvider(object) {
		  return typeOf(object) === REACT_PROVIDER_TYPE;
		}
		function isElement(object) {
		  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function isForwardRef(object) {
		  return typeOf(object) === REACT_FORWARD_REF_TYPE;
		}
		function isFragment(object) {
		  return typeOf(object) === REACT_FRAGMENT_TYPE;
		}
		function isLazy(object) {
		  return typeOf(object) === REACT_LAZY_TYPE;
		}
		function isMemo(object) {
		  return typeOf(object) === REACT_MEMO_TYPE;
		}
		function isPortal(object) {
		  return typeOf(object) === REACT_PORTAL_TYPE;
		}
		function isProfiler(object) {
		  return typeOf(object) === REACT_PROFILER_TYPE;
		}
		function isStrictMode(object) {
		  return typeOf(object) === REACT_STRICT_MODE_TYPE;
		}
		function isSuspense(object) {
		  return typeOf(object) === REACT_SUSPENSE_TYPE;
		}
		reactIs_development.AsyncMode = AsyncMode;
		reactIs_development.ConcurrentMode = ConcurrentMode;
		reactIs_development.ContextConsumer = ContextConsumer;
		reactIs_development.ContextProvider = ContextProvider;
		reactIs_development.Element = Element;
		reactIs_development.ForwardRef = ForwardRef;
		reactIs_development.Fragment = Fragment;
		reactIs_development.Lazy = Lazy;
		reactIs_development.Memo = Memo;
		reactIs_development.Portal = Portal;
		reactIs_development.Profiler = Profiler;
		reactIs_development.StrictMode = StrictMode;
		reactIs_development.Suspense = Suspense;
		reactIs_development.isAsyncMode = isAsyncMode;
		reactIs_development.isConcurrentMode = isConcurrentMode;
		reactIs_development.isContextConsumer = isContextConsumer;
		reactIs_development.isContextProvider = isContextProvider;
		reactIs_development.isElement = isElement;
		reactIs_development.isForwardRef = isForwardRef;
		reactIs_development.isFragment = isFragment;
		reactIs_development.isLazy = isLazy;
		reactIs_development.isMemo = isMemo;
		reactIs_development.isPortal = isPortal;
		reactIs_development.isProfiler = isProfiler;
		reactIs_development.isStrictMode = isStrictMode;
		reactIs_development.isSuspense = isSuspense;
		reactIs_development.isValidElementType = isValidElementType;
		reactIs_development.typeOf = typeOf;
		  })();
		}
		return reactIs_development;
	}

	if (process.env.NODE_ENV === 'production') {
	  reactIs$1.exports = requireReactIs_production_min();
	} else {
	  reactIs$1.exports = requireReactIs_development();
	}
	var reactIsExports = reactIs$1.exports;
	getDefaultExportFromCjs(reactIsExports);

	var reactIs = reactIsExports;
	var REACT_STATICS = {
	  childContextTypes: true,
	  contextType: true,
	  contextTypes: true,
	  defaultProps: true,
	  displayName: true,
	  getDefaultProps: true,
	  getDerivedStateFromError: true,
	  getDerivedStateFromProps: true,
	  mixins: true,
	  propTypes: true,
	  type: true
	};
	var KNOWN_STATICS = {
	  name: true,
	  length: true,
	  prototype: true,
	  caller: true,
	  callee: true,
	  arguments: true,
	  arity: true
	};
	var FORWARD_REF_STATICS = {
	  '$$typeof': true,
	  render: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true
	};
	var MEMO_STATICS = {
	  '$$typeof': true,
	  compare: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true,
	  type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
	function getStatics(component) {
	  if (reactIs.isMemo(component)) {
	    return MEMO_STATICS;
	  }
	  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
	}
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	  if (typeof sourceComponent !== 'string') {
	    if (objectPrototype) {
	      var inheritedComponent = getPrototypeOf(sourceComponent);
	      if (inheritedComponent && inheritedComponent !== objectPrototype) {
	        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	      }
	    }
	    var keys = getOwnPropertyNames(sourceComponent);
	    if (getOwnPropertySymbols) {
	      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
	    }
	    var targetStatics = getStatics(targetComponent);
	    var sourceStatics = getStatics(sourceComponent);
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i];
	      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
	        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
	        try {
	          defineProperty(targetComponent, key, descriptor);
	        } catch (e) {}
	      }
	    }
	  }
	  return targetComponent;
	}
	var hoistNonReactStatics_cjs = hoistNonReactStatics;
	const m = getDefaultExportFromCjs(hoistNonReactStatics_cjs);

	function y(){return (y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}var v=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},g=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!reactIsExports$1.typeOf(t)},S=Object.freeze([]),w=Object.freeze({});function E(e){return "function"==typeof e}function b(e){return "production"!==process.env.NODE_ENV&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function _(e){return e&&"string"==typeof e.styledComponentId}var N="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",C="undefined"!=typeof window&&"HTMLElement"in window,I=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&(void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!==process.env.NODE_ENV)),O="production"!==process.env.NODE_ENV?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"}:{};function R(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t);})),e}function D(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw "production"===process.env.NODE_ENV?new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):"")):new Error(R.apply(void 0,[O[e]].concat(n)).trim())}var j=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&D(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++);},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n);}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),T=new Map,x=new Map,k=1,V=function(e){if(T.has(e))return T.get(e);for(;x.has(k);)k++;var t=k++;return "production"!==process.env.NODE_ENV&&((0|t)<0||t>1<<30)&&D(16,""+t),T.set(e,t),x.set(t,e),t},B=function(e){return x.get(e)},z=function(e,t){t>=k&&(k=t+1),T.set(e,t),x.set(t,e);},M="style["+N+'][data-styled-version="5.3.11"]',G=new RegExp("^"+N+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),L=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r);},F=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(G);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(z(u,c),L(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0;}else r.push(i);}}},Y=function(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null},q=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(N))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(N,"active"),r.setAttribute("data-styled-version","5.3.11");var i=Y();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},H=function(){function e(e){var t=this.element=q(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}D(17);}(t),this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),$=function(){function e(e){var t=this.element=q(e);this.nodes=t.childNodes,this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return !1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),W=function(){function e(e){this.rules=[],this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--;},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),U=C,J={isServer:!C,useCSSOMInjection:!I},X=function(){function e(e,t,n){void 0===e&&(e=w),void 0===t&&(t={}),this.options=y({},J,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&C&&U&&(U=!1,function(e){for(var t=document.querySelectorAll(M),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(N)&&(F(e,o),o.parentNode&&o.parentNode.removeChild(o));}}(this));}e.registerId=function(e){return V(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(y({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new W(o):r?new H(o):new $(o),new j(e)));var e,t,n,r,o;},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(V(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(V(e),n);},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},t.clearRules=function(e){this.getTag().clearGroup(V(e)),this.clearNames(e);},t.clearTag=function(){this.tag=void 0;},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=B(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(i&&a&&i.size){var c=N+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",");})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n';}}}return r}(this)},e}(),Z=/(a)(d)/gi,K=function(e){return String.fromCharCode(e+(e>25?39:97))};function Q(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=K(t%52)+n;return (K(t%52)+n).replace(Z,"$1-$2")}var ee=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},te=function(e){return ee(5381,e)};function ne(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(E(n)&&!_(n))return !1}return !0}var re=te("5.3.11"),oe=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"===process.env.NODE_ENV&&(void 0===n||n.isStatic)&&ne(e),this.componentId=t,this.baseHash=ee(re,t),this.baseStyle=n,X.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else {var s=_e(this.rules,e,t,n).join(""),i=Q(ee(this.baseHash,s)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a);}o.push(i),this.staticRulesId=i;}else {for(var c=this.rules.length,u=ee(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h,"production"!==process.env.NODE_ENV&&(u=ee(u,h+d));else if(h){var p=_e(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=ee(u,f+d),l+=f;}}if(l){var m=Q(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y);}o.push(m);}}return o.join(" ")},e}(),se=/^\s*\/\/.*$/gm,ie=[":","[",".","#"];function ae(e){var t,n,r,o,s=void 0===e?w:e,i=s.options,a=void 0===i?w:i,c=s.plugins,u=void 0===c?S:c,l=new stylis_min(a),d=[],p=function(e){function t(t){if(t)try{e(t+"}");}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t);}}}((function(e){d.push(e);})),f=function(e,r,s){return 0===r&&-1!==ie.indexOf(s[n.length])||s.match(o)?e:"."+t};function m(e,s,i,a){void 0===a&&(a="&");var c=e.replace(se,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),l(i||!s?"":s,u)}return l.use([].concat(u,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f));},p,function(e){if(-2===e){var t=d;return d=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||D(15),ee(e,t.name)}),5381).toString():"",m}var ce=r$1.createContext();ce.Consumer;var le=r$1.createContext(),de=(le.Consumer,new X),he=ae();function pe(){return r$1.useContext(ce)||de}function fe(){return r$1.useContext(le)||he}var ye=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=he);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"));},this.toString=function(){return D(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t;}return e.prototype.getName=function(e){return void 0===e&&(e=he),this.name+e.hash},e}(),ve=/([A-Z])/,ge=/([A-Z])/g,Se=/^ms-/,we=function(e){return "-"+e.toLowerCase()};function Ee(e){return ve.test(e)?e.replace(ge,we).replace(Se,"-ms-"):e}var be=function(e){return null==e||!1===e||""===e};function _e(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=_e(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(be(e))return "";if(_(e))return "."+e.styledComponentId;if(E(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return "production"!==process.env.NODE_ENV&&reactIsExports$1.isElement(u)&&console.warn(b(e)+" is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."),_e(u,n,r,o)}var l;return e instanceof ye?r?(e.inject(r,o),e.getName(o)):e:g(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!be(t[i])&&(Array.isArray(t[i])&&t[i].isCss||E(t[i])?s.push(Ee(i)+":",t[i],";"):g(t[i])?s.push.apply(s,e(t[i],i)):s.push(Ee(i)+": "+(r=i,null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in unitlessKeys||r.startsWith("--")?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}var Ne=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function Ae(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return E(e)||g(e)?Ne(_e(v(S,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Ne(_e(v(e,n)))}var Ce=/invalid hook call/i,Ie=new Set,Pe=function(e,t){if("production"!==process.env.NODE_ENV){var n="The component "+e+(t?' with the id of "'+t+'"':"")+" has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",r=console.error;try{var o=!0;console.error=function(e){if(Ce.test(e))o=!1,Ie.delete(n);else {for(var t=arguments.length,s=new Array(t>1?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];r.apply(void 0,[e].concat(s));}},r$1.useRef(),o&&!Ie.has(n)&&(console.warn(n),Ie.add(n));}catch(e){Ce.test(e.message)&&Ie.delete(n);}finally{console.error=r;}}},Oe=function(e,t,n){return void 0===n&&(n=w),e.theme!==n.theme&&e.theme||t||n.theme},Re=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,De=/(^-|-$)/g;function je(e){return e.replace(Re,"-").replace(De,"")}var Te=function(e){return Q(te(e)>>>0)};function xe(e){return "string"==typeof e&&("production"===process.env.NODE_ENV||e.charAt(0)===e.charAt(0).toLowerCase())}var ke=function(e){return "function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Ve=function(e){return "__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Be(e,t,n){var r=e[n];ke(t)&&ke(r)?ze(r,t):e[n]=t;}function ze(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(ke(i))for(var a in i)Ve(a)&&Be(e,i[a],a);}return e}var Me=r$1.createContext();Me.Consumer;var Fe={};function Ye(e,t,n){var o=_(e),i=!xe(e),a=t.attrs,c=void 0===a?S:a,l=t.componentId,d=void 0===l?function(e,t){var n="string"!=typeof e?"sc":je(e);Fe[n]=(Fe[n]||0)+1;var r=n+"-"+Te("5.3.11"+n+Fe[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):l,h=t.displayName,p=void 0===h?function(e){return xe(e)?"styled."+e:"Styled("+b(e)+")"}(e):h,v=t.displayName&&t.componentId?je(t.displayName)+"-"+t.componentId:t.componentId||d,g=o&&e.attrs?Array.prototype.concat(e.attrs,c).filter(Boolean):c,N=t.shouldForwardProp;o&&e.shouldForwardProp&&(N=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var A,C=new oe(n,v,o?e.componentStyle:void 0),I=C.isStatic&&0===c.length,P=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,l=e.shouldForwardProp,d=e.styledComponentId,h=e.target,p=function(e,t,n){void 0===e&&(e=w);var r=y({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in E(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t];})),[r,o]}(Oe(t,r$1.useContext(Me),a)||w,t,o),m=p[0],v=p[1],g=function(e,t,n,r){var o=pe(),s=fe(),i=t?e.generateAndInjectStyles(w,o,s):e.generateAndInjectStyles(n,o,s);return "production"!==process.env.NODE_ENV&&!t&&r&&r(i),i}(i,r,m,"production"!==process.env.NODE_ENV?e.warnTooManyClasses:void 0),S=n,b=v.$as||t.$as||v.as||t.as||h,_=xe(b),N=v!==t?y({},t,{},v):t,A={};for(var C in N)"$"!==C[0]&&"as"!==C&&("forwardedAs"===C?A.as=N[C]:(l?l(C,isPropValid,b):!_||isPropValid(C))&&(A[C]=N[C]));return t.style&&v.style!==t.style&&(A.style=y({},t.style,{},v.style)),A.className=Array.prototype.concat(c,d,g!==d?g:null,t.className,v.className).filter(Boolean).join(" "),A.ref=S,r$1.createElement(b,A)}(A,e,t,I)};return P.displayName=p,(A=r$1.forwardRef(P)).attrs=g,A.componentStyle=C,A.displayName=p,A.shouldForwardProp=N,A.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):S,A.styledComponentId=v,A.target=o?e.target:e,A.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return {};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(xe(e)?e:je(b(e)));return Ye(e,y({},o,{attrs:g,componentId:s}),n)},Object.defineProperty(A,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?ze({},e.defaultProps,t):t;}}),"production"!==process.env.NODE_ENV&&(Pe(p,v),A.warnTooManyClasses=function(e,t){var n={},r=!1;return function(o){if(!r&&(n[o]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'+t+'"':"";console.warn("Over 200 classes were generated for component "+e+s+".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=!0,n={};}}}(p,v)),Object.defineProperty(A,"toString",{value:function(){return "."+A.styledComponentId}}),i&&m(A,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),A}var qe=function(e){return function e(t,r,o){if(void 0===o&&(o=w),!reactIsExports$1.isValidElementType(r))return D(1,String(r));var s=function(){return t(r,o,Ae.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,y({},o,{},n))},s.attrs=function(n){return e(t,r,y({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(Ye,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){qe[e]=qe(e);}));"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"),"production"!==process.env.NODE_ENV&&"test"!==process.env.NODE_ENV&&"undefined"!=typeof window&&(window["__styled-components-init__"]=window["__styled-components-init__"]||0,1===window["__styled-components-init__"]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window["__styled-components-init__"]+=1);const styledComponents = qe;

	const styled = (styledComponents.styled ||
	    styledComponents.default ||
	    styledComponents);

	function Identicon$3({ address, className = '', size, style = {} }) {
	    const imgSrc = r$1.useMemo(() => makeBlockie(address), [address]);
	    return (jsxRuntimeExports.jsx(StyledImg, { className: className, size: size, src: imgSrc, style: style }));
	}
	const StyledImg = styled.img(({ size }) => `
  display: block;
  height: ${size}px;
  width: ${size}px;
`);
	const Ethereum = r$1.memo(Identicon$3);

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
	            typeof paddingOrLocalConfig == "object" && paddingOrLocalConfig ||
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
	            typeof paddingOrLocalConfig == "number" ? paddingOrLocalConfig :
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
	    const html = r$1.useMemo(() => ({ __html: toSvg(publicKey.substring(2), size) }), [publicKey, size]);
	    return (jsxRuntimeExports.jsx("div", { className: className, dangerouslySetInnerHTML: html, style: style }));
	}
	const Jdenticon = r$1.memo(Identicon$2);

	function renderCircle({ cx, cy, fill, r }, key) {
	    return (jsxRuntimeExports.jsx("circle", { cx: cx, cy: cy, fill: fill, r: r }, key));
	}
	function Identicon$1({ address, className = '', isAlternative = false, size, style = {} }) {
	    const circles = r$1.useMemo(() => polkadotIcon(address, { isAlternative }), [address, isAlternative]);
	    return (jsxRuntimeExports.jsx("svg", { className: className, height: size, id: address, name: address, style: style, viewBox: '0 0 64 64', width: size, children: circles.map(renderCircle) }));
	}
	const Polkadot = r$1.memo(Identicon$1);

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
	var _react = _interopRequireDefault(r$1);
	var _copyToClipboard = _interopRequireDefault(copyToClipboard);
	var _excluded = ["text", "onCopy", "options", "children"];
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
	function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
	function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
	class BaseIcon extends r$1.PureComponent {
	    constructor() {
	        super(...arguments);
	        this.state = {
	            address: '',
	            publicKey: '0x'
	        };
	        this.onCopy = () => {
	            const { onCopy } = this.props;
	            const { address } = this.state;
	            if (address && onCopy) {
	                onCopy(address);
	            }
	        };
	    }
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
	}
	BaseIcon.prefix = undefined;
	function Icon(props) {
	    return jsxRuntimeExports.jsx(BaseIcon, { ...props });
	}
	const StyledDiv = styled.div `
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
	const Identicon = r$1.memo(Icon);

	const packageInfo = { name: '@polkadot/react-identicon', path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-react-identicon.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto', type: 'esm', version: '3.5.1' };

	exports.Beachball = Beachball;
	exports.Empty = Empty;
	exports.Ethereum = Ethereum;
	exports.Identicon = Identicon;
	exports.Jdenticon = Jdenticon;
	exports.Polkadot = Polkadot;
	exports.packageInfo = packageInfo;

}));
