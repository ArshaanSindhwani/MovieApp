const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('Admin Endpoints', () => {
    let api;
    let token;

    const testUser = { username: 'testuser', password: 'testpassword' };
    const testUser2 = { username: 'testuser2', password: 'testpassword' };

    beforeAll(() => {
        api = app.listen(4004, () => {
            console.log('Test server running on port 4004');
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

    describe('GET /admin/users', () => {

        it('should return all users with 200', async () => {
            await request(api).post('/auth/register').send(testUser2);

            const response = await request(api)
                .get('/admin/users')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });

        it('should return 401 with no token', async () => {
            const response = await request(api).get('/admin/users');
            expect(response.status).toBe(401);
        });

    });

    describe('DELETE /admin/users/:id', () => {

        it('should delete a user and return 200', async () => {
            await request(api).post('/auth/register').send(testUser2);
            const usersRes = await request(api)
                .get('/admin/users')
                .set('Authorization', `Bearer ${token}`);
            const user2 = usersRes.body.find(u => u.username === 'testuser2');

            const response = await request(api)
                .delete(`/admin/users/${user2.user_id}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
        });

        it('should return 404 for a non-existent user', async () => {
            const response = await request(api)
                .delete('/admin/users/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
        });

        it('should return 401 with no token', async () => {
            const response = await request(api).delete('/admin/users/1');
            expect(response.status).toBe(401);
        });

    });

});
