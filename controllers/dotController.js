// This file is basically for how to get the information, delete the information, update the information and create the information. It checks for it existing, if it is connected to a user, and then tells it what to do with the information.

// ====================================================================================================================

const asyncHandler = require('express-async-handler')
// ^Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const Dots = require('../models/dots')
const User = require('../models/user')
// Bringing in both of the dot models so we can pull some of the invormation off of them using dotnotation.


// GET USER DOTS
// route: GET /api/dots
// Access: Private
const getDots = asyncHandler(async (req, res)=> {
    // async declares an asynchronous function, but the await will make it wait for some action to happen before it is completed. 
    const dots = await Dots.find({user: req.user.id})
    // Will find all of the dots in our mongoDB local database

    for (let i = dots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dots[i], dots[j]] = [dots[j], dots[i]];
    }
// -- see how I can optimize the sorting (look into better sorting algorithms)


    res.status(200).json(dots)
    // If the dot's are found, it will send back a 200 ok status     
})

// CREATE A DOT
// route: POST /api/dots
// Access: Private
const createDots = asyncHandler(async (req, res)=> {
    if (!req.body.websiteName && !req.body.description && !req.body.url && !req.body.rating && !req.body.tags) {
        res.status(400)
        // If some of these params are not on the created data, send an 400 error. 
        throw new Error('Please add the required fields')
    }
    // Checks to see if all of the required fields are there, if not it will ask to fill in all of the fields

    const dot = await Dots.create({
       websiteName: req.body.websiteName,
        description: req.body.description,
        url: req.body.url,
        rating: req.body.rating,
        tags: req.body.tags,
        user: req.user.id
    })
    // This is what it will create when the fields are put in correctly^. It is the data that will be sent and stored in the variable 'dot'. 'dot' holds the created data

    res.status(200).json(dot)
    // If the dot is created, it will send back a 200 ok status along with the updated dot
})

// UPDATE DOTS
// route: PUT /api/dots/id
// Access: Private
const updateDots = asyncHandler( async(req, res)=> {
    const dot = await Dots.findById(req.params.id)
    // first uses await to find the dot by it's id.
    if(!dot) {
        res.status(400)
        throw new Error('Dot not found')
    }
    // If it can't find the dot then it will send an error message saying it isnt found

    const user = await User.findById(req.user.id)
    //It then checks for the user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (dot.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized to update')
    }
    // Make sure the logged in user matches the dot user
    const updatedDot = await Dots.findByIdAndUpdate(req.params.id, req.body, {new: true})
    // Finds the dot and updates it by ID
    //'Dots' is refering to the model. -- 410 Why? Why isn't it looking for it in local storage?
    res.status(200).json(updatedDot)
    // If the dot is updated, it will send back a 200 ok status along with the dot in json format
})

// DELETE DOTS
// route: DELETE /api/dots/id
// Access: Private
const deleteDots = asyncHandler( async(req, res)=> {
    const dot = await Dots.findById(req.params.id)
    // Awaits to find the selected dot by ID
    if(!dot) {
        res.status(400)
        throw new Error('Dot not found')
    }
    // If the dot isn't found it will throw a 400 error

    const user = await User.findById(req.user.id)
    //checks for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // If no user, 401 error, user not found
    // Make sure the loged in user matches the dot user
    if (dot.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized to update')
    }
    await dot.remove()
    // removes the dot if existed

    res.status(200).json({id: req.params.id})
     // If the dot is deleted, it will send back a 200 OK status along with the data
})


module.exports = {
    getDots,
    createDots,
    updateDots,
    deleteDots
}
// Exports these route controllers
