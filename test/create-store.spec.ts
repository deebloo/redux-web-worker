import { createStore } from '../src';

describe('Create Store', () => {
  it('should create a store', () => {
    var store = createStore((state, action) => {
      switch(action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }, 0);

    store.subscribe(state => {
      expect(state).toBe(1);
    });

    store.dispatch({ type: 'INCREMENT' });
  });

  it('should get the current state', () => {
    var store = createStore((state, action) => {
      return state;
    }, 'Hello World');

    store.getState(function (state) {
      expect(state).toBe('Hello World');
    });
  });
});
