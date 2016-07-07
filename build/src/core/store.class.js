import { createWorker } from './store.worker';
import { actions, events } from './consts';
export class Store {
    constructor(fn, initialState) {
        this.store = createWorker(fn, initialState);
    }
    // subscribe to changes to the store.
    // the web worker acts as the dispatcher
    subscribe(fn) {
        const store = this.store;
        store.addEventListener(events.MESSAGE, handleSubscription);
        function handleSubscription(e) {
            if (e.data.type !== actions.GET_STATE) {
                fn(e.data.data);
            }
        }
        return {
            unsubScribe() {
                store.removeEventListener(events.MESSAGE, handleSubscription);
            }
        };
    }
    // terminate the web worker
    destroy() {
        this.store.terminate();
    }
    // dispatch and action to the store
    // posts a message to the web worker
    dispatch(action) {
        this.store.postMessage(action);
        return this;
    }
    // Get the current state of the store
    // this is just a wrapper for a dispatch
    // uses special reserved action
    getState(fn) {
        this.store.addEventListener(events.MESSAGE, handleOnMessage.bind(this));
        function handleOnMessage(e) {
            fn(e.data.data);
            this.store.removeEventListener(events.MESSAGE, handleOnMessage);
        }
        this.dispatch({ type: actions.GET_STATE });
        return this;
    }
}
//# sourceMappingURL=store.class.js.map