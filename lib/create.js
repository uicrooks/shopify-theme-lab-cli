const path = require('path')
const clone = require('git-clone')

module.exports = (projectName) => {
  const currentDirectory = process.cwd()
  const targetDirectory = projectName.replace(/\s/, '-')
  const destination = path.resolve(__dirname, `${currentDirectory}/${targetDirectory}`)

  clone('https://github.com/uicrooks/shopify-theme-lab.git', destination, { shallow: true })
}