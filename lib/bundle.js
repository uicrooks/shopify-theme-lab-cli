const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const spinner = require('./utils/spinner')

module.exports = async () => {
  // find errors
  const findErrors = () => {
    let errors

    [
      'package.json',
      'shopify/',
      'src/'
    ].forEach(el => {
      if (!fs.existsSync(el)) {
        console.error(chalk.red(`${el} not found in current directory`))
        errors = true
      }
    })

    if (errors) process.exit()
  }

  findErrors()
  spinner.start()

  // assign variables
  const currentDirectory = process.cwd()
  const targetDirectory = path.resolve(__dirname, `${currentDirectory}/theme`)
  const packageJSON = require(path.resolve(currentDirectory, 'package.json'))

  const themelabJSON = {
    type: 'theme',
    name: packageJSON.name || '',
    description: packageJSON.description || '',
    author: packageJSON.author || '',
    version: packageJSON.version || '',
    license: packageJSON.license || '',
    dependencies: packageJSON.dependencies || {},
  }

  // create themlab.json
  try {
    await fs.outputFile(path.resolve(targetDirectory, 'themelab.json'), JSON.stringify(themelabJSON, null, 2))
  } catch (e) {
    console.error(chalk.red('el'))
  }

  // copy shopify and src directories
  try {
    await fs.copy(path.resolve(currentDirectory, 'shopify'), path.resolve(targetDirectory, 'shopify'))
    await fs.copy(path.resolve(currentDirectory, 'src'), path.resolve(targetDirectory, 'src'))
  } catch (e) {
    console.error(chalk.red('el'))
  }

  spinner.stop()
  console.log(chalk.green(`✓ Shopify Theme Lab theme successfully bundled to theme directory`))
}