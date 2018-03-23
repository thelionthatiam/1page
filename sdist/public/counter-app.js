"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var HelloWorld_1 = require("../containers/HelloWorld");
var redux_1 = require("redux");
var counter_1 = require("../components/counter");
var counter_2 = require("../reducers/counter");
exports.store = redux_1.createStore(counter_2.default);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(HelloWorld_1.default, null),
            react_1.default.createElement(counter_1.default, { value: exports.store.getState(), onIncrement: function () { return exports.store.dispatch({ type: 'INCRIMENT' }); }, onDecrement: function () { return exports.store.dispatch({ type: 'DECREMENT' }); } })));
    };
    return App;
}(react_1.Component));
exports.default = App;
//# sourceMappingURL=counter-app.js.map