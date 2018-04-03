"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function appLayout(req, res, next) {
    res.locals.layout = 'app';
    console.log('choose layout running');
    next();
}
exports.default = appLayout;
//# sourceMappingURL=choose-layout.js.map