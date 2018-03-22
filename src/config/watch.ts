import { exec } from 'child_process'
// test
function childProcess(string:string, cb:Function) {
  exec(string, function(error, stdout, stderr) {
    if (error) {
      cb(error)
    } else {
      cb(null, stdout, stderr);
    }
  })
}

childProcess('sudo rollup --config --watch', (err:Error, stdout:string, stderr:string) => {
  err ? console.log(stderr) : stdout;
})
