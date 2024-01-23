import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createPokemon } from "../../redux/actions/actions";
import validationPoke from "../../components/form/validation";
import './createPokemon.css';

const initialPoke = {
  name: "",
  img: "",
  health: 1,
  speed: 1,
  defense: 1,
  attack: 1,
  height: 1,
  weight: 1,
  types: []
};

function CreatePoke() {
  const types = useSelector(state => state.types);
  const [input, setInput] = useState(initialPoke);
  const [disabler, setDisabler] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (disabler) {
      setDisabler(false);
    }

    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setErrors(
      validationPoke({
        ...input,
        [name]: value,
      })
    );
  };

  useEffect(() => {
    
  }, [errors]);

  const handleChangeTypes = (e) => {
    const type = JSON.parse(e.target.value);
    if (input.types.includes(type)) {
      setInput((prevInput) => ({
        ...prevInput,
        types: [...prevInput.types.filter((t) => t !== type)]
      }));
      setErrors(
        validationPoke({
          ...input,
          types: [...input.types.filter((t) => t !== type)]
        })
      );
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        types: [...prevInput.types, type]
      }));
      setErrors(
        validationPoke({
          ...input,
          types: [...input.types, type]
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Disable the button to prevent multiple clicks
    setDisabler(true);
  
    try {
      const response = await dispatch(createPokemon(input));
  
      if (response && response.error) {
        alert('Error creating Pokémon:', response.error);
        // Handle error as needed
        setSuccessMessage("");
      } else {
        console.log('Response from server:', response);
        // Reset the form or handle success as needed
        setInput(initialPoke);
        setSuccessMessage("Pokemon successfully created!");
        alert("Pokemon successfully created!"); // Display the success message using alert
      }
    } catch (error) {
      console.error('Error creating Pokémon:', error);
      // Handle error as needed
      setSuccessMessage("");
    } finally {
      // Enable the button after the request is complete (whether success or failure)
      setDisabler(false);
    }
  };
  

  useEffect(() => {
    
  }, [input]);

  useEffect(() => {
    
  }, [successMessage]);

  return (
    <div className="form-container">

      
      <form onSubmit={handleSubmit} className="form-create">
        <h1 className="bienvenido">Crea tu propio Pokemon!</h1>
        <div className="inputs">
  <label>Name</label>
  <input onChange={handleChange} value={input.name} name="name" className="input-create" />
  {errors.name ? <label>{errors.name}</label> : <label>&nbsp;</label>}
</div>
        <div className="inputs">
  <label>Image URL</label>
  <input
    onChange={handleChange}
    value={input.img}
    name="img"
    className="input-create"
  />
  {errors.img ? <label>{errors.img}</label> : <label>&nbsp;</label>}
</div>

        <div className="inputs">
          <label> vida</label>
          <input onChange={handleChange} value={input.health} type="number" name="health" className="input-create" />
          {errors.health ? <label>{errors.health}</label> : <label>&nbsp;</label>}
        </div>
        <div className="inputs">
          <label> velocidad</label>
          <input onChange={handleChange} value={input.speed} type="number" name="speed" className="input-create" />
          {errors.speed ? <label>{errors.speed}</label> : <label>&nbsp;</label>}
        </div>
        <div className="inputs">
          <label> ataque</label>
          <input onChange={handleChange} value={input.attack} type="number" name="attack" className="input-create" />
          {errors.attack ? <label>{errors.attack}</label> : <label>&nbsp;</label>}
        </div>
        <div className="inputs">
          <label> Defensa</label>
          <input onChange={handleChange} value={input.defense} type="number" name="defense" className="input-create" />
          {errors.defense ? <label>{errors.defense}</label> : <label>&nbsp;</label>}
        </div>
        <div className="inputs">
          <label> altura</label>
          <input onChange={handleChange} value={input.height} type="number" name="height" className="input-create" />
          {errors.height ? <label>{errors.height}</label> : <label>&nbsp;</label>}
        </div>
        <div className="inputs">
          <label> Peso</label>
          <input onChange={handleChange} value={input.weight} type="number" name="weight" className="input-create" />
          {errors.weight ? <label>{errors.weight}</label> : <label>&nbsp;</label>}
        </div>
        <div className="types-checkbox">
          <label> Tipo:</label>
          {errors.types ? <label>{errors.types}</label> : <label>&nbsp;</label>}
          <div className="check">
            {types?.map(t => {
              return (
                <div key={t.id}>
                  <label>{t.name}:</label>
                  <input onChange={handleChangeTypes} value={`${t.id}`} type="checkbox" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="buttons-create">
           <input disabled={disabler || Object.entries(errors).length ? true : false} value="Crear" type="submit" />    
          <Link to={`/home`}>
            <button>Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreatePoke;