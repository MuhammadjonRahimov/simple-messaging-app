const UserModel = require("../models/User");
const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncError = require("../utilts/asyncError");
const ErrorClass = require("../utilts/ErrorClass");
const { Op } = require("sequelize");

const generatorToken = (payload, JWT_SECRET_CODE, option) => {
  return new Promise((resolve, rejact) => {
    jwt.sign(payload, JWT_SECRET_CODE, option, (error, token) => {
      if (error) {
        return rejact(error);
      } else if (token) {
        return resolve(token);
      }
    });
  });
};

exports.register = asyncError(async (req, res, next) => {
  const { email } = req.body;

  const existedUsername = await UserModel.findOne({
    where: { email: { [Op.eq]: email } },
  });
  if (existedUsername) {
  //  return res.status(409).json({
  //     status: "fail",
  //     message: "User already exists",
  //     error: null,
  //     data: null,
  //   });
    return next(new ErrorClass("User already exists", 409));
  }
  await UserModel.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Successfully registered",
    error: null,
    data: null,
  });
});

exports.login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const existedUser = await UserModel.findOne({
    where: { email: { [Op.eq]: email } },
  });
  if (!existedUser) {

    return res.status(400).json({

      status: "fail",
      message: "Email or password incorrect",
      data: null
    })
    // return next(new ErrorClass("Email or password incorrect", 400));
  }

  const correctPassword = await compare(password, existedUser.password);
  if (!correctPassword) {
    return res.status(400).json({

      status: "fail",
      message: "Email or password incorrect",
      data: null
    })
    // return next(new ErrorClass("Email or password incorrect", 400));
    }
    
  if (existedUser.status === "blocked") {
      
    return res.status(403).json({

      status: "fail",
      message: "User is blocked",
      data: null
    })
        // return next(new ErrorClass("User is blocked", 403))
    }

  existedUser.lastLoginTime = new Date().toISOString();
  await existedUser.save();

  const token = await generatorToken(
    {
      id: existedUser.id,
      username: existedUser.username,
      email: existedUser.email,
      status: existedUser.status,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS512",
      expiresIn: "24h",
    }
  );

  res.status(200).json({
    status: "success",
    message: "Successfully logged",
    data: {
      token,
      user: {
        id: existedUser.id,
        username: existedUser.username,
        email: existedUser.email,
      },
    },
  });
});
