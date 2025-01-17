import { useEffect ,useRef, useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import "./style.css";
import LivroProjeto from "../../assets/LivroProjeto.png";
import CasaInicio from "../../assets/CasaInicio.png";
import TubLogo from "../../assets/TubaraoLogo.png";
import Main from "../main";
import Projeto from "../projects";

function Topbar() {
  return (
    <div className="Main">
      <header className="Pesquisa-Nav">
        <nav className="main-bar">
          <img className="Logo" src={TubLogo} alt="TubLogo" />
          <div className="nav-grupo">
            <ul>
              <img src={CasaInicio} alt="Casa Inicio"/>
              <li><Link className="Bar" to="/">Inicio</Link></li>
            </ul>
            <ul>
              <img src={LivroProjeto} alt="Livro Projeto"/>
              <li><Link className="Bar" to="/projetos">Projetos</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="Conteudo-main">{<Main/>}</main>
      <footer className="name-blue-scan mt-auto">
        <h2 className="name-BS">Blue Scans</h2>
      </footer>
    </div>
  );
}

export default Topbar;
