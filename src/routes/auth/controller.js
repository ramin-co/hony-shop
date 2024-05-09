const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = new (class {
  async register(req, res) {
    const { username, phone } = req.body;
    try {
      const user = await User.findOne({ phone: phone });
      if (user) return res.status(400).json("this username has been already");
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: username,
        phone: phone,
        password: hashedPass,
      });
      await newUser.save();
      const { password, ...others } = newUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //LOGIN
  async login(req, res) {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) return res.status(404).json("Username Or Password is Wrong!");
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result)
        return res.status(401).json("Username Or Password is Wrong!");
      const token = jwt.sign(
        {
          phone: user.phone,
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.SEC_KEY,
        {
          expiresIn: 1000 * 60 * 60 * 24 * 360,
        }
      );
      const { password, ...others } = user._doc;
      res.status(200).cookie("accesToken", token).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();
