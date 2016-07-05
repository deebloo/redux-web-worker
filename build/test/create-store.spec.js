"use strict";
var src_1 = require('../src');
describe('Create Store', function () {
    it('should create a store', function () {
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
        });
        store.dispatch({ type: 'INCREMENT' });
    });
    it('should get the current state', function () {
        var store = src_1.createStore(function (state, action) {
            return state;
        }, 'Hello World');
        store.getState(function (state) {
            expect(state).toBe('Hello World');
        });
    });
});
