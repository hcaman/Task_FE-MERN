import React, { useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorform,
    showForm,
    addProject,
    showError
  } = proyectosContext;

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

    if (!nombre) {
      showError();
      return;
    }

    addProject(proyecto);

    setProyecto({ nombre: '' });
  };

  const onClickNewProject = () => showForm();

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickNewProject}
      >
        Nuevo Proyecto
      </button>
      {formulario && (
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
      )}
      {errorform && (
        <p className="mensaje error">El noombre del proyecto es obligatorio</p>
      )}
    </>
  );
};

export default NuevoProyecto;
