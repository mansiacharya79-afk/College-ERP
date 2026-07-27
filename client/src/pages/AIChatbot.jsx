import { useState } from "react";
import api from "../api/axios";

function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chatbot", { message: input });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">AI Chatbot</h1>

        <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto mb-4 flex flex-col gap-3">
          {messages.length === 0 && <p className="text-slate-400 text-center mt-10">Ask me anything about the ERP, placements, or your career!</p>}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[75%] p-3 rounded-lg ${
                m.role === "user" ? "bg-blue-600 text-white self-end" : "bg-slate-100 text-slate-800 self-start"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && <div className="text-slate-400 text-sm">Thinking...</div>}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default AIChatbot;