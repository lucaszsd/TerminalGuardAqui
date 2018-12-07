var spawnSync = require('child_process').spawnSync;
 
var result = spawnSync('node',
                       ['teste.js'],
                       {input: 'write this to stdin'});
 
if (result.status !== 0) {
  process.stderr.write(result.stderr);
  process.exit(result.status);
} else {
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
}