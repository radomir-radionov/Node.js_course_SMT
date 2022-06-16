const ArgumentParser = require('./argument-parser')
const ImageProcessor = require('./image-processor')

async function main () {
    const argumentParser = new ArgumentParser()
    const args = argumentParser.getArgs()
    const imageProcessor = new ImageProcessor(args)
    return imageProcessor.process()
}


module.exports = main
