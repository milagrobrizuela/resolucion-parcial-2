const express = require('express');
const sequelize = require('../sequelize-init.js');
const { Op } = require('sequelize');

const VehiculosRouter = express.Router();

VehiculosRouter.get('/api/vehiculos/', async function(req, res) {
    try {
        const { marca, from, to } = req.query;

        if (!from && !to) {
            const data = await sequelize.models.Vehiculo.findAll({
                limit: 50,
                order: [['marca'], ['year', 'DESC']]
            });

            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(200).json({ message: 'No se encontraron vehiculos.' });
            }
        } else {
            let where = '';

            if (marca !== 'Todas' && from !== undefined && to !== undefined) {
                where = { [Op.and]: [
                    { marca: { [Op.eq]: marca }},
                    { kilometros: { [Op.gt]: from }},
                    { kilometros: { [Op.lt]: to }}
                ]}
            } else {
                where = { [Op.and]: [
                    { kilometros: { [Op.gt]: from } },
                    { kilometros: { [Op.lt]: to } }
                ]}
            };

            const data = await sequelize.models.Vehiculo.findAll({
                where,
                order: [['marca'], ['year', 'DESC']]
            });

            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                res.status(200).json({ message: 'No se encontraron vehiculos.' });
            }
        }
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = VehiculosRouter;
