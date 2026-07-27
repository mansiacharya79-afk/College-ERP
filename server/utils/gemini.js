const generateText = async (prompt) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Groq API request failed");
  }
  return data.choices[0].message.content;
};

const generateJSON = async (prompt) => {
  const strictPrompt = `${prompt}\n\nRespond ONLY with valid JSON. No markdown fences, no preamble.`;
  const raw = await generateText(strictPrompt);
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
};

module.exports = { generateText, generateJSON };