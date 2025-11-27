import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <button className="hamburger-btn" onClick={() => window.openSidebar()}>
        ☰
      </button>

      <div className="header-logo">
        <img src="/gobmx-logo.png" alt="Gobierno de México" />
      </div>

      <a className="header-login" href="/login">
        Iniciar sesión
      </a>
    </header>
  );
}
