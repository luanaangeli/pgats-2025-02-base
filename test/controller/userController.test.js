const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//aplicação
const app = require('../../rest/app')

//testes
describe('User Controller', () => {
    describe ('POST /api/users/register', () => {

        it('Quando informo email já cadastrado, o retorno será 400', async () => {
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
    });

});