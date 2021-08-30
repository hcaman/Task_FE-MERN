import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const NuevaCuenta = () => {
  const alertContext = useContext(AlertaContext);
  const { alerta, showAlert } = alertContext;
  const authsContext = useContext(AuthContext);
  const { registerUser } = authsContext;

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmar.trim() === ''
    ) {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    if (password.length < 6) {
      showAlert(
        'El password debe ser de al menos 6 caracteres',
        'alerta-error'
      );
      return;
    }

    if (password !== confirmar) {
      showAlert('Los password no son iguales', 'alerta-error');
      return;
    }
    registerUser({ nombre, email, password });
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}

      <div className="contenedor-form sombra-dark">
        <h1>Registrarse</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="confirmar">Confirmar password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              className="btn btn-primario btn-block"
              type="submit"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
          Login
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
