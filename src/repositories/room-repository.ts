import { prisma } from '@/config';

async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    }
  });
}

async function checkRoomCapacity(roomId: number){
  const users = await prisma.booking.findMany({
    where: {
      roomId: roomId,
    }
  })

  const beds = Number(prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      capacity: true,
    }
  }))

  return (beds - users.length);
}

export const roomRepository = {
    findRoomById,
    checkRoomCapacity
};
