"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSvc {
    constructor(querySvc, inputs) {
        this.querySvc = querySvc;
        this.inputs = inputs;
    }
    testPost() {
        return this.querySvc.insertTest([this.inputs.test]);
    }
    testGet() {
        return this.querySvc.selectTest();
    }
}
exports.default = TestSvc;
//# sourceMappingURL=logic-test.js.map