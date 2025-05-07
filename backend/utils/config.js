require('dotenv').config()


const PORT = process.env.PORT
const ADDRESS = process.env.ADDRESS
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

module.exports = {
    OPENAI_API_KEY,
    PORT,
    ADDRESS,
}