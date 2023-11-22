

import "./navBar.css";
import { Link } from "react-router-dom";

function Navbar({ handleChange, handleSubmit, setPage, handleClear }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    handleSubmit(e);
  };

  return (
    <div className="nav-bars">
      <img  className="logo" src="https://raw.githubusercontent.com/CSRuggeri/Pi-PokeApp-CSRuggeri/main/pokemon.png" alt="logo" /> 
     <div   className="nashe">
          <form onSubmit={handleFormSubmit} className="searchabrnashe">
        <input
          placeholder="Busqueda"
          type="search"
          className="input-search"
          onChange={handleChange}
        />
        <button type="submit" className="buttonss">
          BUSCAR
        </button>
      </form>
        </div> 
      
     
      
      <div className="top-part">

<Link to={`/createPoke`}>
          <button className="button">CREATE POKÉMON</button>
        </Link>
        <Link to={"/about"} className="aboutbot">
        <div className="textboto">
          Sobre mi
        </div>
      </Link>      
      <div className="button-container">
        <button onClick={handleClear} className="button">
          CLEAR
        </button>
      </div>
      </div>
      
      
      
        
      
    </div>
  );
}

export default Navbar;
