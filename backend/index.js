import express from "express";

import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: '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'
  });
const app = express();

// gpt-4o model does not exist -> try below codes to see my available models
//const models = await openai.models.list();
//console.log(models.data); // This will log all available models

app.use(express.static('dist')); // 'use this landing page' to the backend (express)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // derive data that received from frontend

// express route to support questions from the frontend
app.post('/:userQuestion', async(req, res) => { // await -> async function
    var userQuestion = req.params.userQuestion;
    // call open ai api
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: userQuestion },
        ],
    });

    res.json(completion.choices[0].message.content); // text data send back
});

app.listen(3000, () => {
    console.log('Express Server running on http://localhost:3000');
})

