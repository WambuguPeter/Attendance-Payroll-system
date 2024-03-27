import { Router } from "express";
import { addEmployeeController, 
    deleteEmployee, 
    getAllUserController,  
    getEmpByEmailController1, 
    getEmpByIDController, 
    loginUserController, 
    updateUserController
} from "../controllers/UserController.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

const userRouter = Router();

userRouter.get("/users/getAllUsers", getAllUserController);
userRouter.get("/users/getUserByID/:EmployeeID", getEmpByIDController);
userRouter.get("/users/getNotFoundByEmail/:Email", getEmpByEmailController1);
userRouter.post("/users/addNewEmployee", addEmployeeController);
userRouter.post("/users/login", loginUserController);
userRouter.put("/users/UpdateEmployeeByID/:EmployeeID", updateUserController);
userRouter.delete("/users/deleteEmployeeById/:EmployeeID", deleteEmployee);

export default userRouter;