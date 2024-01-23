const { response } = require("express");
const { Pokemon } = require("../db");
const { Type } = require("../db");
const {getPokemonDb, getAllPokemon} = require("../controllers/getAllPokemons");
const { getPokemonById } = require("../controllers/getPokemonById");
const {createPokemon} =require ("../controllers/createPokemon")
const {getPokemonByName, getFirst151Pokemons,}= require("../controllers/getPokemonByName")
const {Op} = require('sequelize');
/////////////////////////////////////getAll****************************************************
//**********************************///////////////////////////////////////////////////////////
const getPokemonHandler = async(req,res)=> {
  const {name}= req.query;
  try {
    if (name){const response= await getPokemonDb(name);
    return res.status(200).json(response);
}   const response = await getAllPokemon();
    res.status(200).json(response);

}
    catch ( error ){
        res.status(400).json({error : error.message})
    }
}
/////////////////////////////////////Create****************************************************
//**********************************///////////////////////////////////////////////////////////

const createPokemonHandler= async(req, res)=> {
    try {
 const {
    name,
    attack,
    sprites,
    health,
    defense,
    speed,
    height,
    weigth,
 }= req.body;

 const response=await createPokemon(
    name,
    attack,
    sprites,
    health,
    defense,
    speed,
    height,
    weigth,)
    ;
    res.status(201).json(response);

}
catch(error){
    res.status(400).json(alert( {error : "error al crear pokemon chekea los valores"} ))
}}
/////////////////////////////////////ById******************************************************
//**********************************///////////////////////////////////////////////////////////
const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params; // Cambia de req.query a req.params
  try {
    if (!id) {
      return res.status(400).json({ error: "ID de Pokémon no proporcionado" });
    }

    const pokemon = await getPokemonById(id);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  /////////////////////////////////////ByName**************************************************
//**********************************///////////////////////////////////////////////////////////
const getPokemonByNameHandler = async (req, res) => {
  const { name } = req.params; // Cambia de req.query a req.params
  try {
    if (!name) {
      return res.status(400).json({ error: "Nombre de Pokémon no proporcionado" });
    }

    const pokemonList = await getPokemonByName(name);
    res.status(200).json(pokemonList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  /////////////////////////////////////first151**************************************************
//**********************************///////////////////////////////////////////////////////////
const getFirst151 = async (req, res) => {
  if (req.query.name) {
    // ...
  } else {
    try {
      const dbPokemons = await Pokemon.findAll({
        attributes: ['id', 'name', 'img', 'attack', 'defense', 'speed', 'height', 'weight'],
        include: [{
          model: Type,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }]
      });

      const apiPokemons = await getFirst151Pokemons();

      const allPokemons = [...dbPokemons, ...apiPokemons];
      
      // Format the response to include the required properties
      const formattedPokemons = allPokemons.map(pokemon => {
        const formattedPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.img,
          attack: pokemon.attack,
          defense: pokemon.defense,
          types: pokemon.types.map(type => ({ name: type.name })),
          speed: pokemon.speed,
          height: pokemon.height,
          weight: pokemon.weight
        };

        // Check if 'details' property exists and contains the required information
        // if (pokemon.details) {
        //   console.log('Details:', pokemon.details); // Add this line for debugging

        //   formattedPokemon.speed = pokemon.details.stats.find(stat => stat.stat.name === 'speed').base_stat;
        //   formattedPokemon.height = pokemon.details.height;
        //   formattedPokemon.weight = pokemon.details.weight;
        // }

        return formattedPokemon;
      });

      res.status(200).json(formattedPokemons);
    } catch (error) {
      console.error('Error:', error); // Add this line for debugging
      res.status(404).json({ error: error.message });
    }
  }
};


  module.exports = {
    getPokemonByNameHandler,
    getPokemonByIdHandler,
    createPokemonHandler,
    getPokemonHandler,
    getFirst151,
}