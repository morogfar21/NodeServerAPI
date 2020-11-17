const express = require('express');
const router = express.Router();
const workOutController = require('../controllers/workoutController');
const auth = require('../authentication/auth');


//Add WorkoutToDb
router.post('/add', auth.authenticateJWT, workOutController.addWorkout);

//Get WorkoutForm
router.get('/list', workOutController.listofWorkouts);

//Add to User
router.post('/addLogs', auth.authenticateJWT, workOutController.addToUser);

//get User workouts
router.get('/getLogs', auth.authenticateJWT, workOutController.listOfUserWorkouts);

module.exports = router;