import React from 'react';
import Tarea from './Tarea';

const ListadoTareas = () => {
  const tareasProyecto = [
    { id: 1, nombre: 'Elegir plataforma', estado: true },
    { id: 2, nombre: 'Elegir colores', estado: false },
    { id: 3, nombre: 'Elegir plataforma de pago', estado: false },
    { id: 4, nombre: 'Elegir hosting', estado: true }
  ];
  return (
    <>
      <h2>Proyecto: Tienda Virtual</h2>
      <ul className="listado-tareas">
        {!tareasProyecto?.length ? (
          <li className="tarea">No hay tareas</li>
        ) : (
          tareasProyecto.map(tarea => <Tarea key={tarea.id} tarea={tarea} />)
        )}
      </ul>
      <button type="button" className="btn btn-eliminar">
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
