import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export async function getNextId(table: string): Promise<number> {
  let last;

  if (table === 'song') {

    last = await prismaClient.song.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  } else {
    last = await prismaClient.artist.findFirst({
      orderBy: {
        id: 'desc',
      },
    });
  }

  if (last) {
    return last.id + 1;
  } else {
    return 1; // Se não houver músicas, comece com 1
  }
}


export { prismaClient }

// async function main() {
//   try {
//     const nextId = await getNextId();
//     const newSong = await prisma.song.create({
//       data: {
//         id: nextId,
//         image: 'https://i.scdn.co/image/ab67616d00001e022774b00531d558bc19e12a24',
//         name: 'Última Saudade - Ao Vivo',
//         duration: '2:30',
//         artist: 'Henrique & Juliano',
//         audio: 'https://jornada-fullstack.s3.us-east-2.amazonaws.com/ultima-saudade.mp3',
//       },
//     });
//     console.log('Nova música criada:', newSong);
//   } catch (error) {
//     console.error('Erro ao criar música:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();