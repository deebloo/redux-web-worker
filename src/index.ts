import { Store } from './core'

export { Action, Store } from './core';

export function createStore(fn: Function, initialState?: any): Store {
  return new Store(fn, initialState);
}
