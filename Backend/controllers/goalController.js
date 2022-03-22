const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModels')
const User = require('../model/userModel')

// @desc Get Geoals
// @route GET/api/goals
// @access Public
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({
        user: req.user,
    })


    res.status(200).json(goals)
})


// @desc set Geoals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }

    const goal = await Goal.create({
       text: req.body.text,
       user: req.user.id, 
    })

    res.status(200).json(goal)
})

const updateGoals = asyncHandler( async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        throw new Error('goal not found')
    }

        const user = await User.findById(req.user.id)

        // Check for user
        if(!user) {
            res.status(401)
            throw new Error('User not found')
        }

        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User authorizied')
        }
    

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true, 
        })
        

    res.status(200).json(updatedGoal)
})

const deleteGoals = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        throw new Error('goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User authorizied')
    }

    await goal.remove()
    res.status(200).json({ message: `deleted goals ${req.params.id}`})
})
 
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals 
}