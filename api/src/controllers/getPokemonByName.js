const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getPokemonByName = async (name) => {
  try {
    if (name !== undefined) {
      // Buscar en la base de datos todos los Pokémon cuyo nombre contenga la cadena proporcionada
      const dbPokemonByName = await Pokemon.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Usar Op.iLike para búsqueda no estricta (case-insensitive)
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

      // Si se encuentran registros en la base de datos, retornarlos
      if (dbPokemonByName && dbPokemonByName.length > 0) {
        return dbPokemonByName;
      }
    }

    // Si no se encuentra un registro en la base de datos o no se proporciona un nombre, consultar la API
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const apiPokemonByName = {
      id: response.data.id,
      name: response.data.name,
      // Resto de los atributos aquí
    };

    return [apiPokemonByName]; // Devolver un array de resultados, ya que la búsqueda puede devolver varios Pokémon
  } catch (error) {
    throw error;
  }};

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