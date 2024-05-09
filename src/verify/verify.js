const jwt = require("jsonwebtoken");

//IF USER LOGIN OR NOT!
const verifyUser = (req, res, next) => {
  const token = req.headers.cookie?.split("=")[1];
  if (!token) {
    return res.status(403).json("your not logined!");
  }
  jwt.verify(token, process.env.SEC_KEY, (error, userInfo) => {
    if (error) {
      return res.status(403).json("your token is not Valid!");
    }
    req.user = userInfo;
    next();
  });
};

//IF USER LOGINED ADMIN OR NOT!
const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.isAdmin) return next();
    return res.status(403).json("You can not to do it!");
  });
};

//JUST LOGINED USER OR ADMIN CAN DO IT!
const verifyUserOrAdmin = (req, res, next) => {
  const userId = req.query.userId;
  verifyUser(req, res, () => {
    if (req.user.isAdmin || req.user.id == userId) return next();
    return res.status(403).json("You can not to do it!");
  });
};

module.exports = {
  verifyUser,
  verifyAdmin,
  verifyUserOrAdmin,
};
