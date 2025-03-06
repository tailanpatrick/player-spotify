import { Request, Response } from "express";
import { artistSevice } from "../services/artist";

export const artistController = {
  getAllArtists: async (req: Request, res: Response) => {
    try {
      const artists = await artistSevice.getAll();

      res.json(artists)
    } catch (e) {
      console.log(e)
    }
  },

  getArtistById: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const artist = await artistSevice.getById(Number(id));

      res.json(artist)
    } catch (e) {
      console.log(e);
    }
  }
}
