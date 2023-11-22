const { createPokemon } = require("../controllers/createPokemon");

const createPokemonHandler = async (req, res) => {
  console.log('Received data:', req.body);
  try {
    const {
      name,
      attack,
      img,
      health,
      defense,
      speed,
      height,
      weight,
      types,
    } = req.body;

    const { new_pokemon, message } = await createPokemon({
      name,
      attack,
      img,
      health,
      defense,
      speed,
      height,
      weight,
      types,
    });

    res.status(201).json({
      message: message,
      new_pokemon: new_pokemon,
    });
  } catch (error) {
    if (error.response) {
      console.error('Error creating Pokémon:', error); // Log the response data
    } else {
      console.error('Error creating Pokémon:', error.message); // Log the error message
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPokemonHandler,
};
