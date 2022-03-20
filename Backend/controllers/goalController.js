const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModels')

// @desc Get Geoals
// @route GET/api/goals
// @access Public
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

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
       text: req.body.text 
    })

    res.status(200).json(goal)
})

const updateGoals = asyncHandler( async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        throw new Error('goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true, 
        })
        

    res.status(200).json(updateGoals)
})

const deleteGoals = asyncHandler( async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        throw new Error('goal not found')
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