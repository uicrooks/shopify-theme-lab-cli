const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const yaml = require('yaml')
const axios = require('axios')
const themeKit = require('@shopify/themekit')

module.exports = async (cmd) => {
  /**
   * variables
   */
  const options = cmd.opts()
  const currentDirectory = process.cwd()
  const configPath = path.resolve(__dirname, `${currentDirectory}/shopify/shopify.${options.env}.yml`)
  let themeId // assigned after remote initialization

  /**
   * check env value
   */
  if (!options.env.match(/^(dev|live)$/)) {
    console.error(chalk`{red env should be {inverse dev} or {inverse live}}`)
    process.exit()
  }

  /**
   * initialize local config and a remote Shopify theme
   */
  const initTheme = async () => {
    // initialize empty theme on shopify store
    try {
      const response = await axios.post(
        `https://${options.store}/admin/api/2020-10/themes.json`,
        { theme: { name: options.name } },
        { headers: { 'X-Shopify-Access-Token': options.password } }
      )

      // assign theme id
      themeId = response.data.theme.id.toString()
    } catch (e) {
      console.error(chalk`{red ${e}}`)
      process.exit()
    }

    // create yaml config
    const yamlConfig = yaml.stringify({
      [options.env]: {
        password: options.password,
        theme_id: themeId,
        store: options.store,
        directory: 'shopify',
        ignores: [
          '.config/shopify/.shopifyignore'
        ]
      }
    })

    // write Shopify config file
    try {
      await fs.outputFile(configPath, yamlConfig)
    } catch (e) {
      console.error(chalk`{red ${e}}`)
      process.exit()
    }

    // write settings_data.json to shopify/config
    try {
      const settingsData = {
        current: 'Default',
        presets: {
          Default: {
            sections: {
              'dynamic-section': {
                type: 'dynamic-section',
                category: 'Text'
              }
            },
            content_for_index: [
              'dynamic-section'
            ]
          }
        }
      }

      const settingsFilePath = path.resolve(__dirname, `${currentDirectory}/shopify/config/settings_data.json`)

      // check if settings_data.json already exists and if not then create that file
      if (!fs.existsSync(settingsFilePath)) {
        await fs.outputFile(settingsFilePath, JSON.stringify(settingsData, null, 2))
      }
    } catch (e) {
      console.error(chalk`{red ${e}}`)
      process.exit()
    }

    // upload Shopify theme to remote
    try {
      await themeKit.command('deploy', {
        config: configPath,
        env: options.env
      })
    } catch (e) {
      console.error(chalk`{red ${e}}`)
      process.exit()
    }

    console.log(chalk`{green ✓ theme successfully initialized}`)
  }

  /**
   * initialize theme
   */
  initTheme()
}