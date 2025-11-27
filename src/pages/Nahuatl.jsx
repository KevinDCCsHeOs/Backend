import "./Home.css";

export default function Home() {
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
    <span className="home-header-seal" />
    <div className="home-header-text">
      <span className="home-header-gob">Gobierno de</span>
      <span className="home-header-mx">México</span>
    </div>
  </div>

  {/* Parte derecha (login + search) */}
  <nav className="home-header-right">
    
    <button
      className="home-login-btn"
      onClick={() => (window.location.href = "/login")}
    >
      Iniciar sesión
    </button>

    <button
  className="home-login-btn"
  onClick={() => (window.location.href = "/")}
       >
  Español
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
            Tlamanilistli tlen tlatlacualiztli uan yolmelahualiztli
          </h1>
          <p className="hero-subtitle">
            Ma timottilican ipan noxocoyocán altepetl.
          </p>

          <div className="hero-actions">
            <button
              className="hero-cta"
              onClick={() => (window.location.href = "/mapa")}
            >
              Nehnemi tlen tlamamali
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
  <h3 className="role-title">Nehuatl...</h3>

  <div className="role-buttons">
    <button className="role-btn">Altepetlácatl</button>
    <button className="role-btn" onClick={() => (window.location.href = "/estudiante")}>Tlamachtilli</button>
    <button className="role-btn">Tlatemàka</button>
  </div>
</section>



      {/* TARJETAS INFORMATIVAS */}
      <section className="info-cards">
        <article className="info-card">
          <h3>¿Qué es el Plan México?</h3>
          <p>
            Conoce la visión, objetivos y ejes estratégicos que impulsan el
            desarrollo equitativo y sustentable en el país.
          </p>
          <button className="link-btn">Ver más</button>
        </article>

        <article className="info-card">
          <h3>Oportunidades en mi región</h3>
          <p>
            Descubre inversiones, empleos y proyectos clave cerca de tu estado o
            municipio.
          </p>
          <button className="link-btn">Explorar oportunidades</button>
        </article>

        <article className="info-card">
          <h3>Acciones estratégicas</h3>
          <p>
            Explora los proyectos prioritarios, infraestructura y sectores
            productivos que impulsa el Plan México.
          </p>
          <button className="link-btn">Ver acciones</button>
        </article>
      </section>

      {/* NOTICIAS RECIENTES */}
      <section className="news-section">
        <div className="news-header">
          <h2>Yancuic tlahtolli</h2>
          <button className="link-btn">Ver todas</button>
        </div>

        <div className="news-grid">
          <article className="news-card">
            <div className="news-image news-image-1" />
            <div className="news-content">
              <span className="news-tag">Energía</span>
              <h3>Impulsan energías limpias en el norte</h3>
              <span className="news-meta">10 abril 2025</span>
            </div>
          </article>

          <article className="news-card">
            <div className="news-image news-image-2" />
            <div className="news-content">
              <span className="news-tag">Empleo</span>
              <h3>Fomentan nuevas empresas locales</h3>
              <span className="news-meta">12 abril 2025</span>
            </div>
          </article>

          <article className="news-card">
            <div className="news-image news-image-3" />
            <div className="news-content">
              <span className="news-tag">Bienestar</span>
              <h3>Acciones estratégicas en salud y educación</h3>
              <span className="news-meta">15 abril 2025</span>
            </div>
          </article>
        </div>
      </section>

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
