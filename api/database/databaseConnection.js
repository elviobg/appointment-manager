'use strict'

const Sequelize = require('sequelize')

const db = {}

const dbConnection = new Sequelize(process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
    }
  })
db.Sequelize = Sequelize
db.dbConnection = dbConnection

db.patients = require('../models/patient.js')(dbConnection, Sequelize)
db.appointments = require('../models/appointment.js')(dbConnection, Sequelize)
db.users = require('../models/user.js')(dbConnection, Sequelize)

db.patients.hasMany(db.appointments, { onDelete: 'CASCADE', hooks: true })
db.appointments.belongsTo(db.patients)

module.exports = db
