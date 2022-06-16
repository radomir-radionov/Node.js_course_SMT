require('dotenv').config()
const app = require('./app/main')

async function main () {
    console.time('Application duration')
    await app()
    console.timeEnd('Application duration')
}

main()
