import catchAsync from "../errors/catchAsync.js";
import response from "./response.js";

const getAll = (Model) =>
  catchAsync(async (req, res) => {
    const all = await Model.find();
    response(res, 200, all);
  });

export default getAll;
