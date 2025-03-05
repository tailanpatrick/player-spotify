import { prismaClient } from "../db/PrismaClient"

export const artistSevice = {
    getAll: async () => {
       const artists = await prismaClient.artist.findMany({});

       return artists;
    },

    getById: async (id: number) => {
        const artist = await prismaClient.artist.findUnique({
            where: {
                id: id
            }
        });

        return artist;
    }
}