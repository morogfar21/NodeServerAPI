const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const exerciseColl = mongoose.model('Exercise');
const workoutColl = mongoose.model('Workout');

/*POST add new exercise*/
module.exports.addExercise = async function (req, res) {
    let workoutName = req.body.name;
    console.log(workoutName);
    const {exerciseName, descrip, sets, reps} = req.body;
    console.log(exerciseName);
    
    let newExercise = await exerciseColl.create({
        name: exerciseName, 
        description: descrip, 
        sets: sets, 
        reps: reps
    }).catch(err => {
        res.status(400).json({
            "title": "Unable to create workout record",
            "detail": err
        });
        console.log(err);
    });
    
    workout = await workoutColl.findOne({name: workoutName});

    workout.exercises.push(newExercise);
    workout.save(function(err){
        if(err) {
            res.status(400).json({
                "title": "Unable to create workout record",
                "detail": err
            });
            console.log(err);
        } else {
            res.status(201).json({
                "title": "Created",
                newExercise
            });
        }
    });
}

/*GET list of Exercises */
module.exports.listofExercises = async function (req, res) {
    const id = req.query.id;
    await workoutColl.findById(id)
    .then(workout => {
        res.status(200).json({
            workout
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            "title": "Unable to find workouts record",
            "detail": err
        })
    });
};