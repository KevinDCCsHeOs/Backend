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
  renderer="antialias: true"
  cursor="rayOrigin: mouse"
  raycaster="objects: .clickable; far: 50"
>


  <a-plane 
    position="0 0 -5"
    width="100"
    height="100"
    visible="false">
  </a-plane>

  <a-entity light="type: ambient; color: #fff; intensity: 1"></a-entity>
  <a-entity light="type: directional; color: #fff; intensity: 0.8" position="1 1 1"></a-entity>

  <a-image
    src="/mapa/NuevoMapa.png"
    position="0 1.5 -3"
    width="9"
    height="6"
  ></a-image>

  <a-circle
    id="campecheHotspot"
    position="2.45 -0.2 -2.5"
    radius="0.18"
    color="#2a8cff"
    opacity="0.8"
    class="clickable"
  ></a-circle>

  <a-circle
    id="chihuahuaHotspot"
    position="-0.9 2 -2.5"
    radius="0.18"
    color="#2a8cff"
    opacity="0.8"
    class="clickable"
  ></a-circle>

  <a-entity id="popupCampeche" visible="false" position="0 1.5 1" rotation="0 180 0">
    <a-plane width="2.8" height="1.8" material="color:#611232; opacity:1;"></a-plane>
    <a-text value="Polo de Desarrollo: Seybaplaya I" color="#fff" position="-1.2 0.4 0.02"></a-text>
    <a-entity gltf-model="/modelos3D/generic_factory_with_smoke_towers.glb" scale="0.04 0.04 0.04" position="0.9 -0.3 0.05"></a-entity>
    <a-circle id="closeBtnCam" radius="0.15" color="#831b1b" position="1.2 0.7 0.05" class="clickable"></a-circle>
  </a-entity>

  <a-entity id="popupChihuahua" visible="false" position="0 1.5 1" rotation="0 180 0">
    <a-plane width="2.8" height="1.8" material="color:#611232; opacity:1;"></a-plane>
    <a-text value="Polo: San Jerónimo" color="#fff" position="-1.2 0.4 0.02"></a-text>
    <a-entity gltf-model="/modelos3D/gear_3d_icon.glb" scale="0.5 0.5 0.5" position="0.8 -0.5 0.05"></a-entity>
    <a-circle id="closeBtnChi" radius="0.15" color="#831b1b" position="1.2 0.7 0.05" class="clickable"></a-circle>
  </a-entity>

  <a-entity camera position="0 1.5 4" look-controls="reverseMouseDrag: true"></a-entity>

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
