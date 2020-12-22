#!/usr/bin/env node

/**
 * require
 */
const { program } = require('commander')

/**
 * setup
 */
program
  .version(`Shopify Theme Lab CLI ${require('../package').version}`, '-v, --version', 'output the version number')
  .usage('<command> [options]')

/**
 * commands
 */
program
  .command('create <project-name>')
  .description('initialize a Shopify Theme Lab project')
  .action((projectName) => {
    require('../lib/create')(projectName)
  })

program
  .command('theme <repository>')
  .description('setup a theme from a GitHub repository')
  .action((repository) => {
    require('../lib/theme')(repository)
  })

/**
 * arguments
 */
program.parse(process.argv)