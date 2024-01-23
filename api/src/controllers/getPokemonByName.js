const { Pokemon, Type, } = require("../db");

const {Op} = require('sequelize');
const axios = require("axios");

const getPokemonByName = async (name) => {
  try {
    if (name) {
      // Make sure the stored name is in lowercase for comparison
      const dbPokemonByName = await Pokemon.findAll(name, {
        where: {
          name: {
            [Op.iLike]: `%${name.toLowerCase()}%`,
          },
        },
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

      // If records are found in the database, format the response
      if (dbPokemonByName.length > 0) {
        const formattedDbResults = dbPokemonByName.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.dataValues.sprites.versions['generation-v']['black-white'].animated['front_default'],
          types: pokemon.types.map(t => ({
            name: t.name,
          })),
          health: pokemon.stats.find(s => s.stat.name === 'hp').base_stat,
          attack: pokemon.stats.find(s => s.stat.name === 'attack').base_stat,
          defense: pokemon.stats.find(s => s.stat.name === 'defense').base_stat,
          speed: pokemon.stats.find(s => s.stat.name === 'speed').base_stat,
          height: pokemon.height,
          weight: pokemon.weight,
        }));

        return formattedDbResults;
      }
    }

    // If no records are found in the database or no name is provided, query the API
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    const apiPokemonByName = {
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

    return [apiPokemonByName];
  } catch (error) {
    throw error;
  }
};



  // Agregar esta función para obtener los primeros 151 Pokémon
 

  const getFirst151Pokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const firstResponse = response.data.results;
      const urls = firstResponse.map(p => p.url);
      const promises = urls.map(url => axios.get(url));
      const allResponses = await Promise.all(promises);
      const apiPokemons = allResponses.map(r => {
        return {
          id: r.data.id,
          name: r.data.name,
          img: r.data.sprites.versions['generation-v']['black-white'].animated['front_default'],
          attack: r.data.stats.find(s => s.stat.name === 'attack').base_stat,
          defense: r.data.stats.find(s => s.stat.name === 'defense').base_stat,
          types: r.data.types.map(t => {
            return { name: t.type.name };
          })
        };
      });
      return apiPokemons;
    } catch (error) {
      throw error;
    }
  };
  

// Modificar la función exportada



module.exports={getPokemonByName,getFirst151Pokemons

}