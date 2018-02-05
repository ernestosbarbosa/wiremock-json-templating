var fs = require('fs')
var prepare = require('./_prepare')
var generator = require('./_generator')
var utils = require('./_utils')

prepare()

utils.deleteFolder('mappings/temp')
fs.mkdirSync('mappings/temp')

var cenarios = fs.readdirSync('mappings/cenarios')
	.filter(file => {
		return file.endsWith('.metadata')
	})
	.map(file => {
		var content = fs.readFileSync(`mappings/cenarios/${file}`).toString()
		return JSON.parse(content)
	})

cenarios.forEach(options => {
	generator(options)
})


