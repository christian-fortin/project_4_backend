// This file is used for initial seeding of information to work with

// ====================================================================================================================

const mongoose = require('./connection')
const Dots = require('../models/dots')
const dotsSeeds = require('./seeds.json')
// Tells what data to bring in and which model to follow 

Dots.deleteMany({})
.then(()=>{
    return Dots.insertMany(dotsSeeds)
})
.then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})
// --410 Not exactly sure what this is^
