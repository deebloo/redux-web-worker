import { createStore } from '../src';

describe('Create Store', () => {
  it('should create a store', done => {
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

      done();
    });

    store.dispatch({ type: 'INCREMENT' });
  });

  it('should get the current state', done => {
    var store = createStore((state, action) => {
      return state;
    }, 'Hello World');

    store.getState(function (state) {
      expect(state).toBe('Hello World');

      done();
    });
  });

  it('should unsubscribe from store', () => {
    var store = createStore((state, action) => {
      return state;
    }, 'Hello World');

    var subscription = store.subscribe(state => {});

    subscription.unsubScribe();
  });
});
