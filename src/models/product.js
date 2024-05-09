const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    catogeries: { type: [String], required: true },
    price: { type: Number, required: true },
    disCount: { type: Number, default: 0 },
    count: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
