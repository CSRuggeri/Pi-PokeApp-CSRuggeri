const axios = require('axios');
const { Type } = require('../db');


module.exports = async () => {
  
  try {

    const response = (await axios('https://pokeapi.co/api/v2/type')).data.results;
    await Type.bulkCreate(response);

  } catch (error) {
    
    console.error(error.message);
  }
};