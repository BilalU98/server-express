import catchAsync from "../errors/catchAsync.js";
import response from "./response.js";
import AppError from "../errors/AppError.js";

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const one = await Model.findByIdAndDelete(id);
    if (!one) next(new AppError("no doc belong to this id", 404));
    response(res, 200, one);
  });

export default deleteOne;
