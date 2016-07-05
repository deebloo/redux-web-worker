"use strict";
var store_worker_1 = require('./store.worker');
var config_1 = require('./config');
var Store = (function () {
    function Store(fn, initialState) {
        this.store = store_worker_1.createWorker(fn, initialState);
    }
    // subscribe to changes to the store.
    // the web worker acts as the dispatcher
    Store.prototype.subscribe = function (fn) {
        this.store.addEventListener('message', function (e) { return fn(e.data); });
        return this;
    };
    // dispatch and action to the store
    // posts a message to the web worker
    Store.prototype.dispatch = function (action) {
        this.store.postMessage(action);
        return this;
    };
    // Get the current state of the store
    // uses special reserved action
    Store.prototype.getState = function (fn) {
        this.store.onmessage = function (e) {
            fn(e.data);
            this.store.onmessage = undefined;
        };
        this.store.postMessage({
            type: config_1.actions.GET_STATE
        });
        return this;
    };
    return Store;
}());
exports.Store = Store;
