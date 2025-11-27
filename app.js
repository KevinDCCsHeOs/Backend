import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import perfilesRoutes from './routes/perfiles.routes.js';
import chatRoutes from './routes/chat.routes.js';
import chat_historialRoutes from './routes/chat_historial.routes.js';
import modulos_educativosRoutes from './routes/modulos_educativos.routes.js';
import campanias_difusionRoutes from './routes/campanias_difusion.routes.js';
import documentosRoutes from './routes/documentos_conocimiento.routes.js';
import embajadores_logRoutes from './routes/embajadores_log.routes.js';
import encuesta_resultsRoutes from './routes/encuestas_respuestas.routes.js';
import foro_comentariosRoutes from './routes/foro_comentarios.routes.js';
import noticias_difusionRoutes from './routes/noticias_difusion.routes.js';
import polos_desarrolloRoutes from './routes/polos_desarrollo.routes.js';
import proyectos_construccionRoutes from './routes/proyectos_construccion.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', perfilesRoutes);
app.use(`/api`, chatRoutes);
app.use(`/api`, chat_historialRoutes);
app.use(`/api`, modulos_educativosRoutes);
app.use(`/api`, campanias_difusionRoutes);
app.use(`/api`, documentosRoutes);
app.use(`/api`, embajadores_logRoutes);
app.use(`/api`, encuesta_resultsRoutes);
app.use(`/api`, foro_comentariosRoutes);
app.use(`/api`, noticias_difusionRoutes);
app.use(`/api`, polos_desarrolloRoutes);
app.use(`/api`, proyectos_construccionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
