import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    addTarea,
    validarTarea,
    errortarea,
    getTareas,
    tareaseleccionada,
    updateTarea,
    cleanTareaSelected,
  } = tareasContext;

  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({ nombre: '' });
    }
  }, [tareaseleccionada]);

  const [tarea, setTarea] = useState({ nombre: '' });

  if (!proyecto) return null;

  const { nombre } = tarea;
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitTarea = (e) => {
    e.preventDefault();

    if (!nombre?.trim()) {
      validarTarea();
      return;
    }

    if (tareaseleccionada === null) {
      tarea.proyecto = proyectoActual._id;
      addTarea(tarea);
    } else {
      updateTarea(tarea);
      cleanTareaSelected();
    }

    getTareas(proyectoActual._id);

    setTarea({ nombre: '' });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmitTarea}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
          />
        </div>
      </form>
      {errortarea && (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      )}
    </div>
  );
};

export default FormTarea;
