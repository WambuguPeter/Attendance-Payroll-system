import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllDeductionsService, getDeductionByIDService } from "../services/DeductionSevice.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllDeductionsController = async (req,res) => {
    try {
        const data = await getAllDeductionsService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there are No Deductions");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getDeductionsByIDController = async (req, res) => {
    try {
      const DeductionID = req.params.DeductionID;
      const deduction = await getDeductionByIDService(DeductionID);
  
      if (deduction.length != 0) {
        return res.status(200).json(deduction);
      } else {
        return res.status(404).json({ error: "Deduction not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  