import { prisma } from '@/config';

async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

export const roomRepository = {
    findRoomById,
};
