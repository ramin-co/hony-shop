const express = require("express");
const controller = require("./controller");
const router = express.Router();
const { verifyAdmin, verifyUser } = require("../../verify/verify");

router.post("/", verifyUser, controller.startPAy);
router.get("/verifyPayment", controller.verifyPay);

module.exports = router;
