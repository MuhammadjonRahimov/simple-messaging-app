const {DataTypes} = require("sequelize")
const sequelize = require("../core/db")

const Message = sequelize.define("messages", {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  text:{
      type: DataTypes.STRING,
      allowNull: false
      },
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false
  },

},{
  underscored: true,
  timestamps: {updatedAt: false}
})

module.exports = Message