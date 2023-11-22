
const { Pokemon, Type} = require("../db");
const axios = require("axios");
// const { API_KEY } = process.env;

const getPokemonById = async (id) => {
  try {
    if (id !== undefined) {
      const dbPokemonById = await Pokemon.findByPk(id, {
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      // If a record is found in the database, return it
      if (dbPokemonById) {
        return dbPokemonById;
      }
    }

    // If no record is found in the database or no ID is provided, query the API
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    
    const apiPokemonById = {
      id: response.data.id,
        name: response.data.name,
        img: response.data.sprites.versions['generation-v']['black-white'].animated['front_default'],
        types: response.data.types.map(t => {
          return { name: t.type.name };
        }),
        health: response.data.stats.find(s => s.stat.name === 'hp').base_stat,
        attack: response.data.stats.find(s => s.stat.name === 'attack').base_stat,
        defense: response.data.stats.find(s => s.stat.name === 'defense').base_stat,
        speed: response.data.stats.find(s => s.stat.name === 'speed').base_stat,
        height: response.data.height,
        weight: response.data.weight
      };


    return apiPokemonById;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPokemonById,}