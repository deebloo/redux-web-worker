/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(1);
	// store class
	var Store = (function () {
	    function Store(fn, initialState) {
	        this.store = util_1.createWorker(fn, initialState);
	    }
	    Store.prototype.subscribe = function (fn) {
	        this.store.addEventListener('message', function (e) { return fn(e.data); });
	        return this;
	    };
	    Store.prototype.getState = function (fn) {
	        this.store.onmessage = function (e) {
	            fn(e.data);
	            this.store.onmessage = undefined;
	        };
	        this.store.postMessage({
	            type: 'GET_STATE'
	        });
	        return this;
	    };
	    Store.prototype.dispatch = function (action) {
	        this.store.postMessage(action);
	        return this;
	    };
	    return Store;
	}());
	exports.Store = Store;
	// store factory
	function createStore(fn, initialState) {
	    return new Store(fn, initialState);
	}
	exports.createStore = createStore;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	// create a web worker tailored for state management
	function createWorker(fn, initialState) {
	    var blob = new Blob([("\n    self.state = " + initialState + ";\n    self.cb = " + fn.toString() + ";\n    self.onmessage = function () {\n      if (e.data.type === 'GET_STATE') {\n        scope.postMessage('hello');\n      } else {\n        self.state = self.cb(scope.state, e.data);\n\n        self.postMessage({\n          state: scope.state,\n          action: e.data\n        });\n      }\n    }\n  ")], { type: 'text/javascript' });
	    var url = URL.createObjectURL(blob);
	    var worker = new Worker(url);
	    URL.revokeObjectURL(url);
	    return worker;
	}
	exports.createWorker = createWorker;


/***/ }
/******/ ]);