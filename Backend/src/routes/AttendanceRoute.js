import { Router } from "express";
import { addAttendanceController, deleteAttendanceContollor,
     getAllAttendanceController, 
    getAttendancesByEmpIDController, 
    getAttendancesByIDController, 
    updateAttendanceByIDController, } from "../controllers/AttendanceController.js";

const attendanceRoute =  Router();

attendanceRoute.get("/attendance/getAll", getAllAttendanceController);
attendanceRoute.get("/attendance/getattendanceByID/:AttendanceID", getAttendancesByIDController);
attendanceRoute.get("/attendance/getattendanceByEmpID/:EmployeeID", getAttendancesByEmpIDController);
attendanceRoute.post("/attendance/AddAttendance", addAttendanceController);
attendanceRoute.put("/attendance/UpdateAttendanceByID/:AttendanceID", updateAttendanceByIDController);
attendanceRoute.delete("/attendance/deleteattendanceByID/:AttendanceID", deleteAttendanceContollor);

export default attendanceRoute;