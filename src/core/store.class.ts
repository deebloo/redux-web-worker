import { createWorker } from './store.worker';
import { Action } from './action.interface';
import { actions } from './actions';

export class Store {
  private store: Worker;

  constructor(fn: Function, initialState?: any) {
    this.store = createWorker(fn, initialState);
  }

  // subscribe to changes to the store.
  // the web worker acts as the dispatcher
  subscribe(fn: Function) {
    const store = this.store;

    store.addEventListener('message', handleSubscription);

    function handleSubscription(e) {
      if(e.data.type !== actions.GET_STATE) {
        fn(e.data.data);
      }
    }

    return {
      unsubScribe() {
        (<any>store).removeEventListener(handleSubscription);
      }
    };
  }

  // dispatch and action to the store
  // posts a message to the web worker
  dispatch(action: Action): Store {
    this.store.postMessage(action);

    return this;
  }

  // Get the current state of the store
  // this is just a wrapper for a dispatch
  // uses special reserved action
  getState(fn: Function): Store {
    this.store.addEventListener('message', handleOnMessage.bind(this));

    function handleOnMessage(e?: any): any {
      fn(e.data.data);

      this.store.removeEventListener(handleOnMessage);
    }

    this.dispatch({ type: actions.GET_STATE });

    return this;
  }
}
