import { Router } from "express";
import { addAttendanceController, deleteAttendanceContollor,
     getAllAttendanceController, 
    getAttendancesByIDController, 
    updateAttendanceController} from "../controllers/AttendanceController.js";

const attendanceRoute =  Router();

attendanceRoute.get("/attendance/getAll", getAllAttendanceController);
attendanceRoute.get("/attendance/getattendanceByID/:AttendanceID", getAttendancesByIDController);
attendanceRoute.post("/attendance/AddAttendance", addAttendanceController);
attendanceRoute.put("/attendance/UpdateAttendanceByID/:AttendanceID", updateAttendanceController);
attendanceRoute.delete("/attendance/deleteattendanceByID/:AttendanceID", deleteAttendanceContollor);

export default attendanceRoute;