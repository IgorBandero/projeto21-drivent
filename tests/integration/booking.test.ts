import httpStatus from 'http-status';
import supertest from 'supertest';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { createUser } from '../factories';
import { generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
    await init();
});

const server = supertest(app);

describe('GET /booking', () => {

    it('Deve responder com 401 se nenhum token for enviado', async () => {
        const response = await server.get('/booking');
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('Deve responder com 401 se o token não for válido', async () => {
        const token = faker.lorem.word();
        const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('Deve responder com 401 se não existe sessão para o token enviado', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);   
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('Quando o token é válido: ', () => {

        it('Deve responder com 404 quando o usuário não tem reserva', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('Deve retornar OK', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toMatchObject({
              id: expect.any(Number),
              Room: {
                id: expect.any(Number),
                name: expect.any(String),
                capacity: expect.any(Number),
                hotelId: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            });
        });
    });
  });