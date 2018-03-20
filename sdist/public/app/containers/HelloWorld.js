"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var hello_1 = require("../actions/hello");
var Hello_1 = require("../components/Hello");
var mapStateToProps = function (state, ownProps) {
    return {
        message: state.helloWorld.message
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        onClick: function () { return dispatch(hello_1.helloWorld()); },
        reset: function () { return dispatch(hello_1.reset()); }
    };
};
var HelloWorld = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Hello_1.default);
exports.default = HelloWorld;
//# sourceMappingURL=HelloWorld.js.map