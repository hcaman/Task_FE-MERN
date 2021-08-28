import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO } from '../../types';

const ProyectoState = props => {
  const initialState = {
    proyectos: [
      { id: 1, nombre: 'Tienda virtual' },
      { id: 2, nombre: 'Intranet' },
      { id: 3, nombre: 'Desing' }
    ],
    formulario: false
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const showForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        showForm
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
