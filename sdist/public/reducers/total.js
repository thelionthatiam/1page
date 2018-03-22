"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function total(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'PRESSED':
            return state + 1;
        case 'RESET':
            return 0;
        default:
            return state;
    }
}
exports.default = total;
//# sourceMappingURL=total.js.map