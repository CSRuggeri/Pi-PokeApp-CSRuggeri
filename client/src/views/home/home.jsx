import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByname, clearSearch, getPokemons} from "../../redux/actions/actions";
import Pagination from "../../components/paginado/paginado";
import "./home.css";
import Navbar from "../../components/navBar/navBar";
import Cards from "../../components/cards/cards";



const HomePage = () => {
  const dispatch = useDispatch();
  const PER_PAGE = 12; // Move the declaration here
  const [currentPage, setPage] = useState(0);
  const allPokemons = useSelector((state) => {
    const pokemons = state.allPokemons;
    if (Array.isArray(pokemons)) {
      return pokemons.slice(currentPage * PER_PAGE, currentPage * PER_PAGE + PER_PAGE);
    }
    return [pokemons];
  });



  function handleChange(e) {
    setSearchString(e.target.value);
  }

  const [searchString, setSearchString] = useState("");
  
  
  async function handleSubmit() {
    console.log("searchString:", searchString);
    try {
      // Use searchString in the dispatch action
      const response = await dispatch(getByname(`${searchString.toLowerCase()}`));
  
      const searchStringLower = searchString.toLowerCase();
  
      if (response.payload) {
        const matchFound = response.payload
        matchFound.includes(searchStringLower)
        
  
        if (matchFound) {
          console.log(`Palabra clave '${searchString}' encontrada en '${response.payload}'`);
          // Coloca aquí la lógica para despachar la acción
        } else {
          console.log(`No se encontró ningún Pokémon con el nombre "${searchString}"`);
        }
      } else {
        console.log(`No se encontró ningún Pokémon con el nombre "${searchString}"`);
      }
  
      // Reset the page only if it's a new search
      if (currentPage !== 0) {
        setPage(0);
      }
    } catch (error) {
      // Display an error message to the user
      console.error('Error searching:', error);
    }
  }
  
  
  async function handlePage(pag) {
   
    try {
      const pageNumber = parseInt(pag, 10);
      if (!isNaN(pageNumber)) {
        // Check if the new page number is within the valid range
        if (pageNumber >= 0 && pageNumber <= totalPages) {
          // Fetch the next page of Pokemon data
         
          // Update the current page
         setPage(pageNumber)  ;
        } else {
          console.error('Invalid page number:', pag);
        }
      } else {
        console.error('Invalid page number:', pag);
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  function handleClear() {
    setPage(0);
    setSearchString("");
    dispatch(clearSearch());
  }
  useEffect(() => {
    console.log('Fetching Pokémon data...');
    dispatch(getPokemons()); // Fetch initial Pokémon data
  }, [dispatch]);
 
  
  const state = useSelector((state) => state); // Use useSelector to get the state from the Redux store
  const totalPokemons = state.allPokemons.length;
  const totalPages = Math.ceil(totalPokemons / PER_PAGE);
  
  return (
    
    
    
    <section className="Home-wrapper">
      <div className="headerxd">
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} setPage={setPage} handleClear={handleClear}/>
     

      </div>
      
      
      <section className="home-container">
       
      
       
        <Cards allPokemons={allPokemons} setPage={setPage} />        
      </section>
      <footer>
        <Pagination className="paginadohome" currentPage={currentPage} totalPages={totalPages} handlePage={handlePage} />
    <p className="description">&copy; 2023 Todos los derechos reservados</p>
  </footer>
      
    </section>
    
    
    
  );
};

export default HomePage;