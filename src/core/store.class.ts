import { createWorker } from './store.worker';
import { Action } from './action.interface';
import { actions } from './config';

export class Store {
  private store: Worker;

  constructor(fn: Function, initialState?: any) {
    this.store = createWorker(fn, initialState);
  }

  // subscribe to changes to the store.
  // the web worker acts as the dispatcher
  subscribe(fn: Function): Store {
    this.store.addEventListener('message', e => fn(e.data));

    return this;
  }

  // dispatch and action to the store
  // posts a message to the web worker
  dispatch(action: Action): Store {
    this.store.postMessage(action);

    return this;
  }

  // Get the current state of the store
  // uses special reserved action
  getState(fn: Function): Store {
    this.store.onmessage = function (e) {
      fn(e.data);

      this.store.onmessage = undefined;
    };

    this.store.postMessage({
      type: actions.GET_STATE
    });

    return this;
  }
}
