import { notFoundError, forbiddenError } from '@/errors';
import { bookingRepository, roomRepository } from '@/repositories';

async function getBookingByUserId(userId: number) {

    const booking = await bookingRepository.findBookingByUserId(userId);
    if (!booking) throw notFoundError();  

    return {
        id: booking.id,
        Room: booking.Room,
    };    
}

async function createBooking(roomId: number, userId: number) {

    await validateRoomBooking(roomId, userId);
/*
    const bookingId = await bookingRepository.postBooking(userId, roomId);
    if (!bookingId) throw notFoundError();    
    return booking;
*/

}

async function validateRoomBooking(roomId: number, userId: number) {

    // Fora da regra de negócio ⇒ deve retornar status code 403 (Forbidden)

    // Verificar se roomId existe, se não retornar 404 
    const room = await roomRepository.findRoomById(roomId);
    if (!room) throw notFoundError();

    // Verificar se roomId sem vaga ⇒ deve retornar status code 403 (Forbidden)
    const availableBeds = await roomRepository.checkRoomCapacity(roomId);
    if (availableBeds === 0) throw forbiddenError();

  
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket) throw notFoundError();
  
    const type = ticket.TicketType;
  
    if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
      throw cannotListHotelsError();
    }
  }

  /*

  async function validateUserBooking(userId: number) {
    const enrollment = await findEnrollmentByUserId(userId);
    const ticket = await findTicketByEnrollmentId(enrollment.id);
    const type = ticket.TicketType;
  
    if (isInvalidBooking(ticket, type)) {
      throw forbiddenError(`ticket not paid, does not include hotel or remote reservation`);
    }
  }
*/
  

export const bookingsService = {
    getBookingByUserId,
    createBooking
}