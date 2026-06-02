const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('Movies Endpoints', () => {
    let api;
    let token;

    const testUser = { username: 'testuser', password: 'testpassword' };
    const testFilm = {
        film_name: 'Blade Runner',
        producer: 'Michael Deeley',
        director: 'Ridley Scott',
        notable_actors: 'Harrison Ford, Rutger Hauer',
        year_released: '1982-01-01',
        poster_img_url: 'https://image.tmdb.org/t/p/w500/test.jpg'
    };

    beforeAll(() => {
        api = app.listen(4001, () => {
            console.log('Test server running on port 4001');
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
    });

    describe('GET /movies', () => {

        it('should return all films with 200', async () => {
            const response = await request(api)
                .get('/movies')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        it('should return 401 with no token', async () => {
            const response = await request(api).get('/movies');
            expect(response.status).toBe(401);
        });

    });

    describe('POST /movies', () => {

        it('should create a film and return 201', async () => {
            const response = await request(api)
                .post('/movies')
                .set('Authorization', `Bearer ${token}`)
                .send(testFilm);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('film_name', 'Blade Runner');
            expect(response.body).toHaveProperty('film_id');
        });

        it('should return 400 if required fields are missing', async () => {
            const response = await request(api)
                .post('/movies')
                .set('Authorization', `Bearer ${token}`)
                .send({ film_name: 'Incomplete Film' });

            expect(response.status).toBe(400);
        });

        it('should return 401 with no token', async () => {
            const response = await request(api).post('/movies').send(testFilm);
            expect(response.status).toBe(401);
        });

    });

    describe('GET /movies/:id', () => {

        it('should return a single film with 200', async () => {
            const created = await request(api)
                .post('/movies')
                .set('Authorization', `Bearer ${token}`)
                .send(testFilm);

            const response = await request(api)
                .get(`/movies/${created.body.film_id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('film_id', created.body.film_id);
        });

        it('should return 404 for a non-existent film', async () => {
            const response = await request(api)
                .get('/movies/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
        });

    });

    describe('DELETE /movies/:id', () => {

        it('should delete a film and return 200', async () => {
            const created = await request(api)
                .post('/movies')
                .set('Authorization', `Bearer ${token}`)
                .send(testFilm);

            const response = await request(api)
                .delete(`/movies/${created.body.film_id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        });

        it('should return 403 if user does not own the film', async () => {
            const created = await request(api)
                .post('/movies')
                .set('Authorization', `Bearer ${token}`)
                .send(testFilm);

            await request(api)
                .post('/auth/register')
                .send({ username: 'otheruser', password: 'testpassword' });
            const otherLogin = await request(api)
                .post('/auth/login')
                .send({ username: 'otheruser', password: 'testpassword' });
            const otherToken = otherLogin.body.token;

            const response = await request(api)
                .delete(`/movies/${created.body.film_id}`)
                .set('Authorization', `Bearer ${otherToken}`);

            expect(response.status).toBe(403);
        });

        it('should return 404 if film does not exist', async () => {
            const response = await request(api)
                .delete('/movies/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
        });

    });

});
