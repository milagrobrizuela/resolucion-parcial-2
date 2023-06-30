const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

const marca = 'Toyota';
const fromFiltro = 50000;
const toFiltro = 200000;

describe('vehiculos', () => {
    test('of getVehiculos are returned as json', async () => {
        await api
            .get('/api/vehiculos/')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const fullList = await api.get('/api/vehiculos/');
        expect(fullList.body).toHaveLength(50);
    });

    test('of getVehiculos ByKmRange and all Make are returned as json', async () => {
        await api
            .get(`/api/vehiculos/?marca=${marca}&from=${fromFiltro}&to=${toFiltro}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        await api
            .get(`/api/vehiculos/?marca=Todas&from=${fromFiltro}&to=${toFiltro}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        await api
            .get(`/api/vehiculos/?marca=${marca}&from=1&to=1000000`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('of getVehiculos ByKmRange [105k to 110k] and all Make sortenning', async () => {
        const onlyTextFilter = await api.get('/api/vehiculos/?marca=Todas&from=105000&to=110000');
        expect(onlyTextFilter.body).toHaveLength(8);
        expect(onlyTextFilter.body[0].propietario).toBe('Wynne Pasby');
        expect(onlyTextFilter.body[7].propietario).toBe('Gracia Pickin');
    });

    test('of getVehiculos ByKmRange [100k to 200k] and a Make [Toyota] sortenning', async () => {
        const onlyTextFilter = await api.get('/api/vehiculos/?marca=Toyota&from=100000&to=200000');
        expect(onlyTextFilter.body).toHaveLength(6);
        expect(onlyTextFilter.body[0].propietario).toBe('Allin Radley');
        expect(onlyTextFilter.body[5].propietario).toBe('Beau Joannic');
    });

    test('of getVehiculos ByKmRange [] and a Make [Toyota] sortenning', async () => {
        const fullFilter = await api.get('/api/vehiculos/?marca=Toyota&from=1&to=1000000');
        expect(fullFilter.body).toHaveLength(16);
        expect(fullFilter.body[0].propietario).toBe('Elayne Denecamp');
        expect(fullFilter.body[15].propietario).toBe('Kikelia MacCallester');
    });
});