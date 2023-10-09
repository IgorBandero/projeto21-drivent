import { bookingsService } from './../services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking (req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const booking = await bookingsService.getBookingByUserId(userId);    
    return res.status(httpStatus.OK).send(booking);
}

export async function newBooking(req: AuthenticatedRequest, res: Response) {

    const userId = Number(req.userId);
    const roomId = Number(req.body.roomId);
    const bookingId = await bookingsService.createBooking(userId, roomId);
    return res.send(bookingId).status(httpStatus.OK);
}