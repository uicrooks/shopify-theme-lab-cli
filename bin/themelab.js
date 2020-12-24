#!/usr/bin/env node

/**
 * require
 */
const { program } = require('commander')
const minimist = require('minimist')

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
  .command('create <directory>')
  .description('create a Shopify Theme Lab environment')
  .option('-r, --repo <url>', 'use a git repository url')
  .action((directory) => {
    require('../lib/create')(directory, minimist(process.argv.slice(3)))
  })

/**
 * arguments
 */
program.parse(process.argv)