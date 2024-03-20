import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { userLoginvalidator, validateNewEmployee } from "../validators/UserValidator.js";
import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess, checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js";     
import { response } from "express";
import { addScheduleService, deleteScheludeService, getAllSchedulesService, getScheludeByIDService, updateScheduleService } from "../services/ScheduleService.js"
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

const checkSchedule = async (req) => {
  const scheduleID = Number(req.params.ScheduleID);
  const schedule = await getScheludeByIDService(scheduleID);
  if (schedule.length == 0 || schedule.message) {
      return false;
  } else {
      return true;
  }
}

export const getAllSchedulesController = async (req,res) => {
    try {
        const data = await getAllSchedulesService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Schedules");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getScheduleByIDController = async (req, res) => {
    try {
      const scheduleID = req.params.ScheduleID;
      const schedule = await getScheludeByIDService(scheduleID);
  
      if (schedule.length != 0) {
        return res.status(200).json(schedule);
      } else {
        return res.status(404).json({ error: "Schedule not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  


///Adding Schedule

export const addScheduleController = async (req, res) =>{
    const {
        ScheduleName, StartTime, EndTime, Hours
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
        
        const newSchedule = {
            ScheduleName, StartTime, EndTime, Hours }
        // console.log(newPosition);
  
        const response = await addScheduleService(newSchedule);
  
        if (response instanceof Error){
            throw response;
        }
  
        if (response.rowsAffected && response.rowsAffected[0] === 1) {
            // sendMail(newUser.Email);
            sendCreated(res, "Schedule created successfully");
          } else {
            sendServerError(res, "Failed to create Schedule");
          }
    } catch (error) {
        sendServerError(res, error.message);
    }
  }
  

export const deleteSchedule = async (req, res) => {
  try {
      const scheduleID = Number(req.params.ScheduleID);
      if (await checkSchedule(req)) {
          const result = await deleteScheludeService(scheduleID);
          if (result && result.message) {
              return res.status(500).send({ "error": result.message });
          } else {
              return sendDeleteSuccess(res, 'Schedule deleted successfully');
          }
      } else {
          return sendNotFound(res, 'Schedule not found');
      }

  } catch (error) {
      sendServerError(res, error.message);
  }
}

//update

export const updateScheduleController = async (req, res) => {
    try {
        const scheduleID = Number(req.params.ScheduleID);
      const exists = await checkSchedule(req);

      if (!exists){
        return res.status(404).json({ message: "Schedule not found" });
      }

      const scheduleData = await getScheludeByIDService(scheduleID);
      // console.log(employeeData)
     
      const updatedScheduleData ={ ...scheduleData[0], ...req.body };
      updatedScheduleData.ScheduleID =scheduleID;
      // console.log(employeeID)

      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
            const {ScheduleName, StartTime, EndTime, Hours} = req.body;
            if (ScheduleName) {
              updatedScheduleData.ScheduleName = ScheduleName;
            }
            if (StartTime) {
              updatedScheduleData.StartTime = StartTime;
            }
            if (EndTime) {
              updatedScheduleData.EndTime = EndTime;
            }
            if (Hours) {
              updatedScheduleData.Hours = Hours;
            }
            const updatedSchedule = await updateScheduleService(updatedScheduleData);
            if (updatedSchedule && updatedSchedule.rowsAffected && updatedSchedule.rowsAffected[0] > 0) {
              return res.status(200).json({ message: "Schedule updated successfully" });
            } else {
              return res.status(500).json({ error: "Failed to update Schedule" });
          }}
        } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  }
