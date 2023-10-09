import { notFoundError, forbiddenError } from '@/errors';
import { bookingRepository, roomRepository, enrollmentRepository, ticketsRepository } from '@/repositories';
import { TicketStatus } from '@prisma/client';

async function getBookingByUserId(userId: number) {

    const booking = await bookingRepository.findBookingByUserId(userId);
    if (!booking) throw notFoundError();  
    return booking;
}

async function createBooking(roomId: number, userId: number) {

    await validateRoomBooking(roomId, userId);
    const room = await roomRepository.findRoomById(roomId);
    
    const repeatedBooking = await bookingRepository.findBookingByUserId(userId);
    if (repeatedBooking) throw forbiddenError();

    const booking = await bookingRepository.postBooking(userId, roomId);
    return {
        bookingId: booking.id
    };
}

async function validateRoomBooking(roomId: number, userId: number) {

    // Verificar regras de negócio
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw forbiddenError();
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw forbiddenError();
    const type = ticket.TicketType;
    if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
        throw forbiddenError();
    }

    // Verificar se roomId existe, se não retornar 404 
    const room = await roomRepository.findRoomById(roomId);
    if (!room) throw notFoundError();

    // Verificar se roomId sem vaga ⇒ deve retornar status code 403 (Forbidden)
    const availableBeds = await roomRepository.checkRoomCapacity(roomId);
    if (availableBeds === 0) throw forbiddenError();
}

export const bookingsService = {
    getBookingByUserId,
    createBooking
}