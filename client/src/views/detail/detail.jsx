import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { cleanDetails, getDetails } from "../../redux/actions/actions";
import './detail.css';

function DetailsPage() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const { id } = useParams();
  const [isIdValid, setIsIdValid] = useState(true); // Agregar estado para verificar si la ID es válida

  useEffect(() => {
    dispatch(getDetails(id, setIsIdValid)); // Pasar setIsIdValid como argumento en la acción
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(cleanDetails());
    };
  }, [dispatch]);

  if (!isIdValid) {
    return (<div className="errorid">
      <h1 className="errorida">No existe un personaje con esa ID</h1>
      <Link to={`/home`}>
        <div className="todoboton2"> </div>
      </Link>
    </div>
    )
      ;
  }

  if (details.id) {
    return (
      <div className="detailContainer">
      
      <div className="todo">
        <Link to={`/home`}>
        <div className="todoboton">
            
        </div>
          </Link>
        <div className="container-detail">
          <section className="img">
            <img
              src={details.img}
              alt={`${details.name} sprite`}
              className="todoimage"
            />
          </section>
          <section className="info-poke">
            <h1 className="todoname">{`${details.name[0].toUpperCase()}${details.name.slice(
              1
            )}`}</h1>
            <div className="todotype">
              {details?.types?.map((t, i) => (
                <p key={i}>{t.name.toUpperCase()}</p>
              ))}
            </div>
            <div className="tododetails">
              <p>Vida: {details.health}</p>
              <p>Velocidad: {details.speed}</p>
              <p>Defensa: {details.defense}</p>
              <p>Ataque: {details.attack}</p>
              <p>Altura: {details.height}</p>
              <p>Peso: {details.weight}</p>
            </div>
          </section>
        </div>
      </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default DetailsPage;