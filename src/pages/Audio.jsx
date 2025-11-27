import { useRef } from "react";
import "./Home.css";

export default function Home() {
  const currentIdRef = useRef(null);

  const toggleSpeak = (id, text) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech synthesis no soportado en este navegador.");
      return;
    }

    const synth = window.speechSynthesis;

    // Si está hablando este mismo id, detener
    if (currentIdRef.current === id && synth.speaking) {
      synth.cancel();
      currentIdRef.current = null;
      return;
    }

    // Detener cualquier otra lectura
    synth.cancel();
    currentIdRef.current = id;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "es-MX";
    utter.rate = 1;
    utter.pitch = 1;

    utter.onend = () => {
      if (currentIdRef.current === id) {
        currentIdRef.current = null;
      }
    };

    synth.speak(utter);
  };

  const AudioButton = ({ id, text }) => (
    <button
      type="button"
      className="audio-icon-btn"
      onClick={() => toggleSpeak(id, text)}
      aria-label={`Escuchar: ${text}`}
    >
      🔊
    </button>
  );

  return (
    <div className="home">
      {/* NAV SUPERIOR */}
      <header className="home-header">
        {/* Botón hamburguesa integrado al header */}
        <button
          className="home-hamburger-btn"
          onClick={() => window.openSidebar && window.openSidebar()}
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
          <AudioButton id="hdr-gob-mx" text="Gobierno de México" />
        </div>

        {/* Parte derecha (login + idiomas + search) */}
        <nav className="home-header-right">
          <div className="header-btn-group">
            <button
              className="home-login-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Iniciar sesión
            </button>
            <AudioButton id="btn-login" text="Iniciar sesión" />
          </div>

          <div className="header-btn-group">
            <button
              className="home-login-btn"
              onClick={() => (window.location.href = "/nahuatl")}
            >
              Náhuatl
            </button>
            <AudioButton
              id="btn-nahuatl"
              text="Cambiar a versión en Náhuatl"
            />
          </div>

          <div className="header-btn-group">
            <button
              className="home-login-btn"
              onClick={() => (window.location.href = "/")}
            >
              Texto
            </button>
            <AudioButton id="btn-texto" text="Versión en texto" />
          </div>

          <div className="header-btn-group">
            <button className="home-icon-btn" aria-label="Buscar">
              🔍
            </button>
            <AudioButton id="btn-buscar" text="Buscar" />
          </div>
        </nav>
      </header>

      {/* HERO PRINCIPAL */}
      <div className="hero-wrapper">
        <section className="hero">
          <div className="hero-left">
            <div className="hero-logos">
              <img
                src="/conoceMLogo.png"
                alt="ConoceMex"
                className="logo-conoce"
              />
              <AudioButton id="logo-conoce" text="ConoceMex" />

              <img
                src="/LogoPM.png"
                alt="Plan México"
                className="logo-plan"
              />
              <AudioButton id="logo-plan" text="Plan México" />
            </div>

            <div className="hero-block">
              <h1 className="hero-title">
                Estrategia de Desarrollo Económico Equitativo y Sustentable
              </h1>
              <AudioButton
                id="hero-title"
                text="Estrategia de Desarrollo Económico equitativo y sustentable"
              />
            </div>

            <div className="hero-block">
              <p className="hero-subtitle">
                Para la prosperidad compartida en todas las regiones del país.
              </p>
              <AudioButton
                id="hero-subtitle"
                text="Para la prosperidad compartida en todas las regiones del país."
              />
            </div>

            <div className="hero-actions">
              <div className="hero-action-with-audio">
                <button
                  className="hero-cta"
                  onClick={() => (window.location.href = "/mapa")}
                >
                  Explorar polos de desarrollo
                </button>
                <AudioButton
                  id="btn-explorar-mapa"
                  text="Explorar polos de desarrollo"
                />
              </div>
            </div>
          </div>

          <div className="hero-right">
            {/* Aquí luego pueden poner una imagen oficial */}
            <div className="hero-figure">
              <img
                src="/MujerInd.png"
                alt="Hero Mujer"
                className="hero-woman"
              />
            </div>
          </div>
        </section>
      </div>

      {/* SOY... / ROLES */}
      <section className="role-strip">
        <div className="role-title-block">
          <h3 className="role-title">Soy...</h3>
          <AudioButton id="role-title" text="Soy" />
        </div>

        <div className="role-buttons">
          <div className="role-btn-with-audio">
            <button className="role-btn">Ciudadano</button>
            <AudioButton id="role-ciudadano" text="Ciudadano" />
          </div>

          <div className="role-btn-with-audio">
            <button
              className="role-btn"
              onClick={() => (window.location.href = "/estudiante")}
            >
              Estudiante
            </button>
            <AudioButton id="role-estudiante" text="Estudiante" />
          </div>

          <div className="role-btn-with-audio">
            <button className="role-btn">Empresario</button>
            <AudioButton id="role-empresario" text="Empresario" />
          </div>
        </div>
      </section>

      {/* TARJETAS INFORMATIVAS */}
      <section className="info-cards">
        <article className="info-card">
          <div className="card-title-block">
            <h3>¿Qué es el Plan México?</h3>
            <AudioButton
              id="card1-title"
              text="¿Qué es el Plan México?"
            />
          </div>

          <div className="card-text-block">
            <p>
              Conoce la visión, objetivos y ejes estratégicos que impulsan el
              desarrollo equitativo y sustentable en el país.
            </p>
            <AudioButton
              id="card1-text"
              text="Conoce la visión, objetivos y ejes estratégicos que impulsan el desarrollo equitativo y sustentable en el país."
            />
          </div>

          <div className="card-btn-with-audio">
            <button className="link-btn">Ver más</button>
            <AudioButton id="card1-btn" text="Ver más" />
          </div>
        </article>

        <article className="info-card">
          <div className="card-title-block">
            <h3>Oportunidades en mi región</h3>
            <AudioButton
              id="card2-title"
              text="Oportunidades en mi región"
            />
          </div>

          <div className="card-text-block">
            <p>
              Descubre inversiones, empleos y proyectos clave cerca de tu estado
              o municipio.
            </p>
            <AudioButton
              id="card2-text"
              text="Descubre inversiones, empleos y proyectos clave cerca de tu estado o municipio."
            />
          </div>

          <div className="card-btn-with-audio">
            <button className="link-btn">Explorar oportunidades</button>
            <AudioButton
              id="card2-btn"
              text="Explorar oportunidades"
            />
          </div>
        </article>

        <article className="info-card">
          <div className="card-title-block">
            <h3>Acciones estratégicas</h3>
            <AudioButton
              id="card3-title"
              text="Acciones estratégicas"
            />
          </div>

          <div className="card-text-block">
            <p>
              Explora los proyectos prioritarios, infraestructura y sectores
              productivos que impulsa el Plan México.
            </p>
            <AudioButton
              id="card3-text"
              text="Explora los proyectos prioritarios, infraestructura y sectores productivos que impulsa el Plan México."
            />
          </div>

          <div className="card-btn-with-audio">
            <button className="link-btn">Ver acciones</button>
            <AudioButton id="card3-btn" text="Ver acciones" />
          </div>
        </article>
      </section>

      {/* NOTICIAS RECIENTES */}
      <section className="news-section">
        <div className="news-header">
          <div className="news-title-block">
            <h2>Noticias recientes</h2>
            <AudioButton id="news-title" text="Noticias recientes" />
          </div>

          <div className="card-btn-with-audio">
            <button className="link-btn">Ver todas</button>
            <AudioButton
              id="news-all-btn"
              text="Ver todas las noticias"
            />
          </div>
        </div>

        <div className="news-grid">
          <article className="news-card">
            <div className="news-image news-image-1" />
            <div className="news-content">
              <div className="news-tag-block">
                <span className="news-tag">Energía</span>
                <AudioButton id="news1-tag" text="Energía" />
              </div>

              <div className="news-title-block">
                <h3>Impulsan energías limpias en el norte</h3>
                <AudioButton
                  id="news1-title"
                  text="Impulsan energías limpias en el norte"
                />
              </div>

              <div className="news-meta-block">
                <span className="news-meta">10 abril 2025</span>
                <AudioButton
                  id="news1-date"
                  text="10 de abril de 2025"
                />
              </div>
            </div>
          </article>

          <article className="news-card">
            <div className="news-image news-image-2" />
            <div className="news-content">
              <div className="news-tag-block">
                <span className="news-tag">Empleo</span>
                <AudioButton id="news2-tag" text="Empleo" />
              </div>

              <div className="news-title-block">
                <h3>Fomentan nuevas empresas locales</h3>
                <AudioButton
                  id="news2-title"
                  text="Fomentan nuevas empresas locales"
                />
              </div>

              <div className="news-meta-block">
                <span className="news-meta">12 abril 2025</span>
                <AudioButton
                  id="news2-date"
                  text="12 de abril de 2025"
                />
              </div>
            </div>
          </article>

          <article className="news-card">
            <div className="news-image news-image-3" />
            <div className="news-content">
              <div className="news-tag-block">
                <span className="news-tag">Bienestar</span>
                <AudioButton id="news3-tag" text="Bienestar" />
              </div>

              <div className="news-title-block">
                <h3>Acciones estratégicas en salud y educación</h3>
                <AudioButton
                  id="news3-title"
                  text="Acciones estratégicas en salud y educación"
                />
              </div>

              <div className="news-meta-block">
                <span className="news-meta">15 abril 2025</span>
                <AudioButton
                  id="news3-date"
                  text="15 de abril de 2025"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-left-with-audio">
          <span>Gobierno de México</span>
          <AudioButton id="footer-gob-mx" text="Gobierno de México" />
        </div>

        <div className="footer-links">
          <div className="footer-link-with-audio">
            <a href="#">Contacto</a>
            <AudioButton id="footer-contacto" text="Contacto" />
          </div>

          <div className="footer-link-with-audio">
            <a href="#">Términos</a>
            <AudioButton id="footer-terminos" text="Términos" />
          </div>

          <div className="footer-link-with-audio">
            <a href="#">Aviso de privacidad</a>
            <AudioButton
              id="footer-privacidad"
              text="Aviso de privacidad"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
