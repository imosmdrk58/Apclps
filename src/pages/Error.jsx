import React from 'react';
import'../index.css'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1 className="Error-status">404</h1>
      <h2 className="Error-status">Página Não Encontrada</h2>
      <p className="Message-status">Desculpe, a página que você está procurando não existe.</p>
      <button className="Button-navigate" onClick={() => navigate('/')}>Voltar para Home</button>
    </div>
  );
}

export default ErrorPage;
