import { useState } from "react";
import { getCurrentUser } from "../auth/authService";
import "./Estudiante.css";

export default function Estudiante() {

  const user = getCurrentUser();

  const [grado, setGrado] = useState("");
  const [carrera, setCarrera] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const manejarEnvio = () => {
    if (!grado || !carrera) {
      alert("Por favor completa ambas preguntas.");
      return;
    }
    setMostrarResultados(true);
  };

  return (
    <div className="home estu-page">

      {/* ================= HEADER ================= */}
      <header className="home-header">

        {/* Botón hamburguesa */}
        <button
          className="home-hamburger-btn"
          onClick={() => window.openSidebar()}
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Logo Gobierno */}
        <div className="home-header-left">
          <img
            src="/escudo.png"
            alt="Escudo Gobierno de México"
            className="home-header-seal"
          />

          <div className="home-header-text">
            <span className="home-header-gob">Gobierno de</span>
            <span className="home-header-mx">México</span>
          </div>
        </div>

        {/* Derecha */}
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
            <button
              className="home-login-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Iniciar sesión
            </button>
          )}

          <button
            className="home-login-btn"
            onClick={() => (window.location.href = "/nahuatl")}
          >
            Náhuatl
          </button>

          <button
            className="home-login-btn"
            onClick={() => (window.location.href = "/audio")}
          >
            Audio
          </button>

          <button className="home-icon-btn" aria-label="Buscar">
            🔍
          </button>
        </nav>
      </header>

      {/* === EVITA QUE EL HERO SE META BAJO EL HEADER FIJO === */}
      <div style={{ height: "80px" }} />

      {/* ================= HERO ================= */}
      <section className="estu-hero">
        <h1>Estudiantes & Plan México</h1>
        <p>Explora cómo tu formación puede contribuir directamente al desarrollo del país.</p>
      </section>

      {/* ================= BANNER EMBLEMA ================= */}
      <section className="estu-banner">
        <div className="estu-banner-content">
          <h2>Programa Estudiante Embajador 🇲🇽</h2>
          <p>
            Únete a la iniciativa nacional para difundir el Plan México dentro de tu escuela 
            y tu comunidad.
          </p>
          <button className="banner-btn" onClick={() => (window.location.href = "/embajadores")}>Conocer programa</button>
        </div>
      </section>

      {/* ================= FORMULARIO ================= */}
      <section className="estu-form">
        <h2>Cuéntanos sobre ti</h2>

        <label>Grado de estudios</label>
        <select value={grado} onChange={(e) => setGrado(e.target.value)}>
          <option value="">Selecciona tu grado</option>
          <option>Licenciatura</option>
          <option>Maestría</option>
          <option>Doctorado</option>
          <option>Técnico Superior</option>
          <option>Secundaria / Preparatoria</option>
        </select>

        <label>Área o carrera</label>
        <select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
          <option value="">Selecciona tu área</option>
          <option>Ingeniería en Sistemas</option>
          <option>Ingeniería Industrial</option>
          <option>Ingeniería Civil</option>
          <option>Ingeniería Electrónica</option>
          <option>Administración</option>
          <option>Economía</option>
          <option>Arquitectura</option>
          <option>Agronomía</option>
          <option>Ciencias Ambientales</option>
          <option>Salud</option>
          <option>Educación</option>
          <option>Derecho</option>
          <option>Trabajo Social</option>
        </select>

        <button className="enviar-btn" onClick={manejarEnvio}>
          Obtener recomendaciones
        </button>
      </section>

      {/* ================= RESULTADOS ================= */}
      {mostrarResultados && (
        <section className="estu-resultados">
          <h2>Resultados personalizados para: <span>{carrera}</span></h2>

          <div className="result-card">
            <h3>¿Qué hace el Plan México en tu área?</h3>
            <p>
              El Plan México impulsa proyectos estratégicos que benefician directamente 
              al área de <strong>{carrera}</strong>, promoviendo infraestructura, 
              innovación, inversión regional y desarrollo social alineado a los polos de bienestar.
            </p>
          </div>

          <div className="result-card">
            <h3>Temas sugeridos de investigación</h3>
            <ul>
              <li>Aplicación del conocimiento a retos regionales del Plan México.</li>
              <li>Innovación y tecnología para el desarrollo local.</li>
              <li>Soluciones sostenibles alineadas a los polos de prosperidad.</li>
              <li>Infraestructura, educación o procesos productivos.</li>
            </ul>
          </div>

          <div className="result-card">
            <h3>¿Por qué es importante tu área para México?</h3>
            <p>
              La formación en <strong>{carrera}</strong> es clave para atender necesidades 
              nacionales y fortalecer productividad, soberanía y bienestar.
            </p>
          </div>

          <div className="result-card">
            <h3>Apoyos del Gobierno</h3>
            <ul>
              <li>Becas Benito Juárez</li>
              <li>Apoyos CONAHCYT</li>
              <li>Movilidad académica</li>
              <li>Estancias en polos de desarrollo</li>
            </ul>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
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
