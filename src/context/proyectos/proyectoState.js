import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  ELIMINAR_PROYECTO,
  PROYECTO_ACTUAL,
  VALIDAR_FORM,
  PROYECTO_ERROR,
} from '../../types';
import clienteAxios from '../../config/axios';

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorform: false,
    proyecto: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  const showForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const getProjects = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      dispatch({
        type: OBTENER_PROYECTO,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      // console.log(error);
      const alerta = {
        msg: 'Hugo un error',
        categoria: 'alerta-error',
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const addProject = async (proyecto) => {
    // proyecto.id = uuid();
    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      // console.log(error);
      const alerta = {
        msg: 'Hugo un error',
        categoria: 'alerta-error',
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const showError = async () => {
    try {
      dispatch({
        type: VALIDAR_FORM,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const currentProject = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const deleteProject = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      // console.log(error);
      const alerta = {
        msg: 'Hugo un error',
        categoria: 'alerta-error',
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorform: state.errorform,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        showForm,
        getProjects,
        addProject,
        showError,
        currentProject,
        deleteProject,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
