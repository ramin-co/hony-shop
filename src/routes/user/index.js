const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyAdmin, verifyUserOrAdmin } = require("../../verify/verify");

router.get("/", verifyAdmin, controller.getAllUsers);
router.get("/:id", verifyUserOrAdmin, controller.getUser);
router.put("/:id", verifyUserOrAdmin, controller.updateUser);
router.delete("/:id", verifyAdmin, controller.deleteUser);

module.exports = router;
