"use strict";
var core_1 = require('./core');
function createStore(fn, initialState) {
    return new core_1.Store(fn, initialState);
}
exports.createStore = createStore;
