import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllOvertimesService, getOvertimeByIDService } from "../services/OvertimeSevice.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllOvertimesController = async (req,res) => {
    try {
        const data = await getAllOvertimesService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Overtime");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getOvertimeByIDController = async (req, res) => {
    try {
      const OvertimeID = req.params.OvertimeID;
      const overtime = await getOvertimeByIDService(OvertimeID);
  
      if (overtime.length != 0) {
        return res.status(200).json(overtime);
      } else {
        return res.status(404).json({ error: "overtime not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  