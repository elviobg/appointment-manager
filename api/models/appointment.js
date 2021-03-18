'use strict'

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('appointment', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    patientUuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get () {
        const moment = require('moment')
        return moment(this.getDataValue('date')).format('DD/MM/YYYY hh:mm')
      }
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'appointment',
    freezeTableName: true
  })

  return Appointment
}
