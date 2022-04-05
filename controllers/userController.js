// This file is basically for how to get the USER information and create the information. It checks for it existing, and then tells it what to do with the information.

// ====================================================================================================================

const jwt = require('jsonwebtoken');
// This brings in jsonwebtoken so that we can use it to track our users and protect the routes at the same time.
require('dotenv').config()
const bcrypt = require('bcryptjs');
// Using bcrypt to help encrypt the passwords
const asyncHandler = require('express-async-handler')
// ^Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const User = require('../models/user');
// Brings in our user model to pull information from.

// GEnerate JWT
// const generateToken = (id) => {
//     // return jwt.sign({ id }, `${process.env.TOKEN_SECRET}`, {expiresIn: '30d',})


// Generate JWT
const generateToken = (id) => {
  console.log(id, 'This is it');
  // -- 410 Why am I not getting this console.log?
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  
}
// This function creates a jsonwebtoken 


// POST a User (creates a user)
// Route: POST /api/users/?register?
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // This^ adds the information to the body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  // This^ makes sure all the fields are filled out

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // This^ checks if there is already a valid user with this information

  // Hash Password
  // Hashing a password means to take a plain text password and put it through an algorithm and creates a random string that represents your password. It makes it into jibberish but the same jibberish.
  const salt = await bcrypt.genSalt(10);
  // By passing the salt however the same jibberish will be changed into random jibberish each time
  const hashedPassword = await bcrypt.hash(password, salt);
  // This is where the actual password get's hashed, using 'bcrypt.hash()' it throws in the password itself and the amount of change (salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // This^ creates a user with the hashed password attatched, attatched to the variable 'user'

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  // This^ checks if the user exists and if they have a webtoken from jwt attatched.
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
  // If is not valid it will throw a 400 error. -- 410 How does this happen? When would it become invalid?
});

// Authenitcate a User
// Route: POST /api/users/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    // This^ takes the email and password that was inputted from the body -- 410 Is this correct? What I think it means?
    const user = await User.findOne({email})
    // This^ finds a user by the unique email and attatches it to the variabel 'user'

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
          });
        // This^ compares the existing data in the backend and the data now. If it is the same it will send a 200 status 
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
      }
      // This will throw an error if the credentials are invalid.
});

// Get user data
// Route: GET /api/users/me
// Access: Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)
// This^ gets the information from the database
  res.status(200).json({
      id: _id,
      name,
      email,
  })
  // If all of the information is there, it sends a 200 code with the information
});


module.exports = {
  registerUser,
  // The function to register a user
  loginUser,
  // The function to login a user
  getMe,
  // The function to get the user
};
