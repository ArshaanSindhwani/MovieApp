const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('Auth Endpoints', () => {
    let api;
    let token;

    const testUser = { username: 'testuser', password: 'testpassword' };

    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log('Test server running on port 4000');
        });
    });

    afterAll((done) => {
        api.close(done);
    });

    beforeEach(async () => {
        await resetTestDB();
    });

    describe('POST /auth/register', () => {

        it('should create a new user and return 201', async () => {
            const response = await request(api)
                .post('/auth/register')
                .send(testUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('username', 'testuser');
            expect(response.body).not.toHaveProperty('password');
        });

        it('should return 400 if username or password missing', async () => {
            const response = await request(api)
                .post('/auth/register')
                .send({ username: 'testuser' });

            expect(response.status).toBe(400);
        });

        it('should return 409 if username already exists', async () => {
            await request(api).post('/auth/register').send(testUser);

            const response = await request(api)
                .post('/auth/register')
                .send({ username: 'testuser', password: 'anotherpassword' });

            expect(response.status).toBe(409);
        });

    });

    describe('POST /auth/login', () => {

        it('should login and return a token with 200', async () => {
            await request(api).post('/auth/register').send(testUser);

            const response = await request(api)
                .post('/auth/login')
                .send(testUser);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 400 if username or password missing', async () => {
            const response = await request(api)
                .post('/auth/login')
                .send({ username: 'testuser' });

            expect(response.status).toBe(400);
        });

        it('should return 400 with wrong password', async () => {
            await request(api).post('/auth/register').send(testUser);

            const response = await request(api)
                .post('/auth/login')
                .send({ username: 'testuser', password: 'wrongpassword' });

            expect(response.status).toBe(400);
        });

        it('should return 400 if user does not exist', async () => {
            const response = await request(api)
                .post('/auth/login')
                .send({ username: 'nobody', password: 'testpassword' });

            expect(response.status).toBe(400);
        });

    });

    describe('GET /auth/me', () => {

        it('should return the logged-in user with 200', async () => {
            await request(api).post('/auth/register').send(testUser);
            const loginRes = await request(api).post('/auth/login').send(testUser);
            token = loginRes.body.token;

            const response = await request(api)
                .get('/auth/me')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('username', 'testuser');
        });

        it('should return 401 with no token', async () => {
            const response = await request(api).get('/auth/me');
            expect(response.status).toBe(401);
        });

        it('should return 401 with an invalid token', async () => {
            const response = await request(api)
                .get('/auth/me')
                .set('Authorization', 'Bearer invalidtoken123');

            expect(response.status).toBe(401);
        });

    });

});
