import request from 'supertest';
import server from './../server/server';

describe('Server', () => {
    it('should respond with a 404 for an unknown route', async () => {
        const response = await request(server.getApp()).get('/unknown-route');
        expect(response.status).toBe(404);
    });

    it('should have the correct middlewares configured', async () => {
        const response = await request(server.getApp()).get('/api/messages');
        expect(response.status).toBe(404); 
    });
});
