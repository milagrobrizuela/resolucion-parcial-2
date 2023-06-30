import React, { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { getVehiculos, getVehiculosByFilter } from '../services/vehiculos.service.js';
import ListadoVehiculos from './ListadoVehiculos';

const marcas = [
  'Acura'
  ,'Aston Martin'
  ,'Audi'
  ,'BMW'
  ,'Bentley'
  ,'Buick'
  ,'Cadillac'
  ,'Chevrolet'
  ,'Chrysler'
  ,'Dodge'
  ,'Ford'
  ,'GMC'
  ,'Holden'
  ,'Honda'
  ,'Hummer'
  ,'Hyundai'
  ,'Infiniti'
  ,'Isuzu'
  ,'Jaguar'
  ,'Jeep'
  ,'Kia'
  ,'Lamborghini'
  ,'Land Rover'
  ,'Lexus'
  ,'Lincoln'
  ,'Lotus'
  ,'Maybach'
  ,'Mazda'
  ,'Mercedes-Benz'
  ,'Mercury'
  ,'Mitsubishi'
  ,'Nissan'
  ,'Oldsmobile'
  ,'Plymouth'
  ,'Pontiac'
  ,'Porsche'
  ,'Ram'
  ,'Rolls-Royce'
  ,'Saab'
  ,'Saturn'
  ,'Subaru'
  ,'Suzuki'
  ,'Toyota'
  ,'Volkswagen'
  ,'Volvo'
];

const Players = () => {
  const [lista, setLista] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { marca, from, to } = data;

    if (from !== '' && to !== '') {
      const numFrom = Number(from);
      const numTo = Number(to);

      if (numFrom <= numTo) {
        getVehiculosByFilter(marca, from, to).then((res) => {setLista(res)})
      } else {
        alert("Rango de Kilómetros incorrecto");
        setLista([]);
      }
    } else {
      getVehiculosByFilter(marca, 1, 1000000).then((res) => {setLista(res)})
      setLista([]);
    }
  };

  useEffect(() => {
    getVehiculos().then((listaVehiculos) => {setLista(listaVehiculos)});
  }, []);

  return (
    <div className="container">
      <h3>Formulario de Búsqueda</h3>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Marca:</label>
              <select className="form-select" {...register('marca')}>
                <option key='Todas' value="Todas">Todas</option>
                {marcas.map((marca) => ( <option key={marca} value={marca}>{marca}</option>)) }
              </select>
            </div>
            <div className="mb-3" style={ { display: 'flex' } }>
              <div style={ { flex: 1, 'margin-right': '20px' } }>
                <label className="form-label">Kilómetros desde:</label>
                <input type="text" placeholder='Kms desde...' className="form-control" {...register('from')} />
              </div>
              <div style={ { flex: 1 } }>
                <label className="form-label">Kilómetros hasta:</label>
                <input type="text" placeholder='Kms hasta...' className="form-control" {...register('to')} />
              </div>
            </div> 
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Buscar</button>
            </div>
          </form>
        </div>
      </div>
      <ListadoVehiculos lista={lista} />
    </div>
  );
};

export default Players;
