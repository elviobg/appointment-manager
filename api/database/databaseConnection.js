'use strict'

const Sequelize = require('sequelize')

const dbConnection = new Sequelize(process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
    }
  })

const db = {}

db.Sequelize = Sequelize
db.dbConnection = dbConnection

db.patients = require('../models/patient.js')(dbConnection, Sequelize)
db.appointments = require('../models/appointment.js')(dbConnection, Sequelize)

db.patients.hasMany(db.appointments, { onDelete: 'CASCADE', hooks: true})
db.appointments.belongsTo(db.patients)

module.exports = db