import { Router } from 'express';
import { artistController } from '../controllers/ArtistController';

const artistRoutes: Router = Router();

artistRoutes.get('/', artistController.getAllArtists);

artistRoutes.get('/:id', artistController.getArtistById);

export { artistRoutes }