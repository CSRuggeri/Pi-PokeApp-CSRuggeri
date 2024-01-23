const { Type } = require("../db");
const axios = require("axios");



const getTypesDb = async () => {
  try {
    // Consultar tipos existentes en la base de datos
    const existingTypes = await Type.findAll({
      attributes: ['name'],
    });

    // Mapear los tipos existentes en la base de datos
    const typesDb = existingTypes.map((type) => type.name);

    // Realizar la solicitud a la API externa
    const response = await axios.get(`https://pokeapi.co/api/v2/type`);
    const apiTypes = response.data.results.map((p) => p.name);

    // Combinar los tipos de la API y los tipos de la base de datos
    const allTypes = [...new Set([...typesDb, ...apiTypes])];

    // Crear o actualizar los tipos en la base de datos
    const promises = allTypes.map(async (t) => {
      const [type, created] = await Type.findOrCreate({
        where: {
          name: t,
        },
      });
      return type;
    });

    // Esperar a que todas las promesas se resuelvan
    const createdTypes = await Promise.all(promises);

    // Devolver los tipos creados o encontrados
    return createdTypes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTypesDb,
};
