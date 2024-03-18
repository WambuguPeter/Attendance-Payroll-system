import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAdvanceCashByIDService, getAllAdvanceCashService } from "../services/AdvanceCashService.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllAdvanceCashController = async (req,res) => {
    try {
        const data = await getAllAdvanceCashService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No AdvanceCash");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getAdvanceCashByIDController = async (req, res) => {
    try {
      const AdvanceCashID = req.params.AdvanceCashID;
      const advanceCash = await getAdvanceCashByIDService(AdvanceCashID);
  
      if (advanceCash.length != 0) {
        return res.status(200).json(advanceCash);
      } else {
        return res.status(404).json({ error: "AdvanceCash not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  