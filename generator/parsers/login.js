var camusjs = require('camusjs')

module.exports = {
    "*": "login",
    converter: function (template, options) {
        if (options.invalid_pass) {
            return camusjs.parse(
                {
                    "status": 401,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    },
                    "jsonBody":
                    {
                        "error": "invalid_request",
                        "error_description": "Senha inválida. Você ainda possui 4 tentativa(s).",
                        "details": {
                            "captcha": "true"
                        }
                    }

                }
                , options)
        }
        else {
            var template = {
                "status": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                "jsonBody": {
                    "access_token": {
                        "*": "option_value",
                        "property": "access_token_auth_login"
                    },
                    "expires_in": 0,
                    "refresh_token": {
                        "*": "option_value",
                        "property": "refresh_token_auth_login"
                    },
                    "scope": "string",
                    "token_type": "Bearer"
                }
            };

            var scopes = [];
            scopes.push("site", "string")

            template.jsonBody.scope = scopes.join(" ")

            return camusjs.parse(template, options)
        }
    }
}