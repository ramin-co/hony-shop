const Basket = require("../../models/basket.js");

module.exports = new (class {
  //NEW BASKET
  async newBasket(req, res) {
    const { userId, products } = req.body;
    try {
      const newBasket = await new Basket({
        userId: userId,
        products: products,
      });
      return res.status(200).json(newBasket);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET A BASKET BY ID
  async getBasket(req, res) {
    const basketId = req.params.id;
    try {
      const basket = await Basket.find({ _id: basketId });
      return res.status(200).json(basket);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET A BASKET BY ID
  async getAllBasket(req, res) {
    try {
      const baskets = await Basket.find();
      return res.status(200).json(baskets);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //DELETE BASKET
  async deleteBasket(req, res) {
    const basketId = req.params;
    try {
      await Basket.findByIdAndDelete(basketId);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET BASKET BY USERID
  async getByQuery(req, res) {
    const { userId } = req.query;
    try {
      const baskets = await Basket.find({
        userId: userId,
      });
      return res.status(200).json(baskets);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
