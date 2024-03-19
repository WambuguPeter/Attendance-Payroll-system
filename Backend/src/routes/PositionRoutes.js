import { Router } from "express";
import { addPositionController, deletePositionContollor, getAllPositionsController, getPositionsByIDController, updatePositionController } from "../controllers/PositionControlers.js";

const positionRoute = Router();

positionRoute.get("/Positions/getAll", getAllPositionsController);
positionRoute.get("/Positions/getPositionByID/:PositionID", getPositionsByIDController);
positionRoute.post("/Positions/addPosition", addPositionController);
positionRoute.put("/Positions/updatePositionByID/:PositionID", updatePositionController);
positionRoute.delete("/Positions/deletePositionByID/:PositionID", deletePositionContollor);

export default positionRoute;