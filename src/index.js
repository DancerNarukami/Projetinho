import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './Pages/Home/Home.js'
import FormProfessor from './Pages/FormProfessor/FormProfessor.js'
import FormPeriodo from './Pages/FormPeriodo/FormPeriodo.js'
import FormSala from './Pages/FormSala/FormSala.js'
import FormMateria from './Pages/FormMateria/FormMateria.js'
import FormCurso from './Pages/FormCurso/FormCurso.js';


const router = createBrowserRouter([
  {path:"/", element:<Home />},
  {path:"/FormCurso", element:<FormCurso/>},
  {path:"/FormProfessor", element:<FormProfessor/>},
  {path:"/FormPeriodo", element:<FormPeriodo/>},
  {path:"/FormSala", element:<FormSala/>},
  {path:"/FormMateria", element:<FormMateria/>},

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();