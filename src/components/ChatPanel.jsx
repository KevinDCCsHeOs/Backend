import { useState, useRef, useEffect } from "react";
import "./ChatPanel.css"; // 👈 Esta línea es la que necesita el archivo CSS de arriba

export default function ChatPanel({ open, onClose }) {
  // Estado de los mensajes
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy el asistente del Plan México. ¿Qué te gustaría saber?" }
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); 

  // Referencia para el scroll automático
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return; 

    const question = input;
    setInput("");     
    setLoading(true); 

    // 1. Agregamos mensaje usuario
    setMessages(prev => [...prev, { role: "user", content: question }]);

    // 2. Mensaje temporal
    setMessages(prev => [...prev, { role: "assistant", content: "Analizando..." }]);

    try {
      // 3. Petición DIRECTA al backend (Puerto 3000)
      const response = await fetch('http://127.0.0.1:3000/api/chat/plan-mexico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pregunta: question,
          perfil_id: 1 
        })
      });

      if (!response.ok) throw new Error("Error en la conexión");

      const data = await response.json();

      // 4. Actualizamos con la respuesta real
      setMessages(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { 
          role: "assistant", 
          content: data.respuesta || "No encontré información." 
        };
        return newHistory;
      });

    } catch (error) {
      console.error("Error en el chat:", error);
      setMessages(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { 
          role: "assistant", 
          content: "Error de conexión. Asegúrate que el backend (puerto 3000) esté corriendo." 
        };
        return newHistory;
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={`chat-panel ${open ? "open" : ""}`}>

      <div className="chat-header">
        <img 
          src="/AsistenteVirtual.png" 
          alt="avatar" 
          className="chat-avatar" 
          onError={(e) => { e.target.src = "https://via.placeholder.com/30" }}
        />
        <span>Asistente Plan México</span>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={loading ? "Pensando..." : "Escribe tu pregunta..."}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          disabled={loading} 
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "→"}
        </button>
      </div>

    </div>
  );
}