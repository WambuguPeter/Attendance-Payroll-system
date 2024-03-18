import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllLeavesService, getLeaveByIDService } from "../services/LeavesService.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllLeavesController = async (req,res) => {
    try {
        const data = await getAllLeavesService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Leaves");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getLeaveByIDController = async (req, res) => {
    try {
      const LeavesID = req.params.LeavesID;
      const leaves = await getLeaveByIDService(LeavesID);
  
      if (leaves.length != 0) {
        return res.status(200).json(leaves);
      } else {
        return res.status(404).json({ error: "Leave not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  