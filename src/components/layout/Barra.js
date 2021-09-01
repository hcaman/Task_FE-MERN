import React, { useContext, useEffect } from 'react';
import authContext from '../../context/autenticacion/authContext';

const Barra = () => {
  const authsContext = useContext(authContext);
  const { usuario, authUser, logoutUser } = authsContext;

  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario && (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      )}
      <nav className="nav-principal">
        {usuario && (
          <button
            className="btn btn-blank cerrar-sesion"
            onClick={() => logoutUser()}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Barra;
