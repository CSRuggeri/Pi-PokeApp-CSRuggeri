import React from 'react';
import './cards.css'; // Assuming you have a CSS file for styling
import Card from '../card/card';
import TypesFilter from "../../components/typeFilter/typeFilter";
import Ordenator from "../ordenador/ordenador";
function Cards({ allPokemons, setPage }) {


  return (
    <div className='cards-container'>
      
      <div className="types">
      <TypesFilter setPage={setPage} />
        <Ordenator setPage={setPage} />
      </div>
      
      <div className='pokecards'>
        
        {allPokemons?.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
