import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [busqueda, setBusqueda] = useState({
    pais: '',
    ciudad: ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);
  const { ciudad, pais } = busqueda;
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const key = '8dd036fb578b44f2216e09e570fb2c11';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
        const resp = await fetch(url);
        const resultado = await resp.json();
        setResultado(resultado);
        setConsultar(false);
        if (resultado.cod === '404') {
          setError(true);
        } else {
          setError(false);
        }
      }
    }

    consultarAPI();

  }, [consultar, ciudad, pais, resultado])
  let componente;
  if (error) {
    componente = < Error mensaje="No hay resultados" />
  } else {
    componente = <Clima resultado={resultado} />
  }
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
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
