const mongoose = require('mongoose')
const { dbUser, dbPass, dbHost, dbPort, dbName } = require('../config/index')

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`)

// mongoose.connect(`mongodb+srv://admin:xdwEEMTj2QxIwg8h@cluster0.ntdmhwi.mongodb.net/studycase?retryWrites=true&w=majorityx`)

const db = mongoose.connection

module.exports = db