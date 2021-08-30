import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto.id} timeout={200} className="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
