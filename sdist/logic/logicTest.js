"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestSvc = /** @class */ (function () {
    function TestSvc(querySvc) {
        this.querySvc = querySvc;
    }
    TestSvc.prototype.test = function () {
        return this.querySvc.insertTest([]);
    };
    return TestSvc;
}());
exports.default = TestSvc;
//# sourceMappingURL=logicTest.js.map