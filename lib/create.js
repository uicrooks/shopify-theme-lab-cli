const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const clone = require('git-clone')
const spinner = require('./utils/spinner')
const config = require('./config')

module.exports = async (directory, ...[argv]) => {
  spinner.start()

  const currentDirectory = process.cwd()
  const targetDirectory = path.resolve(__dirname, `${currentDirectory}/${directory}`)
  const repo = argv.r || argv.repo || config.repo.env

  clone(repo, targetDirectory, {} , async (e) => {
    if (e) {
      spinner.fail(chalk`{red ${e}}`)
      process.exit()
    }

    // remove .git directory
    await fs.remove(path.resolve(targetDirectory, '.git'))

    spinner.succeed(chalk`{green successfully created Shopify Theme Lab environment}`)
  })
}