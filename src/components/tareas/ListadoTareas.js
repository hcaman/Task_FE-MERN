import React, { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';

const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, deleteProject } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  if (!proyecto) return <h2>Selecciona un projecto</h2>;

  const [proyectoActual] = proyecto;

  const onClickDeleteProject = () => {
    deleteProject(proyectoActual.id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {!tareasproyecto?.length ? (
          <li className="tarea">No hay tareas</li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} className="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
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
