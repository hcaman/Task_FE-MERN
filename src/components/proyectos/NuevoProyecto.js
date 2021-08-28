import React, { useState } from 'react';

const NuevoProyecto = () => {
  const [proyecto, setProyecto] = useState({
    nombre: ''
  });

  const { nombre } = proyecto;

  const onChangeProyecto = e => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitProyecto = e => {
    e.preventDefault();
  };

  return (
    <>
      <button type="button" className="btn btn-block btn-primario">
        Nuevo Proyecto
      </button>
      <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
        <input
          type="text"
          className="input-text"
          placeholder="Nombre Proyecto"
          name="nombre"
          value={nombre}
          onChange={onChangeProyecto}
        />
        <input
          type="submit"
          className="btn btn-block btn-primario"
          placeholder="Agregar Proyecto"
        />
      </form>
    </>
  );
};

export default NuevoProyecto;