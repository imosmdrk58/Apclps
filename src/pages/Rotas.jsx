import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from '../pages/admin/admin';
import PostObra from '../pages/admin/post-Obras/postobra';
import ListObras from '../pages/admin/list-obras/listObras';
import Topbar from '../pages/header-main/index';
import Projeto from '../pages/projects/index';
import LoginAdmin from '../pages/login/loginAdmin';
import Profile from './admin/Profile/profile';
import { AuthProvider } from './AuthContext'; 
import ProtectedRoute from './ProtectedRoute';
import PublicList from './admin/list-obras/publiList/publiList';
import ErrorPage from './Error'

function Rotas() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/Login/admin' element={<LoginAdmin/>} />
          <Route path='/projetos' element={<Projeto/>} />
          <Route path="/" element={<Topbar />} />
          <Route path="/admin" element={
            <ProtectedRoute> 
              <Admin /> 
            </ProtectedRoute>}>
              <Route path="postobras" element={<PostObra />} /> 
              <Route path="listobras" element={<ListObras />}>
                <Route path='publiList/:id' element={<PublicList />}/>
              </Route>
              <Route path="profile" element={<Profile />} />
          </Route>
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default Rotas;