import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { getCurrentUser } from "../auth/authService";
import "./ExploraTuRegion.css"; // reutiliza tus estilos institucionales

const estados = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
  "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
  "Zacatecas"
];

const proyectosPorEstado = {
  veracruz: [
    {
      img: "/CorredorInteroceánico.png",
      titulo: "Corredor Interoceánico",
      desc: "Proyecto que conecta el Golfo con el Pacífico para impulsar comercio y movilidad.",
      beneficios: "Atrae inversión industrial, genera miles de empleos y convierte a la región en un punto clave del comercio mundial."
    },
    {
      img: "/ModernizacionCarreteras.jpg",
      titulo: "Modernización Carretera",
      desc: "Expansión de autopistas estratégicas para mejorar el transporte de mercancías.",
      beneficios: "Reduce costos logísticos, mejora la seguridad vial y acelera el desarrollo económico regional."
    },
    {
      img: "/EnergiayPuertos.jpg",
      titulo: "Energía y Puertos",
      desc: "Fortalecimiento de instalaciones portuarias y energéticas del sur de Veracruz.",
      beneficios: "Incrementa competitividad, atrae empresas extranjeras y promueve industrias de alto valor."
    }
  ],
  oaxaca: [
    {
      img: "/IndustriaLigeraDesarrolloLocal.jpeg",
      titulo: "Polo de Desarrollo",
      desc: "Zonas económicas con incentivos para industria ligera y desarrollo local.",
      beneficios: "Genera empleo local, impulsa MIPyMES y fomenta la inversión nacional e internacional."
    },
    {
      img: "/Turismo.jpg",
      titulo: "Turismo Sostenible",
      desc: "Infraestructura para turismo cultural, ecológico y comunitario.",
      beneficios: "Incrementa ingresos comunitarios y preserva la cultura y biodiversidad."
    },
    {
      img: "/Conectividad.jpg",
      titulo: "Conectividad Regional",
      desc: "Mejoras en transporte terrestre y aéreo.",
      beneficios: "Facilita el comercio, aumenta el flujo turístico y reduce tiempos de traslado."
    }
  ],
  chihuahua: [
    {
      img: "/ParqueIndustrial.jpg",
      titulo: "Nearshoring",
      desc: "Expansión de parques industriales para atraer empresas que buscan mover operaciones cerca de EE.UU.",
      beneficios: "Mejora económica inmediata, empleos bien pagados y crecimiento tecnológico."
    },
    {
      img: "/IndustriaAeroespacial.jpg",
      titulo: "Industria Aeroespacial",
      desc: "Desarrollo de manufactura avanzada para aviación y defensa.",
      beneficios: "Impulsa innovación, crea empleos especializados y atrae alianzas internacionales."
    },
    {
      img: "/LogisticaFronterisa.jpg",
      titulo: "Logística Fronteriza",
      desc: "Optimización de rutas de transporte y aduanas.",
      beneficios: "Agiliza exportaciones y convierte a Chihuahua en un nodo logístico clave."
    }
  ],
  puebla: [
    {
      img: "/Electromovilidad.jpg",
      titulo: "Electromovilidad",
      desc: "Proyectos para fortalecer la industria automotriz eléctrica.",
      beneficios: "Promueve innovación, reduce emisiones y posiciona a Puebla como líder nacional."
    },
    {
      img: "/FortalecimientoEducativo.jpg",
      titulo: "Fortalecimiento Educativo",
      desc: "Construcción y modernización de centros educativos técnicos.",
      beneficios: "Forma talento especializado y atrae nuevas empresas por la calidad de mano de obra."
    },
    {
      img: "/MipyMes.jpg",
      titulo: "Servicios Digitales",
      desc: "Apoyo a MIPyMES para digitalizar y modernizar operaciones.",
      beneficios: "Crecimiento económico local, competitividad y más empleos para jóvenes."
    }
  ]
};

const infoEstado = {
  veracruz: {
    titulo: "Veracruz — Nodo Logístico Nacional",
    texto: "Veracruz es uno de los estados estratégicos en el Plan México por su ubicación costera, puertos internacionales, industria petroquímica y conexión con el Corredor Interoceánico.",
    img: "/Veracruz2.PNG"
  },
  oaxaca: {
    titulo: "Oaxaca — Desarrollo Social y Económico en Expansión",
    texto: "El Plan México impulsa en Oaxaca proyectos que potencian turismo, conectividad y desarrollo industrial, mejorando la economía local y regional.",
    img: "/Oaxaca2.PNG"
  },
  chihuahua: {
    titulo: "Chihuahua — Potencia Industrial y Fronteriza",
    texto: "Por su frontera con EE.UU., Chihuahua es clave para nearshoring, manufactura avanzada y crecimiento logístico bajo el Plan México.",
    img: "/Chihuahua2.PNG"
  },
  puebla: {
    titulo: "Puebla — Innovación, Industria y Talento",
    texto: "Puebla destaca por su industria automotriz, educativa y tecnológica, convirtiéndolo en un punto central para la electromovilidad en el Plan México.",
    img: "/Puebla2.PNG"
  }
};

export default function ExploraRegion() {
  const [selectedEstado, setSelectedEstado] = useState("");
  const user = getCurrentUser();

  const handleLimpiar = () => setSelectedEstado("");

  return (
    <div className="home">
      {/* HEADER */}
      <header className="home-header">
        <button
          className="home-hamburger-btn"
          onClick={() => window.openSidebar()}
          aria-label="Menu"
        >
          ☰
        </button>

        <div className="home-header-left">
          <img src="/escudo.png" alt="Escudo Gobierno de México" className="home-header-seal" />
          <div className="home-header-text">
            <span className="home-header-gob">Gobierno de</span>
            <span className="home-header-mx">México</span>
          </div>
        </div>

        <nav className="home-header-right">
          {user ? (
            <>
              <div className="user-badge">
                <span className="user-name">Hola, {user.name}</span>
                <span className="user-points">⭐ {user.points}</span>
              </div>
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button className="home-login-btn" onClick={() => (window.location.href = "/login")}>Iniciar sesión</button>
          )}
        </nav>
      </header>

      <Sidebar />
      <div style={{ height: "80px" }}></div>

      {/* CONTENIDO */}
      <main className="dashboard-content">
  <h1 style={{ color: "#3b001a", marginBottom: "20px" }}>Explora tu región</h1>

  <div className="container">
    <label htmlFor="estadoSelect">Selecciona tu estado:</label>
    <select
      id="estadoSelect"
      value={selectedEstado}
      onChange={e => setSelectedEstado(e.target.value)}
    >
      <option value="">-- Elige un estado --</option>
      {estados.map(e => (
        <option key={e} value={e.toLowerCase().replace(/ /g, "")}>{e}</option>
      ))}
    </select>
    <button onClick={handleLimpiar}>Limpiar</button>
  </div>

  {selectedEstado && infoEstado[selectedEstado] && (
    <div className="info-estado">
      <h2>{infoEstado[selectedEstado].titulo}</h2>
      <p>{infoEstado[selectedEstado].texto}</p>
      <img src={infoEstado[selectedEstado].img} alt={selectedEstado} className="img-estado" />
    </div>
  )}

  {selectedEstado && (
    <div className="dashboard-cards">
      {proyectosPorEstado[selectedEstado] ? (
        proyectosPorEstado[selectedEstado].map((p, i) => (
          <div key={i} className="card">
            <img src={p.img} alt={p.titulo} />
            <h3>{p.titulo}</h3>
            <p><strong>Descripción:</strong> {p.desc}</p>
            <p><strong>¿Por qué es bueno invertir?</strong> {p.beneficios}</p>
          </div>
        ))
      ) : (
        <p className="no-data">Este estado aún no tiene proyectos registrados.</p>
      )}
    </div>
  )}
</main>

      {/* FOOTER */}
      <footer className="home-footer">
        <span>Gobierno de México</span>
        <div className="footer-links">
          <a href="#">Contacto</a>
          <a href="#">Términos</a>
          <a href="#">Aviso de privacidad</a>
        </div>
      </footer>
    </div>
  );
}
