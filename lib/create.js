const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const clone = require('git-clone')
const spinner = require('./utils/spinner')
const config = require('./config')

module.exports = async (directory) => {
  const currentDirectory = process.cwd()
  const targetDirectory = directory.replace(/\s/, '-')
  const destinationPath = path.resolve(__dirname, `${currentDirectory}/${targetDirectory}`)

  if (fs.existsSync(destinationPath)) {
    console.error(chalk.red('directory already exists'))
    process.exit()
  }

  await clone(config.repo.env, destinationPath, {} , async () => {
    spinner.start()

    await fs.remove(path.resolve(destinationPath, '.git')) // remove .git directory

    console.log(chalk.green(`✓ Shopify Theme Lab project successfully created in ${targetDirectory} directory`))
    spinner.stop()
  })
}