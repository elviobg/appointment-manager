const Sequelize = require('sequelize')
const db = require('../database/databaseConnection')

const Patient = db.sequelize.define('Patient', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Patient