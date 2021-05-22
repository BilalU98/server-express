import getOne from "../../shared/getOne.js";
import getAll from "../../shared/getAll.js";
import deleteOne from "../../shared/deleteOne.js";
import updateOne from "../../shared/updateOne.js";
import User from "../../models/userModel.js";

export const getUser = getOne(User);
export const getAllUsers = getAll(User);
export const deleteUser = deleteOne(User);
export const updateUser = updateOne(User);
