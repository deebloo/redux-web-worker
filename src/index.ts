import { createWorker } from './util';

// store class
export class Store {
  private store: Worker;

  constructor(fn: Function, initialState?: any) {
    this.store = createWorker(fn, initialState);
  }

  subscribe(fn) {
    this.store.addEventListener('message', e => fn(e.data));

    return this;
  }

  getState(fn) {
    this.store.onmessage = function (e) {
      fn(e.data);

      this.store.onmessage = undefined;
    };

    this.store.postMessage({
      type: 'GET_STATE'
    });

    return this;
  }

  dispatch(action) {
    this.store.postMessage(action);

    return this;
  }
}

// store factory
export function createStore(fn: Function, initialState?: any): Store {
  return new Store(fn, initialState);
}