const fse = require('fs-extra');
const path = require('path');

const baseDir = path.resolve('.');
const buildDir = path.resolve(baseDir, 'build', 'ol');

async function main() {
  const pkg = await fse.readJSON(path.resolve(baseDir, 'package.json'));

  // update the version number in util.js
  const utilPath = path.join(buildDir, 'util.js');
  const versionRegEx = /var VERSION = '(.*)';/g;
  let utilSrc = await fse.readFile(utilPath, 'utf-8');
  utilSrc = utilSrc.replace(versionRegEx, `var VERSION = '${pkg.version}';`);
  await fse.writeFile(utilPath, utilSrc, 'utf-8');

  // write out simplified package.json
  pkg.main = 'index.js';
  delete pkg.scripts;
  delete pkg.devDependencies;
  delete pkg.style;
  delete pkg.eslintConfig;
  delete pkg.private;
  await fse.writeJSON(path.join(buildDir, 'package.json'), pkg, {spaces: 2});

  // copy in readme and license files
  await fse.copyFile(
    path.resolve(baseDir, 'README.md'),
    path.join(buildDir, 'README.md')
  );

  await fse.copyFile(
    path.resolve(baseDir, 'LICENSE.md'),
    path.join(buildDir, 'LICENSE.md')
  );
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`, () => process.exit(1));
});
