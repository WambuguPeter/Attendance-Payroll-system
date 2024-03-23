import { Router } from "express";
import { addovertimeController, deleteOvertimeContollor, getAllOvertimesController, getOvertimeByIDController, getovertimesByEmpIDController, updateOvertimeByEmpIDController } from "../controllers/OvertimeController.js";
// import { updateAttendanceByEmpIDController } from "../controllers/AttendanceController.js";


const ovetimeRoute =  Router();

ovetimeRoute.get("/overtime/getAll", getAllOvertimesController);
ovetimeRoute.get("/overtime/getovetimeByEmpID/:EmployeeID", getovertimesByEmpIDController); 
ovetimeRoute.get("/overtime/getovetimeByID/:OvertimeID", getOvertimeByIDController); 
ovetimeRoute.post("/overtime/addOvetime", addovertimeController); 
ovetimeRoute.put("/overtime/updateOvetimeByEmpID/:EmployeeID", updateOvertimeByEmpIDController); 
ovetimeRoute.delete("/overtime/deleteOvetimeByID/:OvertimeID", deleteOvertimeContollor); 

export default ovetimeRoute;