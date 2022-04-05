// This file defines the server, and the port. It also impliments some of the middleware
// ====================================================================================================================

const express = require('express')
// Bringing in the framework express
const dotenv = require('dotenv').config()
// Creating enviroment variable area
const port = process.env.PORT || 8000
// Declaring a port
const {errorHandler} = require('./middleware/errorMiddleware')
// Error Handler
const app = express()
// Using express

let cors = require('cors')
//Installing cors
// CORS is for security, 'Cross-origin resource sharing' 
// Allows data to move freely throughout our website
app.use(cors())



app.use(express.json())
app.use(express.urlencoded({extended: false}))





app.use('/api/dots', require('./routes/dotRoutes'))
// Allows us to shorten the url to just / for home page by making '/api/dots' implicit and requiring the data from the file
app.use('/api/users', require('./routes/userRoutes'))
// Allows us to shorten the url to just / for home page by making '/api/dots' implicit and requiring the data from the file

app.use(errorHandler)
// Custom error handler middleware

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})
// Initializing the port (localhost)