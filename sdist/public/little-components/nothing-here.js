"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Transition_1 = require("react-transition-group/Transition");
class NothingHere extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let duration = 200;
        let transitionStyles = {
            entering: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            entered: {
                opacity: .3,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exiting: {
                opacity: .1,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exited: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            }
        };
        return (React.createElement("div", { className: 'centerColumn' },
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, state => React.createElement("div", null,
                React.createElement("h3", { style: transitionStyles[state] }, "nothing here yet "),
                React.createElement("h1", { style: transitionStyles[state] }, " \u00AF\\_(\u30C4)_/\u00AF ")))));
    }
}
exports.default = NothingHere;
//# sourceMappingURL=nothing-here.js.map