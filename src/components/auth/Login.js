import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = ({ history }) => {
  const alertContext = useContext(AlertaContext);
  const { alerta, showAlert } = alertContext;
  const authsContext = useContext(AuthContext);
  const { autenticado, mensaje, loginUser } = authsContext;

  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });

  const { email, password } = usuario;

  useEffect(() => {
    if (autenticado) {
      history.push('/proyectos');
    }
    if (mensaje) {
      showAlert(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, history]);

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    loginUser(email, password);
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              className="btn btn-primario btn-block"
              type="submit"
              value="Iniciar Sesion"
            />
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Login;
