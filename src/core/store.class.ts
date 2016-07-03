import { createWorker } from '../util';
import { Action } from './action.interface';

export class Store {
  private store: Worker;

  constructor(fn: Function, initialState?: any) {
    this.store = createWorker(fn, initialState);
  }

  subscribe(fn: Function): Store {
    this.store.addEventListener('message', e => fn(e.data));

    return this;
  }

  dispatch(action: Action): Store {
    this.store.postMessage(action);

    return this;
  }

  getState(fn: Function): Store {
    this.store.onmessage = function (e) {
      fn(e.data);

      this.store.onmessage = undefined;
    };

    this.store.postMessage({
      type: 'GET_STATE'
    });

    return this;
  }
}