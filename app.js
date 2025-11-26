import express from 'express';
import cors from 'cors';
import perfilesRoutes from './routes/perfiles.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', perfilesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
