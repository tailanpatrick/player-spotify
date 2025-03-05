import { Router } from 'express';
import { songController } from '../controllers/SongController';

const songRoutes: Router = Router();

songRoutes.get('/', songController.getAllSongs);

songRoutes.get('/:id', songController.getSongById);

export { songRoutes }