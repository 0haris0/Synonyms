const request = require('supertest')
const app = require('../index')

describe('Search word', () => {
    it('should return status code 200', async () => {
        const res = await request(app)
            .get('/word/clean');
        expect(res.statusCode).toStrictEqual(200);
        expect(res)
    })
});

describe('Add Synonyms', () => {
    it('should return status code 201', async () => {
        const res = await request(app)
            .post('/word/add/')
            .send({
                "firstWord": 'Driving231',
                "secondWord": 'Cycling133'
            });
        expect(res.statusCode).toEqual(201);
        ;
    });
});

describe('Check homepage', () => {
    it('should return status code 404', async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(404);
        ;
    });
});

describe('Check word site', () => {
    it('should return status code 404', async () => {
        const res = await request(app)
            .get('/word')
        expect(res.statusCode).toEqual(404);
        ;
    });
});
