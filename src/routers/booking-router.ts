import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getBooking, newBooking } from '@/controllers';
import { createRoomSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
    .all("/*", authenticateToken)
    .get("/booking", getBooking)
    .post("/booking", validateBody(createRoomSchema), newBooking)

export { bookingRouter };
