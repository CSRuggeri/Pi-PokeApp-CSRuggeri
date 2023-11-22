const { Router } = require('express');
const pokemonRouter = require('./pokemonRoutes'); // Cambia el nombre de la variable a "pokemonRouter"
const typeRouter = require('./typeRoutes'); // Cambia el nombre de la variable a "typeRouter"

const router = Router();

// Configurar los routers
router.use('/pokemon', pokemonRouter); // Usa "pokemonRouter" en lugar de "rtPokemons"
router.use('/type', typeRouter); // Usa "typeRouter" en lugar de "rtTypes"

module.exports = router;
