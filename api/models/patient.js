'use strict'

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patient', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      get () {
        const moment = require('moment')
        return moment(this.getDataValue('date')).format('DD/MM/YYYY')
      }
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female']
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    tableName: 'patient',
    freezeTableName: true
  })

  return Patient
}
