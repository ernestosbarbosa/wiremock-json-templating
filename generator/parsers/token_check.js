var camusjs = require('camusjs')

module.exports = {
	"*": "token_check",
	converter: function (template, options) {
		var token = {};

		if (options.token_invalido) {
			token = {
				"status": 401,
				"headers": {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json"
				},
				"jsonBody": {
					"error": "invalid_token",
					"error_description": "Invalid access token",
					"details": null
				}
			};
		}
		else {
			token = {
				"status": 200,
				"headers": {
					"Access-Control-Allow-Origin": "*"
				}
			};
		}

		token = camusjs.parse(token, options)

		return token
	}
}
