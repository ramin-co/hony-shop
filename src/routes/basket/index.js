const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/", controller.newBasket);
// router.get("/", controller.getAllBasket);
router.get("/find", controller.getByQuery);
router.delete("/:id", controller.deleteBasket);

module.exports = router;
