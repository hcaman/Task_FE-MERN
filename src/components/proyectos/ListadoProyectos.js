import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, getProjects } = proyectosContext;

  useEffect(() => {
    getProjects();
  }, []);

  if (!proyectos?.length) return <p>No hay projectos, crea uno!</p>;

  return (
    <ul className="listado-proyectos">
      {proyectos.map(proyecto => (
        <Proyecto key={proyecto.id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
