module.exports = {
    "*": "prioridade_wiremock",
    converter: function (template, options) {
        if (options.prioridade_wiremock === undefined) {
            return 1
        } else {
            return options.prioridade_wiremock
        }
    }
}