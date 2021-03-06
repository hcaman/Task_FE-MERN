import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
  const authsContext = useContext(authContext);
  const { autenticado, cargando, authUser } = authsContext;

  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
