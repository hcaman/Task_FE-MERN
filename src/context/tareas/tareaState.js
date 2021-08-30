import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
} from '../../types';

const TareaState = (props) => {
  const tareasProyectos = [
    { id: 1, proyectoId: 1, nombre: 'Elegir plataforma', estado: true },
    { id: 2, proyectoId: 2, nombre: 'Elegir colores', estado: false },
    {
      id: 3,
      proyectoId: 3,
      nombre: 'Elegir plataforma de pago',
      estado: false,
    },
    { id: 4, proyectoId: 4, nombre: 'Elegir hosting', estado: true },
    { id: 5, proyectoId: 4, nombre: 'Elegir plataforma', estado: true },
    { id: 6, proyectoId: 3, nombre: 'Elegir colores', estado: false },
    {
      id: 7,
      proyectoId: 2,
      nombre: 'Elegir plataforma de pago',
      estado: false,
    },
    { id: 8, proyectoId: 1, nombre: 'Elegir hosting', estado: true },
  ];

  const initialState = {
    tareas: tareasProyectos,
    tareasproyecto: null,
    errortarea: false,
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  const getTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  const addTarea = (tarea) => {
    tarea.id = uuid();
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
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

  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        getTareas,
        addTarea,
        validarTarea,
        deleteTarea,
        changeStateTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
