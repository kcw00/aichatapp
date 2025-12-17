const express = require('express')
const OpenAI = require('openai')
// const cors = require('cors') // CORS is now handled by nginx

const config = require('./utils/config')


const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY,
})

const app = express()

// gpt-4o model does not exist -> try codes below to see my available models
//const models = await openai.models.list()
//console.log(models.data) // This will log all available models
// CORS is now handled by nginx, no need for Express CORS middleware
// app.use(cors(corsOptions))
app.use(express.static('dist')) // 'use this landing page' to the backend (express)
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // derive data that received from frontend



app.post('/api/:userQuestion', async (req, res) => {
    var userQuestion = req.params.userQuestion
    // call open ai api
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: userQuestion },
        ],
    })

    // console.log(completion)

    res.json(completion.choices[0].message.content) // text data send back
})


app.listen(config.PORT, () => {
    console.log('Express Server running on http://' + config.ADDRESS + ':' + config.PORT)
})

