var prepare = require('./_prepare')
var defaultOptions = require('./_default_options')
var generator = require('./_generator')
var utils = require('./_utils')

prepare()

var options = defaultOptions()
generator(options)
