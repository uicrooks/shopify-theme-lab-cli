#!/usr/bin/env node

const { program } = require('commander')
const package = require('../package.json')

program
  .version(package.version, '-v, --version', 'output the version number')

program.parse(process.argv)