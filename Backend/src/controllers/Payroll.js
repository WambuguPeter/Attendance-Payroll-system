import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllPayrollsService, getPayrollByIDService } from "../services/Payroll.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllPayrollsController = async (req,res) => {
    try {
        const data = await getAllPayrollsService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Payroll");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getPayrollByIDController = async (req, res) => {
    try {
      const PayrollID = req.params.PayrollID;
      const payroll = await getPayrollByIDService(PayrollID);
  
      if (payroll.length != 0) {
        return res.status(200).json(payroll);
      } else {
        return res.status(404).json({ error: "Payroll not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  