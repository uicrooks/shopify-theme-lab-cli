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
  .command('bundle')
  .description('create a sharable Shopify Theme Lab theme')
  .option('-z, --zip', 'zip the theme')
  .action(() => {
    require('../lib/bundle')(process.argv.slice(3))
  })

/**
 * arguments
 */
program.parse(process.argv)