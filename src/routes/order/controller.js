const Product = require("../../models/product");
const Order = require("../../models/order");

module.exports = new (class {
  
  //CREATE ORDER
  async newOredr(req, res) {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET A ORDER WITH ID
  async getOrder(req, res) {
    const ordId = req.params.id;
    try {
      const order = await Order.findOne({ _id: ordId });
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET ORDERS BY USERID
  async getUserOrder(req, res) {
    const userId = req.query.userId;
    try {
      const orders = await Order.find({ userId: userId });
      res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //GET ALL ORDER
  async getAllOrder(req, res) {}

  //DELETE  ORDER
  async deleteOrder(req, res) {
    const ordId = req.params.id;
    try {
      await Order.findByIdAndDelete(ordId);
      res.status(200).json("Order Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
