"use strict";
var src_1 = require('../src');
describe('Create Store', function () {
    it('should create a store and have an initial state', function (done) {
        var store = src_1.createStore(function (state, action) { }, 'Hello World');
        store.getState(function (state) {
            expect(state).toBe('Hello World');
            done();
        });
    });
    it('should increment state by 1', function (done) {
        var store = src_1.createStore(function (state, action) {
            switch (action.type) {
                case 'INCREMENT':
                    return state + 1;
                case 'DECREMENT':
                    return state - 1;
                default:
                    return state;
            }
        }, 0);
        store.subscribe(function (state) {
            expect(state).toBe(1);
            done();
        });
        store.dispatch({ type: 'INCREMENT' });
    });
    it('should unsubscribe from store', function () {
        var store = src_1.createStore(function (state, action) {
            return state;
        });
        var subscription = store.subscribe(function (state) { });
        subscription.unsubScribe();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXN0b3JlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGUtc3RvcmUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQTRCLFFBQVEsQ0FBQyxDQUFBO0FBRXJDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7SUFDdkIsRUFBRSxDQUFDLGlEQUFpRCxFQUFFLFVBQUEsSUFBSTtRQUN4RCxJQUFJLEtBQUssR0FBRyxpQkFBVyxDQUFDLFVBQUMsS0FBSyxFQUFFLE1BQU0sSUFBTSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFOUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUs7WUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVsQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBQSxJQUFJO1FBQ3BDLElBQUksS0FBSyxHQUFHLGlCQUFXLENBQUMsVUFBQyxLQUFLLEVBQUUsTUFBTTtZQUNwQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsS0FBSyxXQUFXO29CQUNkLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLFdBQVc7b0JBQ2QsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ25CO29CQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztRQUNILENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQTtJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywrQkFBK0IsRUFBRTtRQUNsQyxJQUFJLEtBQUssR0FBRyxpQkFBVyxDQUFDLFVBQUMsS0FBSyxFQUFFLE1BQU07WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBTSxDQUFDLENBQUMsQ0FBQztRQUVqRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9