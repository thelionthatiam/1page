"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestSvc = /** @class */ (function () {
    function TestSvc(querySvc, inputs) {
        this.querySvc = querySvc;
        this.inputs = inputs;
    }
    TestSvc.prototype.testPost = function () {
        return this.querySvc.insertTest([this.inputs.test]);
    };
    TestSvc.prototype.testGet = function () {
        return this.querySvc.selectTest();
    };
    return TestSvc;
}());
exports.default = TestSvc;
//# sourceMappingURL=logic-test.js.map