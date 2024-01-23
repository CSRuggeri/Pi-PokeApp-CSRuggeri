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
      
      const response = await axios.post("http://localhost:3001/pokemon/new", pokemonData);
         console.log("Request Payload:", pokemonData);
      
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
  return async function (dispatch, getState) {
    try {
      const state = getState(); // Get the current state

      // You can access the filters and sorts from the state
      const { filter, originFilter } = state;

      // Customize your API call based on the filters and sorts
      const apiUrl = `http://localhost:3001/pokemon?page=${page}&filter=${filter}&originFilter=${originFilter}`;
      const response = await axios(apiUrl);

      dispatch({
        type: GET_POKEMONS,
        payload: {
          pokemons: response.data,
          currentPage: page,
          totalPages: response.headers['x-total-pages'],
        },
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };
}


export function getByname(name) {
  return async function (dispatch) {
    try {
     
      const allPokemonResponse = await axios('http://localhost:3001/pokemon');
      const allPokemonData = allPokemonResponse.data;

    
      const filteredData = allPokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredData.length === 0) {
        dispatch({
          type: "POKEMON_NOT_FOUND",
          payload: [],
        });
      } else {
        dispatch({
          type: GET_BY_NAME,
          payload: filteredData,
        });
      }
    } catch (error) {
      alert("Error al buscar Pokémon", error.message);
      throw error;
    }
  };
}

export function getDetails(id, setIsIdValid, filter) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/pokemon/${id}`);
      const filteredData = applyFilter(response.data, filter);

      dispatch({
        type: "GET_DETAILS",
        payload: filteredData,
      });

      setIsIdValid(true);
    } catch (error) {
      setIsIdValid(false);
    }
  };
}

// Helper function to apply the filter
function applyFilter(data, filter) {
  // Apply your filtering logic here based on the filter parameter
  // Example: Filter by type
  if (filter === "fire") {
    return data.filter((pokemon) => pokemon.types.includes("fire"));
  }
  
  // If no filter or other filters, return the original data
  return data;
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