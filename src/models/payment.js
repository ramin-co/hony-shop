const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    resNumber: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    status: { type: Boolean, default: false },
    amount: { type: Number, required: true },
    trackingId: { type: String, default: "123456" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
