const { Model, DataTypes } = require('sequelize');
const { connectionDB } = require('../core/db/connection');

class UserModel extends Model {}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING, 
            unique: true
        },
        name: DataTypes.STRING,
        age: { 
            type: DataTypes.NUMBER,
        }
    },
    { sequelize: connectionDB, modelName: "user" }
)

module.exports = UserModel