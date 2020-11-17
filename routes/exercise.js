const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const auth = require('../authentication/auth');


//Add ExerciseToDb
router.post('/add', auth.authenticateJWT, exerciseController.addExercise); 

//Get exerciseListView
router.get('/list', exerciseController.listofExercises);

module.exports = router;