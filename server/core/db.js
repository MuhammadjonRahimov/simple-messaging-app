const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({

	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	underscore: true,
	//  dialectOptions: {
	//      ssl: {
	//          rejectUnauthorized: false
	//      }
	//  }
})

module.exports = sequelize