import { postBuildScript, publishScript } from 'js2me-exports-post-build-script';

postBuildScript({
  buildDir: 'dist',
  rootDir: '.',
  srcDirName: 'src',
  filesToCopy: ['LICENSE', 'README.md', 'assets'],
  updateVersion: process.env.PUBLISH_VERSION,
  onDone: (versionsDiff, packageJson) => {
    if (process.env.PUBLISH) {
      publishScript({
        targetPackageJson: packageJson,
        nextVersion: versionsDiff?.next ?? packageJson.data.version,
        packageManager: 'pnpm',
        commitAllCurrentChanges: true,
        createTag: true,
        cleanupCommand: 'pnpm clean', 
      })
    }
  }
});

