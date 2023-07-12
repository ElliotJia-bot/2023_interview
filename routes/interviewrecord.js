const express = require("express");
const wrapper = require("../utils/wrapper/index");
const interviewrecordController = require("../controller/interviewrecord");

const router = express.Router();

// router.post("/record/create",     wrapper(interviewrecordController.createRecord));
router.delete("/record/delete",     wrapper(interviewrecordController.deleteRecord));
router.patch("/record/update",      wrapper(interviewrecordController.updateRecord));
router.get("/record/getById",       wrapper(interviewrecordController.getRecordById));
router.get("/record/getList_mas",   wrapper(interviewrecordController.getRecordList_mas));
router.get("/record/getList_stu",   wrapper(interviewrecordController.getRecordList_stu));
router.get("/record/getExercises",  wrapper(interviewrecordController.getExercises));


module.exports = router;
