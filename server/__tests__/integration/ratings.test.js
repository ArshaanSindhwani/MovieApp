const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('Ratings Endpoints', () => {
    let api;
    let token;
    let filmId;

    const testUser = { username: 'testuser', password: 'testpassword' };
    const testFilm = {
        film_name: 'Donnie Darko',
        producer: 'Adam Fields',
        director: 'Richard Kelly',
        notable_actors: 'Jake Gyllenhaal, Jena Malone',
        year_released: '2001-01-01',
        poster_img_url: 'https://image.tmdb.org/t/p/w500/test.jpg'
    };

    beforeAll(() => {
        api = app.listen(4002, () => {
            console.log('Test server running on port 4002');
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

    describe('POST /movies/:id/ratings', () => {

        it('should add a rating and return 201', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 8 });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('root_user_rating', 8);
            expect(response.body).toHaveProperty('film_id', filmId);
        });

        it('should return 400 if rating is missing', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({});

            expect(response.status).toBe(400);
        });

        it('should return 400 if rating is not a number', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 'great' });

            expect(response.status).toBe(400);
        });

        it('should return 400 if rating is out of range', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 11 });

            expect(response.status).toBe(400);
        });

        it('should return 409 if user already rated this film', async () => {
            await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 8 });

            const response = await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 9 });

            expect(response.status).toBe(409);
        });

        it('should return 401 with no token', async () => {
            const response = await request(api)
                .post(`/movies/${filmId}/ratings`)
                .send({ root_user_rating: 8 });

            expect(response.status).toBe(401);
        });

    });

    describe('PATCH /movies/:id/ratings', () => {

        it('should update a rating and return 200', async () => {
            await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 7 });

            const response = await request(api)
                .patch(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 9 });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('root_user_rating', 9);
        });

        it('should return 404 if no existing rating to update', async () => {
            const response = await request(api)
                .patch(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 9 });

            expect(response.status).toBe(404);
        });

        it('should return 400 if rating is not a number', async () => {
            const response = await request(api)
                .patch(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 'bad' });

            expect(response.status).toBe(400);
        });

    });

    describe('GET /movies/:id/ratings', () => {

        it('should return all ratings for a film with 200', async () => {
            await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 7 });

            const response = await request(api)
                .get(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toHaveProperty('root_user_rating', 7);
            expect(response.body[0]).toHaveProperty('username', 'testuser');
        });

        it('should return 401 with no token', async () => {
            const response = await request(api)
                .get(`/movies/${filmId}/ratings`);

            expect(response.status).toBe(401);
        });

    });

    describe('GET /users/me/films', () => {

        it('should return the logged-in user\'s watched films with 200', async () => {
            await request(api)
                .post(`/movies/${filmId}/ratings`)
                .set('Authorization', `Bearer ${token}`)
                .send({ root_user_rating: 8 });

            const response = await request(api)
                .get('/users/me/films')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toHaveProperty('film_name', 'Donnie Darko');
        });

        it('should return empty array if user has no ratings', async () => {
            const response = await request(api)
                .get('/users/me/films')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toHaveLength(0);
        });

    });

});
