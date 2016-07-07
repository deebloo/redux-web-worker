"use strict";
var src_1 = require('../src');
describe('Create Store', function () {
    it('should create a store and have an initial state', function (done) {
        var store = src_1.createStore(function (state, action) { }, 'Hello World');
        store.getState(function (state) {
            expect(state).toBe('Hello World');
            done();
        });
    });
    it('should increment state by 1', function (done) {
        var store = src_1.createStore(function (state, action) {
            switch (action.type) {
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        }, 0);
        store.subscribe(function (state) {
            expect(state).toBe(1);
            done();
        });
        store.dispatch({ type: 'INCREMENT' });
    });
    it('should unsubscribe from store', function () {
        var store = src_1.createStore(function (state, action) {
            return state;
        });
        var subscription = store.subscribe(function (state) { });
        subscription.unsubScribe();
    });
    it('should destory the store', function () {
        var store = src_1.createStore(function (state, action) {
            return state;
        });
        var subscription = store.subscribe(function (state) { });
        store.destroy();
    });
});
//# sourceMappingURL=create-store.spec.js.map