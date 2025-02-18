(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@polkadot/util'), require('@polkadot/util-crypto')) :
    typeof define === 'function' && define.amd ? define(['exports', '@polkadot/util', '@polkadot/util-crypto'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polkadotPhishing = {}, global.polkadotUtil, global.polkadotUtilCrypto));
})(this, (function (exports, util, utilCrypto) { 'use strict';

    const global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : window;

    var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
    function evaluateThis(fn) {
        return fn('return this');
    }
    const xglobal =  (typeof globalThis !== 'undefined'
        ? globalThis
        : typeof global !== 'undefined'
            ? global
            : typeof self !== 'undefined'
                ? self
                : typeof window !== 'undefined'
                    ? window
                    : evaluateThis(Function));

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
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            return response;
        }
        catch (error) {
            if (!isAborted) {
                clearTimeout(id);
            }
            throw error;
        }
    }
    function fetchJson(url, timeout) {
        return fetchWithTimeout(url, timeout).then((r) => r.json());
    }

    const packageInfo = { name: '@polkadot/phishing', path: (({ url: (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href)) }) && (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href))) ? new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href))).pathname.substring(0, new URL((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.src || new URL('bundle-polkadot-phishing.js', document.baseURI).href))).pathname.lastIndexOf('/') + 1) : 'auto', type: 'esm', version: '0.25.4' };

    const PHISHING = 'https://polkadot.js.org/phishing';
    const ADDRESS_JSON = `${PHISHING}/address.json`;
    const CACHE_TIMEOUT = 45 * 60 * 1000;
    const cacheAddr = {
        end: 0,
        list: {},
        u8a: []
    };
    const cacheHost = {};
    function splitHostParts(host) {
        return host
            .split('.')
            .reverse();
    }
    function extractHostParts(host) {
        return splitHostParts(host
            .replace(/https:\/\/|http:\/\/|wss:\/\/|ws:\/\//, '')
            .split('/')[0]);
    }
    async function retrieveAddrCache(allowCached = true) {
        const now = Date.now();
        if (allowCached && (now < cacheAddr.end)) {
            return cacheAddr;
        }
        const list = await fetchJson(ADDRESS_JSON);
        cacheAddr.end = now + CACHE_TIMEOUT;
        cacheAddr.list = list;
        cacheAddr.u8a = Object.entries(list).map(([key, addresses]) => [key, addresses.map((a) => utilCrypto.decodeAddress(a))]);
        return cacheAddr;
    }
    async function retrieveHostCache(allowCached = true, root = '*') {
        const now = Date.now();
        if (allowCached && cacheHost[root] && (now < cacheHost[root].end)) {
            return cacheHost[root];
        }
        let list;
        try {
            list = root === '*'
                ? await fetchJson(`${PHISHING}/all.json`)
                : {
                    allow: [],
                    deny: await fetchJson(`${PHISHING}/all/${root}/all.json`)
                };
        }
        catch {
            list = { allow: [], deny: [] };
        }
        cacheHost[root] = {
            end: now + CACHE_TIMEOUT,
            list,
            parts: list.deny.map((h) => splitHostParts(h))
        };
        return cacheHost[root];
    }
    function checkHostParts(items, hostParts) {
        return items.some((parts) =>
        (parts.length <= hostParts.length) &&
            parts.every((part, index) => hostParts[index] === part));
    }
    async function retrieveAddrList(allowCached = true) {
        const cache = await retrieveAddrCache(allowCached);
        return cache.list;
    }
    async function retrieveHostList(allowCached = true, root = '*') {
        const cache = await retrieveHostCache(allowCached, root);
        return cache.list;
    }
    function checkHost(list, host) {
        return checkHostParts(list.map((h) => splitHostParts(h)), extractHostParts(host));
    }
    async function checkAddress(address, allowCached = true) {
        try {
            const u8a = utilCrypto.decodeAddress(address);
            const cache = await retrieveAddrCache(allowCached);
            const entry = cache.u8a.find(([, u8as]) => u8as.some((a) => util.u8aEq(a, u8a)));
            return entry?.[0] || null;
        }
        catch {
            return null;
        }
    }
    async function checkIfDenied(host, allowCached = true) {
        try {
            const hostParts = extractHostParts(host);
            const cache = await retrieveHostCache(allowCached, hostParts[0]);
            return checkHostParts(cache.parts, hostParts);
        }
        catch {
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
