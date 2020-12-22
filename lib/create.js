const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const clone = require('git-clone')
const spinner = require('./utils/spinner')

module.exports = async (projectName) => {
  const currentDirectory = process.cwd()
  const targetDirectory = projectName.replace(/\s/, '-')
  const destination = path.resolve(__dirname, `${currentDirectory}/${targetDirectory}`)

  if (fs.existsSync(destination)) {
    console.error(chalk.red('directory already exists'))
    process.exit()
  }

  spinner.start()

  await clone('https://github.com/uicrooks/shopify-theme-lab.git', destination, {} , async () => {
    await fs.remove(path.resolve(destination, '.git')) // remove .git directory
    
    console.log(chalk.green('✓ Shopify Theme Lab project successfully created'))
    spinner.stop()
  })
}