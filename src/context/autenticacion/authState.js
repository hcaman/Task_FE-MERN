import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  OBTENER_USUARIO,
  CERRAR_SESION,
} from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/users', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      authUser();
    } catch (error) {
      // console.log(error.response);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error',
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const authUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get('/api/auth');
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const loginUser = async (datos) => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      authUser();
    } catch (error) {
      // console.log(error.response);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error',
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  const logoutUser = () => {
    dispatch({
      type: CERRAR_SESION,
      payload: null,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registerUser,
        authUser,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
