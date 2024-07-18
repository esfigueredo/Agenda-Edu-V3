import request from 'supertest';
import serverAPI from './../server/server';

describe('User API', () => {
    let server: typeof serverAPI;
    let messageId: string;

    beforeAll((done) => {
        serverAPI.start(3030);
        done();
    });

    afterAll((done) => {
        serverAPI.stop(done);
    }, 20000);
    

    it('cria uma nova mensagem', async () => {
        const messageData = {
            messageDate: '2023-12-20T00:00:00Z',
            referenceDate: '2023-12-20T00:00:00Z',
            title: 'End of Year Celebration',
            role: 'teacher',
            subjects: [
                'Portuguese',
                'Mathematics'
            ],
            className: '5A',
            body: 'We are excited to announce our end of year celebration. Please join us on the 20th of December!'

        };

        try {
            const response = await request(serverAPI.getApp())
                .post('/api/dev/agenda-edu/messages')
                .send(messageData);

            messageId = response.body.id;
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');

        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    });

    it('seleciona a mensagem pelo ID', async () => {
        const response = await request(serverAPI.getApp())
            .get(`/api/dev/agenda-edu/messages/${messageId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', messageId);
    });

    it('pega todas as mensagens', async () => {
        const response = await request(serverAPI.getApp())
            .get('/api/dev/agenda-edu/messages');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('atualiza a mensagem pelo ID', async () => {
        const updatedData = {
            messageDate: '2023-12-20T00:00:00Z',
            referenceDate: '2023-12-20T00:00:00Z',
            title: 'End of Year Celebration',
            role: 'teacher',
            subjects: [
                'Portuguese',
                'Mathematics'
            ],
            className: '9A',
            body: 'We are excited to announce our end of year celebration. Please join us on the 20th of December!'
        };
    
        const response = await request(serverAPI.getApp())
            .put(`/api/dev/agenda-edu/messages/${messageId}`)
            .send(updatedData);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', messageId);
        expect(response.body.className).toBe('9A');
        expect(response.body.body).toBe(updatedData.body); 
    });

    it('deleta uma mensagem pelo ID', async () => {
        const response = await request(serverAPI.getApp())
            .delete(`/api/dev/agenda-edu/messages/${messageId}`);

        expect(response.status).toBe(204);

        const checkUser = await request(serverAPI.getApp())
            .get(`/api/dev/agenda-edu/messages/${messageId}`);

        expect(checkUser.status).toBe(404);
    });
});
