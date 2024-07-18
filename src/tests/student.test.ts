import request from 'supertest';
import serverAPI from '../server/server';

describe('Student API', () => {
    let server: typeof serverAPI;
    let studenId: string;
    let userId: string;

    beforeAll((done) => {
        serverAPI.start(3030);
        done();
    });

    afterAll((done) => {
        serverAPI.stop(done);
    }, 20000);

    it('cria um novo estudante', async () => {
        userId = '66717df0ffeba5ceb59aae6a';
        const studentData = {
            name: 'Nininho',
            cpf: '123.588.987-10',
            className: '1A',
            turn: 'manhã',
            brithDay: '2020-01-02T00:00:00.000+00:00'
        };

        try {
            const response = await request(serverAPI.getApp())
                .post(`/api/dev/agenda-edu/students/${userId}`)
                .send(studentData);

            studenId = response.body.id;

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    });

    it('seleciona o estudante pelo ID', async () => {
        const response = await request(serverAPI.getApp())
            .get(`/api/dev/agenda-edu/students/${studenId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', studenId);
    });

    it('pega todos os estudantes', async () => {
        const response = await request(serverAPI.getApp())
            .get('/api/dev/agenda-edu/students');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('atualiza o estudante pelo ID', async () => {
        const response = await request(serverAPI.getApp())
            .put(`/api/dev/agenda-edu/students/${studenId}`)
            .send({
                name: 'updateduser'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', studenId);
        expect(response.body.name).toBe('updateduser');
    });

    it('deleta um estudante pelo ID', async () => {
        const response = await request(serverAPI.getApp())
            .delete(`/api/dev/agenda-edu/students/${studenId}`);

        expect(response.status).toBe(200);

        // Verifica se o usuário foi realmente excluído ao tentar obter pelo ID
        const checkUser = await request(serverAPI.getApp())
            .get(`/api/dev/agenda-edu/students/${studenId}`);

        expect(checkUser.status).toBe(404);
    });
})