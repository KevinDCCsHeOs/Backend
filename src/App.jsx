import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { useEffect, useState } from "react";   // ← Agregamos useState
import { supabase } from "./supabaseClient";

import PrivateRoute from "./routes/PrivateRoute.jsx";
import AsistenteFlotante from "./components/AsistenteFlotante.jsx";
import ChatPanel from "./components/ChatPanel.jsx";
/* Páginas */
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Mapa from "./pages/Mapa.jsx";
import Paseo3D from "./pages/Paseo3D";
import Dashboard from "./pages/Dashboard";
import Estudiante from "./pages/Estudiante";
import Nahuatl from "./pages/Nahuatl";
import Audio from "./pages/Audio";



/* Sidebar */
import Sidebar from "./components/Sidebar";

function App() {

  const [chatOpen, setChatOpen] = useState(false);   // 👈 CONTROL DEL CHAT

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Sesion cambiada:", session);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Hacemos la función accesible para el botón flotante
  window.openChat = () => setChatOpen(true);

  return (
    <BrowserRouter>
      
      <Sidebar />

      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* PRIVADAS */}
        

        <Route path="/paseo" element={
          <PrivateRoute><Paseo3D /></PrivateRoute>
        }/>

        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        }/>

        <Route path="/estudiante" element={<Estudiante />} />


        <Route path="/nahuatl" element={<Nahuatl />} />

         <Route path="/audio" element={<Audio />} />

         <Route path="/mapa" element={<Mapa />} />
      </Routes>

     



      {/* BOTÓN FLOTANTE */}
      <AsistenteFlotante onClick={() => setChatOpen(true)} />

      {/* PANEL DE CHAT (aparece si chatOpen=true) */}
      <ChatPanel 
        open={chatOpen} 
        onClose={() => setChatOpen(false)} 
      />

    </BrowserRouter>
  );
}

export default App;
