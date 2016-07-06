"use strict";
var store_worker_1 = require('./store.worker');
var consts_1 = require('./consts');
var Store = (function () {
    function Store(fn, initialState) {
        this.store = store_worker_1.createWorker(fn, initialState);
    }
    // subscribe to changes to the store.
    // the web worker acts as the dispatcher
    Store.prototype.subscribe = function (fn) {
        var store = this.store;
        store.addEventListener(consts_1.events.MESSAGE, handleSubscription);
        function handleSubscription(e) {
            if (e.data.type !== consts_1.actions.GET_STATE) {
                fn(e.data.data);
            }
        }
        return {
            unsubScribe: function () {
                store.removeEventListener(consts_1.events.MESSAGE, handleSubscription);
            }
        };
    };
    // terminate the web worker
    Store.prototype.destroy = function () {
        this.store.terminate();
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
        this.store.addEventListener(consts_1.events.MESSAGE, handleOnMessage.bind(this));
        function handleOnMessage(e) {
            fn(e.data.data);
            this.store.removeEventListener(consts_1.events.MESSAGE, handleOnMessage);
        }
        this.dispatch({ type: consts_1.actions.GET_STATE });
        return this;
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkJBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFFOUMsdUJBQWdDLFVBQVUsQ0FBQyxDQUFBO0FBRTNDO0lBR0UsZUFBWSxFQUFZLEVBQUUsWUFBa0I7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRywyQkFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQscUNBQXFDO0lBQ3JDLHdDQUF3QztJQUN4Qyx5QkFBUyxHQUFULFVBQVUsRUFBWTtRQUNwQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXpCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFNLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFM0QsNEJBQTRCLENBQUM7WUFDM0IsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssZ0JBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQztZQUNMLFdBQVc7Z0JBQ1QsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGVBQU0sQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNoRSxDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCwyQkFBMkI7SUFDM0IsdUJBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxvQ0FBb0M7SUFDcEMsd0JBQVEsR0FBUixVQUFTLE1BQWM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsd0NBQXdDO0lBQ3hDLCtCQUErQjtJQUMvQix3QkFBUSxHQUFSLFVBQVMsRUFBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGVBQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhFLHlCQUF5QixDQUFlO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWhCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsZUFBTSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxZQUFDO0FBQUQsQ0FBQyxBQXhERCxJQXdEQztBQXhEWSxhQUFLLFFBd0RqQixDQUFBIn0=