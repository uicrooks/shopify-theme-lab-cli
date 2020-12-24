#!/usr/bin/env node

/**
 * require
 */
const { program } = require('commander')

/**
 * setup
 */
program
  .storeOptionsAsProperties(false)
  .version(`Shopify Theme Lab CLI ${require('../package').version}`, '-v, --version', 'output the version number')
  .usage('<command> [options]')

/**
 * commands
 */
program
  .command('create <directory>')
  .description('create a Shopify Theme Lab environment')
  .option('-r, --repo <url>', 'use a git repository url')
  .action((directory, cmd) => {
    require('../lib/create')(directory, cmd)
  })

program
  .command('shopify:init')
  .description('initialize theme on remote Shopify store and a local config')
  .requiredOption('-p, --password <password>', 'Shopify plugin API password')
  .requiredOption('-s, --store <store>', '[your-store].myshopify.com')
  .option('-e, --env <env>', 'Environment [dev] or [live]', 'dev')
  .option('-n, --name <name>', 'Theme name', 'Shopify Theme Lab')
  .option('-i, --id <id>', 'If you provide a theme id, the command only creates a local config')
  .action((cmd) => {
    require('../lib/shopify-init')(cmd)
  })

/**
 * arguments
 */
program.parse(process.argv)