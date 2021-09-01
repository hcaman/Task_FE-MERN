import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  OBTENER_USUARIO,
  CERRAR_SESION,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
      };
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
    case CERRAR_SESION:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        cargando: false,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};
