// This file is defines the routes in the backend (the shortened ones)
// These routes are for the DOTS, not for users
// ====================================================================================================================



const express = require('express')
// Brings in the framework express, which helps in creating API's
const router = express.Router()
// Bringing in express to this file where our routes will be. Used for the subroutes
const {getDots, createDots, updateDots, deleteDots} = require('../controllers/dotController')
// Brings in the functions created in the controllers, and allows them to be used in these routes
const {protect} = require('../middleware/authMiddleware')
// Brings in the protect middleware which protects our routes using jwt


router.get('/', protect, getDots)
// Our basic GET request

router.post('/', protect, createDots)
// Our basic POST request

router.put('/:id', protect, updateDots)
// Our basic PUT request

router.delete('/:id', protect, deleteDots)
// Our basic DELETE request

module.exports = router
// Exporting the routes