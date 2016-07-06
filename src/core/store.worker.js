"use strict";
var consts_1 = require('./consts');
// create a web worker tailored for state management
function createWorker(fn, initialState) {
    // create boilerplate worker
    // store default state
    // manages get state
    // assigns reducer
    var blob = new Blob([("\n    self.state = " + JSON.stringify(initialState) + ";\n    self.reducer = " + fn.toString() + ";\n    self.onmessage = function (e) {\n      if (e.data.type !== " + JSON.stringify(consts_1.actions.GET_STATE) + ") {\n        self.state = self.reducer(self.state, e.data);\n      }\n\n      self.postMessage({\n        type: e.data.type,\n        data: self.state\n      });\n    }\n  ")], { type: 'text/javascript' });
    var url = URL.createObjectURL(blob);
    var worker = new Worker(url);
    // revoke the object url since we don't need it anymore
    URL.revokeObjectURL(url);
    return worker;
}
exports.createWorker = createWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUud29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RvcmUud29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBd0IsVUFBVSxDQUFDLENBQUE7QUFFbkMsb0RBQW9EO0FBQ3BELHNCQUE2QixFQUFZLEVBQUUsWUFBaUI7SUFDMUQsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0QixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLElBQUksSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMseUJBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsOEJBQzFCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsMEVBRU4sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBTyxDQUFDLFNBQVMsQ0FBQyxrTEFTMUQsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUVqQyxJQUFJLEdBQUcsR0FBVyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLElBQUksTUFBTSxHQUFXLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXJDLHVEQUF1RDtJQUN2RCxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQTNCZSxvQkFBWSxlQTJCM0IsQ0FBQSJ9