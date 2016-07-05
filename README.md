# redux-worker [![CircleCI](https://circleci.com/gh/deebloo/redux-worker.svg?style=svg)](https://circleci.com/gh/deebloo/redux-worker)

Redux implementation in a web worker.

```TS
import { createStore } from 'redux-worker/core';
// Or if using bundle.
// var createStore = Rw.createStore;

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

store.getState(state => {
  console.log(state) // 0
});

store.subscribe(state => {
  console.log(state);
});

store.dispatch({ type: 'INCREMENT' });
```
