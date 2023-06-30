import React from 'react';

const ListadoVehiculos = ({ lista }) => {
  
  console.log(lista);
  console.log(typeof lista);
  return (
    <div className="container mt-3">
      <h3>Listado de Vehículos</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Propietario</th>
            <th>VIN</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Kilómetros</th>
          </tr>
        </thead>
        <tbody>
          { lista !== undefined && lista.length > 0 ?
            lista.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.propietario}</td>
                <td>{item.vin}</td>
                <td>{item.marca}</td>
                <td>{item.modelo}</td>
                <td>{item.year}</td>
                <td>{item.kilometros}</td>
              </tr>
            )) :
            <tr key={'0'}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>  
        }
        </tbody>
      </table>
    </div>
  );
};

export default ListadoVehiculos;
