import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { currentProject } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { getTareas } = tareasContext;

  const selectProject = () => {
    currentProject(proyecto.id);
    getTareas(proyecto.id);
  };

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={selectProject}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
