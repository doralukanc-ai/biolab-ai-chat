import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/v1/`
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
      messages: [
        {
          role: "system",
          content: `OVDJE STAVI UPUTE SVOG AGENTA IZ AZURE FOUNDRY`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.status(200).json({
      reply: response.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
