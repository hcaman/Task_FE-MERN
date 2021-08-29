import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import Tarea from './Tarea';

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, deleteProject } = proyectosContext;

  if (!proyecto) return <h2>Selecciona un projecto</h2>;

  const [proyectoActual] = proyecto;

  const tareasProyecto = [
    { id: 1, nombre: 'Elegir plataforma', estado: true },
    { id: 2, nombre: 'Elegir colores', estado: false },
    { id: 3, nombre: 'Elegir plataforma de pago', estado: false },
    { id: 4, nombre: 'Elegir hosting', estado: true }
  ];

  const onClickDeleteProject = () => {
    deleteProject(proyectoActual.id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {!tareasProyecto?.length ? (
          <li className="tarea">No hay tareas</li>
        ) : (
          tareasProyecto.map(tarea => <Tarea key={tarea.id} tarea={tarea} />)
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickDeleteProject}
      >
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
