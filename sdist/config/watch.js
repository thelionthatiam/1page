"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
// test
function childProcess(string, cb) {
    child_process_1.exec(string, function (error, stdout, stderr) {
        if (error) {
            cb(error);
        }
        else {
            cb(null, stdout, stderr);
        }
    });
}
childProcess('sudo rollup -cw', function (err, stdout, stderr) {
    err ? console.log(stderr) : stdout;
});
//# sourceMappingURL=watch.js.map