//const request = require('supertest');
//const { expect } = require('chai');



//testes
describe('User Service External', () => {
    
    describe ('POST /api/users/register', () => {

        it('External 400: Quando informo email já cadastrado, o retorno será 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: "Alice",
                    email:"alice@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Email já cadastrado');

        });

       

    
    });

    describe ('POST /api/users/login', () => {

        it('External 401: AUTENTICAR: Quando informo email errado, o retorno será 401', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email:"alici@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error','Credenciais inválidas');

        });

         it('External 401: Quando informo senha errado, o retorno será 401', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email:"alici@email.com",
                    password: "123ddd"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error','Credenciais inválidas');

        });

        it('External 200: Quando informo email correto para cadastrar, o retorno será 200', async () => {
            
            const resposta = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email: "bob@email.com", 
                    password: '123456'
                });

            expect(resposta.status).to.equal(200);
                           
        });

        it('External 200: AUTENTICAR SUCESSO: Quando informo email correto, o retorno será 401', async () => {
            
            const resposta = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email:"alice@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(200);
           
        });

    });    
});
