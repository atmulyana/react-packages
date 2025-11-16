/** 
 * https://github.com/atmulyana/react-packages
 **/
const {execSync: exec} = require('child_process');
const path = require('path');
const opt = {cwd: `${__dirname}${path.sep}${process.argv[2]}`};
try {
    console.log('Building....');
    exec('shx rm -f *.tsbuildinfo', opt);
    exec('shx cp -u ../tsconfig.cjs.json ./tsconfig.cjs.json', opt);
    exec('shx cp -u ../tsconfig.esm.json ./tsconfig.esm.json', opt);
    exec('tsc -b tsconfig.esm.json', opt);
    exec('shx cp -f ./index.js ./index.mjs', opt);
    exec('tsc -b tsconfig.cjs.json', opt);
    console.log('Done!');
}
catch (err) {
    console.log(err);
    console.log(err.stdout.toString());
    console.log(err.stderr.toString());
}