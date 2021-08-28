import React from 'react';

const Barra = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola <span>Hugo</span>
      </p>
      <nav className="nav-principal">
        <a href="#!">Logout</a>
      </nav>
    </header>
  );
};

export default Barra;
