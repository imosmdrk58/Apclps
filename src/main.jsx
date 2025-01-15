import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Rotas from './pages/Rotas';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Rotas />
    </Router>
  </StrictMode>
)
