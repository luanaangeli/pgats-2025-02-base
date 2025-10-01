const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../rest/app')



describe('Checkout Controller', () => {
    describe ('POST /api/checkout', () => {

        it('Quando informo checkout errado, o retorno será 401', async () => {
            const resposta = await request(app)
                .post('/api/checkout')
                .send({
                    "items": [
                        { 
                            productId: 0,
                            quantity: 0    
                        }
                    ],
                    freight: 0,
                    paymentMethod: "boleto",
                    cardData: {
                        number: "string",
                        name: "string",
                        expiry: "string",
                        cvv: "string"
                }
                });

            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error','Token inválido');

        });


    });        
});