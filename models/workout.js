const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
    type: String  
    },
    description: {
    type: String
    },
    sets: {
    type: String
    },
    reps: {
    type: String
    }
});

const workoutSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true
    }, 
    exercises: [exerciseSchema]
});

mongoose.model('Workout', workoutSchema);
mongoose.model('Exercise', exerciseSchema);

