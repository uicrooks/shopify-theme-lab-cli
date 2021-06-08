const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const clone = require('git-clone')
const spinner = require('./utils/spinner')
const inquirer = require('inquirer')
const config = require('./config')

module.exports = async (directory, cmd) => {
  const options = cmd.opts()
  const currentDirectory = process.cwd()
  const targetDirectory = path.resolve(__dirname, `${currentDirectory}/${directory}`)
  let repo

  if (options.preset) {
    const answer = await inquirer.prompt([
      {
        name: 'preset',
        message: 'Choose a preset to create from',
        type: 'list',
        choices: config.presets
      }
    ])

    repo = answer.preset
  } else {
    repo = options.repo || config.repo.env
  }

  spinner.start()

  clone(repo, targetDirectory, {} , async (e) => {
    if (e) {
      spinner.fail(chalk`{red Error: ${e}}`)
      process.exit()
    }

    // remove .git directory
    try {
      await fs.remove(path.resolve(targetDirectory, '.git'))
    } catch (e) {
      // do nothing
    }

    spinner.succeed(chalk`{green successfully created Shopify Theme Lab environment}`)
  })
}