import { Request, Response } from "express";
import { songService } from "../services/song";

export const songController = {
  getAllSongs: async (req: Request, res: Response) => {
    try {
      const songs = await songService.getAll();

      res.json(songs)
    } catch (e) {
      console.log(e)
    }
  },

  getSongById: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const artist = await songService.getById(Number(id));

      res.json(artist)
    } catch (e) {
      console.log(e);
    }
  }
}
