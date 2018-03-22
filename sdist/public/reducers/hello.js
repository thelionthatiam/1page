"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var hello_1 = require("../actions/hello");
var initialState = { message: 'Hello' };
var helloWorld = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case hello_1.HELLO_WORLD:
            return Object.assign({}, state, { message: 'Hello, World!' });
        case hello_1.RESET:
            return state = initialState;
        default:
            return state;
    }
};
var hello = redux_1.combineReducers({
    helloWorld: helloWorld
});
exports.default = hello;
//# sourceMappingURL=hello.js.map