import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getNextId(): Promise<number> {
  const lastSong = await prisma.song.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  if (lastSong) {
    return lastSong.id + 1;
  } else {
    return 1; // Se não houver músicas, comece com 1
  }
}

async function main() {
  try {
    const nextId = await getNextId();
    const newSong = await prisma.song.create({
      data: {
        id: nextId,
        image: 'https://i.scdn.co/image/ab67616d00001e022774b00531d558bc19e12a24',
        name: 'Última Saudade - Ao Vivo',
        duration: '2:30',
        artist: 'Henrique & Juliano',
        audio: 'https://jornada-fullstack.s3.us-east-2.amazonaws.com/ultima-saudade.mp3',
      },
    });
    console.log('Nova música criada:', newSong);
  } catch (error) {
    console.error('Erro ao criar música:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();