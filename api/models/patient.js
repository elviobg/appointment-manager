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
    birthday: DataTypes.DATE,
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female']
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    width: {
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
