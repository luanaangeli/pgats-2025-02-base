const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../rest/app')

//Mock
const userService = require('../../src/services/userService')

//testes
describe('User Controller', () => {
    
    describe ('POST /api/users/register', () => {

        it('SEM MOCKS 400: Quando informo email já cadastrado, o retorno será 400', async () => {
            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "Alice",
                    email:"alice@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Email já cadastrado');

        });

        it('COM MOCKS 400: Quando informo email já cadastrado, o retorno será 400', async () => {
            
            const userServiceMock = sinon.stub(userService, 'findUserByEmail');
            userServiceMock.throws(new Error('Email já cadastrado'));            
        
            
            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "Alice",
                    email:"alice@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Email já cadastrado');

            sinon.restore();

        });

        it('SEM MOCK 201 Quando informo email novo para cadastrar, o retorno será 201', async () => {
           
            const resposta = await request(app)
                .post('/api/users/register')
                .send({
                    name: "carlos", 
                    email: "carlos@email.com",
                    password: "123456"

                });

            expect(resposta.status).to.equal(201);
                               
        });

    });


    describe ('POST /api/users/login', () => {

        it('SEM MOCKS 401 AUTENTICAR: Quando informo email errado, o retorno será 401', async () => {
            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email:"alici@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error','Credenciais inválidas');

        });

        it('COM MOCK 401 AUTENTICAR: Quando informo email errado, o retorno será 401', async () => {
            
            const userServiceMock = sinon.stub(userService, 'authenticate');
            userServiceMock.returns(false);

            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email:"alici@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error','Credenciais inválidas');

            sinon.restore();

        });

        it('COM MOCK 200 AUTENTICAR SUCESSO: Quando informo email errado, o retorno será 401', async () => {
            
            const userServiceMock = sinon.stub(userService, 'authenticate');
            userServiceMock.returns(true);

            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email:"alice@email.com",
                    password: "123456"
                });

            expect(resposta.status).to.equal(200);
           
            sinon.restore();

        });



        it('Quando informo senha errado, o retorno será 401', async () => {
            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email:"alici@email.com",
                    password: "123ddd"
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error','Credenciais inválidas');

        });

        it('Quando informo email correto para cadastrar, o retorno será 201', async () => {
            const resposta = await request(app)
                .post('/api/users/login')
                .send({
                    email: "bob@email.com", 
                    password: '123456'
                });

            expect(resposta.status).to.equal(200);
            //expect(resposta.body).to.have.property('user','bob');    
                    
        });
    });

});