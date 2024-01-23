


import {
  GET_BY_NAME,
  GET_POKEMONS,
  GET_DETAILS,
  CLEAN_DETAILS,
  GET_TYPES,
  TYPE_FILTER,
  FILTER_POKEMON,
  CLEAR_SEARCH,
  FILTER_BY_ORIGIN,
  CREATE_POKEMON,
 SET_PAGE
} from "../actions/actions";
const PER_PAGE = 12; // Define PER_PAGE here
let initialState = {
  allPokemons: [],
  pokemonCopy: [],
  posts: [],
  details: {},
  types: [],
  filter: "all",
  filteredPokemons:[],
  pokemonOrder:[],
  originFilter: "all",
  newPokemon:[],
  currentPage: 1,
  totalPages: 1, // Add totalPages to the initial state
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
  return {
    ...state,
    currentPage: action.payload,
  };
    
   
      case GET_POKEMONS:
        return {
          ...state,
          allPokemons: [...action.payload.pokemons],
          pokemonCopy: [...action.payload.pokemons],
          pokemonOrder: [...action.payload.pokemons],
          newPokemon: [...action.payload.pokemons],
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
        };
      case CREATE_POKEMON:
        // Handle the new action type
        return {
          ...state,
          // Add the newly created Pokemon to your state
          newPokemon: [...state.newPokemon, action.payload],
        };

    case GET_BY_NAME:
      return {
        ...state,
        allPokemons: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAN_DETAILS:
      return { ...state, details: {} };

    case GET_TYPES:
      return { ...state, types:[ ...action.payload].slice(0, 20) };  

      case TYPE_FILTER:
  if (action.payload === "all") {
    return {
      ...state,
      allPokemons: [...state.pokemonCopy],
      filter: action.payload,
      currentPage: 1,
      totalPages: Math.ceil([...state.pokemonCopy].length / PER_PAGE),
    };
  } else {
    const filteredPokemons = [...state.pokemonCopy].filter((p) => {
      return p.types.filter((t) => t.name === action.payload).length;
    });

    return {
      ...state,
      filter: action.payload,
      allPokemons:[...filteredPokemons],
      
     
    };
  }
      case FILTER_POKEMON:
  let sortedPokemonCopy;

  switch (action.payload) {
    case "aToZ":
      sortedPokemonCopy = [...state.allPokemons].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "zToA":
      sortedPokemonCopy = [...state.allPokemons].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      break;

    case "attackDesc":
      sortedPokemonCopy = [...state.allPokemons].sort(
        (a, b) => b.attack - a.attack
      );
      break;

    case "attackAsc":
      sortedPokemonCopy = [...state.allPokemons].sort(
        (a, b) => a.attack - b.attack
      );
      break;
      default:
        sortedPokemonCopy = [...state.pokemonCopy];
    }
    return {
      ...state,
      allPokemons:[ ...sortedPokemonCopy],
     
    };

    case CLEAR_SEARCH:
  return {
    ...state,
    allPokemons: state.pokemonOrder,
    currentPage: 1, // Reset currentPage when clearing search
    totalPages: Math.ceil(state.pokemonOrder.length / PER_PAGE),
  };

    case FILTER_BY_ORIGIN:
      const selectedOrigin = action.payload;
      let filterPokemons = [];
    
      if (selectedOrigin === "all") {
        filterPokemons = state.pokemonCopy;
      } else {
        const isNumericOrigin = selectedOrigin === "numeric";
        filterPokemons = state.pokemonCopy.filter((p) => {
          const isNumericId = typeof p.id === "number";
          return isNumericOrigin === isNumericId;
        });
      }
    
      return {
        ...state,
        originFilter: selectedOrigin,
        allPokemons: filterPokemons,
      };


    default:
      return state;
  }
}

export default rootReducer;