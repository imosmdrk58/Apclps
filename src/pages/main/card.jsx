import React, { useState } from 'react';
import ObrasView from './ObrasView';
import {Grid, Card, CardContent, Typography, Button } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import './style/CardGrid.css';

const CardGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  

  const cards = Array.from({ length: 40 }, (_, index) => ({
    id: index,
    title: `Card ${index + 1}`,
  }));

  const getPaginatedCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return cards.slice(startIndex, endIndex);
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  return (
    <div className="Container-Lancamentos">
      <div className="Container-itens">
      <h2 className="titulos-lancamento"><FiberNewIcon color="white" fontSize="large" className="icon" />Lançamentos</h2>
        <Grid container spacing={2} >
          {getPaginatedCards().map(card => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
              <Card elevation={0} className='card-main'>
                <CardContent sx={{ padding: 0, paddingBottom: '0 !important'}} className='container-card'>
                  <div className='img'><img src="" alt="" /></div>
                    <div className='links-Name-Obra-Name'>
                      <div className="Name-Obra">
                        <a className='Name-Obra-link' href="#">Nome Obra</a>
                      </div>
                      <div className='Name'>
                        <a className='Cap' href="#">Capitulo 1</a>
                        <a className='Cap' href="#">Capitulo 1</a>
                      </div>
                    </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className='Buttons'>
          {/* Botões de Navegação */}
          <div className='Button-Anterior'>
            <Button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              Anterior
            </Button >
          </div>
          <span className='NumeroPagina' >{` Página ${currentPage} de ${totalPages} `}</span>
          <div className='Button-Proximo'>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
        <ObrasView/>
    </div>
  );
};

export default CardGrid;