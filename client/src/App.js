import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTypes } from "./redux/actions/actions";
import './App.css';
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";

import LandingPage from "./views/landing/landing";
import HomePage from './views/home/home';
import CreatePage from "./views/createPokemon/createPokemon";
import DetailsPage from "./views/detail/detail";
import About from "./views/about/about";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes()); // llamada de los tipos al iniciar la app
  }, [dispatch]); // array de dependencia

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/createPoke' element={<CreatePage />} />
        <Route path='/details/:id' element={<DetailsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div class="cuatro">
      <h2 class="cuatrot">Error 404: Página no encontrada</h2>
      <p class="cuatroi"> La página que estás buscando no existe.</p>
      <Link to="/home">
        <div class="cuatrob"></div>
      </Link>
    </div>
  );
}

export default App;
