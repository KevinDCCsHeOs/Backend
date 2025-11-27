import React from "react";
import "./Embajadores.css";
import diagrama from "../assets/embajadores-diagrama.png"; // tu diagrama central

export default function Embajadores() {
  return (
    <section className="embajadores-section">
      <div className="embajadores-header">
        <h1>Embajadores Juveniles</h1>
        <p>ConoceMex - Programa del Plan México</p>
      </div>

      <div className="embajadores-content">

        {/* Bloques de info */}
        <div className="embajadores-info">

          <div className="card">
            <h3>CONVOCA</h3>
            <p>
              A los jóvenes mexicanos y mexicanas de 15 a 29 años a sumarse al
              programa Embajadores Juveniles por el Plan México mediante
              servicio social o voluntariado.
            </p>
          </div>

          <div className="card">
            <h3>OBJETIVO</h3>
            <p>
              Promover la participación activa de estudiantes como embajadores
              juveniles, difundiendo información del Plan México y fortaleciendo
              la transparencia y el alcance de sus acciones.
            </p>
          </div>

          <div className="card">
            <h3>MODALIDADES DE PARTICIPACIÓN</h3>
            <ul>
              <li>Construyendo tu Servicio Social: estudiantes 1º a 7º semestre</li>
              <li>Servicio Social Comunitario: 70% créditos aprobados</li>
              <li>Créditos complementarios</li>
              <li>Constancia con Valor Curricular</li>
              <li>Diploma de Participación Honorífica</li>
            </ul>
          </div>

        </div>

        {/* Imagen / diagrama central */}
        <div className="embajadores-diagrama">
          <img src="/DiagramaEmbajadores.png" alt="Diagrama Embajadores" />
          
        </div>

        {/* Beneficios / Gamificación */}
        <div className="embajadores-beneficios">

          <div className="card">
            <h3>Gamificación - Niveles</h3>
            <ul>
              <li>Bronce (0–499 pts): Inicio y primeras actividades</li>
              <li>Plata (500–1,499 pts): Difusión y proyectos colaborativos</li>
              <li>Oro (1,500–2,999 pts): Liderazgo y mentoría</li>
              <li>Platino (3,000+ pts): Impacto regional e innovación</li>
            </ul>
          </div>

          <div className="card">
            <h3>Mecánica de puntos</h3>
            <ul>
              <li>Asistir a taller formativo: 50 pts</li>
              <li>Difundir cápsula informativa: 30 pts</li>
              <li>Organizar plática 30+ asistentes: 250 pts</li>
              <li>Capacitar a otro embajador: 150 pts</li>
              <li>Generar material didáctico: 100–200 pts</li>
              <li>Levantar encuesta y reportar insights: 120 pts</li>
              <li>Coordinar evento multisector: 600 pts</li>
              <li>Proyecto con impacto medible: 800–1,200 pts</li>
            </ul>
          </div>

          <div className="card">
            <h3>Catálogo de recompensas</h3>
            <p>
              Reconocimientos formales, desarrollo académico, incentivos materiales y beneficios exclusivos según carrera (ej. Ingeniería Industrial).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
