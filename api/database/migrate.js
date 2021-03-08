const db = require('../database/databaseConnection')
db.dbConnection.sync({ force: true })
