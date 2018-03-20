"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'PRESSED':
            return state + 1;
        case 'RESET':
            return 0;
        default:
            return state;
    }
};
//# sourceMappingURL=total.js.map