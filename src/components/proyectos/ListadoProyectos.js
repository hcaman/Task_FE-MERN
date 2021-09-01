import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, getProjects } = proyectosContext;

  const alertContext = useContext(AlertaContext);
  const { alerta, showAlert } = alertContext;

  useEffect(() => {
    if (mensaje) {
      showAlert(mensaje.msg, mensaje.categoria);
    }
    getProjects();
    // eslint-disable-next-line
  }, [mensaje]);

  if (!proyectos?.length) return <p>No hay projectos, crea uno!</p>;

  return (
    <ul className="listado-proyectos">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} className="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
