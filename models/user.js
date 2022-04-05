// This file is used to create the Schema or model for how information is suppose to look in the data base.
// This Schema is for a user
// ====================================================================================================================

const mongoose = require('../db/connection')
// Connects to the database

const userSchema = new mongoose.Schema({
    name: 
    {type: String,
    required: [true, 'Please add a name']
    },

    email: 
    {type: String,
    required: [true, 'Please add an email'],
    unique: true,
    },
    
    password:
    {type: String,
    required: true},
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)
// Declares the schema with the variable 'User'

module.exports = User
// Exports the model using the variable 'User'
