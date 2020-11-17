const mongoose = require('mongoose');
const workoutColl = mongoose.model('Workout');
const userColl = mongoose.model('User');



//
module.exports.addToUser = async function (req, res) {
    const Userid = req.user.id;
    const workoutId = req.body.id;

    let workoutData = await workoutColl.findOne({_id: workoutId});

    let user = await userColl.findOne({_id: Userid});
    user.workouts.push(workoutData);
        user.save(function(err){
            if(err) {
                 console.log(nooooo);
                }
             })

        res.status(201).json({
            "title": "Created",
            user
    });
}

//
module.exports.listOfUserWorkouts = async function (req, res) {
    const Userid = req.user.id;
    console.log(Userid);
    await userColl.findOne({_id: Userid}).populate('workouts')
    .exec(function(err, user){
            if(err) {
                res.status(400).json({
                    "title": "Unable to find User record",
                    "detail": err
                });
            }
            let workouts = user.workouts;
             res.status(201).json({
                "title": "Created",
                workouts
            });
    });
}

/*POST add new workout*/
module.exports.addWorkout = async function (req, res) {
    const workoutname = req.body.name;
    const newWorkout = await workoutColl.create({
        name: workoutname, 
        exercises: []
    }).catch(err => 
        res.status(400).json({
            "title": "Unable to create workout record",
            "detail": err
        })
    );

    if(newWorkout != null) {
        res.status(201).json({
            "title": "Created",
            newWorkout
        });
    }
};


/*GET list of workouts */
module.exports.listofWorkouts = async function (req, res) {
    await workoutColl.find( function(err, workouts){
        if(err) {
            res.status(400).json({
                "title": "Unable to find workouts record",
                "detail": err
            });
        } else {
            res.status(200).json({
                "title": "data:",
                workouts
            });
        }
    });
};