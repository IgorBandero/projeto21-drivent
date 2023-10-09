import { notFoundError, forbiddenError } from '@/errors';
import { bookingRepository, roomRepository } from '@/repositories';

async function getBookingByUserId(userId: number) {

    const booking = await bookingRepository.findBookingByUserId(userId);
    if (!booking) throw notFoundError();  
    return booking;
}

export const bookingsService = {
    getBookingByUserId,
    createBooking
}