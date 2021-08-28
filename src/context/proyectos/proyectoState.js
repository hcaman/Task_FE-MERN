import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTO } from '../../types';

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formulario: false
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const showForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  const proyectos = [
    { id: 1, nombre: 'Tienda virtual' },
    { id: 2, nombre: 'Intranet' },
    { id: 3, nombre: 'Desing' }
  ];

  const getProjects = () => {
    dispatch({
      type: OBTENER_PROYECTO,
      payload: proyectos
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        showForm,
        getProjects
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
