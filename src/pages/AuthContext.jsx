import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import * as jwtdecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = (values) => {
    Axios.post("http://localhost:4000/login/Adimin", {
      email: values.email,
      password: values.password,
    }).then((response) =>{
      if (response.status === 201){
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('admin/postobras');
      }else{
        console.error('Resposta do servidor:', response);
        alert('Credenciais inválidas, por favor, tente novamente.', response);
      }
    }).catch((error) => {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    });
  };
  const logout = () => { 
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); 
  };

  const isAuthenticatedCheck = async () => { 
    const token = !!localStorage.getItem('token');
    if (!token){
      return false;
    }try { 
      const decodedToken = jwtdecode(token); 
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp < currentTime){ 
        localStorage.removeItem('token'); 
        return false; 
      } 
      const response = await axios.post("http://localhost:4000/Admin", {
        token: token,
      });
      if (response.status === 200 && response.data.valid){
        return true;
      }else{
        localStorage.removeItem('token'); 
        return false;
      }
    } catch (error){ 
      localStorage.removeItem('token'); 
      return false; 
    }
  };

  useEffect(() => {
    const checkAuth = async () => { 
      const result = await isAuthenticatedCheck(); 
      setIsAuthenticated(result); 
    };
    checkAuth();
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
