import { Link } from "react-router-dom";
import "./about.css"

const About = () => {
    return(
        <div className="about">
            <div className="aboutboton">
                <Link to={"/home"}>
                     <button>Home</button>
                </Link>
            </div>
            <div className="aboutname">
                <h2>Santiago Ruggeri</h2>
            </div>
            <div className="aboutgit">
                <h3>Github: <a href="https://github.com/CSRuggeri"> CSRuggeri</a></h3>
            </div>
            <div className="aboutlink">
                <h3>Linkledin: </h3><a href="www.linkedin.com/in/santiago-ruggeri-6424371b9"> Santiago-Ruggeri</a>
            </div>
        </div>
    )
}


export default About;