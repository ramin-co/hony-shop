const express = require("express");
const router = express.Router();
const authRouter = require("./auth/index");
const userRouter = require("./user/index");
const productRouter = require("./product/index");
const orderRouter = require("./order/index");
const payRouter = require("./pay");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/pay", payRouter);

module.exports = router;
