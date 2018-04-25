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
var React = require("react");
var Transition_1 = require("react-transition-group/Transition");
var NothingHere = /** @class */ (function (_super) {
    __extends(NothingHere, _super);
    function NothingHere(props) {
        return _super.call(this, props) || this;
    }
    NothingHere.prototype.render = function () {
        var duration = 200;
        var defaultStyle = {
            transition: "opacity " + duration + "ms ease-in-out",
            opacity: 0,
        };
        var transitionStyles = {
            entering: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            entered: {
                opacity: .3,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exiting: {
                opacity: .1,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exited: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            }
        };
        return (React.createElement("div", { className: 'centerColumn' },
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, function (state) {
                switch (state) {
                    case 'entering':
                        return React.createElement("h1", { style: transitionStyles[state] }, "nothing here, add below");
                    case 'entered':
                        return React.createElement("h1", { style: transitionStyles[state] }, "nothing here, add below");
                    case 'exiting':
                        return React.createElement("h1", { style: transitionStyles[state] }, "nothing here, add below");
                    case 'exited':
                        return React.createElement("h1", { style: transitionStyles[state] }, "nothing here, add below");
                }
            })));
    };
    return NothingHere;
}(React.Component));
exports.default = NothingHere;
//# sourceMappingURL=nothing-here.js.map