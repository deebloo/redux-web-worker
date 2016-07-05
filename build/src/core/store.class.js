"use strict";
var store_worker_1 = require('./store.worker');
var actions_1 = require('./actions');
var Store = (function () {
    function Store(fn, initialState) {
        this.store = store_worker_1.createWorker(fn, initialState);
    }
    // subscribe to changes to the store.
    // the web worker acts as the dispatcher
    Store.prototype.subscribe = function (fn) {
        var store = this.store;
        store.addEventListener('message', handleSubscription);
        function handleSubscription(e) {
            if (e.data.type !== actions_1.actions.GET_STATE) {
                fn(e.data.data);
            }
        }
        return {
            unsubScribe: function () {
                store.removeEventListener(handleSubscription);
            }
        };
    };
    // dispatch and action to the store
    // posts a message to the web worker
    Store.prototype.dispatch = function (action) {
        this.store.postMessage(action);
        return this;
    };
    // Get the current state of the store
    // this is just a wrapper for a dispatch
    // uses special reserved action
    Store.prototype.getState = function (fn) {
        this.store.addEventListener('message', handleOnMessage.bind(this));
        function handleOnMessage(e) {
            fn(e.data.data);
            this.store.removeEventListener(handleOnMessage);
        }
        this.dispatch({ type: actions_1.actions.GET_STATE });
        return this;
    };
    return Store;
}());
exports.Store = Store;
