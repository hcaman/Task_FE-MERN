import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from '../../types';
import clienteAxios from '../../config/axios';

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  const getTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', {
        params: { proyecto },
      });
      // console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addTarea = async (tarea) => {
    try {
      await clienteAxios.post('/api/tareas', tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const deleteTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  const changeStateTarea = (tarea) => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea,
    });
  };

  const setCurrentTarea = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const updateTarea = (tarea) => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    });
  };

  const cleanTareaSelected = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        getTareas,
        addTarea,
        validarTarea,
        deleteTarea,
        changeStateTarea,
        setCurrentTarea,
        updateTarea,
        cleanTareaSelected,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
