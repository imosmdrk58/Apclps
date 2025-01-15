import { Routes, Route, Link } from 'react-router-dom';
import LivroProjeto from "../../assets/LivroProjeto.png";
import CasaInicio from "../../assets/CasaInicio.png";
import TubLogo from "../../assets/TubaraoLogo.png";
import "./style.css";

function Projeto() {
  return(
    <div className="Main">
        <header className="Pes-Nav">
            <nav className="main-bar2">
                <img className="Logo2" src={TubLogo} alt="TubLogo" />
                <div className="nav-grupo2">
                    <ul>
                        <img src={CasaInicio} alt="Casa Inicio" />
                        <li><Link className="Bar2" to="/">Inicio</Link></li>
                    </ul>
                    <ul>
                        <img src={LivroProjeto} alt="Livro Projeto" />
                        <li><Link className="Bar2" to="/projetos">Projetos</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <main className="Conteudo-main2"></main>
        <footer className="name-blue-scan2">
            <h2 className="name-BS2">Blue Scans</h2>
        </footer>
    </div>
  );
}

export default Projeto;
