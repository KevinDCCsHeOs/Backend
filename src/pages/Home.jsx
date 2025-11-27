import { useState } from "react";
import { getCurrentUser } from "../auth/authService";
import { useNavigate } from "react-router-dom";


export default function Home() {

  const user = getCurrentUser();
    const navigate = useNavigate(); 

  // ---------------- ESTADOS ----------------
  const [noticiaActiva, setNoticiaActiva] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalFinalAbierto, setModalFinalAbierto] = useState(false);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  const noticias = [
    {
      id: 1,
      tag: "Energía",
      titulo: "Impulsan energías limpias en el norte",
      fecha: "10 abril 2025",
       imagen: "/energia.jpg",
      preguntaInicial:
        "México ya produce más del 50% de su energía con fuentes renovables. ¿Verdadero o falso?",
      respuestaInicialCorrecta: "Falso",
      contenido:
        "El norte del país avanza en proyectos solares y eólicos impulsados por el Plan México, generando empleos, atrayendo inversión y fortaleciendo la soberanía energética.",
      preguntaFinal:
        "Las energías limpias ayudan a reducir costos de electricidad y atraer inversión. ¿Verdadero o falso?",
      respuestaFinalCorrecta: "Verdadero",
    },
    {
      id: 2,
      tag: "Empleo",
      titulo: "Fomentan nuevas empresas locales",
      fecha: "12 abril 2025",
       imagen: "/empresas.jpg",
      preguntaInicial:
        "El Plan México contempla apoyos directos para emprendedores locales. ¿Verdadero o falso?",
      respuestaInicialCorrecta: "Verdadero",
      contenido:
        "Los polos de desarrollo están impulsando negocios locales mediante financiamiento, capacitación y apertura de mercados competitivos.",
      preguntaFinal:
        "El crecimiento de empresas locales aumenta el empleo formal. ¿Verdadero o falso?",
      respuestaFinalCorrecta: "Verdadero",
    },
    {
      id: 3,
      tag: "Bienestar",
      titulo: "Acciones estratégicas en salud y educación",
      fecha: "15 abril 2025",
       imagen: "/salud.jpg",
      preguntaInicial:
        "La nueva estrategia nacional incluye clínicas y escuelas completamente equipadas. ¿Verdadero o falso?",
      respuestaInicialCorrecta: "Verdadero",
      contenido:
        "Se invertirán recursos para mejorar la atención médica, modernizar escuelas, ampliar infraestructura y garantizar el acceso universal.",
      preguntaFinal:
        "Una población con salud y educación adecuadas fortalece el desarrollo económico. ¿Verdadero o falso?",
      respuestaFinalCorrecta: "Verdadero",
    },
  ];

  // ---------------- FUNCIONES PRINCIPALES ----------------

  function abrirNoticia(noticia) {
    setNoticiaActiva(noticia);
    setModalAbierto(true); // abre la encuesta inicial
  }

  function responderInicial(respuesta) {
    const esCorrecta = respuesta === noticiaActiva.respuestaInicialCorrecta;
    // NO mostramos feedback aquí
    setModalAbierto(false);
  }

  function abrirPreguntaFinal() {
    setModalFinalAbierto(true);
  }

  function responderFinal(respuesta) {
    const esCorrecta = respuesta === noticiaActiva.respuestaFinalCorrecta;
    setRespuestaCorrecta(esCorrecta);
  }

  function compartirNoticia() {
    const url = window.location.href;
    const mensaje = `Descubre esta noticia del Plan México: "${noticiaActiva.titulo}". Échale un vistazo aquí: ${url}`;

    const shareUrl = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(shareUrl, "_blank");
  }




  return (
    <div className="home">
      {/* NAV SUPERIOR */}
     <header className="home-header">

  {/* Botón hamburguesa integrado al header */}
  <button
    className="home-hamburger-btn"
    onClick={() => window.openSidebar()}
    aria-label="Menu"
  >
    ☰
  </button>

  {/* Parte izquierda (sello + texto GOV MX) */}
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

  {/* Parte derecha (login + search) */}
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
        window.location.href = "/"; // vuelve al home
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


      {/* HERO PRINCIPAL */}
      <div className="hero-wrapper">
      <section className="hero">
        <div className="hero-left">
         <div className="hero-logos">
  <img src="/conoceMLogo.png" alt="ConoceMex" className="logo-conoce" />
  <img src="/LogoPM.png" alt="Plan México" className="logo-plan" />
</div>

          <h1 className="hero-title">
            Prosperidad para todas y todos
          </h1>
          <p className="hero-subtitle">
            Descubre cómo se generan empleos, qué proyectos vienen, dónde habrá inversión y cómo todo esto te puede beneficiar a ti, a tu comunidad o a tu negocio.
          </p>

          <div className="hero-actions">
            <button
              className="hero-cta"
              onClick={() => (window.location.href = "/mapa")}
            >
              Explora mapa 3D de polos de desarrollo
            </button>

            
            
          </div>
        </div>

        <div className="hero-right">
          {/* Aquí luego pueden poner una imagen oficial */}
          <div className="hero-figure">
          <img src="/MujerInd.png" alt="Hero Mujer" className="hero-woman" />


          </div>

        </div>
      </section>
      </div>

      
  <section className="role-strip">
  <h3 className="role-title">Soy...</h3>

  <div className="role-buttons">
    <button className="role-btn"><h3>Ciudadano</h3> </button>
    <button className="role-btn" onClick={() => (window.location.href = "/estudiante")}> <h3>Estudiante</h3> </button>
    <button className="role-btn"> <h3> Empresario </h3> </button>
  </div>
</section>



      {/* TARJETAS INFORMATIVAS */}
      <section className="info-cards">
        <article className="info-card">
          <h3>¿Qué es el Plan México?</h3>
          <p>
            Una guía simple y actualizada sobre la visión y los objetivos del Plan.
            ¿Para qué sirve? ¿A quién beneficia? ¿Qué cambios traerá para el país?
          </p>
          <button className="link-btn">Ver más</button>
        </article>

        <article className="info-card">
          <h3>Oportunidades en mi región</h3>
          <p>
            Consulta los proyectos clave cerca de tu estado o municipio:
            empleos, inversiones, infraestructura y sectores en crecimiento.
          </p>
           <button 
        className="link-btn"
        onClick={() => navigate("/exploraturegion")}
      >
        Explorar oportunidades
      </button>
        </article>

        <article className="info-card">
          <h3>Acciones estratégicas</h3>
          <p>
            Conoce los proyectos prioritarios, carreteras, energías limpias, polos productivos y programas que impulsan el desarrollo justo y sustentable.
          </p>
          <button className="link-btn">Ver acciones</button>
        </article>
      </section>

   {/* NOTICIAS RECIENTES */}
<section className="news-section">
  <div className="news-header">
    <h2>Noticias recientes</h2>
    <button className="link-btn">Ver todas</button>
  </div>

  <div className="news-grid">
    {noticias.map((n) => (
      <article
        key={n.id}
        className="news-card"
        onClick={() => abrirNoticia(n)}
        style={{ cursor: "pointer" }}
      >
        <div
  className="news-image"
  style={{
    backgroundImage: `url(${n.imagen})`
  }}
/>

        <div className="news-content">
          <span className="news-tag">{n.tag}</span>
          <h3>{n.titulo}</h3>
          <span className="news-meta">{n.fecha}</span>
        </div>

        {/* SI ESTA NOTICIA ESTÁ ABIERTA, SE EXPANDE AQUÍ MISMO */}
        {noticiaActiva && noticiaActiva.id === n.id && !modalAbierto && (
          <div className="news-expanded">
            <p>{n.contenido}</p>

            <button className="hero-cta" onClick={compartirNoticia}>
              Compartir esta noticia
            </button>

            <button
              className="link-btn"
              onClick={() => abrirPreguntaFinal()}
              style={{ marginTop: "10px" }}
            >
              Ya leí el artículo
            </button>

            <button
              className="link-btn"
              onClick={() => setNoticiaActiva(null)}
              style={{ marginTop: "10px" }}
            >
              Cerrar
            </button>
          </div>
        )}
      </article>
    ))}
  </div>
</section>

{/* --------------------- MODAL ENCUESTA INICIAL --------------------- */}
{modalAbierto && noticiaActiva && (
  <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <h2>{noticiaActiva.titulo}</h2>
      <p>{noticiaActiva.preguntaInicial}</p>

      <div className="vf-buttons">
        <button onClick={() => responderInicial("Verdadero")}>Verdadero</button>
        <button onClick={() => responderInicial("Falso")}>Falso</button>
      </div>

      <button className="modal-close" onClick={() => setModalAbierto(false)}>
        Cerrar
      </button>
    </div>
  </div>
)}

{/* --------------------- MODAL ENCUESTA FINAL --------------------- */}
{modalFinalAbierto && noticiaActiva && (
  <div className="modal-overlay" onClick={() => setModalFinalAbierto(false)}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      
      {!respuestaCorrecta && respuestaCorrecta !== false && (
        <>
          <h2>{noticiaActiva.titulo}</h2>
          <p>{noticiaActiva.preguntaFinal}</p>

          <div className="vf-buttons">
            <button onClick={() => responderFinal("Verdadero")}>Verdadero</button>
            <button onClick={() => responderFinal("Falso")}>Falso</button>
          </div>
        </>
      )}

      {respuestaCorrecta !== null && (
        <>
          <h3 style={{ color: respuestaCorrecta ? "green" : "red" }}>
            {respuestaCorrecta ? "¡Correcto! 🎉" : "Respuesta incorrecta 😅"}
          </h3>

          <p style={{ marginTop: "10px" }}>
            Sigue explorando la plataforma para conocer más sobre el Plan México y cómo te beneficia.
          </p>

          <button
            className="hero-cta"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setModalFinalAbierto(false);
              setRespuestaCorrecta(null);
            }}
          >
            Continuar
          </button>
        </>
      )}

      <button
        className="modal-close"
        onClick={() => {
          setModalFinalAbierto(false);
          setRespuestaCorrecta(null);
        }}
      >
        Cerrar
      </button>
    </div>
  </div>
)}


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
