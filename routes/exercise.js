const express = require("express");
const wrapper = require("../utils/wrapper/index");
const exerciseController = require("../controller/exercise");

const router = express.Router();

router.post("/exercise/create", wrapper(exerciseController.createExercise));
router.delete("/exercise/delete", wrapper(exerciseController.deleteExercise));
router.patch("/exercise/update", wrapper(exerciseController.updateExercise));

router.get("/exercise/gettype", wrapper(exerciseController.getExerciseType));
router.get("/exercise/getlevel", wrapper(exerciseController.getExerciseLevel));

router.get("/exercise/getbyid", wrapper(exerciseController.getExerciseById));
router.get("/exercise/getbytype",wrapper(exerciseController.getExerciseByType));

router.post("/exercise/generate",wrapper(exerciseController.generateExercises));

router.post("/exercise/getlist", wrapper(exerciseController.getList));

module.exports = router;
