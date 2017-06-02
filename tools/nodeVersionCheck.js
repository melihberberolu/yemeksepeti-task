const exec = require('child_process').exec;

exec('node -v', (err, stdout, stderr) => {
  if (err) {
    throw err;
  }
  if (parseFloat(stdout) < 6) {
    throw new Error('ERROR: node 6.0 or greater.');
    process.exit(1);
  }
  else {
    console.log(`Node version is ${stdout}\nOK!\n\n`);
  }
});
