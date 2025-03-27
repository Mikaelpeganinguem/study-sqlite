const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

/**
 * Define um modelo de entidade
 * - id: identificador do usuário
 * - username: nome do usuário
 * - birthday: data de nascimento do usuário
 * @type {Model}
 * @returns {Model} Retorna um modelo de
 * entidade para ser utilizado na criação de
 * tabelas no banco de dados.
 */
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Birthday cannot be null'
            },
            isDate: {
                msg: 'Birthday must be a valid date'
            }
        }
    }
}, {
    timestamps: false
});

module.exports = User;