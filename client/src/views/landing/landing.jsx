import "./landing.css"
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="landing-container" >
<header>
<h1 >¡Bienvenido a mi PokeApp!</h1>
<p className="description">Una aplicación para amantes de los Pokemons</p>
</header>
<main>
            <Link to="/home">
           <div className="landing" >Vamos a descubrir Pokemons!</div>
            </Link>
            </main>

            <footer>
        <p className="description">&copy; 2023 Todos los derechos reservados</p>
      </footer>
        </div>


    );
}

export default LandingPage; 