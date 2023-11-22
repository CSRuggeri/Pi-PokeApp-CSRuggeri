import React from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../typeFilter/typeFilter.css"
import { typeFilter, getTypes } from "../../redux/actions/actions";

const TypesFilter = ({ setPage }) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const filter = useSelector((state) => state.filter);  //ejecucion del filter de tipos pokemon

  useEffect(() => {
    dispatch(getTypes()); //llamado a los tipos
  }, [dispatch]);

  const handleFilter = (type) => {
    setPage(0);
    dispatch(typeFilter(type));
  };

  return (

    <div>
      {/* <h2 className='filtersxd'>Filters</h2> */}
      <div  className='type-container'>

      <button onClick={() =>
        handleFilter("all")}
        className='button-type'>
        All
      </button>
      {types?.map((t, i) => (
        <button
        key={i}
        onClick={() =>
          filter === t.name ? handleFilter("all") : handleFilter(t.name)}
          
          className='button-type'
          >
          {t.name.toUpperCase()}
        </button>
      ))}
      </div>

    </div>
  )
}

export default TypesFilter