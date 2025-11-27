import "./AsistenteFlotante.css";

export default function AsistenteFlotante({ onClick }) {
  return (
    <div 
      className="asistente-flotante"
      onClick={onClick ?? window.openChat}   // 👈 activa el panel de chat
    >
      <div className="asistente-icono">
        <img src="/AsistenteVirtual.png" alt="Asistente" />
      </div>

      <div className="asistente-texto">
        <p className="titulo">Pregúntale al</p>
        <p className="subtitulo">Plan México</p>
      </div>

      <div className="asistente-flecha">→</div>
    </div>
  );
}
