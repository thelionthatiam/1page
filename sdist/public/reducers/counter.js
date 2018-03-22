"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    current: 0,
    total: 0
};
function counter(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case 'INCREMENT':
            return {
                current: state.current + 1,
                total: state.total + 1
            };
        case 'DECREMENT':
            return {
                current: state.current - 1,
                total: state.total + 1
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}
exports.default = counter;
//# sourceMappingURL=counter.js.map