/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  describe('GET /pokemons', () => {
    it('should get 200 and return a list of pokemons', async () => {
      const response = await agent.get('/pokemons').expect(200);

      // Add your assertions here
      expect(response.body).to.be.an('array'); // Assuming the response is an array
      expect(response.body.length).to.be.greaterThan(0); // Assuming at least one Pokemon is returned
      // Add more assertions based on your application's response structure

      // If you have a specific data structure in mind, you can assert against it
      // For example, if each Pokemon has a 'name' property:
      expect(response.body[0]).to.have.property('name');

      // You can tailor these assertions based on your actual response structure
    });
  });
});
