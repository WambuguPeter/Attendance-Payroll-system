import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { getAllPositionsService, getPositionByIDService } from "../services/Position.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

export const getAllPositionsController = async (req,res) => {
    try {
        const data = await getAllPositionsService();
        if (data.length=== 0) {
            sendNotFound(res, "Currently there is No Positions");
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        sendServerError(res, error);
    }
};

export const getPositionsByIDController = async (req, res) => {
    try {
      const PositionID = req.params.PositionID;
      const Position = await getPositionByIDService(PositionID);
  
      if (Position.length != 0) {
        return res.status(200).json(Position);
      } else {
        return res.status(404).json({ error: "Position not found" });
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };
  