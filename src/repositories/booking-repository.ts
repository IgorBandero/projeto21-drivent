import { prisma } from '@/config';

async function findBookingByUserId(userId: number) {

    return prisma.booking.findFirst({
        where: {
            userId: userId
        },
        select: {
            id: true, 
            Room: true
        }
    });
}

async function postBooking(userId: number, roomId: number) {
    return prisma.booking.create({
        data: {
            userId,
            roomId,
        },
    });
}

export const bookingRepository = {
    findBookingByUserId, 
    postBooking
};
