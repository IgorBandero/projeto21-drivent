import { bookingsService } from './../services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getBooking (req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const booking = await bookingsService.getBookingByUserId(userId);
    return res.status(httpStatus.OK).send(booking);
}


