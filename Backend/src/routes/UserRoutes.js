import { Router } from "express";
import { addEmployeeController, 
    deleteEmployee, 
    getAllUserController, 
    getEmpByIDController, 
    loginUserController 
} from "../controllers/UserController.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

const userRouter = Router();

userRouter.get("/users/getAllUsers", getAllUserController);
userRouter.get("/users/getUserByID/:EmployeeID", getEmpByIDController);
userRouter.post("/users/addNewEmployee", addEmployeeController);
userRouter.post("/users/login", loginUserController);
userRouter.delete("/users/deleteEmployeeById/:EmployeeID", deleteEmployee);

export default userRouter;