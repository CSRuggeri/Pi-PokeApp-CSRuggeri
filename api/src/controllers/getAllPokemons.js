const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getPokemonDb = async () => {
  const allPokemon = await Pokemon.findAll({
    include: [
      {
        model: Type,
        attributes: ["Nombre"],
      },
    ],
  });
  return allPokemon;
};

const getPokemonApi = async (url = "https://pokeapi.co/api/v2/pokemon") => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPokemonDetails = async (pokemonUrl) => {
  try {
    const response = await axios.get(pokemonUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllPokemon = async (name) => {
  try {
    const dbPokemon = await getPokemonDb(); // Fetch Pokemon from the database
    const apiPokemon = await getFirst151Pokemons(); // Fetch Pokemon from the PokeAPI

    // Combine the results from the database and the PokeAPI
    const allPokemon = dbPokemon.map(dbPoke => ({
      ...dbPoke.dataValues,
      details: apiPokemon.find(apiPoke => apiPoke.name.toLowerCase() === dbPoke.name.toLowerCase()),
    }));

    if (name) {
      const filteredPokemon = allPokemon.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );

      return filteredPokemon;
    }

    return allPokemon;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  getPokemonDb,
  getPokemonApi,
  getAllPokemon,
};