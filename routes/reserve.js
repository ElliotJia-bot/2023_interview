const express = require("express");
const wrapper = require("../utils/wrapper");
const reserveController = require("../controller/reserve");

const router = express.Router();

router.post("/reserve/create", wrapper(reserveController.createReserve));
router.delete("/reserve/delete", wrapper(reserveController.deleteReserve));
router.patch("/reserve/update", wrapper(reserveController.updateReserve));
router.patch("/reserve/update_reserve_status",wrapper(reserveController.updateReserveStatus));
// router.get("/reserve/get", wrapper(reserveController.getReserve));

router.post("/reserve/getList_mas",wrapper(reserveController.getReserveList_mas));
router.post("/reserve/getList_stu",wrapper(reserveController.getReserveList_stu));


module.exports = router;
