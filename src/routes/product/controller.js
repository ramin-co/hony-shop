const Product = require("../../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = new (class {
  //NEW PRODUCT
  async newProduct(req, res) {
    try {
      const newProduct = new Product({
        ...req.body,
      });
      await newProduct.save();
      console.log(newProduct, "new Product");
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET A PRODUCT
  async getProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.find({ _id: id });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET A PRODUCT
  async getSomeProduct(req, res) {
    try {
      const productArray = req.body.products;
      const product = await Product.find({ _id: id });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET BY QUERY OR ALL
  async findByQuery(req, res) {
    const catogeries = req.query.catogeries?.split("+");
    let products = [];
    try {
      if (catogeries) {
        console.log(catogeries, "Catogeries");
        products = await Product.find({
          catogeries: { $in: catogeries },
        });
      } else {
        products = await Product.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //UPDATE PRODUCT
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //DELETE PRODUCT
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      await Product.findByIdAndDelete(id);
      res.status(200).json("Product Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //GET BY NAME
  async getPname(req, res) {
    try {
      const name = req.query.name;
      console.log(name, "name");
      const product = await Product.find({
        name: name,
      });
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
