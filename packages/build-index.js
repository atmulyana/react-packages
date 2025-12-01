/** 
 * https://github.com/atmulyana/react-packages
 **/
const {execSync: exec} = require('child_process');
const path = require('path');
const fs = require('fs');
const opt = {cwd: `${__dirname}${path.sep}${process.argv[2]}`};
try {
    console.log('Building....');
    exec('shx rm -f *.tsbuildinfo', opt);
    
    if (process.argv.length > 3) {
        const cfg = require('./tsconfig.cjs.json');
        cfg.references = [];
        for (let i = 3; i < process.argv.length; i++) {
            const dir = "../" + process.argv[i];
            cfg.references.push({path: dir + '/tsconfig.cjs.json'});
            if (fs.existsSync(dir + '/index.tsx')) fs.renameSync(dir + '/index.tsx', dir + '/index._tsx');
            if (fs.existsSync(dir + '/index.ts')) fs.renameSync(dir + '/index.ts', dir + '/index._ts');
        }
        fs.writeFileSync(
            opt.cwd + path.sep + 'tsconfig.cjs.json',
            JSON.stringify(cfg, null, 4)
        );
    }
    else {
        exec('shx cp -u ../tsconfig.cjs.json ./tsconfig.cjs.json', opt);
    }

    exec('shx cp -u ../tsconfig.esm.json ./tsconfig.esm.json', opt);
    exec('tsc -b tsconfig.esm.json', opt);
    exec('shx cp -f ./index.js ./index.mjs', opt);

    exec('tsc -b tsconfig.cjs.json', opt);

    if (process.argv.length > 3) {
        for (let i = 3; i < process.argv.length; i++) {
            const dir = "../" + process.argv[i];
            if (fs.existsSync(dir + '/index._tsx')) fs.renameSync(dir + '/index._tsx', dir + '/index.tsx');
            if (fs.existsSync(dir + '/index._ts')) fs.renameSync(dir + '/index._ts', dir + '/index.ts');
        }
    }

    console.log('Done!');
}
catch (err) {
    console.log(err);
    console.log(err.stdout.toString());
    console.log(err.stderr.toString());
}