const express = require('express');
const OpenAI = require('openai');

const app = express();
const openai = new OpenAI({ apiKey: process.env.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 });

app.get('/chat', async (req, res) => {
  try {
    const prompt = req.query.message;
    if (!prompt) return res.status(400).send('Mesaj bulunamadi.');

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini',
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hata olustu: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda aktif.`));

