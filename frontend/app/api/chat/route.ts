import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // ✅ System prompt ograniczający tematykę
    const systemPrompt = {
      role: "system",
      content: `Jesteś asystentem psychologicznym. Możesz odpowiadać tylko na pytania związane z psychologią, samopoczuciem, emocjami, terapią i umawianiem się na wizyty z psychologiem. 
Nie udzielasz informacji ani porad z innych dziedzin. 
Jeśli użytkownik zada pytanie spoza zakresu psychologii, uprzejmie przeproś i powiedz, że możesz rozmawiać tylko o tematach psychologicznych.`,
    };

    const fullMessages = [systemPrompt, ...messages];

    const result = await streamText({
      model: deepseek('deepseek-reasoner'),
      messages: fullMessages,
      maxRetries: 2,
      temperature: 0.7,
    });

    return result.toDataStreamResponse({
      sendReasoning: false,
    });
  } catch (error) {
    console.error('[AI STREAM ERROR]', error);
    return new Response(JSON.stringify({ error: 'AI streaming failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
