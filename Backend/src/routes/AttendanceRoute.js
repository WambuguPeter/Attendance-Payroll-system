import { Router } from "express";
import { getAllAttendanceController, getAttendancesByIDController } from "../controllers/AttendanceController.js";

const attendanceRoute =  Router();

attendanceRoute.get("/attendance/getAll", getAllAttendanceController);
attendanceRoute.get("/attendance/getattendanceByID/:AttendanceID", getAttendancesByIDController);

export default attendanceRoute;