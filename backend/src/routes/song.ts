import { Router } from 'express';
import { songController } from '../controllers/SongController';

const songRoutes: Router = Router();

songRoutes.get('/artist', songController.getAllSongs);

songRoutes.get('/artist/:id', songController.getSongById);

export { songRoutes }