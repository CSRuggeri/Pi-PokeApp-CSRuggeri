const {Op} = require("sequelize")
const {Pokemon} = require("../db")
const  axios = require("axios")


const {Type}= require("../db")



const getPokemonDb = async () => {
    const allPokemon = await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["Nombre"]
        }
      ]
    });
    return allPokemon;
  }
  

  const getPokemonApi = async (url = 'https://pokeapi.co/api/v2/pokemon') => {
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
      let url = 'https://pokeapi.co/api/v2/pokemon';
      const allPokemon = [];
  
      // Fetch Pokémon in batches until there is no 'next' link
      do {
        const apiResponse = await axios.get(url);
        const pokemonBatch = apiResponse.data.results;
  
        for (const pokemon of pokemonBatch) {
          const details = await getPokemonDetails(pokemon.url);
          allPokemon.push({
            name: pokemon.name,
            details,
          });
        }
  
        url = apiResponse.data.next; // Update URL for the next batch
      } while (url);
  
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


module.exports= {
    
    getPokemonDb,
    getPokemonApi,
    getAllPokemon,
   
}