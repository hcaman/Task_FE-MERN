import React, { useReducer } from 'react';
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from '../../types';

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };
  const [state, dispatch] = useReducer(alertaReducer, initialState);

  const showAlert = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: { msg, categoria },
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        showAlert,
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
