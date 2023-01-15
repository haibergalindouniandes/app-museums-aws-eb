// Importamos dependencias
const { Model, DataTypes, Sequelize } = require('sequelize');
// Definimos el nombre de nuestra tabla
const MUSEUM_TABLE = 'museum';
// Definimos el esquema de museos para el ORM sequelize
const MuseumSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING(600)
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING
    },
    isBlocked: {
        allowNull: false,
        field: 'is_bloked',
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        allowNull: false,
        field: 'crated_at',
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateAt: {
        allowNull: false,
        field: 'updated_at',
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}

// Creamos nuestra clase Museum extendiendo de Model
class Museum extends Model {
    static associate() {
        // asociación entre tablas
    }

    // Creamos nuestro metodo estatic de configuración
    static config(sequelize) {
        return {
            sequelize,
            tableName: MUSEUM_TABLE,
            modelName: 'Museum',
            timestamps: false
        }
    }
}

// Exportamos 
module.exports = { MUSEUM_TABLE, MuseumSchema, Museum }