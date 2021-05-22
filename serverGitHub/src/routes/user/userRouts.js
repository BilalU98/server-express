import logIn from "../../auth/login.js";
import signUp from "../../auth/signup.js";
import express from "express";
import {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../../controllers/user/userController.js";

const router = express.Router();

router.post("/login", logIn);
router.post("/signup", signUp);

router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", getUser);
router.post("/deleteUser/:id", deleteUser);
router.patch("/updateUser/:id", updateUser);
export default router;
