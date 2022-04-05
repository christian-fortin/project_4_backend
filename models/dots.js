// This file is used to create the Schema or model for how information is suppose to look in the data base.
// This Schema is for a 'dot' (regular post)
// ====================================================================================================================

const mongoose = require('../db/connection')
// Connects to the database

const dotsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    websiteName: {type: String, required: true},
    description: {type: String, required: true},
    url: { type: String, required: true},
    rating: {type: String, required: true},
    tags: {type: String, required: true},
    },
    {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
      }
    )
    // Defines the model^

const Dots = mongoose.model('Dots', dotsSchema)
// creates a variable for the model to be exported

module.exports = Dots
// Exports the model with the name "Dots"