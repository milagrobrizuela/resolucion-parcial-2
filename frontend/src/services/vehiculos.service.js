import axios from "axios";

const url = 'http://localhost:3001/api/vehiculos/'

export const getVehiculos = () => {
    return axios.get(url)
    .then((response) => {
        const { data } = response;
        return data;
    });
};

export const getVehiculosByFilter = (marca, from, to) => {
    return axios.get(`${url}?marca=${marca}&from=${from}&to=${to}`)
    .then((response) => {
        const { data } = response;
        return data;
    });
};
