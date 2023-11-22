const { Type } = require("../db");
const axios = require("axios");

const getTypesDb = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    const peticion = response.data.results;
    
    let typesApi = peticion.map((p) => p.name);
    
    const promises = typesApi.map(async (t) => {
      const [type, created] = await Type.findOrCreate({
        where: {
          name: t,
        },
      });
      

      return type; // Devuelve el tipo (ya sea existente o nuevo)
    });
    
    const createdTypes = await Promise.all(promises);
    
    return createdTypes; // Devuelve los tipos creados o encontrados
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTypesDb,
};
