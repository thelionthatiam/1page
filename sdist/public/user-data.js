"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POPULATE = 'POPULATE';
function populate(userData) {
    console.log('~~~~~~~~~~~~~~~~~~.6 userData', userData);
    return {
        type: exports.POPULATE,
        userData: userData
    };
}
exports.populate = populate;
//# sourceMappingURL=user-data.js.map