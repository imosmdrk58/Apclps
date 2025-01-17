import { useEffect ,useRef, useState } from "react";
import Slide from "./slide";
import SlideHeader from "./slideHeader";
import './style/indexStyle.css';
import StarsIcon from '@mui/icons-material/Stars';
import CardGrid from "./card";

function Main(){
    return(
        <div className='Conteudo'>
            <div className="Slide-header">
                <SlideHeader/>
            </div>
            <div className="Top-Obras">
                <h2 className="Titulo-Top-Obras"><StarsIcon color="white" fontSize="large" className="icon"/>Top Obras</h2>
                <div className="Obras-Grupo">
                    <div className="componet">{<Slide/>}</div>
                </div>
                <div className="Container-doar-discord">
                    <div className="apoia">
                        <span>Apoia aqui</span>
                        <button className="Button-links" type="button"><img src="" alt="" /><a className="link" href="">Apoia</a></button>
                    </div>
                    <br />
                    <div className="discord">
                        <span>Faça parte do Discord</span>
                        <button className="Button-links" type="button">
                            <img className="icon-discord" src="/logoDiscord.svg" alt="logo Discord" />
                            <a className="link" href="">Discord</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="Lancamentos">
                <div className="grupo-itens">
                    <CardGrid/>
                </div>
            </div>
        </div>
    );
}

export default Main;