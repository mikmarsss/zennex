const sequelize = require('../db')
const { Token } = require('./TokenModel')
const { Note } = require('./NoteModel')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
})



User.hasOne(Token, { foreignKey: 'user_id' });
Token.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(Note, { foreignKey: 'user_id' })
Note.belongsTo(User, { foreignKey: 'user_id' })

module.exports = {
    User,
}