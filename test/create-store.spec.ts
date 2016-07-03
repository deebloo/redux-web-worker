import { createStore } from '../src';

describe('Create Store', () => {
  it('should create a store', () => {
    var store = createStore((state, action) => {
      return action.state;
    });

    store.subscribe(state => {
      expect(state).toBe('Hello World');
    });

    store.dispatch({
      type: 'MY_ACTION',
      data: 'Hello World'
    });
  })
});
