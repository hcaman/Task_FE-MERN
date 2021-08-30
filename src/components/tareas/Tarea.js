import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const { deleteTarea, getTareas, changeStateTarea, setCurrentTarea } =
    tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const [proyectoActual] = proyecto;

  const tareaDelete = () => {
    deleteTarea(tarea.id);
    getTareas(proyectoActual.id);
  };

  const cambiarEstado = () => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    changeStateTarea(tarea);
  };

  const selectTask = () => {
    setCurrentTarea(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={cambiarEstado}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={cambiarEstado}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={selectTask}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={tareaDelete}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
