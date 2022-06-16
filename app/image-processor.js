const path = require('path')
const { promisify } = require('util')
const fs = require('fs')
const sharp = require('sharp')

const constants = require('./constants')

class ImageProcessor {
    args = []

    constructor (args) {
        if (!Array.isArray(args) || args.length < 1) {
            throw new Error('Args should be an array')
        }

        this.args = args
    }

    #prepareInputDir () {
        return this.args.find((arg) => arg.name === constants.inputName)?.value
    }

    #prepareOutputDir () {
        return this.args.find((arg) => arg.name === constants.outputName)?.value
    }

    #prepareSize () {
        const size = this.args.find((arg) => arg.name === constants.sizeName)?.value // 120x240
        return size.split('x').map(str => parseInt(str))
    }

    async #getInputDirFileNames (inputDir) {
        const readDirPromisified = promisify(fs.readdir)
        return readDirPromisified(inputDir)
    }

    async #readFile (inputFileName) {
        const readFilePromisified = promisify(fs.readFile)
        return readFilePromisified(inputFileName)
    }

    async #processImage (inputBuffer, outputDestination, size) {
        return new Promise((resolve, reject) => {
            sharp(inputBuffer)
                .negate()
                .affine([[1, 0.3], [0.1, 0.7]], {
                    background: 'white',
                    interpolate: sharp.interpolators.nohalo
                 })
                .resize(...size)
                .toFile(outputDestination, (err, info) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(info)
                })
        })
    }

    async process () {
        const inputDir = this.#prepareInputDir()
        const outputDir = this.#prepareOutputDir()
        const size = this.#prepareSize()
        const inputDirFileNames = await this.#getInputDirFileNames(inputDir)
        const promises = inputDirFileNames.map(async (fileName) => {
            const fullInputFileName = path.resolve(inputDir, fileName)
            const fullOutputFileName = path.resolve(outputDir, fileName)
            const fileContent = await this.#readFile(fullInputFileName)
            return this.#processImage(fileContent, fullOutputFileName, size)
        })
        return Promise.all(promises)
    }
}

module.exports = ImageProcessor
