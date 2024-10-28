const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Note = sequelize.define('note', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Новая заметка' },
    description: { type: DataTypes.STRING(4000), allowNull: false, defaultValue: 'Описание' },
    tags: { type: DataTypes.ARRAY(DataTypes.JSONB), allowNull: false, defaultValue: [] },
})

module.exports = {
    Note
}