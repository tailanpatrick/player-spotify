import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Importar artists.js dinamicamente
    const artistsModule = await import('../../frontend/src/assets/database/artists.js');
    const artistArray = artistsModule.artistArray;

    // Importar songs.js dinamicamente
    const songsModule = await import('../../frontend/src/assets/database/songs.js');
    const songsArray = songsModule.songsArray;

    // Limpa a coleção Artist
    await prisma.artist.deleteMany();
    console.log('Coleção Artist limpa.');

    // Popula a coleção Artist
    for (const artist of artistArray) {
      await prisma.artist.create({
        data: {
          id: artist.id,
          image: artist.image,
          name: artist.name,
          banner: artist.banner,
        },
      });
    }
    console.log('Coleção Artist populada com sucesso.');

    // Limpa a coleção Song
    await prisma.song.deleteMany();
    console.log('Coleção Song limpa.');

    // Popula a coleção Song
    for (const song of songsArray) {
      await prisma.song.create({
        data: {
          id: song.id,
          image: song.image,
          name: song.name,
          duration: song.duration,
          artist: song.artist,
          audio: song.audio,
        },
      });
    }
    console.log('Coleção Song populada com sucesso.');
  } catch (error) {
    console.error('Erro ao popular as coleções:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();