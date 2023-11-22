const { sequelize, DataTypes } = require('sequelize');
const { initPokemonModel } = require('./path-to-your-pokemon-model');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => sequelize.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
  describe('Validators', () => {
    const Pokemon = initPokemonModel(sequelize, DataTypes);

    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
  });
});
