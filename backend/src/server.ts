import express from 'express';
import { artistRoutes } from './routes/artist';
import { songRoutes } from './routes/song';

const app = express();
const port = 3000;


// Rotas
app.use('/artist', artistRoutes);
app.use('/song', songRoutes);



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});