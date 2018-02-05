var fs = require('fs')

module.exports = function () {
	if (!fs.existsSync('mappings/temp')) {
		fs.mkdirSync('mappings/temp')
	}

	var registerParsers = require('./_register_parsers')
	registerParsers()
}
