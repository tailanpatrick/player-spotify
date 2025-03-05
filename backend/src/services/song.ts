import { prismaClient } from "../db/PrismaClient";

export const songService = {
    getAll: async () => {
        const songs = await prismaClient.song.findMany({});

        return songs;
    },

    getById: async (id: number) => {
        const song = await prismaClient.song.findUnique({
            where: {
                id: id
            }
        });

        return song;
    }
}