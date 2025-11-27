import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón lo controla el Header */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        <nav className="sidebar-links">
          <a href="/">Inicio</a>
          <a href="/mapa">Mapa</a>
          <a href="/paseo">Recorrido 3D</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/login">Iniciar sesión</a>
        </nav>
      </div>

      {/* Exponer función global para el Header */}
      {window.openSidebar === undefined && (window.openSidebar = () => setOpen(true))}
    </>
  );
}
