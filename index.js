const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.AQ.Ab8RN6LXpfAEU6GmgOb6qFFJnDauu2bJEodIwxSg3nzkkrcFlA });

app.get('/chat', async (req, res) => {
  try {
    const prompt = req.query.message;
    if (!prompt) return res.status(400).send('Mesaj bulunamadi.');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.send(response.text);
  } catch (error) {
    res.status(500).send('Hata olustu.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda aktif.`));
