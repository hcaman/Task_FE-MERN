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
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
      };
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem('token', action.payload.token);
      return {
        ...state,
        token: null,
        mensaje: action.payload,
      };
    default:
      return state;
  }
};
