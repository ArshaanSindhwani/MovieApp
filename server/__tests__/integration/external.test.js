const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('External Rating Endpoints', () => {
    let api;
    let token;
    let filmId;

    const testUser = { username: 'testuser', password: 'testpassword' };
    const testFilm = {
        film_name: 'Fight Club',
        producer: 'Art Linson',
        director: 'David Fincher',
        notable_actors: 'Brad Pitt, Edward Norton',
        year_released: '1999-01-01',
        poster_img_url: ''
    };

    beforeAll(() => {
        api = app.listen(4003, () => {
            console.log('Test server running on port 4003');
        });
    });

    afterAll((done) => {
        api.close(done);
    });

    beforeEach(async () => {
        await resetTestDB();
        await request(api).post('/auth/register').send(testUser);
        const loginRes = await request(api).post('/auth/login').send(testUser);
        token = loginRes.body.token;
        const filmRes = await request(api)
            .post('/movies')
            .set('Authorization', `Bearer ${token}`)
            .send(testFilm);
        filmId = filmRes.body.film_id;
    });

    describe('POST /movies/:id/refresh', () => {

        it('should refresh and return updated external rating with 200', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/refresh`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('film_id', filmId);
            expect(response.body).toHaveProperty('external_rating');
            expect(typeof response.body.external_rating).toBe('number');
        }, 10000);

        it('should return 404 for a non-existent film', async () => {
            const response = await request(api)
                .post('/movies/99999/refresh')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
        });

        it('should return 401 with no token', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/refresh`);

            expect(response.status).toBe(401);
        });

    });

});
