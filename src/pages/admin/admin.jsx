import "./adminStyle.css";
import { Outlet, Link } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from "react";
import * as jwtdecode from 'jwt-decode';
import axios from "axios";
import { Navigate } from "react-router-dom";

function Admin(){
    const [userID, setUserID] = useState(null);
    const [nameUSUARIO, setNameUSUARIO] = useState('');
    const isValidToken = (token) => { 
        return token && token.split('.').length === 3;
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!isValidToken(token)){
            return () => {
                <Navigate to="/error"/>
            }
        }
        if (token){
            try{   
                const decodedtoken = jwtdecode.jwtDecode(token);
                setUserID(decodedtoken.id);

                const Name = async(userID) => {
                    try{
                        const response = await axios.get(`http://localhost:4000/infor/user?userid=${userID}`);
                        if (response.status === 200){
                            setNameUSUARIO(response.data.name);
                        }
                    }catch{
                        console.log('Erro ao buscar nome do usuário');
                    }
                }
                Name(decodedtoken.id);
            }catch(error){
                return () => {
                    <Navigate to="/error"/>
                }
            }
        }
    },[]);

    const NameUsuario = () => {
        return(
            <div className="Name-User">
                <h1>Bem-vindo {nameUSUARIO}</h1>
            </div>
        );
    }
    return(
        <div className="main-admin">
            <nav className="nav-main">
                <h1>Area dos Administradores</h1>
                <ul>
                    <li><Link className="Link-POST" to="postobras">Posta Obras</Link></li>
                    <li><Link className="Link-POST" to="listobras">Lista de Obras</Link></li>
                    <li><Link className="Link-POST" to="profile">Perfil</Link></li>
                </ul>
            </nav>
            <main className="conteudo-main">
                <NameUsuario />
                <Outlet/>
            </main>
            <footer className="footer-admin mt-auto">
                <h2>Blue Scan</h2>
            </footer>
        </div>
    );
}

export default Admin;