(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/util'), require('@polkadot/util-crypto')) :
  typeof define === 'function' && define.amd ? define(['exports', '@polkadot/util', '@polkadot/util-crypto'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotPhishing = {}, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, util, utilCrypto) { 'use strict';

  const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

  function evaluateThis(fn) {
    return fn('return this');
  }
  const xglobal = typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : evaluateThis(Function);

  const fetch = xglobal.fetch;

  async function fetchWithTimeout(url, timeout = 2000) {
    const controller = new AbortController();
    let isAborted = false;
    const id = setTimeout(() => {
      console.log(`Timeout on ${url}`);
      isAborted = true;
      controller.abort();
    }, timeout);
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      if (!isAborted) {
        clearTimeout(id);
      }
      throw error;
    }
  }
  function fetchJson(url, timeout) {
    return fetchWithTimeout(url, timeout).then(r => r.json());
  }

  const packageInfo = {
    name: '@polkadot/phishing',
    path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto',
    type: 'esm',
    version: '0.18.12'
  };

  const ADDRESS_JSON = 'https://polkadot.js.org/phishing/address.json';
  const ALL_JSON = 'https://polkadot.js.org/phishing/all.json';
  const CACHE_TIMEOUT = 45 * 60 * 1000;
  let cacheAddrEnd = 0;
  let cacheAddrList = null;
  let cacheAddrU8a = null;
  let cacheHostEnd = 0;
  let cacheHostList = null;
  function extractHost(path) {
    return path.replace(/https:\/\/|http:\/\/|wss:\/\/|ws:\/\//, '').split('/')[0];
  }
  function log(error, check) {
    console.warn(`Error checking ${check}, assuming non-phishing`, error.message);
  }
  async function retrieveAddrList(allowCached = true) {
    const now = Date.now();
    return allowCached && cacheAddrList && now < cacheAddrEnd ? cacheAddrList : fetchJson(ADDRESS_JSON).then(list => {
      cacheAddrEnd = now + CACHE_TIMEOUT;
      cacheAddrList = list;
      return list;
    });
  }
  async function retrieveAddrU8a(allowCached = true) {
    const now = Date.now();
    return allowCached && cacheAddrU8a && now < cacheAddrEnd ? cacheAddrU8a : retrieveAddrList(allowCached).then(all => {
      cacheAddrU8a = Object.entries(all).map(([key, addresses]) => [key, addresses.map(a => utilCrypto.decodeAddress(a))]);
      return cacheAddrU8a;
    });
  }
  async function retrieveHostList(allowCached = true) {
    const now = Date.now();
    return allowCached && cacheHostList && now < cacheHostEnd ? cacheHostList : fetchJson(ALL_JSON).then(list => {
      cacheHostEnd = now + CACHE_TIMEOUT;
      cacheHostList = list;
      return list;
    });
  }
  function checkHost(items, host) {
    const hostParts = extractHost(host).split('.').reverse();
    return items.some(item => {
      const checkParts = item.split('.').reverse();
      if (checkParts.length > hostParts.length) {
        return false;
      }
      return checkParts.every((part, index) => hostParts[index] === part);
    });
  }
  async function checkAddress(address, allowCached = true) {
    try {
      const u8a = utilCrypto.decodeAddress(address);
      const all = await retrieveAddrU8a(allowCached);
      const entry = all.find(([, all]) => all.some(a => util.u8aEq(a, u8a))) || [null];
      return entry[0];
    } catch (error) {
      log(error, 'address');
      return null;
    }
  }
  async function checkIfDenied(host, allowCached = true) {
    try {
      const {
        deny
      } = await retrieveHostList(allowCached);
      return checkHost(deny, host);
    } catch (error) {
      log(error, host);
      return false;
    }
  }

  exports.checkAddress = checkAddress;
  exports.checkHost = checkHost;
  exports.checkIfDenied = checkIfDenied;
  exports.packageInfo = packageInfo;
  exports.retrieveAddrList = retrieveAddrList;
  exports.retrieveHostList = retrieveHostList;

}));
