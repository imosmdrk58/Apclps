import axios from 'axios';
import './publiList.css'
import * as React from "react";
import { useParams } from "react-router-dom";

function PublicList(){
    const [infor, setInfor] = React.useState([]);
    const {id} = useParams();

    React.useEffect(() => {
        axios.get(`http://localhost:4000/ListaObra/infor?id=${id}`)
            .then(response => {
                console.log(response.data[0]);
                setInfor(response.data[0]);
                console.log(infor);
            })
            .catch(error => {
                console.log('error', error);
            });
    }, []);
    return(
        <>
            <div className="Container-Infor-Obra">
                <h1>Publica Capitulos e Visualiza</h1>
                <p>ID da Obra: {id}</p>
                <h3>Titulo: {infor.TituloObra}</h3>
                <div className="Container-logo-obra">
                    <div className="Logo-Obra-Img">
                        <img src={infor.Link} alt="Logo-Obra" />
                    </div>
                </div>
                <div className="Container-inforObra">
                    <h2 className="tipo">Tipo: {infor.tipo}</h2>
                    <h2 className="Genero">Genero:</h2>
                    <h2 className="Status">Status: {infor.Status}</h2>
                    <h2 className="Data">Data postada: {infor.data}</h2>
                    <h2 className="sinopse-decription">Sinopse:</h2>
                    <p className='Sinopse'>{infor.Descricao}</p>
                </div>
            </div>
        </>
    );
};

export default PublicList;