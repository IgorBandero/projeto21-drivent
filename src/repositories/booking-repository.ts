import { prisma } from '@/config';

async function findBookingByUserId(userId: number) {

    return prisma.booking.findFirst({
        where: {
            userId: userId
        },
        include: {
            Room: true,
        },
    });
}

export const bookingRepository = {
    findBookingByUserId
};
