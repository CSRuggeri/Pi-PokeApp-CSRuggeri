import axios from "axios";


export const GET_POKEMONS = "GET_POKEMONS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const GET_TYPES = 'GET_TYPES';
export const TYPE_FILTER = 'TYPE_FILTER';
export const FILTER_POKEMON = "FILTER_POKEMON";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const CREATE_POKEMON = "CREATE_POKEMON";
export const SET_PAGE = "SET_PAGE";

export function createPokemon(pokemonData) {
  return async function (dispatch) {
    try {
      console.log("Request Payload:", pokemonData);
      const response = await axios.post("http://localhost:3001/pokemon/new", pokemonData);
     
      
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating Pokémon:", error.response.data);
    }
  };
}
// actions.js


export const setPage = (pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: SET_PAGE,
      payload: pageNumber,
    });
  } catch (error) {
    console.error("Error setting page:", error);
  }
};




export function getPokemons(page) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/pokemon?page=${page}`);
     
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };
}


export function getByname(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/pokemon/${name}`);
      
      if (response.data.length === 0) {
        dispatch({
          type: "POKEMON_NOT_FOUND",
          payload: [],
        });
      } else {
        dispatch({
          type: GET_BY_NAME,
          payload: response.data,
        });
      }
    } catch (error) {
      alert("no existe pokemon con ese nombre", error.message);
      throw error;
    }
  };
}


export function getDetails(id, setIsIdValid) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/pokemon/${id}`);
      dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
      setIsIdValid(true); // La ID es válida, actualizar el estado
    } catch (error) {
      setIsIdValid(false); // La ID no es válida, actualizar el estado
    }
  };
}



export const cleanDetails = () => {
  return { type: CLEAN_DETAILS };
};


export function getTypes(types) {
  return async function(dispatch){
  const response = await axios ('http://localhost:3001/type')
    return dispatch({
      type: "GET_TYPES",
      payload: response.data,
    })
  } 
};
export const filterByOrigin = (selectedOrigin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: selectedOrigin
  };
};

export const typeFilter = (filter) => {
  return { type: TYPE_FILTER, payload: filter };
};

export const filterPokemon = (filterName) => {
  return { type: FILTER_POKEMON, payload: filterName };
}

export const  clearSearch = () => {
  return {type: CLEAR_SEARCH}
}