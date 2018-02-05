module.exports = function () {
	var camusjs = require('camusjs')
	var parsers = require('./parsers')

	parsers.forEach(parser => {
		camusjs.registerParser(parser)
	})
}
