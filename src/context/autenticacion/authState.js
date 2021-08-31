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
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/users', datos);

      // console.log(respuesta);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      authUser();
    } catch (error) {
      // console.log(error);
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
      // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
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

  const loginUser = async (datos) => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);
      console.log(respuesta);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      authUser();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error',
      };
      console.log(error.response.data);
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registerUser,
        authUser,
        loginUser,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
