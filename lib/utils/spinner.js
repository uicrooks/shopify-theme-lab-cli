/**
 * require
 */
const ora = require('ora')

/**
 * spinner
 *
 * https://github.com/sindresorhus/ora
 * start: spinner.start('text')
 * stop: spinner.stop()
 */
const spinner = ora({
  color: 'yellow'
})

/**
 * export
 */
module.exports = spinner
