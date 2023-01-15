// Importamos dependencias
const { Model, DataTypes, Sequelize } = require('sequelize');
// Definimos el nombre de nuestra tabla
const USER_TABLE = 'users';
// Definimos el esquema de museos para el ORM sequelize
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING(2),
        defaultValue: 'A'
    },
    createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        field: 'create_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateAt: {
        allowNull: false,
        type: "TIMESTAMP",
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}

// Creamos nuestra clase User extendiendo de Model
class User extends Model {
    static associate() {
        // associate
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

// Exportamos 
module.exports = { USER_TABLE, UserSchema, User }
