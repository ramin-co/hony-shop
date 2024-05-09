const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = new (class {
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.find({
        _id: id,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //UPDATE USER
  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //DELETE USER
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      res.status(200).json("User Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //getAllUsers
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
