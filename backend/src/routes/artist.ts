import { Router } from 'express';
import { artistController } from '../controllers/ArtistController';

const artistRoutes: Router = Router();

artistRoutes.get('/artist', artistController.getAllArtists);

artistRoutes.get('/artist/:id', artistController.getArtistById);

export { artistRoutes }