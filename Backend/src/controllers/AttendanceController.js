import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess, checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js";     
import { response } from "express";
import { addAttendanceService, deleteAttendanceService, getAllAttendancesService, getAttendByEmpIDService, getAttendanceByIDService, updateAttendanceService } from "../services/AttendanceService.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

const checkAttendance = async (req) => {
  const attendanceID = Number(req.params.AttendanceID);
  const attendance = await getAttendanceByIDService(attendanceID);
  if (attendance.length == 0 || attendance.message) {
      return false;
  } else {
      return true;
  }
}


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
      const attendanceID = Number(req.params.AttendanceID);
      const attendance = await getAttendanceByIDService(attendanceID);
  
      if (attendance.length != 0) {
        return res.status(200).json(attendance);
      } else {
        return res.status(404).json({ error: "Attendance not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


export const getAttendancesByEmpIDController = async (req, res) => {
    try {
      const employeeID = Number(req.params.EmployeeID);
      const attendance = await getAttendByEmpIDService(employeeID);
  
      if (attendance.length != 0) {
        return res.status(200).json(attendance);
      } else {
        return res.status(404).json({ error: "Attendance not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


  //Adding Attendance
export const addAttendanceController = async (req, res) =>{
  const {
    EmployeeID, Date, ScheduleID, TimeIn, Hours
  } = req.body;
  // console.log(req.body);

  try {

      // const {error} = validateNewPosition({
      //     Title, BasicSalary, OvertimeRate
      // });

      // if (error){
      //     // return res.status(400).send(error.details.message);
      //     return res.status(400).send(error.details[0].message);
      // }
      // const Title = String(req.params.Title);
      // console.log(Title)
      // const existingPosition = await getPositionByTitleService(Title);

      // if (existingPosition) {
      //     return res.status(400).json({ error : "Position already exists"});
      //     // console.log("Use in the syste alredy");
      // }
      
      const newAttendance = {
        EmployeeID, Date, ScheduleID, TimeIn, Hours 
      }
      // console.log(newPosition);

      const response = await addAttendanceService(newAttendance);

      if (response instanceof Error){
          throw response;
      }

      if (response.rowsAffected && response.rowsAffected[0] === 1) {
          // sendMail(newUser.Email);
          sendCreated(res, "Attendance created successfully");
        } else {
          sendServerError(res, "Failed to create Attendance");
        }
  } catch (error) {
      sendServerError(res, error.message);
  }
}

  

  //delette
  export const deleteAttendanceContollor = async (req, res) => {
    try {
        const attendanceID = Number(req.params.AttendanceID);
        if (await checkAttendance(req)) {
            const result = await deleteAttendanceService(attendanceID);
            if (result && result.message) {
                return res.status(500).send({ "error": result.message });
            } else {
                return sendDeleteSuccess(res, 'Attendance deleted successfully');
            }
        } else {
            return sendNotFound(res, 'Attendance not found');
        }
  
    } catch (error) {
        sendServerError(res, error.message);
    }
  }


  export const updateAttendanceByEmpIDController = async (req, res) => {
    try {
      const employeeID = Number(req.params.EmployeeID);
      const exists = await checkAttendance(req);

      // if (!exists){
      //   return res.status(404).json({ message: "Attendance not found" });
      // }
      
      const attendanceData = await getAttendByEmpIDService(employeeID);
      // console.log(employeeData)
     
      const updatedAttendanceData ={ ...attendanceData[0], ...req.body };
      updatedAttendanceData.EmployeeID =employeeID;
      // console.log(employeeID)

      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
            const { Date, ScheduleID, TimeIn, Hours } = req.body;
          
            if (Date) {
              updatedAttendanceData.Date = Date;
            }
            if (ScheduleID) {
              updatedAttendanceData.ScheduleID = ScheduleID;
            }
            if (TimeIn) {
              updatedAttendanceData.TimeIn = TimeIn;
            }
            if (Hours) {
              updatedAttendanceData.Hours = Hours;
            }
            const updatedAttendance = await updateAttendanceService(updatedAttendanceData);
            if (updatedAttendance && updatedAttendance.rowsAffected && updatedAttendance.rowsAffected[0] > 0) {
              return res.status(200).json({ message: "Attendance updated successfully" });
            } else {
              return res.status(500).json({ error: "Failed to update Attendance" });
          }}
        } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  }
