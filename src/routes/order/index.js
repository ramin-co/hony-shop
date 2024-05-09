const express = require("express");
const controller = require("./controller");
const router = express.Router();
const {
  verifyAdmin,
  verifyUser,
  verifyUserOrAdmin,
} = require("../../verify/verify");

router.post("/", verifyUser, controller.newOredr);
router.get("/find/:id", verifyUserOrAdmin, controller.getOrder);
router.get("/find", verifyUserOrAdmin, controller.getUserOrder);
router.delete("/:id", verifyAdmin, controller.deleteOrder);

module.exports = router;
