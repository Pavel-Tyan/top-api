import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
    login: 'a2@a.ru',
    password: '1',
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined();
                return;
            });
    });

    it('/auth/login (POST) - fail password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, password: '2' })
            .expect(401, {
                statusCode: 401,
                message: 'Неверный пароль',
                error: 'Unauthorized',
            });
    });

    it('/auth/login (POST) - fail email', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ ...loginDto, login: '2@.ru' })
            .expect(401, {
                statusCode: 401,
                message: 'Пользователь с таким email не найден',
                error: 'Unauthorized',
            });
    });

    afterAll(() => {
        disconnect();
    });
});
