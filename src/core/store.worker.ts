// create a web worker tailored for state management
export function createWorker(fn: Function, initialState: any) {
  // create boilerplate worker
  // store default state
  // manages get state
  // assigns reducer
  var blob: Blob = new Blob([`
    self.state = ${initialState};

    self.reducer = ${fn.toString()};

    self.onmessage = function (e) {
      if (e.data.type !== 'GET_STATE') {
        self.state = self.reducer(self.state, e.data);
      }

      self.postMessage(self.state);
    }
  `], { type: 'text/javascript' });

  var url: string = URL.createObjectURL(blob);
  var worker: Worker = new Worker(url);

  URL.revokeObjectURL(url);

  return worker;
}