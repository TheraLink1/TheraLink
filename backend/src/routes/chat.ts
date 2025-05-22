import axios from 'axios';
import express from 'express';

const router = express.Router();

// Konfiguracja OpenRouter
const OPENROUTER_API_KEY = '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'; // Pobierz z https://openrouter.ai/keys
const DEEPSEEK_MODEL = 'deepseek/deepseek-r1:free';

// Endpoint dla chatbota psychologicznego
router.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Dodaj kontekst specjalizacji psychologicznej
    const systemPrompt = `Jesteś pomocnym asystentem psychologicznym. Twoje zadania:
    1. Odpowiadaj na pytania z zakresu psychologii w sposób profesjonalny i empatyczny
    2. Na podstawie opisu problemu zarekomenduj specjalistę (np. psychologa poznawczo-behawioralnego, terapeutę par itp.)
    3. Podawaj jedynie sprawdzone informacje
    
    Zasady:
    - Jeśli pytanie dotyczy poważnych problemów (myśli samobójcze, przemoc), natychmiast zalecaj kontakt z profesjonalistą
    - Nie stawiaj diagnoz, tylko sugeruj możliwości`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: DEEPSEEK_MODEL,
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error calling DeepSeek:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

export default router;