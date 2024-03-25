import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess} from "../helper/helperFunctions.js";     
import { response } from "express";
import { addAdvanceCashService, deleteAdvanceCashService, getAdvanceCashByIDService, getAllAdvanceCashService } from "../services/AdvanceCashService.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();


const checkAdvanceCash = async (req) => {
  const advanceCashID = Number(req.params.AdvanceCashID);
  const advanceCash = await getAdvanceCashByIDService(advanceCashID);
  if (advanceCash.length == 0 || advanceCash.message) {
      return false;
  } else {
      return true;
  }
}

//Adding AdvanceCash
export const addAdvanceCashController = async (req, res) =>{
  const {
    EmployeeID, Description, AdvanceAmount
  } = req.body;
  // console.log(req.body);

  try {
      
      const newAdvanceCash = {
        EmployeeID, Description, AdvanceAmount 
      }
      // console.log(newAdvanceCash);

      const response = await addAdvanceCashService(newAdvanceCash);

      if (response instanceof Error){
          throw response;
      }

      if (response.rowsAffected && response.rowsAffected[0] === 1) {
          // sendMail(newUser.Email);
          sendCreated(res, "AdvanceCash created successfully");
        } else {
          sendServerError(res, "Failed to createAdvanceCash");
        }
  } catch (error) {
      sendServerError(res, error.message);
  }
}

// Get All

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


//Get by ID

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
  

  //Delete

export const deleteAdvanceCashContollor = async (req, res) => {
    try {
        const advanceCashID = Number(req.params.AdvanceCashID);
        if (await checkAdvanceCash(req)) {
            const result = await deleteAdvanceCashService(advanceCashID);
            if (result && result.message) {
                return res.status(500).send({ "error": result.message });
            } else {
                return sendDeleteSuccess(res, 'AdvanceCash deleted successfully');
            }
        } else {
            return sendNotFound(res, 'AdvanceCash not found');
        }
  
    } catch (error) {
        sendServerError(res, error.message);
    }
  }

  
  //Update

  export const updatePositionController = async (req, res) => {
    try {
      const positionID = Number(req.params.PositionID);
      const exists = await checkPosition(req);

      if (!exists){
        return res.status(404).json({ message: "Position not found" });
      }
      
      const positionData = await getPositionByIDService(positionID);
      // console.log(employeeData)
     
      const updatedPositionData ={ ...positionData[0], ...req.body };
      updatedPositionData.PositionID =positionID;
      // console.log(employeeID)

      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
            const {Title, BasicSalary, OvertimeRate } = req.body;
            if (Title) {
              updatedPositionData.Title = Title;
            }
            if (BasicSalary) {
              updatedPositionData.BasicSalary = BasicSalary;
            }
            if (OvertimeRate) {
              updatedPositionData.OvertimeRate = OvertimeRate;
            }
            const updatedPosition = await updatePositionService(updatedPositionData);
            if (updatedPosition && updatedPosition.rowsAffected && updatedPosition.rowsAffected[0] > 0) {
              return res.status(200).json({ message: "Position updated successfully" });
            } else {
              return res.status(500).json({ error: "Failed to update Position" });
          }}
        } catch (error) {
          return res.status(500).json({ error: error.message });
      }
  }
