import './LoginAdmin.css'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../AuthContext';
import * as yup from "yup";

const LoginAdmin = () => {
  const { login } = useAuth();

  const handleLogin = (values) => {
    login(values);
  };

  const LoginValidade = yup.object().shape({
    email: yup.string().email().required('Email é obrigatório'),
    password: yup.string().min(6,'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  });

  return (
    <div className='Container'>
      <div className="Container-form">
        <Formik 
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}
        validationSchema={LoginValidade}
        >
          <Form className='Login-from'>
            <h1>Login</h1>
            <div className="Login-form-gruop">
              <Field name="email" className="form-field" 
              placeholder="Email"/>
              <ErrorMessage
              component="span"
              name="email"
              className='form-Error'
              />

              <Field type="password" name="password" className="form-field" 
              placeholder="Senha"/>
              <ErrorMessage
              component="span"
              name="password"
              className='form-Error'
              />
            </div>
            <button type='submit' className='Submit-form-login'>Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginAdmin;
