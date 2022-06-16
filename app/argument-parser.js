const constants = require('./constants')

class ArgumentParser {
    getArgs () {
        return [
            {
                name: constants.inputName,
                value: process.env.INPUT,
            },
            {
                name: constants.outputName,
                value: process.env.OUTPUT,
            },
            {
                name: constants.sizeName,
                value: process.env.SIZE,
            },
        ]
    }
}

module.exports = ArgumentParser
