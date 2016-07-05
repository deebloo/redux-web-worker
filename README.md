# redux-worker [![CircleCI](https://circleci.com/gh/deebloo/redux-worker.svg?style=svg)](https://circleci.com/gh/deebloo/redux-worker)

Redux implementation in a web worker.

```TS
import { createStore } from 'redux-worker/core';
// Or if using bundle.
// var createStore = Rw.createStore;

// the reduces is run in a new thread
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

// get state has to be async since the state is managed is a separate thread
store.getState(state => {
  console.log(state) // 0
});

// subscribe to the store for changes.
// the web worker acts as the dispatcher with onmessage and postMessage
store.subscribe(state => {
  console.log(state);
});

// standard redux style dispatch
store.dispatch({ type: 'INCREMENT' });
```
