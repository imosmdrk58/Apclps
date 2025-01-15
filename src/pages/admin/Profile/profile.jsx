import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './profile.css';
import axios from "axios";
import * as jwtdecode from 'jwt-decode';
import * as yup from "yup";

function Profile(){ 
    const [userID, setUserID] = useState(null);
    const [name, setName] = useState('');
    const [biografia, setBiografia] = useState('');
    const [obraEmTrabalho, setObraEmTrabalho] = useState('');
    const [capitulosTraduzidos, setCapitulosTraduzidos] = useState('');
    const [fotoPerfil, setfotoPerfil] = useState('');
    const [isEditar, setIsEditar] = useState(false);

    const validaInforUser = yup.object().shape({
        name: yup.string().required('Obrigatorio ter um nome de usuario'),
        biografia: yup.string().required('Obrigatorio ter uma biografia'),
        ObrasEmTrabalho: yup.string(),
    });

    // putInforUser
    const enviarEditar = async (values, {setSubmitting}) => {
        const token = localStorage.getItem('token');
        if (token){
            const decodedtoken = jwtdecode.jwtDecode(token);
            const formData = new FormData();

            formData.append('Imagem', values.Imagem);
            formData.append('name',values.name);
            formData.append('biografia', values.biografia);
            formData.append('ObrasEmTrabalho',values.ObrasEmTrabalho);
            formData.append('userID', decodedtoken.id);
            try{
                const response = await axios.post("http://localhost:4000/infor/user/editar", formData, {
                    headers: { 
                        'Content-Type': 'multipart/form-data' 
                    }
                });
                if (response.status === 201){
                    console.log(response.data);
                    setTimeout(() => {
                        setSubmitting(false);
                        editar();
                        alert('Alteracoes efetuada com sucesso');
                    }, 0);
                }
            }catch(error){
                setTimeout(() => {
                    setSubmitting(false);
                    alert('Erro ao enviar as alteracoes, tente novamente!');
                }, 2000);
            }
        }
    }

    // getInforUser
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token){
            const decodedtoken = jwtdecode.jwtDecode(token);
            setUserID(decodedtoken.id);
        
            const buscarInfor = async(userID) => {
                try{
                    const response = await axios.get(`http://localhost:4000/infor/user?userid=${userID}`);
                    if(response.status === 200){
                        setName(response.data.name);
                        if (response.data.BiografiaUser){
                            setBiografia(response.data.BiografiaUser);
                        }
                        if (response.data.imgUser){
                            setfotoPerfil(response.data.imgUser);
                        }
                        if (response.data.ObrasEmTrabalho){
                            setObraEmTrabalho(response.data.ObrasEmTrabalho);
                        }
                        if (response.data.CapitulosTraduzidos){
                            setCapitulosTraduzidos(response.data.CapitulosTraduzidos);
                        }
                    }
                }catch(error){
                    console.log(error);
                }
            }
            buscarInfor(decodedtoken.id);
        }
    },[]);
    // Menu Editar
    const editar = () => {
        setIsEditar(!isEditar);
    }

    const Profile = () => {
        return(
            <div className="Container-infor">
                <div className="Container-itens">
                    <div className="img-logo">
                        <img className="Foto-Perfil" src={fotoPerfil} alt="fotoPerfil" />
                    </div>
                    <div className="grupo-itens">
                        <h3>NAME: {name}</h3>
                        <div>
                            <h4>Biografia:</h4>
                            <p>{biografia}</p>
                        </div>
                        <h4>Capitulos traduzido: {capitulosTraduzidos}</h4>
                    </div>
                    <button className="editar" type="button" onClick={editar}>Editar</button>
                    {isEditar && (
                        <div className="Container-editar">
                            <div className="Container-form">
                                <button className="close-editar" type="button" onClick={editar}>X</button>
                                <Formik
                                    initialValues={{
                                        name: name,
                                        biografia: biografia,
                                        ObrasEmTrabalho: obraEmTrabalho,
                                        Imagem: null,
                                    }}
                                    validationSchema={validaInforUser}
                                    onSubmit={enviarEditar}
                                >
                                    {({isSubmitting, setFieldValue, values, handleChange}) => (
                                        <Form className="Form-editar">
                                            <div className="gruop-itens">
                                                <Field className="iten-editar" type="text" name="name" placeholder="name"/>
                                                <ErrorMessage name="name" component="div" className='error-message'/>
                                                <Field className="iten-editar" type="text" name="ObrasEmTrabalho" placeholder="Obras em tradu" />
                                                <ErrorMessage name="ObrasEmTrabalho" component="div" className='error-message'/>
                                                <div> 
                                                    <input

                                                        type="file"
                                                        name="Imagem" 
                                                        className="iten-editar"
                                                        onChange={(event) => { 
                                                            setFieldValue("Imagem", event.currentTarget.files[0]); 
                                                        }}
                                                    /> 
                                                    <ErrorMessage name="Imagem" component="div" className="error-message" /> 
                                                </div>
                                                <Field
                                                    placeholder="Biografia"
                                                    as="textarea"
                                                    id="descricao"
                                                    className="iten-editar"
                                                    name="biografia"
                                                    rows="10"
                                                    style={{ width: '100%', resize: 'none', overflowWrap: 'break-word' }} 
                                                    onChange={handleChange}
                                                    value={values.biografia}
                                                /> 
                                                <ErrorMessage name="biografia" component="div" className='error-message' />
                                                <p>{400 - (values.biografia ? values.biografia.length : 0 )} caracteres restantes</p>
                                                <button className="iten-editar" type="submit">{isSubmitting ? 'Enviando Alteracoes' : 'Enviar Alteracoes'}</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return(
        <>
            {<Profile/>}
        </>
    );
}

export default Profile;