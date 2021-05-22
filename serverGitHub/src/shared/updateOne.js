import catchAsync from "../errors/catchAsync.js";
import response from "./response.js";
import AppError from "../errors/AppError.js";
import User from "../models/userModel.js";

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const one = await Model.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    });

    console.log(id, body);
    if (!one) next(new AppError("no doc belong to this id", 404));
    response(res, 200, one);
  });

export default updateOne;
