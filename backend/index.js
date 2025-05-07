import express from "express"
import OpenAI from "openai"

const config = require('./utils/config')

const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY,
})


const app = express()

// gpt-4o model does not exist -> try codes below to see my available models
//const models = await openai.models.list()
//console.log(models.data) // This will log all available models

app.use(express.static('dist')) // 'use this landing page' to the backend (express)
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // derive data that received from frontend

// express route to support questions from the frontend
app.post('/:userQuestion', async (req, res) => {
    var userQuestion = req.params.userQuestion
    // call open ai api
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: userQuestion },
        ],
    })

    res.json(completion.choices[0].message.content) // text data send back
})

app.listen(3000, () => {
    console.log('Express Server running on http://localhost:3000')
})

