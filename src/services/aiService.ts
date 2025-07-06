import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || "PUT_YOUR_OPEN_API_KEY",
  dangerouslyAllowBrowser: true,
});

export async function interpretVoiceCommand(text: string): Promise<{
  action: string;
  field?: string;
  value?: string;
  route?: string;
}> {
  const prompt = `
You are a voice assistant for a React contact form app. 
Given a natural sentence from the user, extract the intent and return a JSON object with:

{
  "action": "navigate" | "fill_form" | "submit_form" | "none",
  "field": "name" | "email" | "phone" | "message",   // only for fill_form
  "value": "value to fill",                          // only for fill_form
  "route": "/", "/products", "/contact"             // only for navigate
}

Examples:

- "Set my name to Rahul" → fill_form name Rahul
- "My email is rahul@example.com" → fill_form email rahul@example.com
- "Phone number is 9876543210" → fill_form phone 9876543210
- "The message is Hello team, I am interested" → fill_form message Hello team, I am interested
- "Submit it now" → submit_form
- "Show me contact page" → navigate /contact
- "Go to products" → navigate /products

Now, only return the JSON. 
User said: "${text}"
`;

  try {
    const chat = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const result = chat.choices[0].message.content || "{}";
    return JSON.parse(result);
  } catch (e) {
    console.error("OpenAI error:", e);
    return { action: "none" };
  }
}
