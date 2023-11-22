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
  const [page, setPage] = useState(0);
  const allPokemons = useSelector((state) => {
    const pokemons = state.allPokemons;
    if (Array.isArray(pokemons)) {
      return pokemons.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
    }
    return [pokemons];
  });

  const [searchString, setSearchString] = useState("");

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  async function handleSubmit(e) {
    try {
      
      if (e) {
        e.preventDefault();
        const response = await dispatch(getByname(searchString));
        if (response.payload.length === 0) {
          console.log(`No se encontró ningún Pokémon con el nombre "${searchString}"`);
        }
        // Reset the page only if it's a new search
        if (page !== 0) {
          setPage(0);
        }
        setSearchString("");
      }
    } catch (error) {
      
      // Display an error message to the user
    }
  }
  
  
  async function handlePage(pag) {
    try {
      const pageNumber = parseInt(pag, 10); // Parse pag as an integer
      if (!isNaN(pageNumber)) {
        dispatch(setPage(pageNumber));
        setPage(pageNumber);
        await dispatch(getPokemons(pageNumber, PER_PAGE));
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
        <Pagination className="paginadohome" page={page} total={totalPages} handlePage={handlePage} />
    <p className="description">&copy; 2023 Todos los derechos reservados</p>
  </footer>
      
    </section>
    
    
    
  );
};

export default HomePage;