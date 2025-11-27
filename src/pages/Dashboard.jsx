import React from "react";
import { getCurrentUser } from "../auth/authService";
import "./Home.css";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const user = getCurrentUser();

  const preguntas = [
    {
      id: "conoce_plan",
      texto: "¿Personas que conocian el plan México",
      antes_si: 10,
      antes_no: 65,
      despues_si: 75,
      despues_no: 0,
    },
    {
      id: "entiende_objetivos",
      texto: "¿Entiende los objetivos del Plan México?",
      antes_si: 3,
      antes_no: 72,
      despues_si: 60,
      despues_no: 15,
    },
    {
      id: "cree_beneficioso",
      texto: "¿Cree que el Plan México es beneficioso?",
      antes_si: 46,
      antes_no: 29,
      despues_si: 69,
      despues_no: 6,
    },
  ];

  const porcentajeSi = (si, no) => {
    const total = si + no;
    if (!total) return 0;
    return Number(((si / total) * 100).toFixed(1));
  };

  const p0 = preguntas[0];
  const conocimientoPrevioData = {
    labels: ["Antes de leer", "Después de leer"],
    datasets: [
      {
        label: "% que responden SÍ",
        data: [
          porcentajeSi(p0.antes_si, p0.antes_no),
          porcentajeSi(p0.despues_si, p0.despues_no),
        ],
        borderWidth: 1,
        // Colores por barra: antes (guinda), después (verde)
        backgroundColor: ["#8B1A1A", "#2E7D32"],
      },
    ],
  };

  const conocimientoPrevioOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Porcentaje (%)",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} %`,
        },
      },
    },
  };

  const labelsPreguntas = preguntas.map((p) => p.texto);
  const dataAntes = preguntas.map((p) => porcentajeSi(p.antes_si, p.antes_no));
  const dataDespues = preguntas.map((p) => porcentajeSi(p.despues_si, p.despues_no));

  const asimilacionData = {
    labels: labelsPreguntas,
    datasets: [
      {
        label: "Antes de leer (%)",
        data: dataAntes,
        borderWidth: 1,
        // Guinda para "antes"
        backgroundColor: "#8B1A1A",
      },
      {
        label: "Después de leer (%)",
        data: dataDespues,
        borderWidth: 1,
        // Verde para "después"
        backgroundColor: "#2E7D32",
      },
    ],
  };

  const asimilacionOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Porcentaje de respuestas SÍ (%)",
        },
      },
    },
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} %`,
        },
      },
    },
  };

  const empleoMipymes = 68;
  const empleoNoMipymes = 100 - empleoMipymes;

  const empleoData = {
    labels: ["Empleo en MIPYMES", "Empleo en otras empresas"],
    datasets: [
      {
        data: [empleoMipymes, empleoNoMipymes],
        // Dona: MIPYMES en verde, otras en gris
        backgroundColor: ["#2E7D32", "#E0E0E0"],
      },
    ],
  };

  const empleoOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} %`,
        },
      },
    },
  };

  const mipymesConCredito = 10.7;
  const mipymesSinCredito = 100 - mipymesConCredito;

  const financiamientoData = {
    labels: ["MIPYMES con financiamiento", "MIPYMES sin financiamiento"],
    datasets: [
      {
        data: [mipymesConCredito, mipymesSinCredito],
        // Dona: azul fuerte vs azul claro
        backgroundColor: ["#1976D2", "#E3F2FD"],
      },
    ],
  };

  const financiamientoOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.parsed.toFixed(1)} %`,
        },
      },
    },
  };

  const comprasMeta = 35;
  const mipymesProveedoras = 0.3;

  const comprasData = {
    labels: [
      "Meta legal de compras a MIPYMES",
      "% de MIPYMES proveedoras registradas",
    ],
    datasets: [
      {
        label: "Porcentaje (%)",
        data: [comprasMeta, mipymesProveedoras],
        borderWidth: 1,
        // Barra meta en guinda, barra de proveedoras en amarillo de alerta
        backgroundColor: ["#8B1A1A", "#FBC02D"],
      },
    ],
  };

  const comprasOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} %`,
        },
      },
    },
  };

  return (
    <div className="home">
      <header className="home-header">
        <button
          className="home-hamburger-btn"
          onClick={() => window.openSidebar && window.openSidebar()}
          aria-label="Menu"
        >
          ☰
        </button>

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

      <Sidebar />

      <div style={{ height: "80px" }}></div>

      <main className="dashboard-content">
        <h1>Dashboard del Plan México</h1>

        <p className="dashboard-intro">
          Aquí podrás visualizar métricas, gráficos, estadísticas y módulos
          interactivos sobre el avance del Plan México.
        </p>

        <section className="dashboard-section">
          <h2>1. Conocimientos previos antes de informarse</h2>
          <p className="section-description">
            Comparación del porcentaje de personas que conocían el Plan México
            antes de leer el contenido, frente a las que declaran conocerlo
            después.
          </p>

          <div className="dashboard-card-wide">
            <Bar data={conocimientoPrevioData} options={conocimientoPrevioOptions} />
          </div>
        </section>

        <section className="dashboard-section">
          <h2>2. Asimilación del Plan México (antes vs después)</h2>
          <p className="section-description">
            Para cada pregunta clave se compara el porcentaje de respuestas
            afirmativas antes y después de leer el artículo.
          </p>

          <div className="dashboard-card-wide">
            <Bar data={asimilacionData} options={asimilacionOptions} />
          </div>
        </section>

        <section className="dashboard-section">
          <h2>3. Empleos, financiamiento y compras del gobierno a productores mexicanos</h2>
          <p className="section-description">
            Datos de contexto aproximado, respaldado por cifras oficiales de INEGI..
          </p>

          <div className="dashboard-cards dashboard-cards--charts">
            <div className="info-card">
              <h3>Empleo generado por MIPYMES</h3>
              <div className="chart-wrapper">
                <Doughnut data={empleoData} options={empleoOptions} />
              </div>
              <p className="card-footnote">
                Aproximadamente 68% del empleo nacional es generado por
                micro, pequeñas y medianas empresas.
              </p>
            </div>

            <div className="info-card">
              <h3>Acceso a financiamiento</h3>
              <div className="chart-wrapper">
                <Doughnut
                  data={financiamientoData}
                  options={financiamientoOptions}
                />
              </div>
              <p className="card-footnote">
                Una fracción relativamente baja de MIPYMES reporta haber
                obtenido crédito o financiamiento formal.
              </p>
            </div>

            <div className="info-card">
              <h3>Compras del gobierno a MIPYMES</h3>
              <div className="chart-wrapper">
                <Bar data={comprasData} options={comprasOptions} />
              </div>
              <p className="card-footnote">
               Se muestra la brecha entre la meta legal (≥ 35 % de compras públicas para MIPYMES) y la realidad actual: solo ≈ 0.3 % de las MIPYMES del país participa como proveedora del gobierno.
              </p>
            </div>
          </div>
        </section>
      </main>

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
