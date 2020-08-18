import React, { useState } from 'react';
import Error from './Error';
const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {
	// extraer ciudad y país
	const { ciudad, pais } = busqueda;

	const [error, setError] = useState(false);

	// Funcion que coloca los elementos en el state
	const handleChange = (e) => {
		// actualizar state
		setBusqueda({
			...busqueda,
			[e.target.name]: e.target.value,
		});
	};

	// Manejando el submit
	const handleSubmit = (e) => {
		e.preventDefault();

		// Validar
		if (ciudad.trim() === '' || pais.trim() === '') {
			setError(true);
			return;
		}

		setError(false);
		setConsultar(true);

		// Pasar al componente principal
	};

	return (
		<form onSubmit={handleSubmit}>
			{error ? <Error mensaje="Faltan campos para realizar la consulta" /> : null}
			<div className="input-field col s12">
				<input
					type="text"
					name="ciudad"
					id="ciudad"
					value={ciudad}
					onChange={handleChange}
				/>
				<label htmlFor="ciudad">Ciudad: </label>
			</div>
			<div className="input-field col s12">
				<select name="pais" id="pais" value={pais} onChange={handleChange}>
					<option value="">-- SELECCIONE PAIS --</option>
					<option value="GT">Guatemala</option>
					<option value="US">Estados Unidos</option>
					<option value="MX">México</option>
					<option value="AR">Argentina</option>
					<option value="CO">Colombia</option>
					<option value="CR">Costa Rica</option>
					<option value="ES">España</option>
					<option value="PE">Perú</option>
				</select>
				<label htmlFor="ciudad">País: </label>
			</div>
			<div className="input-field col s12">
				<button
					className="right-align waves-effect waves-light btn-large btn-block yellow accent-4"
					type="submit"
				>
					Buscar
				</button>
			</div>
		</form>
	);
};

export default Formulario;
