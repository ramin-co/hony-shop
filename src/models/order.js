const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  basket: { type: Array, required: true },
  payStatus: { type: Boolean, default: false },
  payStatus: { type: Boolean, default: false },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
