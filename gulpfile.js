const gulp = require('gulp');
const { exec, spawn } = require('child_process');

gulp.task('rollup', () => {return rollupCmd});

rollupCmd = spawn('rollup', ['-cw']);

rollupCmd.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
});

rollupCmd.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});

rollupCmd.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
});



gulp.task('typescript', () => {return tsCmd})

tsCmd = spawn('tsc')

tsCmd.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
});

tsCmd.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});

tsCmd.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.ts', gulp.parallel('typescript'))
})
