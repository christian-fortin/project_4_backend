// This file connects to the local database

// ====================================================================================================================


require('dotenv').config()
const mongoose = require('mongoose')
// Brings in the dot env and the mongoose framework

const MONGODB_URI = process.env.NODE_ENV === 'production' ? process.env.
// Checks if it is in production or if it is in testing
MONGODB_URI : 'mongodb://localhost:27017/dots'
// Location of the local database


mongoose.connect( MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(instance => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
})
.catch(err=> console.log(`Connection failed`, err))
module.exports = mongoose
// Connects to the local database