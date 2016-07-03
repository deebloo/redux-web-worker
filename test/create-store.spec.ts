import { createStore } from '../src';

describe('Create Store', () => {
  it('should create a store', () => {
    var store = createStore(function (state, action) {
      return action.state;
    });

    store.subscribe(function (state) {
      expect(state).toBe('Hello World');
    });

    store.dispatch({
      state: 'Hello World'
    });
  })
});
