'use strict'

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('appointment', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    patient_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
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
