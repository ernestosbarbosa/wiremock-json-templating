function buildOptions(options) {
	var defOptions = require('./_default_options')()
	options = Object.assign(defOptions, options)

	return options
}

module.exports = function(options, inDir) {
	var fs = require('fs')
	var camusjs = require('camusjs')

	options = buildOptions(options)

	inDir = inDir || 'temp'

	var targetDir = `mappings/${inDir}/${options.login}`

	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir)
	}

	fs.readdirSync('generator/templates')
		.filter(file => file.endsWith('.json'))
		.forEach(file => {
			var filePath = `${targetDir}/${file}`

			if (!fs.existsSync(filePath)) {
				var template = fs.readFileSync(`generator/templates/${file}`).toString()
				template = JSON.parse(template)

				var generated = camusjs.parse(template, options)

				fs.writeFileSync(filePath, JSON.stringify(generated, null, 4))
			}
		})

	var metadata = JSON.stringify(options, null, 4)
	fs.writeFileSync(`${targetDir}/metadata`, metadata)
}
