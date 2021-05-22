import User from "../models/userModel.js";
import response from "../shared/response.js";
import catchAsync from "../errors/catchAsync.js";
import token from "./token.js";
import AppError from "../errors/AppError.js";

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("password or email is wrong", 401));
  }

  let createToken = token(user._id);

  response(res, 200, user, { token: createToken });
});

export default logIn;
