const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals);
})

//@desc Set goals
//@route POST /api/goals
//@access Private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Goal required')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal);
})

//@desc Update goals
//@route PUT /api/goals/id
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }
    
    //check user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Check that goal belongs to logged in user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized user');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedGoal);
})

//@desc Delete goals
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    //check user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //check that goal belongs to logged in user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized user');
    }
    await goal.remove();
    //const deletedGoal = await Goal.findByIdAndDelete(req.params.id); another option
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}