import './style/obraView.css'
import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Componet = ({id}) => {
    return(
        <>
            <a className='Card' href="#">
                <div>
                    <div className='Container-Number'><h2 className='Id-obra'>{id}#</h2></div>
                    <div className="img-logo-obra">
                        <img src="" alt="" />
                    </div>
                    <div className='Conteudo-Obra-View'>
                        <h5 className='Nome-Obra-View'>Nome Obra</h5>
                    </div>
                </div>
            </a>
        </>
    );
}


export default function ObrasView(){

    const ComponetArrays = Array.from({ length: 10 }, (_, index) => (
        <Componet key={index} id={index + 1} />
    ));

    return(
        <>
            <div className='Container-Obras-View'>
                <div className="tithe"><h2 className="titulos-lancamento"><WhatshotIcon color="white" fontSize="large" className="icon" />Destaque</h2></div>
                <div className="Grid-Obras">
                    {ComponetArrays}
                </div>
            </div>
        </>
    );
}