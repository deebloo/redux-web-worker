"use strict";
var core_1 = require('./core');
var core_2 = require('./core');
exports.Store = core_2.Store;
function createStore(fn, initialState) {
    return new core_1.Store(fn, initialState);
}
exports.createStore = createStore;
//# sourceMappingURL=index.js.map