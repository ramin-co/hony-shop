const express = require("express");
const router = express.Router();
const controller = require("./controller");
const {
  verifyAdmin,
  verifyUser,
  verifyUserOrAdmin,
} = require("../../verify/verify");

router.post("/", verifyAdmin, controller.newProduct);
router.get("/find/:id", controller.getProduct);
router.get("/findsome", controller.getProduct);
router.get("/search", controller.getPname);
router.get("/find", controller.findByQuery);
router.put("/:id", verifyAdmin, controller.updateProduct);
router.delete("/:id", verifyAdmin, controller.deleteProduct);

module.exports = router;
