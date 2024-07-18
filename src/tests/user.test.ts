import request from 'supertest';
import serverAPI from './../server/server';

describe('User API', () => {
    let server =  serverAPI.getApp();
    let userId: string;
    let token: string;
    let email: string;
    let password: string;
    let role: string;

    beforeAll((done) => {
        serverAPI.start(3030);
        done();
    });

    afterAll((done) => {
        serverAPI.stop(done);
    }, 20000);

    // it('busca um token de acesso para poder se registrar passando dados validos', async () => {
    //     const userData = {
    //         email: 'erika.souza@gmail.com',
    //         password: 'Helena2020',
    //         role: 'admin'
    //     };

    //     try {
    //         const response = await request(server)
    //             .post(`/api/dev/agenda-edu/getToken`)
    //             .send(userData);

    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty('email', email);
    //         expect(response.body).toHaveProperty('role', role);
    //         expect(response.body).toHaveProperty('token', token);
    //     } catch (error) {
    //         console.error('Erro ao pegar o token:', error);
    //     };
    // });

    it('busca um token de acesso para poder se registrar passando dados invalidos', async () => {
        const userData = {
            email: 'erika.souza',
            password: 123456,
            role: 'teste'
        };

        try {
            const response = await request(server)
                .post(`/api/dev/agenda-edu/getToken`)
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('email', email);
            expect(response.body).toHaveProperty('role', role);
            expect(response.body).toHaveProperty('token', token);
        } catch (error) {
            console.error('Erro ao pegar o token:', error);
        };
    });


});
