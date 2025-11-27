import { useState } from "react";
import "./ChatPanel.css";

export default function ChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy el asistente del Plan México. ¿Qué te gustaría saber?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    // Aquí luego conectamos la IA
    setMessages([
      ...newMessages,
      { role: "assistant", content: "Estoy procesando tu pregunta…" }
    ]);

    setInput("");
  };

  return (
    <div className={`chat-panel ${open ? "open" : ""}`}>

      <div className="chat-header">
        <img src="/AsistenteVirtual.png" alt="avatar" className="chat-avatar" />
        <span>Asistente Plan México</span>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>{msg.content}</div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta…"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>→</button>
      </div>

    </div>
  );
}
