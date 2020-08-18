import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {
  const [busqueda, setBusqueda] = useState({
    pais: '',
    ciudad: ''
  });

  const { ciudad, pais } = busqueda;
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  useEffect(() => {
    const consultarAPI = async () => {
      const key = '8dd036fb578b44f2216e09e570fb2c11';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
      const resp = await fetch(url);
      const resultado = await resp.json();
      setResultado(resultado);
    }
    if (consultar) {
      consultarAPI();
      setConsultar(false);
    }
  }, [consultar, ciudad, pais])

  return (
    <Fragment>
      <Header titulo="React Clima" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario busqueda={busqueda} setBusqueda={setBusqueda} setConsultar={setConsultar} />
            </div>
            <div className="col m6 s12">
              <Clima resultado={resultado} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
