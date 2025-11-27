import { getCurrentUser } from "../auth/authService";
import "aframe";
import "./Mapa.css";
import { useEffect } from "react";


export default function Mapa() {
  const user = getCurrentUser();

  useEffect(() => {
  const scene = document.querySelector("a-scene");

  if (!scene) return;

  scene.addEventListener("loaded", () => {
    console.log("A-Frame listo");

    const camHotspot = document.querySelector("#campecheHotspot");
    const chiHotspot = document.querySelector("#chihuahuaHotspot");

    const popupCam = document.querySelector("#popupCampeche");
    const popupChi = document.querySelector("#popupChihuahua");

    const closeCam = document.querySelector("#closeBtnCam");
    const closeChi = document.querySelector("#closeBtnChi");

   
    camHotspot?.addEventListener("click", () => {
      popupChi?.setAttribute("visible", false);
      popupCam?.setAttribute("visible", true);
    });

    chiHotspot?.addEventListener("click", () => {
      popupCam?.setAttribute("visible", false);
      popupChi?.setAttribute("visible", true);
    });

    
    closeCam?.addEventListener("click", () => {
      popupCam?.setAttribute("visible", false);
    });

    closeChi?.addEventListener("click", () => {
      popupChi?.setAttribute("visible", false);
    });

  });
}, []);


  return (
    <div className="home">
     
      <header className="home-header">
        <button
          className="home-hamburger-btn"
          onClick={() => window.openSidebar()}
          aria-label="Menu"
        >
          ☰
        </button>

        <div className="home-header-left">
          <span className="home-header-seal" />
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

     
<section className="mapa-container">

  <h1 className="mapa-title">Mapa 3D de los Polos de Desarrollo</h1>
  <p className="mapa-description">
    Visualiza los proyectos estratégicos del Plan México en formato 3D interactivo.
  </p>

  
  <div className="mapa-scene-wrapper">

    <div id="aframe-root">
      <a-scene
  embedded
  vr-mode-ui="enabled: false"
  cursor="rayOrigin: mouse"
  raycaster="objects: .clickable; far: 50"
>
  {/* HOTSPOTS */}
  <a-circle id="campecheHotspot" position="2.45 -0.2 -2.5" radius="0.1" color="blue" opacity="0.5" class="clickable"></a-circle>
  <a-circle id="chihuahuaHotspot" position="-0.9 2.0 -2.5" radius="0.1" color="blue" opacity="0.5" class="clickable"></a-circle>

  {/* MAPA COMPLETO */}
  {/* MAPA COMPLETO */}
  <a-image src="/estados/Aguascalientes.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/BajaCalifornia.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/BajaCaliforniaSur.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Campeche.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Chiapas.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Chihuahua.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/CDMX.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Coahuila.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Colima.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Durango.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Guanajuato.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Guerrero.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Hidalgo.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Jalisco.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Mexico.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Michoacan.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Morelos.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Nayarit.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/NuevoLeon.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Oaxaca.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Puebla.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Queretaro.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/QuintanaRoo.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/SanLuisPotosi.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Sinaloa.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Sonora.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Tabasco.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Tamaulipas.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Tlaxcala.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Veracruz.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Yucatan.PNG" position="0 1.5 -3" width="8" height="8"></a-image>
  <a-image src="/estados/Zacatecas.PNG" position="0 1.5 -3" width="8" height="8"></a-image>


  {/* POPUP CAMPECHE */}
  <a-entity id="popupCampeche" visible="false" position="0 0.5 -2">
    <a-plane width="2.4" height="1.6" color="#611232" opacity="0.95"></a-plane>
    <a-plane width="2.4" height="0.1" color="#002f2a" position="0 0.75 0.01"></a-plane>
    <a-sky color="#ffffff"></a-sky>
    <a-text value="Polo de Desarrollo para el Bienestar" color="#FFFFFF" position="-0.95 0.6 0.02" width="2.1"></a-text>

    <a-text value="Seybaplaya I" color="#FFC72C" position="-0.95 0.45 0.02" width="2.1"></a-text>

    <a-plane width="2.2" height="0.01" color="#FFFFFF" opacity="0.5" position="0 0.35 0.02"></a-plane>

    <a-text
      value={`📍 Ubicacion: Seybaplaya, Campeche
📏 Superficie: 99.98 has
🔗 Conectividad: Carretera MEX-180, Puerto de Seybaplaya, Tren Maya
👥 Población: 387,544
🏭 Vocaciones: Logística, Agroindustria, Manufactura energética`}
      color="#FFFFFF"
      position="-1 0.0 0.02"
      width="2"
      wrap-count="40"
    ></a-text>

    <a-plane width="2.2" height="0.3" color="#a57f2c" position="0 -0.57 0.01"></a-plane>

    <a-text
      value={`¡INCENTIVO FISCAL!
Deducción inmediata del 100% en activos fijos (2025-2030)`}
      color="#FFFFFF"
      position="-1 -0.55 0.02"
      width="2"
      wrap-count="45"
    ></a-text>

    <a-circle id="closeBtnCircle" position="1.1 0.75 0.06" radius="0.12" color="#611232" class="clickable"></a-circle>
  </a-entity>

  {/* POPUP CHIHUAHUA */}
  <a-entity id="popupChihuahua" visible="false" position="0 0.5 -2">

    <a-plane width="2.4" height="1.6" color="#611232" opacity="0.95"></a-plane>
    <a-plane width="2.4" height="0.1" color="#002f2a" position="0 0.75 0.01"></a-plane>

    <a-text value="Polo de Desarrollo para el Bienestar" color="#FFFFFF" position="-0.95 0.6 0.02"></a-text>

    <a-text value="San Jerónimo" color="#FFC72C" position="-0.95 0.45 0.02"></a-text>

    <a-plane width="2.2" height="0.01" color="#FFFFFF" opacity="0.5" position="0 0.35 0.02"></a-plane>

    <a-text
      value={`📍 Ubicación: Ciudad Juárez, Chihuahua
📏 Superficie: 60.31 has
🔗 Conectividad: Límite fronterizo con EUA, 15 km de la red férrea
👥 Población: 1,557,415
🏭 Vocaciones: Logística, Agroindustria, Energía`}
      color="#FFFFFF"
      position="-1 0.0 0.02"
      width="2"
      wrap-count="40"
    ></a-text>

    <a-plane width="2.2" height="0.3" color="#a57f2c" position="0 -0.57 0.01"></a-plane>

    <a-text
      value={`¡INCENTIVO FISCAL!
Deducción inmediata del 100% en activos fijos (2025-2030)`}
      color="#FFFFFF"
      position="-1 -0.55 0.02"
      width="2"
      wrap-count="45"
    ></a-text>

    <a-circle id="closeBtnChihuahua" position="1.1 0.75 0.06" radius="0.12" color="#611232" class="clickable"></a-circle>
  </a-entity>

  {/* CÁMARA */}
  <a-entity camera wasd-controls look-controls raycaster="objects: .clickable" cursor="rayOrigin: mouse"></a-entity>
</a-scene>


    </div>

  </div>
</section>


     
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
