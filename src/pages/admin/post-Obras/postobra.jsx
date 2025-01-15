import React from 'react';
import { useState } from 'react';
import './postobra.css'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from "yup";
import axios from 'axios';

function PostObra(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const PostObraValidade = yup.object().shape({
        TituloObra: yup.string().required('Título da Obra é obrigatório'), 
        Genero: yup.array().min(1, 'Selecione pelo menos um gênero ').required('Gênero é obrigatório'), 
        tipo: yup.string().required('O tipo é obrigatório'),
        Status: yup.string().required('O status da obra é obrigatório'), 
        data: yup.date().required('Data é obrigatória'), 
        Descricao: yup.string().max(500, 'A descrição não pode ter mais de 500 caracteres').required('Descrição é obrigatória'),
    });

    const EnviarValores = async (values, {setSubmitting, resetForm}) => {
        console.log(values);

        const formData = new FormData();
        formData.append('Imagem',values.Imagem);
        formData.append('TituloObra',values.TituloObra);
        formData.append('Genero', JSON.stringify(values.Genero));
        formData.append('tipo',values.tipo);
        formData.append('Status',values.Status);
        formData.append('data',values.data);
        formData.append('Descricao',values.Descricao);

        try{
            const response = await axios.post('http://localhost:4000/uploadImg', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                }
            })
            if (response.status === 201){
                setTimeout(() => {
                    setSubmitting(false);
                    setIsDropdownOpen(false);
                    document.querySelector('input[name="Imagem"]').value = '';
                    resetForm();
                    alert("Obra postada com sucesso");
                }, 0);
            }
        }catch(error){
            setTimeout(() => {
                setSubmitting(false);
                alert("Obra nao foi postada, tente novamente!");
            }, 2000);
            console.log("Error com img e outras informacoes", error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <>
            <div className='Conteudo-Post-Obras'>
                <div className='Container-From'>
                <h1 className='Name-from'>Post Obra</h1>
                    <Formik
                        initialValues={{ 
                            TituloObra: '', 
                            Genero: [], 
                            tipo: '',
                            Status: '',  
                            data: '', 
                            Imagem: null,
                            Descricao: '',
                        }} 
                        onSubmit={EnviarValores}
                        validationSchema={PostObraValidade}
                    >
                        {({ isSubmitting, setFieldValue, values, handleChange, resetForm }) => (
                            <Form className='Post-form'>
                                <div className="Post-gruop">
                                    <Field type="text" name="TituloObra" className="Post-input" placeholder="Titulo da Obra" />
                                    <ErrorMessage name="TituloObra" component="div" className="error-message" />
                                    <div className="Dropdown"> 
                                        <button type="button" onClick={toggleDropdown} className="dropdown-toggle"> 
                                            Selecione os Gêneros 
                                        </button>
                                        {isDropdownOpen && (
                                            <div className='Dropdow-Menu'>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Ação" /> Ação                                               
                                                </label> 
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Drama" /> Drama 
                                                </label> 
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Aventura" /> Aventura 
                                                </label> 
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Chinês" /> Chinês
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Korean" /> Korean
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Webtoom" /> Webtoom
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Terror" /> Terror
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Shonen" /> Shonen
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Reencarnação" /> Reencarnação
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Artes Marciais" /> Artes Marciais
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Manhwa" /> Manhwa
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Seinem" /> Seinem
                                                </label>
                                                <label className='Generos-box'> 
                                                    <Field className='box' type="checkbox" name="Genero" value="Magia" /> Magia
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    <ErrorMessage name="Genero" component="div" className="error-message" />

                                    <Field as="select" name="tipo" className="Post-input">
                                        <option value="">Selecione o tipo</option>
                                        <option value="Manhwa">Manhwa</option>
                                        <option value="Webtoom">Webtoom</option>
                                        <option value="Manga">Manga</option>
                                    </Field>
                                    <ErrorMessage name="tipo" component="div" className="error-message" />

                                    <Field as="select" name="Status" className="Post-input">
                                        <option value="">Selecione o status</option>
                                        <option value="Ativo">Ativo</option>
                                        <option value="Hiato">Hiato</option>
                                    </Field>
                                    <ErrorMessage name="Status" component="div" className="error-message" />

                                    <Field type="date" name="data" className="Post-input" placeholder="data" />
                                    <ErrorMessage name="data" component="div" className="error-message" />

                                    <div> 
                                        <input 
                                            type="file"
                                            name="Imagem" 
                                            className="Post-input" 
                                            onChange={(event) => { 
                                                setFieldValue("Imagem", event.currentTarget.files[0]); 
                                            }}
                                        /> 
                                        <ErrorMessage name="Imagem" component="div" className="error-message" /> 
                                    </div>

                                    <Field
                                        as="textarea"
                                        id="descricao" 
                                        name="Descricao" 
                                        rows="10" 
                                        style={{ width: '100%', resize: 'none', overflowWrap: 'break-word' }} 
                                        onChange={handleChange}
                                        value={values.Descricao}
                                    /> 
                                    <ErrorMessage name="Descricao" component="div" className='error-message' />
                                    <p>{500 - (values.Descricao ? values.Descricao.length : 0 )} caracteres restantes</p>
                                </div>
                                <button type="submit" className="submit-post" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar' }</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};
export default PostObra;