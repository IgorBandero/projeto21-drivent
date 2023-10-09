import Joi from 'joi';
import { InputRoomBody } from '@/protocols';

export const createRoomSchema = Joi.object<InputRoomBody>({
    roomId: Joi.number().required()
});
