const { Router } = require("express");

const pokemonRouter = Router();
const {
  getPokemonByIdHandler,
  
  getPokemonHandler,
  getPokemonByNameHandler,
  getFirst151,
} = require('../handlers/getPokemonH');
const {createPokemonHandler} =require("../handlers/createPokemonH")

// Define the routes from most specific to least specific
pokemonRouter.get('/:id', getPokemonByIdHandler);
pokemonRouter.get('/:name', getPokemonByNameHandler);
pokemonRouter.post('/new', createPokemonHandler);
pokemonRouter.get('/all', getPokemonHandler);
pokemonRouter.get('/', getFirst151);


// Catch-all route for undefined routes
pokemonRouter.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = pokemonRouter;

