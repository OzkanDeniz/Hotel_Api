"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

// const User = require("../models/user");
// const passwordEncrypt = require("../helpers/passwordEncrypt");
// const {
//   UnauthorizedError,
//   BadRequestError,
//   NotFoundError,
// } = require("../errors/customError");

// //   const jwt = require('jsonwebtoken')

// module.exports = {
//   login: async (req, res) => {
//     /*
//             #swagger.tags = ["Authentication"]
//             #swagger.summary = "Login"
//             #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
//             #swagger.parameters["body"] = {
//                 in: "body",
//                 required: true,
//                 schema: {
//                     "username": "test",
//                     "password": "aA?123456",
//                 }
//             }
//         */

//     const { username, password, email } = req.body;

//     if (((username || email) && password))
//       throw new BadRequestError("username/email and password are required");

//     const user = await User.findOne({ $or: [{ email }, { username }] });
//     if (!user) throw new NotFoundError("username/email is not found");

//     if (!user.isActive) throw new UnauthorizedError("This user is inactive");

//     if (user.password !== passwordEncrypt(password))
//       throw new UnauthorizedError("incorrect password");

//     res.send({
//       error: false,
//       user,
//     });
//   },
//   logout: async (req, res) => {
//     /*
//             #swagger.tags = ["Authentication"]
//             #swagger.summary = "simpleToken: Logout"
//             #swagger.description = 'Delete token key.'
//         */
//     const auth = req.headers?.authorization || null;
//     res.send({
//       error: false,
//     });
//   },
// };

const User = require("../models/user");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const Token = require("../models/token");

module.exports = {
  login: async (req, res) => {
    const { username, password, email } = req.body;

    if (!((username || email) && password))
      throw new BadRequestError("username/email and password are required");

    const user = await User.findOne({
      $or: [{ email }, { username }],
      password,
    });

    if (!user) throw new Error("username/email is not found");

    if (!user.isActive) throw new Error("This user is inactive");

    /*SİMPLE TOKEN*/
    let tokenData = await Token.findOne({ userId: user._id });

    if (!tokenData) {
      const tokenKey = passwordEncrypt(user._id + Date.now());
      tokenData = await Token.create({ userId: user._id, token: tokenKey });
    }

    res.send({
      error: false,
      token: tokenData.token,
      user,
    });
  },

  logout: async (req, res) => {
    const auth = req.headers?.authorization || null; // headers tan gelen token:Token tokenKey
    const tokenKey = auth ? auth.split(" ") : null;
    let token = null;
    if (tokenKey?.at(0) == "Token") {
      token = await Token.deleteOne({ token: tokenKey[1] });
    }
    res.send({
      error: !token?.deletedCount,
      message: token?.deletedCount
        ? "Token deleted. Logout was OK."
        : "Token not deleted Logout failed.",
    });
  },
};
