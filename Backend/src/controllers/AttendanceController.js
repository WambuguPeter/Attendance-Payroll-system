import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllAttendancesService, getAttendanceByIDService } from "../services/AttendanceService.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllAttendanceController = async (req,res) => {
    try {
        const data = await getAllAttendancesService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Attendances");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getAttendancesByIDController = async (req, res) => {
    try {
      const AttendanceID = req.params.AttendanceID;
      const attendance = await getAttendanceByIDService(AttendanceID);
  
      if (attendance.length != 0) {
        return res.status(200).json(attendance);
      } else {
        return res.status(404).json({ error: "Attendance not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  