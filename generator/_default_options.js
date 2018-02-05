module.exports = function () {
	var camusjs = require('camusjs')

	var hash_login = camusjs.parse({ '*': 'guid' })
	var access_token_auth_login = camusjs.parse({ '*': 'guid' })
	var refresh_token_auth_login = camusjs.parse({ '*': 'guid' })

	var options = {
		hash_login,
		access_token_auth_login,
		refresh_token_auth_login,
		prioridade_wiremock: 1
	}

	return options
}
