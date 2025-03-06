import express from 'express';
import cors from 'cors'
import { artistRoutes } from './routes/artist';
import { songRoutes } from './routes/song';

const app = express();
const port = 3000;

app.use(cors());


// Configuração CORS
const allowedOrigins = [
  'http://localhost:5173',
];

app.use(cors())

// Rotas
app.use('/artist', artistRoutes);
app.use('/song', songRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
