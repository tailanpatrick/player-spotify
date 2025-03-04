import express, { Request, Response } from 'express';
import { artistRoutes } from './routes/artist';
import { songRoutes } from './routes/song';

const app = express();
const port = 3000;


// Rotas
app.use(artistRoutes);
app.use(songRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});