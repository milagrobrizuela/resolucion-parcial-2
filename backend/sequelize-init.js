// Configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/databaseFile.db'
});

const Vehiculo = sequelize.define(
    'Vehiculo', 

    {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        propietario: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        vin: {
            field: 'numero_vin',
            type: DataTypes.TEXT,
            allowNull: false
        },

        marca: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        modelo: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        kilometros: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, 
    
    {
        tableName: 'vehiculos',
        timestamps: false
    }
);

async function sincronizar_db() {
    try {
        await sequelize.sync();
        console.error('La sincronizacion de la base de datos fue exitosa.', sequelize.models);
    } catch(error) {
        console.error('La sincronizacion de la base de datos fue fallida.', error.message);
    }
};

sincronizar_db();

module.exports = sequelize
