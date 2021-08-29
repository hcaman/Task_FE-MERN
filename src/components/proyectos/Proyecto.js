import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { currentProject } = proyectosContext;

  const selectProject = () => currentProject(proyecto.id);

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={selectProject}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
