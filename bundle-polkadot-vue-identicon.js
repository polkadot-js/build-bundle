(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('@polkadot/util'), require('@polkadot/util-crypto')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', '@polkadot/util', '@polkadot/util-crypto'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotVueIdenticon = {}, global.Vue, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, Vue, util, utilCrypto) { 'use strict';

  const global = window;

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  const Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

  const others = [];

  const packageInfo$1 = {
    name: '@polkadot/ui-shared',
    path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto',
    type: 'esm',
    version: '2.7.2'
  };

  util.detectPackage(packageInfo$1, null, others);

  const COLORS = [
  '#ffe119', '#4363d8', '#f58231', '#fabebe', '#e6beff', '#800000', '#000075', '#a9a9a9', '#ffffff', '#000000'];
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
    const radius = (SHAPE_COUNT - count) / SHAPE_COUNT * (diameter / 2) + diameter / 8 * seeder();
    const offset = diameter / 4 * (seeder() + (count + 1) / SHAPE_COUNT);
    const cx = offset * Math.sin(angle) + center;
    const cy = offset * Math.cos(angle) + center;
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

  var colorString$1 = {exports: {}};

  var colorName$1 = {
  	"aliceblue": [240, 248, 255],
  	"antiquewhite": [250, 235, 215],
  	"aqua": [0, 255, 255],
  	"aquamarine": [127, 255, 212],
  	"azure": [240, 255, 255],
  	"beige": [245, 245, 220],
  	"bisque": [255, 228, 196],
  	"black": [0, 0, 0],
  	"blanchedalmond": [255, 235, 205],
  	"blue": [0, 0, 255],
  	"blueviolet": [138, 43, 226],
  	"brown": [165, 42, 42],
  	"burlywood": [222, 184, 135],
  	"cadetblue": [95, 158, 160],
  	"chartreuse": [127, 255, 0],
  	"chocolate": [210, 105, 30],
  	"coral": [255, 127, 80],
  	"cornflowerblue": [100, 149, 237],
  	"cornsilk": [255, 248, 220],
  	"crimson": [220, 20, 60],
  	"cyan": [0, 255, 255],
  	"darkblue": [0, 0, 139],
  	"darkcyan": [0, 139, 139],
  	"darkgoldenrod": [184, 134, 11],
  	"darkgray": [169, 169, 169],
  	"darkgreen": [0, 100, 0],
  	"darkgrey": [169, 169, 169],
  	"darkkhaki": [189, 183, 107],
  	"darkmagenta": [139, 0, 139],
  	"darkolivegreen": [85, 107, 47],
  	"darkorange": [255, 140, 0],
  	"darkorchid": [153, 50, 204],
  	"darkred": [139, 0, 0],
  	"darksalmon": [233, 150, 122],
  	"darkseagreen": [143, 188, 143],
  	"darkslateblue": [72, 61, 139],
  	"darkslategray": [47, 79, 79],
  	"darkslategrey": [47, 79, 79],
  	"darkturquoise": [0, 206, 209],
  	"darkviolet": [148, 0, 211],
  	"deeppink": [255, 20, 147],
  	"deepskyblue": [0, 191, 255],
  	"dimgray": [105, 105, 105],
  	"dimgrey": [105, 105, 105],
  	"dodgerblue": [30, 144, 255],
  	"firebrick": [178, 34, 34],
  	"floralwhite": [255, 250, 240],
  	"forestgreen": [34, 139, 34],
  	"fuchsia": [255, 0, 255],
  	"gainsboro": [220, 220, 220],
  	"ghostwhite": [248, 248, 255],
  	"gold": [255, 215, 0],
  	"goldenrod": [218, 165, 32],
  	"gray": [128, 128, 128],
  	"green": [0, 128, 0],
  	"greenyellow": [173, 255, 47],
  	"grey": [128, 128, 128],
  	"honeydew": [240, 255, 240],
  	"hotpink": [255, 105, 180],
  	"indianred": [205, 92, 92],
  	"indigo": [75, 0, 130],
  	"ivory": [255, 255, 240],
  	"khaki": [240, 230, 140],
  	"lavender": [230, 230, 250],
  	"lavenderblush": [255, 240, 245],
  	"lawngreen": [124, 252, 0],
  	"lemonchiffon": [255, 250, 205],
  	"lightblue": [173, 216, 230],
  	"lightcoral": [240, 128, 128],
  	"lightcyan": [224, 255, 255],
  	"lightgoldenrodyellow": [250, 250, 210],
  	"lightgray": [211, 211, 211],
  	"lightgreen": [144, 238, 144],
  	"lightgrey": [211, 211, 211],
  	"lightpink": [255, 182, 193],
  	"lightsalmon": [255, 160, 122],
  	"lightseagreen": [32, 178, 170],
  	"lightskyblue": [135, 206, 250],
  	"lightslategray": [119, 136, 153],
  	"lightslategrey": [119, 136, 153],
  	"lightsteelblue": [176, 196, 222],
  	"lightyellow": [255, 255, 224],
  	"lime": [0, 255, 0],
  	"limegreen": [50, 205, 50],
  	"linen": [250, 240, 230],
  	"magenta": [255, 0, 255],
  	"maroon": [128, 0, 0],
  	"mediumaquamarine": [102, 205, 170],
  	"mediumblue": [0, 0, 205],
  	"mediumorchid": [186, 85, 211],
  	"mediumpurple": [147, 112, 219],
  	"mediumseagreen": [60, 179, 113],
  	"mediumslateblue": [123, 104, 238],
  	"mediumspringgreen": [0, 250, 154],
  	"mediumturquoise": [72, 209, 204],
  	"mediumvioletred": [199, 21, 133],
  	"midnightblue": [25, 25, 112],
  	"mintcream": [245, 255, 250],
  	"mistyrose": [255, 228, 225],
  	"moccasin": [255, 228, 181],
  	"navajowhite": [255, 222, 173],
  	"navy": [0, 0, 128],
  	"oldlace": [253, 245, 230],
  	"olive": [128, 128, 0],
  	"olivedrab": [107, 142, 35],
  	"orange": [255, 165, 0],
  	"orangered": [255, 69, 0],
  	"orchid": [218, 112, 214],
  	"palegoldenrod": [238, 232, 170],
  	"palegreen": [152, 251, 152],
  	"paleturquoise": [175, 238, 238],
  	"palevioletred": [219, 112, 147],
  	"papayawhip": [255, 239, 213],
  	"peachpuff": [255, 218, 185],
  	"peru": [205, 133, 63],
  	"pink": [255, 192, 203],
  	"plum": [221, 160, 221],
  	"powderblue": [176, 224, 230],
  	"purple": [128, 0, 128],
  	"rebeccapurple": [102, 51, 153],
  	"red": [255, 0, 0],
  	"rosybrown": [188, 143, 143],
  	"royalblue": [65, 105, 225],
  	"saddlebrown": [139, 69, 19],
  	"salmon": [250, 128, 114],
  	"sandybrown": [244, 164, 96],
  	"seagreen": [46, 139, 87],
  	"seashell": [255, 245, 238],
  	"sienna": [160, 82, 45],
  	"silver": [192, 192, 192],
  	"skyblue": [135, 206, 235],
  	"slateblue": [106, 90, 205],
  	"slategray": [112, 128, 144],
  	"slategrey": [112, 128, 144],
  	"snow": [255, 250, 250],
  	"springgreen": [0, 255, 127],
  	"steelblue": [70, 130, 180],
  	"tan": [210, 180, 140],
  	"teal": [0, 128, 128],
  	"thistle": [216, 191, 216],
  	"tomato": [255, 99, 71],
  	"turquoise": [64, 224, 208],
  	"violet": [238, 130, 238],
  	"wheat": [245, 222, 179],
  	"white": [255, 255, 255],
  	"whitesmoke": [245, 245, 245],
  	"yellow": [255, 255, 0],
  	"yellowgreen": [154, 205, 50]
  };

  var simpleSwizzle = {exports: {}};

  var isArrayish$1 = function isArrayish(obj) {
  	if (!obj || typeof obj === 'string') {
  		return false;
  	}
  	return obj instanceof Array || Array.isArray(obj) ||
  		(obj.length >= 0 && (obj.splice instanceof Function ||
  			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
  };

  var isArrayish = isArrayish$1;
  var concat = Array.prototype.concat;
  var slice = Array.prototype.slice;
  var swizzle$1 = simpleSwizzle.exports = function swizzle(args) {
  	var results = [];
  	for (var i = 0, len = args.length; i < len; i++) {
  		var arg = args[i];
  		if (isArrayish(arg)) {
  			results = concat.call(results, slice.call(arg));
  		} else {
  			results.push(arg);
  		}
  	}
  	return results;
  };
  swizzle$1.wrap = function (fn) {
  	return function () {
  		return fn(swizzle$1(arguments));
  	};
  };

  var colorNames = colorName$1;
  var swizzle = simpleSwizzle.exports;
  var reverseNames = {};
  for (var name in colorNames) {
  	if (colorNames.hasOwnProperty(name)) {
  		reverseNames[colorNames[name]] = name;
  	}
  }
  var cs = colorString$1.exports = {
  	to: {},
  	get: {}
  };
  cs.get = function (string) {
  	var prefix = string.substring(0, 3).toLowerCase();
  	var val;
  	var model;
  	switch (prefix) {
  		case 'hsl':
  			val = cs.get.hsl(string);
  			model = 'hsl';
  			break;
  		case 'hwb':
  			val = cs.get.hwb(string);
  			model = 'hwb';
  			break;
  		default:
  			val = cs.get.rgb(string);
  			model = 'rgb';
  			break;
  	}
  	if (!val) {
  		return null;
  	}
  	return {model: model, value: val};
  };
  cs.get.rgb = function (string) {
  	if (!string) {
  		return null;
  	}
  	var abbr = /^#([a-f0-9]{3,4})$/i;
  	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  	var keyword = /(\D+)/;
  	var rgb = [0, 0, 0, 1];
  	var match;
  	var i;
  	var hexAlpha;
  	if (match = string.match(hex)) {
  		hexAlpha = match[2];
  		match = match[1];
  		for (i = 0; i < 3; i++) {
  			var i2 = i * 2;
  			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
  		}
  		if (hexAlpha) {
  			rgb[3] = parseInt(hexAlpha, 16) / 255;
  		}
  	} else if (match = string.match(abbr)) {
  		match = match[1];
  		hexAlpha = match[3];
  		for (i = 0; i < 3; i++) {
  			rgb[i] = parseInt(match[i] + match[i], 16);
  		}
  		if (hexAlpha) {
  			rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
  		}
  	} else if (match = string.match(rgba)) {
  		for (i = 0; i < 3; i++) {
  			rgb[i] = parseInt(match[i + 1], 0);
  		}
  		if (match[4]) {
  			rgb[3] = parseFloat(match[4]);
  		}
  	} else if (match = string.match(per)) {
  		for (i = 0; i < 3; i++) {
  			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
  		}
  		if (match[4]) {
  			rgb[3] = parseFloat(match[4]);
  		}
  	} else if (match = string.match(keyword)) {
  		if (match[1] === 'transparent') {
  			return [0, 0, 0, 0];
  		}
  		rgb = colorNames[match[1]];
  		if (!rgb) {
  			return null;
  		}
  		rgb[3] = 1;
  		return rgb;
  	} else {
  		return null;
  	}
  	for (i = 0; i < 3; i++) {
  		rgb[i] = clamp(rgb[i], 0, 255);
  	}
  	rgb[3] = clamp(rgb[3], 0, 1);
  	return rgb;
  };
  cs.get.hsl = function (string) {
  	if (!string) {
  		return null;
  	}
  	var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?[\d\.]+)\s*)?\)$/;
  	var match = string.match(hsl);
  	if (match) {
  		var alpha = parseFloat(match[4]);
  		var h = (parseFloat(match[1]) + 360) % 360;
  		var s = clamp(parseFloat(match[2]), 0, 100);
  		var l = clamp(parseFloat(match[3]), 0, 100);
  		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
  		return [h, s, l, a];
  	}
  	return null;
  };
  cs.get.hwb = function (string) {
  	if (!string) {
  		return null;
  	}
  	var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
  	var match = string.match(hwb);
  	if (match) {
  		var alpha = parseFloat(match[4]);
  		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
  		var w = clamp(parseFloat(match[2]), 0, 100);
  		var b = clamp(parseFloat(match[3]), 0, 100);
  		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
  		return [h, w, b, a];
  	}
  	return null;
  };
  cs.to.hex = function () {
  	var rgba = swizzle(arguments);
  	return (
  		'#' +
  		hexDouble(rgba[0]) +
  		hexDouble(rgba[1]) +
  		hexDouble(rgba[2]) +
  		(rgba[3] < 1
  			? (hexDouble(Math.round(rgba[3] * 255)))
  			: '')
  	);
  };
  cs.to.rgb = function () {
  	var rgba = swizzle(arguments);
  	return rgba.length < 4 || rgba[3] === 1
  		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
  		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
  };
  cs.to.rgb.percent = function () {
  	var rgba = swizzle(arguments);
  	var r = Math.round(rgba[0] / 255 * 100);
  	var g = Math.round(rgba[1] / 255 * 100);
  	var b = Math.round(rgba[2] / 255 * 100);
  	return rgba.length < 4 || rgba[3] === 1
  		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
  		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
  };
  cs.to.hsl = function () {
  	var hsla = swizzle(arguments);
  	return hsla.length < 4 || hsla[3] === 1
  		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
  		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
  };
  cs.to.hwb = function () {
  	var hwba = swizzle(arguments);
  	var a = '';
  	if (hwba.length >= 4 && hwba[3] !== 1) {
  		a = ', ' + hwba[3];
  	}
  	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
  };
  cs.to.keyword = function (rgb) {
  	return reverseNames[rgb.slice(0, 3)];
  };
  function clamp(num, min, max) {
  	return Math.min(Math.max(min, num), max);
  }
  function hexDouble(num) {
  	var str = num.toString(16).toUpperCase();
  	return (str.length < 2) ? '0' + str : str;
  }

  var conversions$2 = {exports: {}};

  var colorName = {
  	"aliceblue": [240, 248, 255],
  	"antiquewhite": [250, 235, 215],
  	"aqua": [0, 255, 255],
  	"aquamarine": [127, 255, 212],
  	"azure": [240, 255, 255],
  	"beige": [245, 245, 220],
  	"bisque": [255, 228, 196],
  	"black": [0, 0, 0],
  	"blanchedalmond": [255, 235, 205],
  	"blue": [0, 0, 255],
  	"blueviolet": [138, 43, 226],
  	"brown": [165, 42, 42],
  	"burlywood": [222, 184, 135],
  	"cadetblue": [95, 158, 160],
  	"chartreuse": [127, 255, 0],
  	"chocolate": [210, 105, 30],
  	"coral": [255, 127, 80],
  	"cornflowerblue": [100, 149, 237],
  	"cornsilk": [255, 248, 220],
  	"crimson": [220, 20, 60],
  	"cyan": [0, 255, 255],
  	"darkblue": [0, 0, 139],
  	"darkcyan": [0, 139, 139],
  	"darkgoldenrod": [184, 134, 11],
  	"darkgray": [169, 169, 169],
  	"darkgreen": [0, 100, 0],
  	"darkgrey": [169, 169, 169],
  	"darkkhaki": [189, 183, 107],
  	"darkmagenta": [139, 0, 139],
  	"darkolivegreen": [85, 107, 47],
  	"darkorange": [255, 140, 0],
  	"darkorchid": [153, 50, 204],
  	"darkred": [139, 0, 0],
  	"darksalmon": [233, 150, 122],
  	"darkseagreen": [143, 188, 143],
  	"darkslateblue": [72, 61, 139],
  	"darkslategray": [47, 79, 79],
  	"darkslategrey": [47, 79, 79],
  	"darkturquoise": [0, 206, 209],
  	"darkviolet": [148, 0, 211],
  	"deeppink": [255, 20, 147],
  	"deepskyblue": [0, 191, 255],
  	"dimgray": [105, 105, 105],
  	"dimgrey": [105, 105, 105],
  	"dodgerblue": [30, 144, 255],
  	"firebrick": [178, 34, 34],
  	"floralwhite": [255, 250, 240],
  	"forestgreen": [34, 139, 34],
  	"fuchsia": [255, 0, 255],
  	"gainsboro": [220, 220, 220],
  	"ghostwhite": [248, 248, 255],
  	"gold": [255, 215, 0],
  	"goldenrod": [218, 165, 32],
  	"gray": [128, 128, 128],
  	"green": [0, 128, 0],
  	"greenyellow": [173, 255, 47],
  	"grey": [128, 128, 128],
  	"honeydew": [240, 255, 240],
  	"hotpink": [255, 105, 180],
  	"indianred": [205, 92, 92],
  	"indigo": [75, 0, 130],
  	"ivory": [255, 255, 240],
  	"khaki": [240, 230, 140],
  	"lavender": [230, 230, 250],
  	"lavenderblush": [255, 240, 245],
  	"lawngreen": [124, 252, 0],
  	"lemonchiffon": [255, 250, 205],
  	"lightblue": [173, 216, 230],
  	"lightcoral": [240, 128, 128],
  	"lightcyan": [224, 255, 255],
  	"lightgoldenrodyellow": [250, 250, 210],
  	"lightgray": [211, 211, 211],
  	"lightgreen": [144, 238, 144],
  	"lightgrey": [211, 211, 211],
  	"lightpink": [255, 182, 193],
  	"lightsalmon": [255, 160, 122],
  	"lightseagreen": [32, 178, 170],
  	"lightskyblue": [135, 206, 250],
  	"lightslategray": [119, 136, 153],
  	"lightslategrey": [119, 136, 153],
  	"lightsteelblue": [176, 196, 222],
  	"lightyellow": [255, 255, 224],
  	"lime": [0, 255, 0],
  	"limegreen": [50, 205, 50],
  	"linen": [250, 240, 230],
  	"magenta": [255, 0, 255],
  	"maroon": [128, 0, 0],
  	"mediumaquamarine": [102, 205, 170],
  	"mediumblue": [0, 0, 205],
  	"mediumorchid": [186, 85, 211],
  	"mediumpurple": [147, 112, 219],
  	"mediumseagreen": [60, 179, 113],
  	"mediumslateblue": [123, 104, 238],
  	"mediumspringgreen": [0, 250, 154],
  	"mediumturquoise": [72, 209, 204],
  	"mediumvioletred": [199, 21, 133],
  	"midnightblue": [25, 25, 112],
  	"mintcream": [245, 255, 250],
  	"mistyrose": [255, 228, 225],
  	"moccasin": [255, 228, 181],
  	"navajowhite": [255, 222, 173],
  	"navy": [0, 0, 128],
  	"oldlace": [253, 245, 230],
  	"olive": [128, 128, 0],
  	"olivedrab": [107, 142, 35],
  	"orange": [255, 165, 0],
  	"orangered": [255, 69, 0],
  	"orchid": [218, 112, 214],
  	"palegoldenrod": [238, 232, 170],
  	"palegreen": [152, 251, 152],
  	"paleturquoise": [175, 238, 238],
  	"palevioletred": [219, 112, 147],
  	"papayawhip": [255, 239, 213],
  	"peachpuff": [255, 218, 185],
  	"peru": [205, 133, 63],
  	"pink": [255, 192, 203],
  	"plum": [221, 160, 221],
  	"powderblue": [176, 224, 230],
  	"purple": [128, 0, 128],
  	"rebeccapurple": [102, 51, 153],
  	"red": [255, 0, 0],
  	"rosybrown": [188, 143, 143],
  	"royalblue": [65, 105, 225],
  	"saddlebrown": [139, 69, 19],
  	"salmon": [250, 128, 114],
  	"sandybrown": [244, 164, 96],
  	"seagreen": [46, 139, 87],
  	"seashell": [255, 245, 238],
  	"sienna": [160, 82, 45],
  	"silver": [192, 192, 192],
  	"skyblue": [135, 206, 235],
  	"slateblue": [106, 90, 205],
  	"slategray": [112, 128, 144],
  	"slategrey": [112, 128, 144],
  	"snow": [255, 250, 250],
  	"springgreen": [0, 255, 127],
  	"steelblue": [70, 130, 180],
  	"tan": [210, 180, 140],
  	"teal": [0, 128, 128],
  	"thistle": [216, 191, 216],
  	"tomato": [255, 99, 71],
  	"turquoise": [64, 224, 208],
  	"violet": [238, 130, 238],
  	"wheat": [245, 222, 179],
  	"white": [255, 255, 255],
  	"whitesmoke": [245, 245, 245],
  	"yellow": [255, 255, 0],
  	"yellowgreen": [154, 205, 50]
  };

  var cssKeywords = colorName;
  var reverseKeywords = {};
  for (var key in cssKeywords) {
  	if (cssKeywords.hasOwnProperty(key)) {
  		reverseKeywords[cssKeywords[key]] = key;
  	}
  }
  var convert$2 = conversions$2.exports = {
  	rgb: {channels: 3, labels: 'rgb'},
  	hsl: {channels: 3, labels: 'hsl'},
  	hsv: {channels: 3, labels: 'hsv'},
  	hwb: {channels: 3, labels: 'hwb'},
  	cmyk: {channels: 4, labels: 'cmyk'},
  	xyz: {channels: 3, labels: 'xyz'},
  	lab: {channels: 3, labels: 'lab'},
  	lch: {channels: 3, labels: 'lch'},
  	hex: {channels: 1, labels: ['hex']},
  	keyword: {channels: 1, labels: ['keyword']},
  	ansi16: {channels: 1, labels: ['ansi16']},
  	ansi256: {channels: 1, labels: ['ansi256']},
  	hcg: {channels: 3, labels: ['h', 'c', 'g']},
  	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
  	gray: {channels: 1, labels: ['gray']}
  };
  for (var model in convert$2) {
  	if (convert$2.hasOwnProperty(model)) {
  		if (!('channels' in convert$2[model])) {
  			throw new Error('missing channels property: ' + model);
  		}
  		if (!('labels' in convert$2[model])) {
  			throw new Error('missing channel labels property: ' + model);
  		}
  		if (convert$2[model].labels.length !== convert$2[model].channels) {
  			throw new Error('channel and label counts mismatch: ' + model);
  		}
  		var channels = convert$2[model].channels;
  		var labels = convert$2[model].labels;
  		delete convert$2[model].channels;
  		delete convert$2[model].labels;
  		Object.defineProperty(convert$2[model], 'channels', {value: channels});
  		Object.defineProperty(convert$2[model], 'labels', {value: labels});
  	}
  }
  convert$2.rgb.hsl = function (rgb) {
  	var r = rgb[0] / 255;
  	var g = rgb[1] / 255;
  	var b = rgb[2] / 255;
  	var min = Math.min(r, g, b);
  	var max = Math.max(r, g, b);
  	var delta = max - min;
  	var h;
  	var s;
  	var l;
  	if (max === min) {
  		h = 0;
  	} else if (r === max) {
  		h = (g - b) / delta;
  	} else if (g === max) {
  		h = 2 + (b - r) / delta;
  	} else if (b === max) {
  		h = 4 + (r - g) / delta;
  	}
  	h = Math.min(h * 60, 360);
  	if (h < 0) {
  		h += 360;
  	}
  	l = (min + max) / 2;
  	if (max === min) {
  		s = 0;
  	} else if (l <= 0.5) {
  		s = delta / (max + min);
  	} else {
  		s = delta / (2 - max - min);
  	}
  	return [h, s * 100, l * 100];
  };
  convert$2.rgb.hsv = function (rgb) {
  	var rdif;
  	var gdif;
  	var bdif;
  	var h;
  	var s;
  	var r = rgb[0] / 255;
  	var g = rgb[1] / 255;
  	var b = rgb[2] / 255;
  	var v = Math.max(r, g, b);
  	var diff = v - Math.min(r, g, b);
  	var diffc = function (c) {
  		return (v - c) / 6 / diff + 1 / 2;
  	};
  	if (diff === 0) {
  		h = s = 0;
  	} else {
  		s = diff / v;
  		rdif = diffc(r);
  		gdif = diffc(g);
  		bdif = diffc(b);
  		if (r === v) {
  			h = bdif - gdif;
  		} else if (g === v) {
  			h = (1 / 3) + rdif - bdif;
  		} else if (b === v) {
  			h = (2 / 3) + gdif - rdif;
  		}
  		if (h < 0) {
  			h += 1;
  		} else if (h > 1) {
  			h -= 1;
  		}
  	}
  	return [
  		h * 360,
  		s * 100,
  		v * 100
  	];
  };
  convert$2.rgb.hwb = function (rgb) {
  	var r = rgb[0];
  	var g = rgb[1];
  	var b = rgb[2];
  	var h = convert$2.rgb.hsl(rgb)[0];
  	var w = 1 / 255 * Math.min(r, Math.min(g, b));
  	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  	return [h, w * 100, b * 100];
  };
  convert$2.rgb.cmyk = function (rgb) {
  	var r = rgb[0] / 255;
  	var g = rgb[1] / 255;
  	var b = rgb[2] / 255;
  	var c;
  	var m;
  	var y;
  	var k;
  	k = Math.min(1 - r, 1 - g, 1 - b);
  	c = (1 - r - k) / (1 - k) || 0;
  	m = (1 - g - k) / (1 - k) || 0;
  	y = (1 - b - k) / (1 - k) || 0;
  	return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
  	return (
  		Math.pow(x[0] - y[0], 2) +
  		Math.pow(x[1] - y[1], 2) +
  		Math.pow(x[2] - y[2], 2)
  	);
  }
  convert$2.rgb.keyword = function (rgb) {
  	var reversed = reverseKeywords[rgb];
  	if (reversed) {
  		return reversed;
  	}
  	var currentClosestDistance = Infinity;
  	var currentClosestKeyword;
  	for (var keyword in cssKeywords) {
  		if (cssKeywords.hasOwnProperty(keyword)) {
  			var value = cssKeywords[keyword];
  			var distance = comparativeDistance(rgb, value);
  			if (distance < currentClosestDistance) {
  				currentClosestDistance = distance;
  				currentClosestKeyword = keyword;
  			}
  		}
  	}
  	return currentClosestKeyword;
  };
  convert$2.keyword.rgb = function (keyword) {
  	return cssKeywords[keyword];
  };
  convert$2.rgb.xyz = function (rgb) {
  	var r = rgb[0] / 255;
  	var g = rgb[1] / 255;
  	var b = rgb[2] / 255;
  	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
  	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
  	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
  	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
  	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
  	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
  	return [x * 100, y * 100, z * 100];
  };
  convert$2.rgb.lab = function (rgb) {
  	var xyz = convert$2.rgb.xyz(rgb);
  	var x = xyz[0];
  	var y = xyz[1];
  	var z = xyz[2];
  	var l;
  	var a;
  	var b;
  	x /= 95.047;
  	y /= 100;
  	z /= 108.883;
  	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
  	l = (116 * y) - 16;
  	a = 500 * (x - y);
  	b = 200 * (y - z);
  	return [l, a, b];
  };
  convert$2.hsl.rgb = function (hsl) {
  	var h = hsl[0] / 360;
  	var s = hsl[1] / 100;
  	var l = hsl[2] / 100;
  	var t1;
  	var t2;
  	var t3;
  	var rgb;
  	var val;
  	if (s === 0) {
  		val = l * 255;
  		return [val, val, val];
  	}
  	if (l < 0.5) {
  		t2 = l * (1 + s);
  	} else {
  		t2 = l + s - l * s;
  	}
  	t1 = 2 * l - t2;
  	rgb = [0, 0, 0];
  	for (var i = 0; i < 3; i++) {
  		t3 = h + 1 / 3 * -(i - 1);
  		if (t3 < 0) {
  			t3++;
  		}
  		if (t3 > 1) {
  			t3--;
  		}
  		if (6 * t3 < 1) {
  			val = t1 + (t2 - t1) * 6 * t3;
  		} else if (2 * t3 < 1) {
  			val = t2;
  		} else if (3 * t3 < 2) {
  			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
  		} else {
  			val = t1;
  		}
  		rgb[i] = val * 255;
  	}
  	return rgb;
  };
  convert$2.hsl.hsv = function (hsl) {
  	var h = hsl[0];
  	var s = hsl[1] / 100;
  	var l = hsl[2] / 100;
  	var smin = s;
  	var lmin = Math.max(l, 0.01);
  	var sv;
  	var v;
  	l *= 2;
  	s *= (l <= 1) ? l : 2 - l;
  	smin *= lmin <= 1 ? lmin : 2 - lmin;
  	v = (l + s) / 2;
  	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
  	return [h, sv * 100, v * 100];
  };
  convert$2.hsv.rgb = function (hsv) {
  	var h = hsv[0] / 60;
  	var s = hsv[1] / 100;
  	var v = hsv[2] / 100;
  	var hi = Math.floor(h) % 6;
  	var f = h - Math.floor(h);
  	var p = 255 * v * (1 - s);
  	var q = 255 * v * (1 - (s * f));
  	var t = 255 * v * (1 - (s * (1 - f)));
  	v *= 255;
  	switch (hi) {
  		case 0:
  			return [v, t, p];
  		case 1:
  			return [q, v, p];
  		case 2:
  			return [p, v, t];
  		case 3:
  			return [p, q, v];
  		case 4:
  			return [t, p, v];
  		case 5:
  			return [v, p, q];
  	}
  };
  convert$2.hsv.hsl = function (hsv) {
  	var h = hsv[0];
  	var s = hsv[1] / 100;
  	var v = hsv[2] / 100;
  	var vmin = Math.max(v, 0.01);
  	var lmin;
  	var sl;
  	var l;
  	l = (2 - s) * v;
  	lmin = (2 - s) * vmin;
  	sl = s * vmin;
  	sl /= (lmin <= 1) ? lmin : 2 - lmin;
  	sl = sl || 0;
  	l /= 2;
  	return [h, sl * 100, l * 100];
  };
  convert$2.hwb.rgb = function (hwb) {
  	var h = hwb[0] / 360;
  	var wh = hwb[1] / 100;
  	var bl = hwb[2] / 100;
  	var ratio = wh + bl;
  	var i;
  	var v;
  	var f;
  	var n;
  	if (ratio > 1) {
  		wh /= ratio;
  		bl /= ratio;
  	}
  	i = Math.floor(6 * h);
  	v = 1 - bl;
  	f = 6 * h - i;
  	if ((i & 0x01) !== 0) {
  		f = 1 - f;
  	}
  	n = wh + f * (v - wh);
  	var r;
  	var g;
  	var b;
  	switch (i) {
  		default:
  		case 6:
  		case 0: r = v; g = n; b = wh; break;
  		case 1: r = n; g = v; b = wh; break;
  		case 2: r = wh; g = v; b = n; break;
  		case 3: r = wh; g = n; b = v; break;
  		case 4: r = n; g = wh; b = v; break;
  		case 5: r = v; g = wh; b = n; break;
  	}
  	return [r * 255, g * 255, b * 255];
  };
  convert$2.cmyk.rgb = function (cmyk) {
  	var c = cmyk[0] / 100;
  	var m = cmyk[1] / 100;
  	var y = cmyk[2] / 100;
  	var k = cmyk[3] / 100;
  	var r;
  	var g;
  	var b;
  	r = 1 - Math.min(1, c * (1 - k) + k);
  	g = 1 - Math.min(1, m * (1 - k) + k);
  	b = 1 - Math.min(1, y * (1 - k) + k);
  	return [r * 255, g * 255, b * 255];
  };
  convert$2.xyz.rgb = function (xyz) {
  	var x = xyz[0] / 100;
  	var y = xyz[1] / 100;
  	var z = xyz[2] / 100;
  	var r;
  	var g;
  	var b;
  	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
  	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
  	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
  	r = r > 0.0031308
  		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
  		: r * 12.92;
  	g = g > 0.0031308
  		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
  		: g * 12.92;
  	b = b > 0.0031308
  		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
  		: b * 12.92;
  	r = Math.min(Math.max(0, r), 1);
  	g = Math.min(Math.max(0, g), 1);
  	b = Math.min(Math.max(0, b), 1);
  	return [r * 255, g * 255, b * 255];
  };
  convert$2.xyz.lab = function (xyz) {
  	var x = xyz[0];
  	var y = xyz[1];
  	var z = xyz[2];
  	var l;
  	var a;
  	var b;
  	x /= 95.047;
  	y /= 100;
  	z /= 108.883;
  	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
  	l = (116 * y) - 16;
  	a = 500 * (x - y);
  	b = 200 * (y - z);
  	return [l, a, b];
  };
  convert$2.lab.xyz = function (lab) {
  	var l = lab[0];
  	var a = lab[1];
  	var b = lab[2];
  	var x;
  	var y;
  	var z;
  	y = (l + 16) / 116;
  	x = a / 500 + y;
  	z = y - b / 200;
  	var y2 = Math.pow(y, 3);
  	var x2 = Math.pow(x, 3);
  	var z2 = Math.pow(z, 3);
  	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
  	x *= 95.047;
  	y *= 100;
  	z *= 108.883;
  	return [x, y, z];
  };
  convert$2.lab.lch = function (lab) {
  	var l = lab[0];
  	var a = lab[1];
  	var b = lab[2];
  	var hr;
  	var h;
  	var c;
  	hr = Math.atan2(b, a);
  	h = hr * 360 / 2 / Math.PI;
  	if (h < 0) {
  		h += 360;
  	}
  	c = Math.sqrt(a * a + b * b);
  	return [l, c, h];
  };
  convert$2.lch.lab = function (lch) {
  	var l = lch[0];
  	var c = lch[1];
  	var h = lch[2];
  	var a;
  	var b;
  	var hr;
  	hr = h / 360 * 2 * Math.PI;
  	a = c * Math.cos(hr);
  	b = c * Math.sin(hr);
  	return [l, a, b];
  };
  convert$2.rgb.ansi16 = function (args) {
  	var r = args[0];
  	var g = args[1];
  	var b = args[2];
  	var value = 1 in arguments ? arguments[1] : convert$2.rgb.hsv(args)[2];
  	value = Math.round(value / 50);
  	if (value === 0) {
  		return 30;
  	}
  	var ansi = 30
  		+ ((Math.round(b / 255) << 2)
  		| (Math.round(g / 255) << 1)
  		| Math.round(r / 255));
  	if (value === 2) {
  		ansi += 60;
  	}
  	return ansi;
  };
  convert$2.hsv.ansi16 = function (args) {
  	return convert$2.rgb.ansi16(convert$2.hsv.rgb(args), args[2]);
  };
  convert$2.rgb.ansi256 = function (args) {
  	var r = args[0];
  	var g = args[1];
  	var b = args[2];
  	if (r === g && g === b) {
  		if (r < 8) {
  			return 16;
  		}
  		if (r > 248) {
  			return 231;
  		}
  		return Math.round(((r - 8) / 247) * 24) + 232;
  	}
  	var ansi = 16
  		+ (36 * Math.round(r / 255 * 5))
  		+ (6 * Math.round(g / 255 * 5))
  		+ Math.round(b / 255 * 5);
  	return ansi;
  };
  convert$2.ansi16.rgb = function (args) {
  	var color = args % 10;
  	if (color === 0 || color === 7) {
  		if (args > 50) {
  			color += 3.5;
  		}
  		color = color / 10.5 * 255;
  		return [color, color, color];
  	}
  	var mult = (~~(args > 50) + 1) * 0.5;
  	var r = ((color & 1) * mult) * 255;
  	var g = (((color >> 1) & 1) * mult) * 255;
  	var b = (((color >> 2) & 1) * mult) * 255;
  	return [r, g, b];
  };
  convert$2.ansi256.rgb = function (args) {
  	if (args >= 232) {
  		var c = (args - 232) * 10 + 8;
  		return [c, c, c];
  	}
  	args -= 16;
  	var rem;
  	var r = Math.floor(args / 36) / 5 * 255;
  	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  	var b = (rem % 6) / 5 * 255;
  	return [r, g, b];
  };
  convert$2.rgb.hex = function (args) {
  	var integer = ((Math.round(args[0]) & 0xFF) << 16)
  		+ ((Math.round(args[1]) & 0xFF) << 8)
  		+ (Math.round(args[2]) & 0xFF);
  	var string = integer.toString(16).toUpperCase();
  	return '000000'.substring(string.length) + string;
  };
  convert$2.hex.rgb = function (args) {
  	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  	if (!match) {
  		return [0, 0, 0];
  	}
  	var colorString = match[0];
  	if (match[0].length === 3) {
  		colorString = colorString.split('').map(function (char) {
  			return char + char;
  		}).join('');
  	}
  	var integer = parseInt(colorString, 16);
  	var r = (integer >> 16) & 0xFF;
  	var g = (integer >> 8) & 0xFF;
  	var b = integer & 0xFF;
  	return [r, g, b];
  };
  convert$2.rgb.hcg = function (rgb) {
  	var r = rgb[0] / 255;
  	var g = rgb[1] / 255;
  	var b = rgb[2] / 255;
  	var max = Math.max(Math.max(r, g), b);
  	var min = Math.min(Math.min(r, g), b);
  	var chroma = (max - min);
  	var grayscale;
  	var hue;
  	if (chroma < 1) {
  		grayscale = min / (1 - chroma);
  	} else {
  		grayscale = 0;
  	}
  	if (chroma <= 0) {
  		hue = 0;
  	} else
  	if (max === r) {
  		hue = ((g - b) / chroma) % 6;
  	} else
  	if (max === g) {
  		hue = 2 + (b - r) / chroma;
  	} else {
  		hue = 4 + (r - g) / chroma + 4;
  	}
  	hue /= 6;
  	hue %= 1;
  	return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert$2.hsl.hcg = function (hsl) {
  	var s = hsl[1] / 100;
  	var l = hsl[2] / 100;
  	var c = 1;
  	var f = 0;
  	if (l < 0.5) {
  		c = 2.0 * s * l;
  	} else {
  		c = 2.0 * s * (1.0 - l);
  	}
  	if (c < 1.0) {
  		f = (l - 0.5 * c) / (1.0 - c);
  	}
  	return [hsl[0], c * 100, f * 100];
  };
  convert$2.hsv.hcg = function (hsv) {
  	var s = hsv[1] / 100;
  	var v = hsv[2] / 100;
  	var c = s * v;
  	var f = 0;
  	if (c < 1.0) {
  		f = (v - c) / (1 - c);
  	}
  	return [hsv[0], c * 100, f * 100];
  };
  convert$2.hcg.rgb = function (hcg) {
  	var h = hcg[0] / 360;
  	var c = hcg[1] / 100;
  	var g = hcg[2] / 100;
  	if (c === 0.0) {
  		return [g * 255, g * 255, g * 255];
  	}
  	var pure = [0, 0, 0];
  	var hi = (h % 1) * 6;
  	var v = hi % 1;
  	var w = 1 - v;
  	var mg = 0;
  	switch (Math.floor(hi)) {
  		case 0:
  			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
  		case 1:
  			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
  		case 2:
  			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
  		case 3:
  			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
  		case 4:
  			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
  		default:
  			pure[0] = 1; pure[1] = 0; pure[2] = w;
  	}
  	mg = (1.0 - c) * g;
  	return [
  		(c * pure[0] + mg) * 255,
  		(c * pure[1] + mg) * 255,
  		(c * pure[2] + mg) * 255
  	];
  };
  convert$2.hcg.hsv = function (hcg) {
  	var c = hcg[1] / 100;
  	var g = hcg[2] / 100;
  	var v = c + g * (1.0 - c);
  	var f = 0;
  	if (v > 0.0) {
  		f = c / v;
  	}
  	return [hcg[0], f * 100, v * 100];
  };
  convert$2.hcg.hsl = function (hcg) {
  	var c = hcg[1] / 100;
  	var g = hcg[2] / 100;
  	var l = g * (1.0 - c) + 0.5 * c;
  	var s = 0;
  	if (l > 0.0 && l < 0.5) {
  		s = c / (2 * l);
  	} else
  	if (l >= 0.5 && l < 1.0) {
  		s = c / (2 * (1 - l));
  	}
  	return [hcg[0], s * 100, l * 100];
  };
  convert$2.hcg.hwb = function (hcg) {
  	var c = hcg[1] / 100;
  	var g = hcg[2] / 100;
  	var v = c + g * (1.0 - c);
  	return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert$2.hwb.hcg = function (hwb) {
  	var w = hwb[1] / 100;
  	var b = hwb[2] / 100;
  	var v = 1 - b;
  	var c = v - w;
  	var g = 0;
  	if (c < 1) {
  		g = (v - c) / (1 - c);
  	}
  	return [hwb[0], c * 100, g * 100];
  };
  convert$2.apple.rgb = function (apple) {
  	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
  };
  convert$2.rgb.apple = function (rgb) {
  	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
  };
  convert$2.gray.rgb = function (args) {
  	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert$2.gray.hsl = convert$2.gray.hsv = function (args) {
  	return [0, 0, args[0]];
  };
  convert$2.gray.hwb = function (gray) {
  	return [0, 100, gray[0]];
  };
  convert$2.gray.cmyk = function (gray) {
  	return [0, 0, 0, gray[0]];
  };
  convert$2.gray.lab = function (gray) {
  	return [gray[0], 0, 0];
  };
  convert$2.gray.hex = function (gray) {
  	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
  	var integer = (val << 16) + (val << 8) + val;
  	var string = integer.toString(16).toUpperCase();
  	return '000000'.substring(string.length) + string;
  };
  convert$2.rgb.gray = function (rgb) {
  	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  	return [val / 255 * 100];
  };

  var conversions$1 = conversions$2.exports;
  function buildGraph() {
  	var graph = {};
  	var models = Object.keys(conversions$1);
  	for (var len = models.length, i = 0; i < len; i++) {
  		graph[models[i]] = {
  			distance: -1,
  			parent: null
  		};
  	}
  	return graph;
  }
  function deriveBFS(fromModel) {
  	var graph = buildGraph();
  	var queue = [fromModel];
  	graph[fromModel].distance = 0;
  	while (queue.length) {
  		var current = queue.pop();
  		var adjacents = Object.keys(conversions$1[current]);
  		for (var len = adjacents.length, i = 0; i < len; i++) {
  			var adjacent = adjacents[i];
  			var node = graph[adjacent];
  			if (node.distance === -1) {
  				node.distance = graph[current].distance + 1;
  				node.parent = current;
  				queue.unshift(adjacent);
  			}
  		}
  	}
  	return graph;
  }
  function link(from, to) {
  	return function (args) {
  		return to(from(args));
  	};
  }
  function wrapConversion(toModel, graph) {
  	var path = [graph[toModel].parent, toModel];
  	var fn = conversions$1[graph[toModel].parent][toModel];
  	var cur = graph[toModel].parent;
  	while (graph[cur].parent) {
  		path.unshift(graph[cur].parent);
  		fn = link(conversions$1[graph[cur].parent][cur], fn);
  		cur = graph[cur].parent;
  	}
  	fn.conversion = path;
  	return fn;
  }
  var route$1 = function (fromModel) {
  	var graph = deriveBFS(fromModel);
  	var conversion = {};
  	var models = Object.keys(graph);
  	for (var len = models.length, i = 0; i < len; i++) {
  		var toModel = models[i];
  		var node = graph[toModel];
  		if (node.parent === null) {
  			continue;
  		}
  		conversion[toModel] = wrapConversion(toModel, graph);
  	}
  	return conversion;
  };

  var conversions = conversions$2.exports;
  var route = route$1;
  var convert$1 = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
  	var wrappedFn = function (args) {
  		if (args === undefined || args === null) {
  			return args;
  		}
  		if (arguments.length > 1) {
  			args = Array.prototype.slice.call(arguments);
  		}
  		return fn(args);
  	};
  	if ('conversion' in fn) {
  		wrappedFn.conversion = fn.conversion;
  	}
  	return wrappedFn;
  }
  function wrapRounded(fn) {
  	var wrappedFn = function (args) {
  		if (args === undefined || args === null) {
  			return args;
  		}
  		if (arguments.length > 1) {
  			args = Array.prototype.slice.call(arguments);
  		}
  		var result = fn(args);
  		if (typeof result === 'object') {
  			for (var len = result.length, i = 0; i < len; i++) {
  				result[i] = Math.round(result[i]);
  			}
  		}
  		return result;
  	};
  	if ('conversion' in fn) {
  		wrappedFn.conversion = fn.conversion;
  	}
  	return wrappedFn;
  }
  models.forEach(function (fromModel) {
  	convert$1[fromModel] = {};
  	Object.defineProperty(convert$1[fromModel], 'channels', {value: conversions[fromModel].channels});
  	Object.defineProperty(convert$1[fromModel], 'labels', {value: conversions[fromModel].labels});
  	var routes = route(fromModel);
  	var routeModels = Object.keys(routes);
  	routeModels.forEach(function (toModel) {
  		var fn = routes[toModel];
  		convert$1[fromModel][toModel] = wrapRounded(fn);
  		convert$1[fromModel][toModel].raw = wrapRaw(fn);
  	});
  });
  var colorConvert = convert$1;

  var colorString = colorString$1.exports;
  var convert = colorConvert;
  var _slice = [].slice;
  var skippedModels = [
  	'keyword',
  	'gray',
  	'hex'
  ];
  var hashedModelKeys = {};
  Object.keys(convert).forEach(function (model) {
  	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
  });
  var limiters = {};
  function Color(obj, model) {
  	if (!(this instanceof Color)) {
  		return new Color(obj, model);
  	}
  	if (model && model in skippedModels) {
  		model = null;
  	}
  	if (model && !(model in convert)) {
  		throw new Error('Unknown model: ' + model);
  	}
  	var i;
  	var channels;
  	if (obj == null) {
  		this.model = 'rgb';
  		this.color = [0, 0, 0];
  		this.valpha = 1;
  	} else if (obj instanceof Color) {
  		this.model = obj.model;
  		this.color = obj.color.slice();
  		this.valpha = obj.valpha;
  	} else if (typeof obj === 'string') {
  		var result = colorString.get(obj);
  		if (result === null) {
  			throw new Error('Unable to parse color from string: ' + obj);
  		}
  		this.model = result.model;
  		channels = convert[this.model].channels;
  		this.color = result.value.slice(0, channels);
  		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
  	} else if (obj.length) {
  		this.model = model || 'rgb';
  		channels = convert[this.model].channels;
  		var newArr = _slice.call(obj, 0, channels);
  		this.color = zeroArray(newArr, channels);
  		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
  	} else if (typeof obj === 'number') {
  		obj &= 0xFFFFFF;
  		this.model = 'rgb';
  		this.color = [
  			(obj >> 16) & 0xFF,
  			(obj >> 8) & 0xFF,
  			obj & 0xFF
  		];
  		this.valpha = 1;
  	} else {
  		this.valpha = 1;
  		var keys = Object.keys(obj);
  		if ('alpha' in obj) {
  			keys.splice(keys.indexOf('alpha'), 1);
  			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
  		}
  		var hashedKeys = keys.sort().join('');
  		if (!(hashedKeys in hashedModelKeys)) {
  			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
  		}
  		this.model = hashedModelKeys[hashedKeys];
  		var labels = convert[this.model].labels;
  		var color = [];
  		for (i = 0; i < labels.length; i++) {
  			color.push(obj[labels[i]]);
  		}
  		this.color = zeroArray(color);
  	}
  	if (limiters[this.model]) {
  		channels = convert[this.model].channels;
  		for (i = 0; i < channels; i++) {
  			var limit = limiters[this.model][i];
  			if (limit) {
  				this.color[i] = limit(this.color[i]);
  			}
  		}
  	}
  	this.valpha = Math.max(0, Math.min(1, this.valpha));
  	if (Object.freeze) {
  		Object.freeze(this);
  	}
  }
  Color.prototype = {
  	toString: function () {
  		return this.string();
  	},
  	toJSON: function () {
  		return this[this.model]();
  	},
  	string: function (places) {
  		var self = this.model in colorString.to ? this : this.rgb();
  		self = self.round(typeof places === 'number' ? places : 1);
  		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
  		return colorString.to[self.model](args);
  	},
  	percentString: function (places) {
  		var self = this.rgb().round(typeof places === 'number' ? places : 1);
  		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
  		return colorString.to.rgb.percent(args);
  	},
  	array: function () {
  		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
  	},
  	object: function () {
  		var result = {};
  		var channels = convert[this.model].channels;
  		var labels = convert[this.model].labels;
  		for (var i = 0; i < channels; i++) {
  			result[labels[i]] = this.color[i];
  		}
  		if (this.valpha !== 1) {
  			result.alpha = this.valpha;
  		}
  		return result;
  	},
  	unitArray: function () {
  		var rgb = this.rgb().color;
  		rgb[0] /= 255;
  		rgb[1] /= 255;
  		rgb[2] /= 255;
  		if (this.valpha !== 1) {
  			rgb.push(this.valpha);
  		}
  		return rgb;
  	},
  	unitObject: function () {
  		var rgb = this.rgb().object();
  		rgb.r /= 255;
  		rgb.g /= 255;
  		rgb.b /= 255;
  		if (this.valpha !== 1) {
  			rgb.alpha = this.valpha;
  		}
  		return rgb;
  	},
  	round: function (places) {
  		places = Math.max(places || 0, 0);
  		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
  	},
  	alpha: function (val) {
  		if (arguments.length) {
  			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
  		}
  		return this.valpha;
  	},
  	red: getset('rgb', 0, maxfn(255)),
  	green: getset('rgb', 1, maxfn(255)),
  	blue: getset('rgb', 2, maxfn(255)),
  	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }),
  	saturationl: getset('hsl', 1, maxfn(100)),
  	lightness: getset('hsl', 2, maxfn(100)),
  	saturationv: getset('hsv', 1, maxfn(100)),
  	value: getset('hsv', 2, maxfn(100)),
  	chroma: getset('hcg', 1, maxfn(100)),
  	gray: getset('hcg', 2, maxfn(100)),
  	white: getset('hwb', 1, maxfn(100)),
  	wblack: getset('hwb', 2, maxfn(100)),
  	cyan: getset('cmyk', 0, maxfn(100)),
  	magenta: getset('cmyk', 1, maxfn(100)),
  	yellow: getset('cmyk', 2, maxfn(100)),
  	black: getset('cmyk', 3, maxfn(100)),
  	x: getset('xyz', 0, maxfn(100)),
  	y: getset('xyz', 1, maxfn(100)),
  	z: getset('xyz', 2, maxfn(100)),
  	l: getset('lab', 0, maxfn(100)),
  	a: getset('lab', 1),
  	b: getset('lab', 2),
  	keyword: function (val) {
  		if (arguments.length) {
  			return new Color(val);
  		}
  		return convert[this.model].keyword(this.color);
  	},
  	hex: function (val) {
  		if (arguments.length) {
  			return new Color(val);
  		}
  		return colorString.to.hex(this.rgb().round().color);
  	},
  	rgbNumber: function () {
  		var rgb = this.rgb().color;
  		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
  	},
  	luminosity: function () {
  		var rgb = this.rgb().color;
  		var lum = [];
  		for (var i = 0; i < rgb.length; i++) {
  			var chan = rgb[i] / 255;
  			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
  		}
  		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  	},
  	contrast: function (color2) {
  		var lum1 = this.luminosity();
  		var lum2 = color2.luminosity();
  		if (lum1 > lum2) {
  			return (lum1 + 0.05) / (lum2 + 0.05);
  		}
  		return (lum2 + 0.05) / (lum1 + 0.05);
  	},
  	level: function (color2) {
  		var contrastRatio = this.contrast(color2);
  		if (contrastRatio >= 7.1) {
  			return 'AAA';
  		}
  		return (contrastRatio >= 4.5) ? 'AA' : '';
  	},
  	isDark: function () {
  		var rgb = this.rgb().color;
  		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  		return yiq < 128;
  	},
  	isLight: function () {
  		return !this.isDark();
  	},
  	negate: function () {
  		var rgb = this.rgb();
  		for (var i = 0; i < 3; i++) {
  			rgb.color[i] = 255 - rgb.color[i];
  		}
  		return rgb;
  	},
  	lighten: function (ratio) {
  		var hsl = this.hsl();
  		hsl.color[2] += hsl.color[2] * ratio;
  		return hsl;
  	},
  	darken: function (ratio) {
  		var hsl = this.hsl();
  		hsl.color[2] -= hsl.color[2] * ratio;
  		return hsl;
  	},
  	saturate: function (ratio) {
  		var hsl = this.hsl();
  		hsl.color[1] += hsl.color[1] * ratio;
  		return hsl;
  	},
  	desaturate: function (ratio) {
  		var hsl = this.hsl();
  		hsl.color[1] -= hsl.color[1] * ratio;
  		return hsl;
  	},
  	whiten: function (ratio) {
  		var hwb = this.hwb();
  		hwb.color[1] += hwb.color[1] * ratio;
  		return hwb;
  	},
  	blacken: function (ratio) {
  		var hwb = this.hwb();
  		hwb.color[2] += hwb.color[2] * ratio;
  		return hwb;
  	},
  	grayscale: function () {
  		var rgb = this.rgb().color;
  		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
  		return Color.rgb(val, val, val);
  	},
  	fade: function (ratio) {
  		return this.alpha(this.valpha - (this.valpha * ratio));
  	},
  	opaquer: function (ratio) {
  		return this.alpha(this.valpha + (this.valpha * ratio));
  	},
  	rotate: function (degrees) {
  		var hsl = this.hsl();
  		var hue = hsl.color[0];
  		hue = (hue + degrees) % 360;
  		hue = hue < 0 ? 360 + hue : hue;
  		hsl.color[0] = hue;
  		return hsl;
  	},
  	mix: function (mixinColor, weight) {
  		if (!mixinColor || !mixinColor.rgb) {
  			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
  		}
  		var color1 = mixinColor.rgb();
  		var color2 = this.rgb();
  		var p = weight === undefined ? 0.5 : weight;
  		var w = 2 * p - 1;
  		var a = color1.alpha() - color2.alpha();
  		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
  		var w2 = 1 - w1;
  		return Color.rgb(
  				w1 * color1.red() + w2 * color2.red(),
  				w1 * color1.green() + w2 * color2.green(),
  				w1 * color1.blue() + w2 * color2.blue(),
  				color1.alpha() * p + color2.alpha() * (1 - p));
  	}
  };
  Object.keys(convert).forEach(function (model) {
  	if (skippedModels.indexOf(model) !== -1) {
  		return;
  	}
  	var channels = convert[model].channels;
  	Color.prototype[model] = function () {
  		if (this.model === model) {
  			return new Color(this);
  		}
  		if (arguments.length) {
  			return new Color(arguments, model);
  		}
  		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
  		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
  	};
  	Color[model] = function (color) {
  		if (typeof color === 'number') {
  			color = zeroArray(_slice.call(arguments), channels);
  		}
  		return new Color(color, model);
  	};
  });
  function roundTo(num, places) {
  	return Number(num.toFixed(places));
  }
  function roundToPlace(places) {
  	return function (num) {
  		return roundTo(num, places);
  	};
  }
  function getset(model, channel, modifier) {
  	model = Array.isArray(model) ? model : [model];
  	model.forEach(function (m) {
  		(limiters[m] || (limiters[m] = []))[channel] = modifier;
  	});
  	model = model[0];
  	return function (val) {
  		var result;
  		if (arguments.length) {
  			if (modifier) {
  				val = modifier(val);
  			}
  			result = this[model]();
  			result.color[channel] = val;
  			return result;
  		}
  		result = this[model]().color[channel];
  		if (modifier) {
  			result = modifier(result);
  		}
  		return result;
  	};
  }
  function maxfn(max) {
  	return function (v) {
  		return Math.max(0, Math.min(max, v));
  	};
  }
  function assertArray(val) {
  	return Array.isArray(val) ? val : [val];
  }
  function zeroArray(arr, length) {
  	for (var i = 0; i < length; i++) {
  		if (typeof arr[i] !== 'number') {
  			arr[i] = 0;
  		}
  	}
  	return arr;
  }
  var color = Color;

  const WOBBLE = 30;
  function colors(seeder) {
    const amount = seeder() * WOBBLE - WOBBLE / 2;
    const all = COLORS.map(hex => color(hex).rotate(amount));
    return (alpha = 1) => {
      const index = Math.floor(all.length * seeder());
      return all.splice(index, 1)[0].alpha(alpha).string();
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
    Object.keys(style).forEach(key => {
      element.style[key] = style[key];
    });
    return element;
  }

  const DIVISOR = 256 * 256;
  function seeder(_seed = new Uint8Array(32)) {
    const seed = util.isU8a(_seed) ? _seed : util.stringToU8a(_seed);
    let index = seed[Math.floor(seed.length / 2)] % seed.length - 1;
    const next = () => {
      index += 1;
      if (index === seed.length) {
        index = 0;
      }
      return seed[index];
    };
    return () => {
      return (next() * 256 + next()) / DIVISOR;
    };
  }

  function beachballIcon(seed, {
    size = 256
  }, className = '', style) {
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

  const blake2 = value => utilCrypto.blake2AsU8a(value, 512);
  const S = 64;
  const C = S / 2;
  const Z = S / 64 * 5;
  const SCHEMA = {
    target: {
      colors: [0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 1],
      freq: 1
    },
    cube: {
      colors: [0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 5],
      freq: 20
    },
    quazar: {
      colors: [1, 2, 3, 1, 2, 4, 5, 5, 4, 1, 2, 3, 1, 2, 4, 5, 5, 4, 0],
      freq: 16
    },
    flower: {
      colors: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3],
      freq: 32
    },
    cyclic: {
      colors: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6],
      freq: 32
    },
    vmirror: {
      colors: [0, 1, 2, 3, 4, 5, 3, 4, 2, 0, 1, 6, 7, 8, 9, 7, 8, 6, 10],
      freq: 128
    },
    hmirror: {
      colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8, 6, 7, 5, 3, 4, 2, 11],
      freq: 128
    }
  };
  const OUTER_CIRCLE = {
    cx: C,
    cy: C,
    fill: '#eee',
    r: C
  };
  let zeroHash = new Uint8Array();
  function getRotation(isSixPoint) {
    const r = isSixPoint ? C / 8 * 5 : C / 4 * 3;
    const rroot3o2 = r * Math.sqrt(3) / 2;
    const ro2 = r / 2;
    const rroot3o4 = r * Math.sqrt(3) / 4;
    const ro4 = r / 4;
    const r3o4 = r * 3 / 4;
    return {
      r,
      r3o4,
      ro2,
      ro4,
      rroot3o2,
      rroot3o4
    };
  }
  function getCircleXY(isSixPoint) {
    const {
      r,
      r3o4,
      ro2,
      ro4,
      rroot3o2,
      rroot3o4
    } = getRotation(isSixPoint);
    return [[C, C - r], [C, C - ro2], [C - rroot3o4, C - r3o4], [C - rroot3o2, C - ro2], [C - rroot3o4, C - ro4], [C - rroot3o2, C], [C - rroot3o2, C + ro2], [C - rroot3o4, C + ro4], [C - rroot3o4, C + r3o4], [C, C + r], [C, C + ro2], [C + rroot3o4, C + r3o4], [C + rroot3o2, C + ro2], [C + rroot3o4, C + ro4], [C + rroot3o2, C], [C + rroot3o2, C - ro2], [C + rroot3o4, C - ro4], [C + rroot3o4, C - r3o4], [C, C]];
  }
  function findScheme(d) {
    let cum = 0;
    const schema = Object.values(SCHEMA).find(schema => {
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
      zeroHash = blake2(new Uint8Array(32));
    }
    return blake2(utilCrypto.decodeAddress(address)).map((x, i) => (x + 256 - zeroHash[i]) % 256);
  }
  function getColors(address) {
    const total = Object.values(SCHEMA).map(s => s.freq).reduce((a, b) => a + b);
    const id = addressToId(address);
    const d = Math.floor((id[30] + id[31] * 256) % total);
    const rot = id[28] % 6 * 3;
    const sat = Math.floor(id[29] * 70 / 256 + 26) % 80 + 30;
    const scheme = findScheme(d);
    const palette = Array.from(id).map((x, i) => {
      const b = (x + i % 28 * 58) % 256;
      if (b === 0) {
        return '#444';
      } else if (b === 255) {
        return 'transparent';
      }
      const h = Math.floor(b % 64 * 360 / 64);
      const l = [53, 15, 35, 75][Math.floor(b / 64)];
      return `hsl(${h}, ${sat}%, ${l}%)`;
    });
    return scheme.colors.map((_, i) => palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]]);
  }
  function polkadotIcon(address, {
    isAlternative
  }) {
    const xy = getCircleXY(isAlternative);
    let colors;
    try {
      colors = getColors(address);
    } catch {
      colors = new Array(xy.length).fill('#ddd');
    }
    return [OUTER_CIRCLE].concat(xy.map(([cx, cy], index) => ({
      cx,
      cy,
      fill: colors[index],
      r: Z
    })));
  }

  const Beachball = Vue__default["default"].extend({
    props: ['address', 'size', 'isAlternative'],
    render(h) {
      const {
        address,
        isAlternative,
        size
      } = this.$props;
      const bb = beachballIcon(address, {
        isAlternative,
        size
      });
      return h(Vue__default["default"].component('VCBeachball', {
        template: bb.outerHTML
      }));
    }
  });

  const Empty = Vue__default["default"].extend({
    props: ['size'],
    template: `
    <svg :height="size" :width="size" viewBox="0 0 64 64">
      <circle cx="50%" cy="50%" fill="#eee" r="50%" />
    </svg>
  `
  });

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

  const Jdenticon = Vue__default["default"].extend({
    props: ['publicKey', 'size'],
    render(h) {
      const {
        publicKey,
        size
      } = this.$props;
      const cmp = Vue__default["default"].component('CJdenticon', {
        template: toSvg(publicKey.substring(2), size)
      });
      return h(cmp);
    }
  });

  const Polkadot = Vue__default["default"].extend({
    props: ['address', 'isAlternative', 'size'],
    render(h) {
      const {
        address,
        isAlternative,
        size
      } = this.$props;
      const circles = polkadotIcon(address, {
        isAlternative: isAlternative || false
      }).map(({
        cx,
        cy,
        fill,
        r
      }) => {
        return h('circle', {
          attrs: {
            cx,
            cy,
            fill,
            r
          }
        }, []);
      });
      return h('svg', {
        attrs: {
          height: size,
          viewBox: '0 0 64 64',
          width: size
        }
      }, circles);
    }
  });

  const DEFAULT_SIZE = 64;
  function encodeAccount(value, prefix) {
    try {
      const address = util.isU8a(value) || util.isHex(value) ? utilCrypto.encodeAddress(value, prefix) : value;
      const publicKey = util.u8aToHex(utilCrypto.decodeAddress(address, false, prefix));
      return {
        address,
        publicKey
      };
    } catch (error) {
      return {
        address: '',
        publicKey: '0x'
      };
    }
  }
  const Identicon = Vue__default["default"].extend({
    components: {
      Beachball,
      Empty,
      Jdenticon,
      Polkadot
    },
    created: function () {
      this.createData();
    },
    data: function () {
      return {
        address: '',
        iconSize: DEFAULT_SIZE,
        isAlternative: false,
        publicKey: '0x',
        type: 'empty'
      };
    },
    methods: {
      createData: function () {
        this.iconSize = this.size || DEFAULT_SIZE;
        this.type = this.theme;
        this.recodeAddress();
      },
      recodeAddress: function () {
        const {
          address,
          publicKey
        } = encodeAccount(this.value);
        this.address = address;
        this.publicKey = publicKey;
      }
    },
    props: ['prefix', 'isAlternative', 'size', 'theme', 'value'],
    render(h) {
      const {
        address,
        iconSize,
        isAlternative,
        publicKey,
        type
      } = this.$data;
      if (type === 'empty') {
        return h('Empty', {
          attrs: {
            key: address,
            size: iconSize
          }
        }, []);
      } else if (type === 'jdenticon') {
        return h('Jdenticon', {
          attrs: {
            key: address,
            publicKey,
            size: iconSize
          }
        }, []);
      } else {
        const cmp = type.charAt(0).toUpperCase() + type.slice(1);
        return h(cmp, {
          attrs: {
            address,
            isAlternative,
            key: address,
            size: iconSize
          }
        }, []);
      }
    },
    watch: {
      value: function () {
        this.recodeAddress();
      }
    }
  });

  const packageInfo = {
    name: '@polkadot/vue-identicon',
    path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-vue-identicon.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto',
    type: 'esm',
    version: '2.7.2'
  };

  exports.Identicon = Identicon;
  exports.packageInfo = packageInfo;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
