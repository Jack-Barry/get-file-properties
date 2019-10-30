const path = require('path')
const git = require('git-state')
const chalk = require('chalk')

const rootDir = path.resolve(__dirname, '..')

git.check(rootDir, (err, res) => {
  if (err) throw err

  if (res.dirty !== 0) {
    console.log(
      chalk.red.bold(
        'Please commit changes before pushing to the central repo.'
      )
    )
    process.exit(1)
  }
})
