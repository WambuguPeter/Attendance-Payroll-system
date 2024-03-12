import { Router } from "express";
import { getAllUserController, loginUserController } from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get("/users/getAllUsers", getAllUserController);
userRouter.post("/users/login", loginUserController);

export default userRouter;