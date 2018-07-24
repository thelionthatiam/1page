"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
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
childProcess('rollup -cw', (err, stdout, stderr) => {
    console.log('rollup -cw');
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (err !== null) {
        console.log('exec error: ' + err);
    }
});
//# sourceMappingURL=watch.js.map