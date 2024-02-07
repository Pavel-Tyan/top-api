import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
    name: 'Тест',
    title: 'Заголовок',
    description: 'Описание тестовое',
    rating: 5,
    productId,
};

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/review/create (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then((response: request.Response) => {
                createdId = response.body._id;
                expect(createdId).toBeDefined();
                return;
            });
    });

    it('/review/byProduct/:productId (GET) - success', async () => {
        return request(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            .expect(200)
            .then((response: request.Response) => {
                console.log(response.body);
                console.log(Object.keys(response.body).length);
                expect(response.body).toBe(1);
                return;
            });
    });

    it('/review/byProduct/:productId (GET) - fail', async () => {
        return request(app.getHttpServer())
            .get('/review/byProduct/' + new Types.ObjectId().toHexString())
            .expect(200)
            .then((response: request.Response) => {
                expect(response.body.length).toBe(0);
                return;
            });
    });

    it('/review/:id (DELETE) - success', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200);
    });

    afterAll(() => {
        disconnect();
    });
});
