// This file is defines the routes in the backend (the shortened ones)
// These routes are for the USERS, not for dots
// ====================================================================================================================

const express = require('express')
// Brings in the framework express, which helps in creating API's
const router = express.Router()
// Bringing in express to this file where our routes will be. Used for the subroutes
const {registerUser, loginUser, getMe} = require('../controllers/userController')
// Brings in the functions created in the controllers, and allows them to be used in these routes
const {protect} = require('../middleware/authMiddleware')
// Brings in the protect middleware which protects our routes using jwt

router.post('/', registerUser)
// api/users

router.post('/login', loginUser)
// api/users

router.get('/me',protect, getMe)
// api/users

module.exports = router
// Exports all of the routes. -- 410 To where?
