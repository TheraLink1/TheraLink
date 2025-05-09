export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Normalize messages (make sure assistant messages don't break)
    const cleanMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content || msg.parts?.[0]?.text || "", // fallback
    }));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // update for prod
        "X-Title": "MyChatbot",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: cleanMessages,
        stream: false,
      }),
    });

    const data = await response.json();

    const replyMessage = data.choices?.[0]?.message;

    if (!replyMessage || !replyMessage.content) {
      return new Response(
        JSON.stringify({ error: "No valid message from model." }),
        { status: 500 }
      );
    }

    // Convert to OpenAI-compatible response format w/ `parts`
    return new Response(
      JSON.stringify({
        id: data.id,
        object: "chat.completion",
        created: data.created,
        model: data.model,
        choices: [
          {
            index: 0,
            finish_reason: data.choices[0].finish_reason ?? "stop",
            message: {
              role: "assistant",
              content: replyMessage.content,
              parts: [
                {
                  type: "text",
                  text: replyMessage.content,
                },
              ],
            },
          },
        ],
        usage: {
          prompt_tokens: data.usage?.prompt_tokens ?? 0,
          completion_tokens: data.usage?.completion_tokens ?? 0,
          total_tokens: data.usage?.total_tokens ?? 0,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ API Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
