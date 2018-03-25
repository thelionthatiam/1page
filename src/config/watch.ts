import { exec, spawn } from 'child_process'

function childProcess(string:string, cb:Function) {
  exec(string, function(error, stdout, stderr) {
    if (error) {
      cb(error)
    } else {
      cb(null, stdout, stderr);
    }
  })
}

childProcess('rollup -cw', (err:Error, stdout:string, stderr:string) => {
  console.log('rollup -cw')
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (err !== null) {
    console.log('exec error: ' + err);
  }
})
