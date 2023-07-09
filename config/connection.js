const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api'

mongoose.connect(connectionString).catch(error => console.error('Error connecting to MongoDB', error))

module.exports = mongoose.connection
