// This file is used for creating the protection system on the routes
// ====================================================================================================================

const jwt = require('jsonwebtoken')
// This brings in jsonwebtoken so that we can use it to track our users and protect the routes at the same time.
const asyncHandler = require('express-async-handler')
// ^Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const User = require('../models/user')
// Brings in the model we need

const protect = asyncHandler(async (req, res, next) => {
  // Declares it as a async function
  let token
  // Declares the variable 'token'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    // Used for bearer tokens
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
    // Error if it isn't the right token
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
  // Error if there isn't a token
})

module.exports = { protect }
// Export's the function to protect the routes. -- 410 Confirm this?