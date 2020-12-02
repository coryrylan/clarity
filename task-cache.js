const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const exec = require('child_process').exec;
const { hashElement } = require('folder-hash');
const ignore = require('parse-gitignore');

const taskName = process.env.npm_lifecycle_event;
const task = process.argv[2];
const cacheDir = path.resolve(__dirname, process.cwd());
const projectDir = cacheDir.replace(__dirname, '');
const cacheKey = `${cacheDir}:${task}`; // crypto.createHash('sha1').update(`${cacheDir}:${task}`).digest('base64');
const cacheFile = path.resolve(__dirname, 'dist/.task-cache');
const exclude = ignore(fs.readFileSync(path.resolve(__dirname, '.gitignore'))).filter(p => p.substring(0, 1) !== '!');

const packageFile = fs.readJSONSync(`${cacheDir}/package.json`);

const deps = { ...packageFile.peerDependencies, ...packageFile.dependencies };
const localDeps = Object.keys(deps)
  .filter(p => deps[p] && deps[p].includes('./'))
  .map(p => ({ package: p, path: deps[p] }));

if (Object.keys(localDeps).length) {
  console.log(`🔥`, packageFile.name, localDeps);
}

const hashConfig = {
  folders: { exclude },
  files: { exclude },
  matchPath: true,
};

fs.ensureFileSync(cacheFile);

hashElement(cacheDir, hashConfig).then(input => {
  if (getCache()[cacheKey] !== input.hash) {
    console.log(`⌛ Changes detected in '${projectDir}' running task '${taskName}'`);
    // exec(task, err => {
    //   if (!err) {
    //     fs.writeJsonSync(cacheFile, { ...getCache(), [cacheKey]: input.hash }, { spaces: 2 });
    //     console.log(`✅ Task '${taskName}' complete 🎉`);
    //     process.exit(0);
    //   } else {
    //     console.log(`❌ Task '${taskName}' failed:`, err);
    //     process.exit(1);
    //   }
    // }).stdout.pipe(process.stdout);
  } else {
    console.log(`✅ No changes detected in '${projectDir}', skipping task '${taskName}'`);
  }
});

function getCache() {
  const cache = fs.readJsonSync(cacheFile, { throws: false });
  return cache ? cache : {};
}
