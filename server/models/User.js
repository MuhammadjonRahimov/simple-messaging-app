const {DataTypes} = require("sequelize")
const sequelize = require("../core/db")
const {hash} = require("bcryptjs")
const userStatus = require("../utilts/userStatus")

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
    lastLoginTime: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM(Object.values(userStatus)), 
        defaultValue: userStatus.STATUS_ACTIVE
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {notEmpty: true}
    }
},{
    underscored: true,
    hooks: {
        beforeCreate: async(user)=>{
            user.password = await hash(user.password, 8)
        }
    }
})

module.exports = User