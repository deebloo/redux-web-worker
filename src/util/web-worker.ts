// create a web worker tailored for state management
export function createWorker(fn: Function, initialState: any) {
  var blob: Blob = new Blob([`
    self.state = ${initialState};

    self.cb = ${fn.toString()};

    self.onmessage = function (e) {
      if (e.data.type === 'GET_STATE') {
        self.postMessage(self.state);
      } else {
        self.state = self.cb(self.state, e.data);

        self.postMessage(self.state);
      }
    }
  `], { type: 'text/javascript' });

  var url: string = URL.createObjectURL(blob);
  var worker: Worker = new Worker(url);

  URL.revokeObjectURL(url);

  return worker;
}
