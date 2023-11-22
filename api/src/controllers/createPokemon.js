// createPokemon.js

const { Pokemon, Type } = require("../db");

const createPokemon = async (pokemonData) => {
  try {
    const { name, health, speed, defense, attack, height, weight, types, img } = pokemonData;

    // Find or create types
    const existingTypes = await Type.findAll({ where: { id: types } });

    if (existingTypes.length !== types.length) {
      throw new Error('Not all types were found.');
    }

    const newPokemon = await Pokemon.create({
      name,
      health,
      speed,
      defense,
      attack,
      height,
      weight,
      img,
    });

    // Manually associate types with the new Pokemon
    await newPokemon.addTypes(existingTypes);

    console.log('Pokemon successfully created:', newPokemon);

    return {
      message: 'Pokemon successfully created',
      new_pokemon: newPokemon,
    };
  } catch (error) {
    console.error('Error creating Pokémon:', error.message);
    throw error;
  }
};

module.exports = {
  createPokemon,
};

