const concurrently = require('concurrently')
const { API_DIR, runner, concurrentOpts, TEMPLATE_DIR } = require('./common')

let versionBump = []
let release = []

switch (process.argv[2]) {
  case 'patch':
    versionBump.push(
      {
        name: 'bump-api',
        command: `cd ${API_DIR} && ${runner} version patch && git add package.json package-lock.json`,
        prefixColor: 'red',
      },
      {
        name: 'bump-frontend',
        command: `cd ${TEMPLATE_DIR} && ${runner} version patch && git add package.json package-lock.json`,
        prefixColor: 'red',
      }
    )
    release.push({
      name: 'release:patch',
      command:
        "changelog -p && git add CHANGELOG.md && git commit -m 'docs: updated CHANGELOG.md' && npm version patch && git push origin && git push origin --tags",
      prefixColor: 'yellow',
    })
    break
  case 'minor':
    versionBump.push(
      {
        name: 'bump-api',
        command: `cd ${API_DIR} && ${runner} version minor && git add package.json package-lock.json`,
        prefixColor: 'red',
      },
      {
        name: 'bump-frontend',
        command: `cd ${TEMPLATE_DIR} && ${runner} version minor && git add package.json package-lock.json`,
        prefixColor: 'red',
      }
    )
    release.push({
      name: 'release:minor',
      command:
        "changelog -m && git add CHANGELOG.md && git commit -m 'docs: updated CHANGELOG.md' && npm version minor && git push origin && git push origin --tags",
      prefixColor: 'yellow',
    })
    break
  case 'major':
    versionBump.push(
      {
        name: 'bump-api',
        command: `cd ${API_DIR} && ${runner} version major && git add package.json package-lock.json`,
        prefixColor: 'red',
      },
      {
        name: 'bump-frontend',
        command: `cd ${TEMPLATE_DIR} && ${runner} version major && git add package.json package-lock.json`,
        prefixColor: 'red',
      }
    )
    release.push({
      name: 'release:major',
      command:
        "changelog -M && git add CHANGELOG.md && git commit -m 'docs: updated CHANGELOG.md' && npm version major && git push origin && git push origin --tags",
      prefixColor: 'yellow',
    })
    break
  default:
    break
}

concurrently(versionBump, concurrentOpts)
  .then(() => concurrently(release, concurrentOpts))
  .catch((e) => {
    console.error(e.message)
  })
