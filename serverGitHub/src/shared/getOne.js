import catchAsync from "../errors/catchAsync.js";
import response from "./response.js";

const getOne = (Model) =>
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const one = await Model.findById(id);

    response(res, 200, one);
  });

export default getOne;
