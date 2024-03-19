import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import { sendBadRequest, sendDeleteSuccess, 
    sendCreated, sendNotFound,
    sendServerError, sendSuccess, checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js";     
import { response } from "express";
import { addPositionService, deletePositionService, getAllPositionsService, getPositionByIDService, getPositionByTitleService, updatePositionService } from "../services/Position.js";
// import { verifyToken } from "../middlewares/VerifyToken.js";

dotenv.config();

const checkPosition = async (req) => {
  const positionID = Number(req.params.PositionID);
  const position = await getPositionByIDService(positionID);
  if (position.length == 0 || position.message) {
      return false;
  } else {
      return true;
  }
}


//Adding Position
export const addPositionController = async (req, res) =>{
  const {
      Title, BasicSalary, OvertimeRate
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
      
      const newPosition = {
        Title, BasicSalary, OvertimeRate 
      }
      // console.log(newPosition);

      const response = await addPositionService(newPosition);

      if (response instanceof Error){
          throw response;
      }

      if (response.rowsAffected && response.rowsAffected[0] === 1) {
          // sendMail(newUser.Email);
          sendCreated(res, "Position created successfully");
        } else {
          sendServerError(res, "Failed to create Position");
        }
  } catch (error) {
      sendServerError(res, error.message);
  }
}


// get All position

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
  

  export const deletePositionContollor = async (req, res) => {
    try {
        const positionID = Number(req.params.PositionID);
        if (await checkPosition(req)) {
            const result = await deletePositionService(positionID);
            if (result && result.message) {
                return res.status(500).send({ "error": result.message });
            } else {
                return sendDeleteSuccess(res, 'Position deleted successfully');
            }
        } else {
            return sendNotFound(res, 'Position not found');
        }
  
    } catch (error) {
        sendServerError(res, error.message);
    }
  }


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
