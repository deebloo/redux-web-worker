// create a web worker tailored for state management
export function createWorker(fn: Function, initialState: any) {
  var blob: Blob = new Blob([`
    self.state = ${initialState};
    self.cb = ${fn.toString()};
    self.onmessage = function () {
      if (e.data.type === 'GET_STATE') {
        scope.postMessage('hello');
      } else {
        self.state = self.cb(scope.state, e.data);

        self.postMessage({
          state: scope.state,
          action: e.data
        });
      }
    }
  `], { type: 'text/javascript' });

  var url: string = URL.createObjectURL(blob);
  var worker: Worker = new Worker(url);

  URL.revokeObjectURL(url);

  return worker;
}
